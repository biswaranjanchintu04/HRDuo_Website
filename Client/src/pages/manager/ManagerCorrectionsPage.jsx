import React, { useState } from 'react';
import { Clock, CheckCircle2, XCircle, Check, X } from 'lucide-react';
import { useHRMS } from '../../context/HRMSContext';
import { useAlert } from '../../context/AlertContext';

export default function ManagerCorrectionsPage() {
  const { corrections, approveCorrection } = useHRMS();
  const { showToast, showConfirm } = useAlert();
  const [filter, setFilter] = useState('All');

  const filtered = corrections.filter(c => filter === 'All' || c.status === filter);

  const handleAction = async (item, newStatus) => {
    const actionText = newStatus === 'Approved' ? 'Approve' : 'Reject';
    const confirmed = await showConfirm(`${actionText} attendance punch correction for ${item.name}?`);
    if (confirmed) {
      approveCorrection(item.id, newStatus);
      showToast(`Correction ${item.id} ${newStatus.toLowerCase()}!`, newStatus === 'Approved' ? 'success' : 'info');
    }
  };

  const statusColor = (s) => {
    if (s === 'Approved') return 'bg-emerald-50 text-emerald-700 border-emerald-200';
    if (s === 'Rejected') return 'bg-rose-50 text-rose-700 border-rose-200';
    return 'bg-amber-50 text-amber-700 border-amber-200';
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            <Clock className="w-5 h-5 sm:w-6 sm:h-6 text-amber-600 shrink-0" />
            Attendance Corrections
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Review missing punches, badge reader exceptions, and timestamp adjustments.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
          {['All', 'Pending', 'Approved', 'Rejected'].map(st => (
            <button
              key={st}
              onClick={() => setFilter(st)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-colors touch-manipulation ${
                filter === st ? 'bg-amber-600 text-white shadow-sm' : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Empty State */}
      {filtered.length === 0 && (
        <div className="bg-white rounded-2xl border border-slate-100 p-12 text-center">
          <CheckCircle2 className="w-10 h-10 text-emerald-200 mx-auto mb-3" />
          <p className="text-sm font-semibold text-slate-400">No corrections in this category</p>
        </div>
      )}

      {/* Mobile Card List (< md) */}
      {filtered.length > 0 && (
        <div className="block md:hidden space-y-3">
          {filtered.map((item) => (
            <div key={item.id} className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-sm text-slate-900">{item.name}</h3>
                  <p className="text-xs text-slate-400 mt-0.5">{item.date} · {item.id}</p>
                </div>
                <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${statusColor(item.status)}`}>
                  {item.status}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 bg-slate-50 p-3 rounded-xl border border-slate-100">
                <div>
                  <div className="text-[9px] font-bold text-slate-400 uppercase mb-1">Original Punch</div>
                  <div className="text-xs font-mono font-semibold text-rose-600">{item.originalCheckIn}</div>
                </div>
                <div>
                  <div className="text-[9px] font-bold text-slate-400 uppercase mb-1">Requested Punch</div>
                  <div className="text-xs font-mono font-semibold text-emerald-600">{item.requestedCheckIn}</div>
                </div>
              </div>

              <div className="text-xs text-slate-500 italic bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                "{item.reason}"
              </div>

              {item.status === 'Pending' && (
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => handleAction(item, 'Approved')}
                    className="py-2.5 bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 transition-colors touch-manipulation"
                  >
                    <Check size={14} /> Approve
                  </button>
                  <button
                    onClick={() => handleAction(item, 'Rejected')}
                    className="py-2.5 border border-rose-200 hover:bg-rose-50 active:bg-rose-100 text-rose-600 font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 transition-colors touch-manipulation"
                  >
                    <X size={14} /> Reject
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Desktop Table (md+) */}
      {filtered.length > 0 && (
        <div className="hidden md:block bg-white rounded-2xl shadow-2xs border border-slate-200/80 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-slate-50/80 border-b border-slate-100">
                <tr className="text-xs text-slate-400 font-bold uppercase tracking-wider">
                  <th className="px-5 py-3.5">Team Member</th>
                  <th className="px-5 py-3.5">Date</th>
                  <th className="px-5 py-3.5">Original Log</th>
                  <th className="px-5 py-3.5">Requested Punch</th>
                  <th className="px-5 py-3.5">Justification</th>
                  <th className="px-5 py-3.5">Status</th>
                  <th className="px-5 py-3.5 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                {filtered.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50/60 transition-colors">
                    <td className="px-5 py-3.5 font-bold text-slate-900">{item.name}</td>
                    <td className="px-5 py-3.5 text-xs text-slate-500">{item.date}</td>
                    <td className="px-5 py-3.5 font-mono text-xs text-rose-600">{item.originalCheckIn}</td>
                    <td className="px-5 py-3.5 font-mono text-xs font-bold text-emerald-600">{item.requestedCheckIn}</td>
                    <td className="px-5 py-3.5 text-xs text-slate-600 max-w-xs truncate">{item.reason}</td>
                    <td className="px-5 py-3.5">
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${statusColor(item.status)}`}>
                        {item.status}
                      </span>
                    </td>
                    <td className="px-5 py-3.5 text-right">
                      {item.status === 'Pending' ? (
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => handleAction(item, 'Approved')}
                            className="px-2.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition-colors"
                          >
                            Approve
                          </button>
                          <button
                            onClick={() => handleAction(item, 'Rejected')}
                            className="px-2.5 py-1.5 rounded-lg border border-rose-200 text-rose-600 hover:bg-rose-50 font-bold text-xs transition-colors"
                          >
                            Reject
                          </button>
                        </div>
                      ) : (
                        <span className="text-xs text-slate-400 italic">Resolved</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
