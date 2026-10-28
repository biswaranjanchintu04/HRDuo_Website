import React, { useState } from 'react';
import { CalendarCheck, CheckCircle2, AlertCircle, Clock, XCircle, Download, Users } from 'lucide-react';

const records = [
  { name: 'Sarah Jenkins', avatar: 'SJ', color: 'bg-violet-600', date: 'Oct 26', checkIn: '09:02', checkOut: '18:05', hours: '9h 3m', status: 'Present' },
  { name: 'Linda Cho', avatar: 'LC', color: 'bg-pink-600', date: 'Oct 26', checkIn: '09:10', checkOut: '18:30', hours: '9h 20m', status: 'Present' },
  { name: 'Raj Mehta', avatar: 'RM', color: 'bg-blue-600', date: 'Oct 26', checkIn: '—', checkOut: '—', hours: '—', status: 'On Leave' },
  { name: 'Tom Watts', avatar: 'TW', color: 'bg-teal-600', date: 'Oct 26', checkIn: '09:24', checkOut: '18:00', hours: '8h 36m', status: 'Present' },
  { name: 'Mia Park', avatar: 'MP', color: 'bg-amber-600', date: 'Oct 26', checkIn: '10:05', checkOut: '18:10', hours: '8h 5m', status: 'Late' },
  { name: 'Jake Torres', avatar: 'JT', color: 'bg-indigo-600', date: 'Oct 26', checkIn: '08:52', checkOut: '17:55', hours: '9h 3m', status: 'Present' },
];

const statusConfig = {
  Present: { color: 'bg-emerald-100 text-emerald-700', icon: CheckCircle2 },
  Late: { color: 'bg-amber-100 text-amber-700', icon: AlertCircle },
  Absent: { color: 'bg-red-100 text-red-700', icon: XCircle },
  'On Leave': { color: 'bg-blue-100 text-blue-700', icon: Clock },
};

export default function ManagerAttendancePage() {
  const [filter, setFilter] = useState('All');
  const present = records.filter(r => r.status === 'Present').length;

  const filtered = filter === 'All' ? records : records.filter(r => r.status === filter);

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 flex items-center gap-2">
            <CalendarCheck className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600 shrink-0" />
            Team Attendance
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">Oct 26, 2026 — Engineering Department</p>
        </div>
        <button className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 active:bg-slate-700 text-white px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-colors touch-manipulation self-start sm:self-auto">
          <Download size={15} />
          Export Report
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-4">
        {[
          { label: 'Total', value: records.length, color: 'bg-slate-100 text-slate-700' },
          { label: 'Present', value: present, color: 'bg-emerald-100 text-emerald-700' },
          { label: 'Late', value: records.filter(r => r.status === 'Late').length, color: 'bg-amber-100 text-amber-700' },
          { label: 'On Leave', value: records.filter(r => r.status === 'On Leave').length, color: 'bg-blue-100 text-blue-700' },
        ].map(c => (
          <div key={c.label} className={`rounded-2xl p-3.5 sm:p-4 text-center ${c.color}`}>
            <div className="text-2xl sm:text-3xl font-black">{c.value}</div>
            <div className="text-xs font-bold mt-0.5">{c.label}</div>
          </div>
        ))}
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
        {['All', 'Present', 'Late', 'On Leave'].map(tab => (
          <button
            key={tab}
            onClick={() => setFilter(tab)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-colors touch-manipulation ${
              filter === tab
                ? 'bg-purple-600 text-white shadow-sm'
                : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Mobile Card List (< md) */}
      <div className="block md:hidden space-y-2.5">
        {filtered.map((r, i) => {
          const cfg = statusConfig[r.status];
          const Icon = cfg.icon;
          return (
            <div key={i} className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2.5">
                  <div className={`w-9 h-9 rounded-xl ${r.color} text-white font-black text-xs flex items-center justify-center shrink-0`}>
                    {r.avatar}
                  </div>
                  <div>
                    <div className="font-bold text-sm text-slate-900">{r.name}</div>
                    <div className="text-[10px] text-slate-400">{r.date}</div>
                  </div>
                </div>
                <span className={`inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-full ${cfg.color}`}>
                  <Icon size={11} />
                  {r.status}
                </span>
              </div>

              <div className="grid grid-cols-3 gap-2 bg-slate-50 rounded-xl p-2.5 border border-slate-100">
                <div>
                  <div className="text-[9px] font-bold text-slate-400 uppercase mb-0.5">Check In</div>
                  <div className="text-xs font-mono font-semibold text-slate-800">{r.checkIn}</div>
                </div>
                <div>
                  <div className="text-[9px] font-bold text-slate-400 uppercase mb-0.5">Check Out</div>
                  <div className="text-xs font-mono font-semibold text-slate-800">{r.checkOut}</div>
                </div>
                <div>
                  <div className="text-[9px] font-bold text-slate-400 uppercase mb-0.5">Hours</div>
                  <div className="text-xs font-bold text-slate-800">{r.hours}</div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Desktop Table (md+) */}
      <div className="hidden md:block bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-50">
              <tr className="text-xs text-slate-400 font-bold uppercase tracking-wider">
                <th className="text-left px-5 py-3.5">Team Member</th>
                <th className="text-left px-5 py-3.5">Date</th>
                <th className="text-left px-5 py-3.5">Check In</th>
                <th className="text-left px-5 py-3.5">Check Out</th>
                <th className="text-left px-5 py-3.5">Hours</th>
                <th className="text-left px-5 py-3.5">Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((r, i) => {
                const cfg = statusConfig[r.status];
                const Icon = cfg.icon;
                return (
                  <tr key={i} className="border-t border-slate-50 hover:bg-slate-50/60 transition-colors">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2.5">
                        <div className={`w-8 h-8 rounded-lg ${r.color} text-white font-black text-xs flex items-center justify-center`}>
                          {r.avatar}
                        </div>
                        <span className="font-bold text-slate-900">{r.name}</span>
                      </div>
                    </td>
                    <td className="px-5 py-4 text-slate-500 text-xs">{r.date}</td>
                    <td className="px-5 py-4 font-mono text-sm text-slate-700">{r.checkIn}</td>
                    <td className="px-5 py-4 font-mono text-sm text-slate-700">{r.checkOut}</td>
                    <td className="px-5 py-4 text-slate-600 font-semibold">{r.hours}</td>
                    <td className="px-5 py-4">
                      <span className={`inline-flex items-center gap-1.5 text-xs font-bold px-2.5 py-1 rounded-full ${cfg.color}`}>
                        <Icon size={12} />
                        {r.status}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
