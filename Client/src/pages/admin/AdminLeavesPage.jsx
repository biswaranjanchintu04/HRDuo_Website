import React, { useState } from 'react';
import { 
  CalendarRange, CheckCircle2, XCircle, Clock, Filter, 
  Search, Check, X, User, AlertCircle, FileText 
} from 'lucide-react';
import { useHRMS } from '../../context/HRMSContext';
import { useAlert } from '../../context/AlertContext';

export default function AdminLeavesPage() {
  const { leaves, updateLeaveStatus } = useHRMS();
  const { showToast, showConfirm } = useAlert();

  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');

  const filtered = leaves.filter(l => {
    const matchesFilter = filter === 'All' || l.status === filter;
    const matchesSearch = l.name.toLowerCase().includes(search.toLowerCase()) ||
      l.type.toLowerCase().includes(search.toLowerCase()) ||
      l.department.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const pendingCount = leaves.filter(l => l.status === 'Pending').length;
  const approvedCount = leaves.filter(l => l.status === 'Approved').length;
  const rejectedCount = leaves.filter(l => l.status === 'Rejected').length;

  const handleApprove = async (leave) => {
    const confirmed = await showConfirm(`Approve ${leave.days} day(s) ${leave.type} for ${leave.name}?`);
    if (confirmed) {
      updateLeaveStatus(leave.id, 'Approved');
      showToast(`Leave application #${leave.id} approved!`, 'success');
    }
  };

  const handleReject = async (leave) => {
    const confirmed = await showConfirm(`Decline leave request for ${leave.name}?`);
    if (confirmed) {
      updateLeaveStatus(leave.id, 'Rejected');
      showToast(`Leave application #${leave.id} rejected.`, 'info');
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">Workforce Leave Approvals & Policy</h1>
          <p className="text-sm text-slate-500 mt-1">
            Review time-off applications, statutory leave quotas, and supervisor authorizations.
          </p>
        </div>
        <div className="flex items-center gap-1.5 flex-wrap">
          {['All', 'Pending', 'Approved', 'Rejected'].map(st => (
            <button
              key={st}
              onClick={() => setFilter(st)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                filter === st
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-2xs flex items-center justify-between">
          <div>
            <div className="text-2xl font-black text-amber-600">{pendingCount}</div>
            <div className="text-xs font-bold text-slate-600 mt-0.5">Pending Approvals</div>
          </div>
          <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
            <Clock size={20} />
          </div>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-2xs flex items-center justify-between">
          <div>
            <div className="text-2xl font-black text-emerald-600">{approvedCount}</div>
            <div className="text-xs font-bold text-slate-600 mt-0.5">Approved Time-Off</div>
          </div>
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <CheckCircle2 size={20} />
          </div>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-2xs flex items-center justify-between">
          <div>
            <div className="text-2xl font-black text-rose-600">{rejectedCount}</div>
            <div className="text-xs font-bold text-slate-600 mt-0.5">Rejected Applications</div>
          </div>
          <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center">
            <XCircle size={20} />
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
                <th className="px-5 py-3.5">Leave Type</th>
                <th className="px-5 py-3.5">Duration Window</th>
                <th className="px-5 py-3.5">Days</th>
                <th className="px-5 py-3.5">Reason / Justification</th>
                <th className="px-5 py-3.5">Status</th>
                <th className="px-5 py-3.5 text-right">Approval Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
              {filtered.map((leave) => (
                <tr key={leave.id} className="hover:bg-slate-50/60 transition-colors">
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-3">
                      <img src={leave.avatar} alt={leave.name} className="w-9 h-9 rounded-full object-cover shrink-0" />
                      <div>
                        <div className="font-bold text-slate-900">{leave.name}</div>
                        <div className="text-[11px] text-slate-400">{leave.department}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-3.5 font-semibold text-slate-800 text-xs">
                    <span className="px-2.5 py-0.5 rounded-md bg-blue-50 text-blue-700 font-bold">
                      {leave.type}
                    </span>
                  </td>
                  <td className="px-5 py-3.5 text-xs text-slate-600">
                    {leave.fromDate} – {leave.toDate}
                  </td>
                  <td className="px-5 py-3.5 font-bold text-slate-900">{leave.days} Day(s)</td>
                  <td className="px-5 py-3.5 text-xs text-slate-500 max-w-xs truncate" title={leave.reason}>
                    {leave.reason}
                  </td>
                  <td className="px-5 py-3.5">
                    <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold ${
                      leave.status === 'Approved' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' :
                      leave.status === 'Rejected' ? 'bg-rose-50 text-rose-700 border border-rose-200' :
                      'bg-amber-50 text-amber-700 border border-amber-200'
                    }`}>
                      {leave.status}
                    </span>
                  </td>
                  <td className="px-5 py-3.5 text-right">
                    {leave.status === 'Pending' ? (
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => handleApprove(leave)}
                          className="px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition-colors cursor-pointer"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => handleReject(leave)}
                          className="px-2.5 py-1 rounded-lg border border-rose-200 hover:bg-rose-50 text-rose-600 font-bold text-xs transition-colors cursor-pointer"
                        >
                          Reject
                        </button>
                      </div>
                    ) : (
                      <span className="text-xs text-slate-400 font-medium italic">
                        Resolved by {leave.approver}
                      </span>
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
