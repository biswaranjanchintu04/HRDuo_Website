import React, { useState } from 'react';
import { CalendarCheck, CheckCircle2, AlertCircle, Clock, XCircle, Download } from 'lucide-react';

const records = [
  { name: 'Sarah Jenkins', date: 'Oct 26', checkIn: '09:02', checkOut: '18:05', hours: '9h 3m', status: 'Present' },
  { name: 'Linda Cho', date: 'Oct 26', checkIn: '09:10', checkOut: '18:30', hours: '9h 20m', status: 'Present' },
  { name: 'Raj Mehta', date: 'Oct 26', checkIn: '—', checkOut: '—', hours: '—', status: 'On Leave' },
  { name: 'Tom Watts', date: 'Oct 26', checkIn: '09:24', checkOut: '18:00', hours: '8h 36m', status: 'Present' },
  { name: 'Mia Park', date: 'Oct 26', checkIn: '10:05', checkOut: '18:10', hours: '8h 5m', status: 'Late' },
  { name: 'Jake Torres', date: 'Oct 26', checkIn: '08:52', checkOut: '17:55', hours: '9h 3m', status: 'Present' },
];

const statusConfig = {
  Present: { color: 'bg-emerald-100 text-emerald-700', icon: CheckCircle2 },
  Late: { color: 'bg-amber-100 text-amber-700', icon: AlertCircle },
  Absent: { color: 'bg-red-100 text-red-700', icon: XCircle },
  'On Leave': { color: 'bg-blue-100 text-blue-700', icon: Clock },
};

export default function ManagerAttendancePage() {
  const present = records.filter(r => r.status === 'Present').length;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900">Team Attendance</h1>
          <p className="text-sm text-slate-500 mt-1">October 26, 2026 — Engineering Department</p>
        </div>
        <button className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-4 py-2.5 rounded-xl font-bold text-sm transition-colors">
          <Download size={15} />
          Export
        </button>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: 'Total', value: records.length, color: 'bg-slate-100 text-slate-700' },
          { label: 'Present', value: present, color: 'bg-emerald-100 text-emerald-700' },
          { label: 'Late', value: records.filter(r => r.status === 'Late').length, color: 'bg-amber-100 text-amber-700' },
          { label: 'On Leave', value: records.filter(r => r.status === 'On Leave').length, color: 'bg-blue-100 text-blue-700' },
        ].map(c => (
          <div key={c.label} className={`rounded-2xl p-4 text-center ${c.color}`}>
            <div className="text-2xl font-black">{c.value}</div>
            <div className="text-xs font-bold mt-1">{c.label}</div>
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
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
              {records.map((r, i) => {
                const cfg = statusConfig[r.status];
                const Icon = cfg.icon;
                return (
                  <tr key={i} className="border-t border-slate-50 hover:bg-slate-50/60 transition-colors">
                    <td className="px-5 py-4 font-bold text-slate-900">{r.name}</td>
                    <td className="px-5 py-4 text-slate-500 text-xs">{r.date}</td>
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
