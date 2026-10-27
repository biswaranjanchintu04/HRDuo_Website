import React, { useState } from 'react';
import { 
  CalendarCheck, Clock, Search, CheckCircle2, XCircle, 
  AlertCircle, Download, Filter, Plus, Calendar 
} from 'lucide-react';
import { useHRMS } from '../../context/HRMSContext';
import { useAlert } from '../../context/AlertContext';

export default function AdminAttendancePage() {
  const { attendance, employees } = useHRMS();
  const { showToast } = useAlert();

  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [selectedDate, setSelectedDate] = useState('2026-10-27');

  const filtered = attendance.filter(r => {
    const matchesSearch = r.name.toLowerCase().includes(search.toLowerCase()) ||
      r.department.toLowerCase().includes(search.toLowerCase()) ||
      r.empId.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === 'All' || r.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const presentCount = attendance.filter(r => r.status === 'Present').length;
  const lateCount = attendance.filter(r => r.status === 'Late').length;
  const onLeaveCount = attendance.filter(r => r.status === 'On Leave').length;
  const absentCount = attendance.filter(r => r.status === 'Absent').length;

  const handleExport = () => {
    showToast('Exporting biometric attendance report (CSV)...', 'success');
  };

  const handleManualMark = () => {
    showToast('Manual attendance correction window opened', 'info');
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">Attendance Overview & Biometric Logs</h1>
          <p className="text-sm text-slate-500 mt-1">
            Real-time biometric punch logs, late arrivals, shift hours, and roster compliance.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleExport}
            className="inline-flex items-center gap-2 bg-white hover:bg-slate-50 text-slate-700 px-4 py-2.5 rounded-xl font-bold text-xs border border-slate-200 shadow-2xs transition-all cursor-pointer"
          >
            <Download size={14} />
            Export Log
          </button>
          <button
            onClick={handleManualMark}
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-xl font-bold text-xs shadow-md shadow-blue-500/20 transition-all cursor-pointer"
          >
            <Plus size={14} />
            Mark Manual Punch
          </button>
        </div>
      </div>

      {/* Summary Stat Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-2xs flex items-center justify-between">
          <div>
            <div className="text-2xl font-black text-slate-900">{presentCount}</div>
            <div className="text-xs font-bold text-emerald-600 mt-0.5">Present Today</div>
          </div>
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <CheckCircle2 size={20} />
          </div>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-2xs flex items-center justify-between">
          <div>
            <div className="text-2xl font-black text-slate-900">{lateCount}</div>
            <div className="text-xs font-bold text-amber-600 mt-0.5">Late Arrivals</div>
          </div>
          <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
            <AlertCircle size={20} />
          </div>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-2xs flex items-center justify-between">
          <div>
            <div className="text-2xl font-black text-slate-900">{onLeaveCount}</div>
            <div className="text-xs font-bold text-blue-600 mt-0.5">On Approved Leave</div>
          </div>
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
            <Clock size={20} />
          </div>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-2xs flex items-center justify-between">
          <div>
            <div className="text-2xl font-black text-slate-900">{absentCount}</div>
            <div className="text-xs font-bold text-rose-600 mt-0.5">Unexcused Absences</div>
          </div>
          <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center">
            <XCircle size={20} />
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-2xl shadow-2xs border border-slate-200/80 p-4 flex flex-col md:flex-row gap-3 items-center justify-between">
        <div className="relative flex-1 w-full">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search employee attendance by name, ID, or department..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-200 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50/50"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 bg-white text-xs font-bold text-slate-700">
            <Calendar size={13} className="text-slate-400" />
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="outline-none bg-transparent cursor-pointer"
            />
          </div>

          <div className="flex items-center gap-1">
            {['All', 'Present', 'Late', 'On Leave', 'Absent'].map(st => (
              <button
                key={st}
                onClick={() => setStatusFilter(st)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  statusFilter === st
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'bg-slate-100 hover:bg-slate-200/70 text-slate-600'
                }`}
              >
                {st}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-2xs border border-slate-200/80 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-slate-50/80 border-b border-slate-100">
              <tr className="text-xs text-slate-400 font-bold uppercase tracking-wider">
                <th className="px-5 py-3.5">Employee</th>
                <th className="px-5 py-3.5">Department</th>
                <th className="px-5 py-3.5">Date</th>
                <th className="px-5 py-3.5">Check-In</th>
                <th className="px-5 py-3.5">Check-Out</th>
                <th className="px-5 py-3.5">Hours Worked</th>
                <th className="px-5 py-3.5">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
              {filtered.map((rec) => (
                <tr key={rec.id} className="hover:bg-slate-50/60 transition-colors">
                  <td className="px-5 py-3.5 font-bold text-slate-900">
                    <div>{rec.name}</div>
                    <div className="text-[10px] text-slate-400 font-mono font-normal">{rec.empId}</div>
                  </td>
                  <td className="px-5 py-3.5 text-xs text-slate-700 font-semibold">{rec.department}</td>
                  <td className="px-5 py-3.5 text-xs text-slate-500">{rec.date}</td>
                  <td className="px-5 py-3.5 font-mono text-xs font-semibold text-slate-800">{rec.checkIn}</td>
                  <td className="px-5 py-3.5 font-mono text-xs font-semibold text-slate-800">{rec.checkOut}</td>
                  <td className="px-5 py-3.5 text-xs font-bold text-blue-600">{rec.workHours}</td>
                  <td className="px-5 py-3.5">
                    <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold ${
                      rec.status === 'Present' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' :
                      rec.status === 'Late' ? 'bg-amber-50 text-amber-700 border border-amber-200' :
                      rec.status === 'On Leave' ? 'bg-blue-50 text-blue-700 border border-blue-200' :
                      'bg-rose-50 text-rose-700 border border-rose-200'
                    }`}>
                      {rec.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
