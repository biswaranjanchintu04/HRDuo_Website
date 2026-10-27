import React, { useState } from 'react';
import { ClockAlert, CheckCircle2, XCircle, Search, Clock, Check, X } from 'lucide-react';
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

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">Attendance Punch Corrections</h1>
          <p className="text-sm text-slate-500 mt-1">
            Review missing punch-in requests, badge reader exceptions, and timestamp adjustments.
          </p>
        </div>
        <div className="flex items-center gap-1.5">
          {['All', 'Pending', 'Approved', 'Rejected'].map(st => (
            <button
              key={st}
              onClick={() => setFilter(st)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                filter === st ? 'bg-blue-600 text-white shadow-xs' : 'bg-white border border-slate-200 text-slate-600'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-2xs border border-slate-200/80 overflow-hidden">
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
                  <td className="px-5 py-3.5 text-xs text-slate-600 max-w-xs">{item.reason}</td>
                  <td className="px-5 py-3.5">
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                      item.status === 'Approved' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' :
                      item.status === 'Rejected' ? 'bg-rose-50 text-rose-700 border border-rose-200' :
                      'bg-amber-50 text-amber-700 border border-amber-200'
                    }`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="px-5 py-3.5 text-right">
                    {item.status === 'Pending' ? (
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => handleAction(item, 'Approved')}
                          className="px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => handleAction(item, 'Rejected')}
                          className="px-2.5 py-1 rounded-lg border border-rose-200 text-rose-600 hover:bg-rose-50 font-bold text-xs"
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
    </div>
  );
}
