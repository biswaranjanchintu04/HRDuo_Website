import React, { useState } from 'react';
import { CalendarRange, CheckCircle2, XCircle, Clock } from 'lucide-react';

const initialLeaves = [
  { name: 'Tom Watts', type: 'Casual', from: 'Nov 3', to: 'Nov 4', days: 2, applied: 'Oct 24', status: 'Pending' },
  { name: 'Mia Park', type: 'Sick', from: 'Nov 1', to: 'Nov 1', days: 1, applied: 'Oct 30', status: 'Pending' },
  { name: 'Sarah Jenkins', type: 'Annual', from: 'Nov 15', to: 'Nov 19', days: 5, applied: 'Oct 20', status: 'Pending' },
  { name: 'Linda Cho', type: 'Casual', from: 'Oct 10', to: 'Oct 10', days: 1, applied: 'Oct 9', status: 'Approved' },
  { name: 'Jake Torres', type: 'Annual', from: 'Sep 20', to: 'Sep 24', days: 5, applied: 'Sep 15', status: 'Approved' },
  { name: 'Raj Mehta', type: 'Sick', from: 'Oct 26', to: 'Oct 28', days: 3, applied: 'Oct 26', status: 'Pending' },
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

export default function ManagerLeavesPage() {
  const [leaves, setLeaves] = useState(initialLeaves);
  const [filter, setFilter] = useState('All');

  const updateStatus = (idx, status) => {
    const updated = [...leaves];
    updated[idx] = { ...updated[idx], status };
    setLeaves(updated);
  };

  const shown = filter === 'All' ? leaves : leaves.filter(l => l.status === filter);

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900">Leave Approvals</h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">Approve, decline, or audit department time-off requests.</p>
        </div>
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
          {['All', 'Pending', 'Approved', 'Declined'].map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-colors ${
                filter === f
                  ? 'bg-violet-600 text-white shadow-sm'
                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Counter Cards */}
      <div className="grid grid-cols-3 gap-2.5 sm:gap-4">
        {[
          { label: 'Pending', count: leaves.filter(l => l.status === 'Pending').length, color: 'bg-amber-100 text-amber-700' },
          { label: 'Approved', count: leaves.filter(l => l.status === 'Approved').length, color: 'bg-emerald-100 text-emerald-700' },
          { label: 'Declined', count: leaves.filter(l => l.status === 'Declined').length, color: 'bg-red-100 text-red-700' },
        ].map(s => (
          <div key={s.label} className={`rounded-2xl p-3 sm:p-4 text-center ${s.color}`}>
            <div className="text-xl sm:text-2xl font-black">{s.count}</div>
            <div className="text-[11px] sm:text-xs font-bold mt-0.5">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Mobile Card List (shown on < md) */}
      <div className="block md:hidden space-y-3">
        {shown.map((l) => {
          const cfg = statusConfig[l.status];
          const Icon = cfg.icon;
          const realIdx = leaves.indexOf(l);
          return (
            <div key={realIdx} className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-slate-900 text-sm">{l.name}</h3>
                  <p className="text-xs text-slate-400 mt-0.5">Applied: {l.applied}</p>
                </div>
                <span className={`inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-0.5 rounded-full ${cfg.color}`}>
                  <Icon size={12} />
                  {l.status}
                </span>
              </div>

              <div className="flex items-center justify-between text-xs pt-1 border-t border-slate-50">
                <span className={`font-bold px-2 py-0.5 rounded-full ${leaveTypeColor[l.type]}`}>{l.type}</span>
                <span className="text-slate-600 font-medium">{l.from} – {l.to} ({l.days}d)</span>
              </div>

              {l.status === 'Pending' && (
                <div className="grid grid-cols-2 gap-2 pt-1">
                  <button
                    onClick={() => updateStatus(realIdx, 'Approved')}
                    className="w-full py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-sm transition-colors text-center"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => updateStatus(realIdx, 'Declined')}
                    className="w-full py-2 bg-slate-100 hover:bg-rose-50 hover:text-rose-600 text-slate-700 font-bold text-xs rounded-xl transition-colors text-center"
                  >
                    Decline
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Desktop Table (hidden on mobile, shown on md+) */}
      <div className="hidden md:block bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-50">
              <tr className="text-xs text-slate-400 font-bold uppercase tracking-wider">
                <th className="text-left px-5 py-3.5">Team Member</th>
                <th className="text-left px-5 py-3.5">Type</th>
                <th className="text-left px-5 py-3.5">Duration</th>
                <th className="text-left px-5 py-3.5">Days</th>
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
                    <td className="px-5 py-4 font-bold text-slate-900">{l.name}</td>
                    <td className="px-5 py-4">
                      <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${leaveTypeColor[l.type]}`}>{l.type}</span>
                    </td>
                    <td className="px-5 py-4 text-slate-600 text-xs">{l.from} – {l.to}</td>
                    <td className="px-5 py-4 font-bold text-slate-900">{l.days}d</td>
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
