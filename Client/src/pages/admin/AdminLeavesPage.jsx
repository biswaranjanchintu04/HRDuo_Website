import React, { useState } from 'react';
import { CalendarRange, CheckCircle2, XCircle, Clock, Filter } from 'lucide-react';

const allLeaves = [
  { name: 'Raj Mehta', dept: 'Engineering', type: 'Casual', from: 'Nov 4', to: 'Nov 6', days: 3, applied: 'Oct 24', status: 'Pending' },
  { name: 'Anita Roy', dept: 'Finance', type: 'Sick', from: 'Nov 1', to: 'Nov 2', days: 2, applied: 'Oct 30', status: 'Pending' },
  { name: 'David Kim', dept: 'Marketing', type: 'Annual', from: 'Nov 10', to: 'Nov 14', days: 5, applied: 'Oct 22', status: 'Pending' },
  { name: 'Sarah Jenkins', dept: 'Engineering', type: 'Casual', from: 'Oct 15', to: 'Oct 16', days: 2, applied: 'Oct 12', status: 'Approved' },
  { name: 'Marcus Lee', dept: 'Sales', type: 'Sick', from: 'Oct 10', to: 'Oct 11', days: 2, applied: 'Oct 10', status: 'Approved' },
  { name: 'Linda Cho', dept: 'Engineering', type: 'Annual', from: 'Sep 28', to: 'Oct 2', days: 5, applied: 'Sep 20', status: 'Approved' },
  { name: 'James Obi', dept: 'Operations', type: 'Casual', from: 'Sep 15', to: 'Sep 15', days: 1, applied: 'Sep 14', status: 'Declined' },
];

const statusConfig = {
  Pending: { color: 'bg-amber-100 text-amber-700', icon: Clock },
  Approved: { color: 'bg-emerald-100 text-emerald-700', icon: CheckCircle2 },
  Declined: { color: 'bg-red-100 text-red-700', icon: XCircle },
};

const leaveTypeColor = {
  Casual: 'bg-blue-100 text-blue-700',
  Sick: 'bg-rose-100 text-rose-700',
  Annual: 'bg-violet-100 text-violet-700',
};

export default function AdminLeavesPage() {
  const [filter, setFilter] = useState('All');
  const [leaves, setLeaves] = useState(allLeaves);

  const shown = filter === 'All' ? leaves : leaves.filter(l => l.status === filter);

  const updateStatus = (idx, newStatus) => {
    const updated = [...leaves];
    updated[idx] = { ...updated[idx], status: newStatus };
    setLeaves(updated);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900">Leave Requests</h1>
          <p className="text-sm text-slate-500 mt-1">Review and manage employee leave requests.</p>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          {['All', 'Pending', 'Approved', 'Declined'].map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-colors ${filter === f ? 'bg-slate-900 text-white' : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'}`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Pending', count: leaves.filter(l => l.status === 'Pending').length, color: 'bg-amber-100 text-amber-700' },
          { label: 'Approved', count: leaves.filter(l => l.status === 'Approved').length, color: 'bg-emerald-100 text-emerald-700' },
          { label: 'Declined', count: leaves.filter(l => l.status === 'Declined').length, color: 'bg-red-100 text-red-700' },
        ].map(s => (
          <div key={s.label} className={`rounded-2xl p-4 text-center ${s.color}`}>
            <div className="text-2xl font-black">{s.count}</div>
            <div className="text-xs font-bold mt-1">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-50">
              <tr className="text-xs text-slate-400 font-bold uppercase tracking-wider">
                <th className="text-left px-5 py-3.5">Employee</th>
                <th className="text-left px-5 py-3.5">Type</th>
                <th className="text-left px-5 py-3.5">Duration</th>
                <th className="text-left px-5 py-3.5">Days</th>
                <th className="text-left px-5 py-3.5">Applied On</th>
                <th className="text-left px-5 py-3.5">Status</th>
                <th className="text-left px-5 py-3.5">Actions</th>
              </tr>
            </thead>
            <tbody>
              {shown.map((l, i) => {
                const cfg = statusConfig[l.status];
                const Icon = cfg.icon;
                const realIdx = leaves.indexOf(l);
                return (
                  <tr key={i} className="border-t border-slate-50 hover:bg-slate-50/60 transition-colors">
                    <td className="px-5 py-4">
                      <div className="font-bold text-slate-900">{l.name}</div>
                      <div className="text-xs text-slate-400">{l.dept}</div>
                    </td>
                    <td className="px-5 py-4">
                      <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${leaveTypeColor[l.type]}`}>{l.type}</span>
                    </td>
                    <td className="px-5 py-4 text-slate-600 text-xs">{l.from} – {l.to}</td>
                    <td className="px-5 py-4 font-bold text-slate-900">{l.days}d</td>
                    <td className="px-5 py-4 text-slate-400 text-xs">{l.applied}</td>
                    <td className="px-5 py-4">
                      <span className={`inline-flex items-center gap-1.5 text-xs font-bold px-2.5 py-1 rounded-full ${cfg.color}`}>
                        <Icon size={12} />
                        {l.status}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      {l.status === 'Pending' && (
                        <div className="flex items-center gap-1.5">
                          <button onClick={() => updateStatus(realIdx, 'Approved')} className="text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-1.5 rounded-lg transition-colors">Approve</button>
                          <button onClick={() => updateStatus(realIdx, 'Declined')} className="text-xs font-bold bg-slate-100 hover:bg-red-50 hover:text-red-600 text-slate-600 px-3 py-1.5 rounded-lg transition-colors">Decline</button>
                        </div>
                      )}
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
