import React, { useState } from 'react';
import { CalendarCheck, Clock, Download, Filter, CheckCircle2, AlertCircle, Award } from 'lucide-react';

const mockAttendanceRecords = [
  { date: 'Oct 26, 2026', day: 'Monday', in: '09:04 AM', out: '—', hours: '7h 15m', status: 'Present', notes: 'Biometric Verified' },
  { date: 'Oct 25, 2026', day: 'Sunday', in: '—', out: '—', hours: '—', status: 'Weekend', notes: 'Weekly Off' },
  { date: 'Oct 24, 2026', day: 'Saturday', in: '—', out: '—', hours: '—', status: 'Weekend', notes: 'Weekly Off' },
  { date: 'Oct 23, 2026', day: 'Friday', in: '09:01 AM', out: '06:12 PM', hours: '9h 11m', status: 'Present', notes: 'Biometric Verified' },
  { date: 'Oct 22, 2026', day: 'Thursday', in: '08:58 AM', out: '06:05 PM', hours: '9h 07m', status: 'Present', notes: 'Biometric Verified' },
  { date: 'Oct 21, 2026', day: 'Wednesday', in: '09:35 AM', out: '06:40 PM', hours: '9h 05m', status: 'Late', notes: 'Traffic delay approved' },
  { date: 'Oct 20, 2026', day: 'Tuesday', in: '09:00 AM', out: '06:02 PM', hours: '9h 02m', status: 'Present', notes: 'Biometric Verified' },
  { date: 'Oct 19, 2026', day: 'Monday', in: '—', out: '—', hours: '—', status: 'Leave', notes: 'Casual Leave Approved' },
];

export default function EmployeeAttendance() {
  const [filter, setFilter] = useState('All');

  const filtered = mockAttendanceRecords.filter((r) => {
    if (filter === 'All') return true;
    return r.status.toLowerCase() === filter.toLowerCase();
  });

  return (
    <div className="space-y-4 sm:space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            <CalendarCheck className="w-6 h-6 sm:w-7 h-7 text-emerald-600" />
            Attendance History & Timesheet
          </h1>
          <p className="text-slate-500 text-xs sm:text-sm mt-0.5">
            Real-time biometric punch records, working hours, and monthly attendance stats.
          </p>
        </div>

        <button className="px-4 py-2 sm:py-2.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold text-xs sm:text-sm rounded-xl flex items-center gap-2 shadow-sm transition-all self-start sm:self-auto">
          <Download className="w-4 h-4 text-slate-500" />
          Export Timesheet CSV
        </button>
      </div>

      {/* Attendance Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-4">
        <div className="bg-white rounded-2xl p-3.5 sm:p-4 border border-slate-100 shadow-sm">
          <div className="text-[10px] sm:text-xs font-bold text-slate-400 uppercase">Working Days</div>
          <div className="text-xl sm:text-2xl font-black text-slate-900 mt-1">22</div>
          <div className="text-[11px] text-slate-500 mt-0.5">Month of October</div>
        </div>
        <div className="bg-white rounded-2xl p-3.5 sm:p-4 border border-slate-100 shadow-sm">
          <div className="text-[10px] sm:text-xs font-bold text-slate-400 uppercase">Present Days</div>
          <div className="text-xl sm:text-2xl font-black text-emerald-600 mt-1">20</div>
          <div className="text-[11px] text-emerald-600 font-medium mt-0.5">91% Attendance</div>
        </div>
        <div className="bg-white rounded-2xl p-3.5 sm:p-4 border border-slate-100 shadow-sm">
          <div className="text-[10px] sm:text-xs font-bold text-slate-400 uppercase">Avg Work Hours</div>
          <div className="text-xl sm:text-2xl font-black text-blue-600 mt-1">9h 08m</div>
          <div className="text-[11px] text-slate-500 mt-0.5">Per working day</div>
        </div>
        <div className="bg-white rounded-2xl p-3.5 sm:p-4 border border-slate-100 shadow-sm">
          <div className="text-[10px] sm:text-xs font-bold text-slate-400 uppercase">Late Arrivals</div>
          <div className="text-xl sm:text-2xl font-black text-amber-600 mt-1">1</div>
          <div className="text-[11px] text-slate-500 mt-0.5">Within 3-late quota</div>
        </div>
      </div>

      {/* Main Container */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        {/* Table Filter Tabs */}
        <div className="p-3.5 sm:p-4 border-b border-slate-100 flex items-center gap-1.5 overflow-x-auto no-scrollbar">
          {['All', 'Present', 'Late', 'Leave', 'Weekend'].map((tab) => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-colors ${
                filter === tab
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Mobile View (< md) */}
        <div className="block md:hidden divide-y divide-slate-100">
          {filtered.map((r, idx) => (
            <div key={idx} className="p-4 space-y-2 hover:bg-slate-50/60 transition-colors">
              <div className="flex items-center justify-between">
                <div>
                  <span className="font-bold text-sm text-slate-900">{r.date}</span>
                  <span className="text-xs text-slate-400 ml-2">({r.day})</span>
                </div>
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                    r.status === 'Present'
                      ? 'bg-emerald-100 text-emerald-800'
                      : r.status === 'Late'
                      ? 'bg-amber-100 text-amber-800'
                      : r.status === 'Leave'
                      ? 'bg-blue-100 text-blue-800'
                      : 'bg-slate-100 text-slate-500'
                  }`}
                >
                  {r.status}
                </span>
              </div>

              <div className="grid grid-cols-3 gap-2 text-xs bg-slate-50/80 p-2.5 rounded-xl border border-slate-100">
                <div>
                  <div className="text-[10px] text-slate-400 uppercase font-bold">Punch In</div>
                  <div className="font-mono font-semibold text-slate-800 mt-0.5">{r.in}</div>
                </div>
                <div>
                  <div className="text-[10px] text-slate-400 uppercase font-bold">Punch Out</div>
                  <div className="font-mono font-semibold text-slate-800 mt-0.5">{r.out}</div>
                </div>
                <div>
                  <div className="text-[10px] text-slate-400 uppercase font-bold">Hours</div>
                  <div className="font-bold text-slate-800 mt-0.5">{r.hours}</div>
                </div>
              </div>

              <div className="text-[11px] text-slate-400">
                Verification: {r.notes}
              </div>
            </div>
          ))}
        </div>

        {/* Desktop View (md+) */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="bg-slate-50/70 border-b border-slate-100 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                <th className="py-3 px-5">Date</th>
                <th className="py-3 px-4">Day</th>
                <th className="py-3 px-4">Punch In</th>
                <th className="py-3 px-4">Punch Out</th>
                <th className="py-3 px-4">Total Hours</th>
                <th className="py-3 px-4">Verification</th>
                <th className="py-3 px-5 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((r, idx) => (
                <tr key={idx} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3.5 px-5 font-bold text-slate-900">{r.date}</td>
                  <td className="py-3.5 px-4 text-slate-600">{r.day}</td>
                  <td className="py-3.5 px-4 font-mono text-slate-700">{r.in}</td>
                  <td className="py-3.5 px-4 font-mono text-slate-700">{r.out}</td>
                  <td className="py-3.5 px-4 font-semibold text-slate-800">{r.hours}</td>
                  <td className="py-3.5 px-4 text-xs text-slate-500">{r.notes}</td>
                  <td className="py-3.5 px-5 text-right">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold ${
                        r.status === 'Present'
                          ? 'bg-emerald-100 text-emerald-800'
                          : r.status === 'Late'
                          ? 'bg-amber-100 text-amber-800'
                          : r.status === 'Leave'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-slate-100 text-slate-500'
                      }`}
                    >
                      {r.status}
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
