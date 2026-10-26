import React, { useState } from 'react';
import { CalendarCheck, Clock, Search, CheckCircle2, XCircle, AlertCircle, Download } from 'lucide-react';

const records = [
  { name: 'Sarah Jenkins', dept: 'Engineering', date: 'Oct 26, 2026', checkIn: '09:02', checkOut: '18:05', hours: '9h 3m', status: 'Present' },
  { name: 'Marcus Lee', dept: 'Sales', date: 'Oct 26, 2026', checkIn: '09:41', checkOut: '18:00', hours: '8h 19m', status: 'Late' },
  { name: 'Priya Sharma', dept: 'HR & Admin', date: 'Oct 26, 2026', checkIn: '08:58', checkOut: '17:58', hours: '9h 0m', status: 'Present' },
  { name: 'David Kim', dept: 'Marketing', date: 'Oct 26, 2026', checkIn: '—', checkOut: '—', hours: '—', status: 'Absent' },
  { name: 'James Obi', dept: 'Operations', date: 'Oct 26, 2026', checkIn: '08:45', checkOut: '17:50', hours: '9h 5m', status: 'Present' },
  { name: 'Linda Cho', dept: 'Engineering', date: 'Oct 26, 2026', checkIn: '09:10', checkOut: '18:30', hours: '9h 20m', status: 'Present' },
  { name: 'Raj Mehta', dept: 'Engineering', date: 'Oct 26, 2026', checkIn: '—', checkOut: '—', hours: '—', status: 'Leave' },
  { name: 'Anita Roy', dept: 'Finance', date: 'Oct 26, 2026', checkIn: '09:05', checkOut: '—', hours: 'Active', status: 'Present' },
];

const statusConfig = {
  Present: { color: 'bg-emerald-100 text-emerald-700', icon: CheckCircle2 },
  Late: { color: 'bg-amber-100 text-amber-700', icon: AlertCircle },
  Absent: { color: 'bg-red-100 text-red-700', icon: XCircle },
  Leave: { color: 'bg-blue-100 text-blue-700', icon: Clock },
};

export default function AdminAttendancePage() {
  const [search, setSearch] = useState('');
  const filtered = records.filter(r => r.name.toLowerCase().includes(search.toLowerCase()));
  const present = records.filter(r => r.status === 'Present').length;
  const late = records.filter(r => r.status === 'Late').length;
  const absent = records.filter(r => r.status === 'Absent').length;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900">Attendance</h1>
          <p className="text-sm text-slate-500 mt-1">October 26, 2026 — Real-time biometric attendance log.</p>
        </div>
        <button className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-4 py-2.5 rounded-xl font-bold text-sm transition-colors">
          <Download size={15} />
          Export CSV
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: 'Total', value: records.length, color: 'bg-slate-100 text-slate-700' },
          { label: 'Present', value: present, color: 'bg-emerald-100 text-emerald-700' },
          { label: 'Late', value: late, color: 'bg-amber-100 text-amber-700' },
          { label: 'Absent', value: absent, color: 'bg-red-100 text-red-700' },
        ].map(c => (
          <div key={c.label} className={`rounded-2xl p-4 ${c.color} text-center`}>
            <div className="text-2xl font-black">{c.value}</div>
            <div className="text-xs font-bold mt-1">{c.label}</div>
          </div>
        ))}
      </div>

      {/* Search */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-4">
        <div className="relative">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search employee..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#008C75] focus:border-transparent"
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-50">
              <tr className="text-xs text-slate-400 font-bold uppercase tracking-wider">
                <th className="text-left px-5 py-3.5">Employee</th>
                <th className="text-left px-5 py-3.5">Department</th>
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
                    <td className="px-5 py-4 font-bold text-slate-900">{r.name}</td>
                    <td className="px-5 py-4 text-slate-600 text-xs">{r.dept}</td>
                    <td className="px-5 py-4 font-mono text-sm text-slate-700">{r.checkIn}</td>
                    <td className="px-5 py-4 font-mono text-sm text-slate-700">{r.checkOut}</td>
                    <td className="px-5 py-4 text-slate-600">{r.hours}</td>
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
