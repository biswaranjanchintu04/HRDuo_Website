import React, { useState } from 'react';
import { CalendarRange, Plus, CheckCircle2, Clock, XCircle, AlertCircle, Calendar, X } from 'lucide-react';
import { useHRMS } from '../../context/HRMSContext';
import { useAlert } from '../../context/AlertContext';

export default function EmployeeLeaves() {
  const { leaves, applyLeave, employees } = useHRMS();
  const { showToast } = useAlert();

  const myProfile = employees.find(e => e.id === 'EMP001') || { name: 'Sophia Chen', leaveBalance: { total: 28, casual: 7, sick: 9, annual: 12 } };
  const myLeaves = leaves.filter(l => l.empId === 'EMP001' || l.name === 'Sophia Chen');

  const [showApplyModal, setShowApplyModal] = useState(false);
  const [formData, setFormData] = useState({
    type: 'Casual Leave',
    fromDate: '',
    toDate: '',
    days: 1,
    reason: ''
  });

  const handleApply = (e) => {
    e.preventDefault();
    if (!formData.fromDate || !formData.toDate || !formData.reason) {
      showToast('Please fill out all fields', 'error');
      return;
    }

    applyLeave({
      empId: 'EMP001',
      name: myProfile.name,
      role: myProfile.role || 'Senior Full Stack Engineer',
      department: myProfile.department || 'Engineering',
      avatar: myProfile.avatar,
      type: formData.type,
      fromDate: formData.fromDate,
      toDate: formData.toDate,
      days: formData.days,
      reason: formData.reason
    });

    showToast('Leave request submitted to Marcus Sterling for approval!', 'success');
    setShowApplyModal(false);
    setFormData({ type: 'Casual Leave', fromDate: '', toDate: '', days: 1, reason: '' });
  };

  return (
    <div className="space-y-6 max-w-5xl">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">My Leave Requests & Time Off</h1>
          <p className="text-sm text-slate-500 mt-1">
            Submit time off requests, check balances, and track approval status from your manager.
          </p>
        </div>

        <button
          onClick={() => setShowApplyModal(true)}
          className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-xl font-bold text-xs shadow-md shadow-blue-500/20 transition-all cursor-pointer"
        >
          <Plus size={14} />
          <span>Apply for Leave</span>
        </button>
      </div>

      {/* Quotas Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-2xs">
          <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Casual Leave Quota</div>
          <div className="text-2xl font-black text-blue-600">{myProfile.leaveBalance?.casual || 7} Days</div>
          <div className="text-[11px] text-slate-400 mt-0.5">Available balance</div>
        </div>
        <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-2xs">
          <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Sick Leave Quota</div>
          <div className="text-2xl font-black text-rose-600">{myProfile.leaveBalance?.sick || 9} Days</div>
          <div className="text-[11px] text-slate-400 mt-0.5">Available balance</div>
        </div>
        <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-2xs">
          <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Annual Vacation</div>
          <div className="text-2xl font-black text-emerald-600">{myProfile.leaveBalance?.annual || 12} Days</div>
          <div className="text-[11px] text-slate-400 mt-0.5">Available balance</div>
        </div>
      </div>

      {/* Leave Application History Table */}
      <div className="bg-white rounded-2xl shadow-2xs border border-slate-200/80 overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between">
          <h2 className="text-base font-bold text-slate-900">My Leave Applications</h2>
          <span className="text-xs text-slate-400">{myLeaves.length} records</span>
        </div>

        {/* Mobile View: Touch-friendly cards (< md) */}
        <div className="block md:hidden divide-y divide-slate-100">
          {myLeaves.map((l) => (
            <div key={l.id} className="p-4 space-y-2.5">
              <div className="flex items-center justify-between">
                <div>
                  <span className="font-bold text-sm text-slate-900">{l.type}</span>
                  <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full ml-2">
                    {l.days} Day{l.days > 1 ? 's' : ''}
                  </span>
                </div>
                <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                  l.status === 'Approved' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' :
                  l.status === 'Rejected' ? 'bg-rose-50 text-rose-700 border border-rose-200' :
                  'bg-amber-50 text-amber-700 border border-amber-200'
                }`}>
                  {l.status}
                </span>
              </div>

              <div className="text-xs text-slate-600 flex items-center justify-between">
                <span className="font-semibold text-slate-500">Period:</span>
                <span className="font-bold text-slate-800">{l.fromDate} – {l.toDate}</span>
              </div>

              {l.reason && (
                <div className="text-xs text-slate-500 bg-slate-50 p-2.5 rounded-xl border border-slate-100 italic">
                  "{l.reason}"
                </div>
              )}

              <div className="text-[10px] text-slate-400 text-right">
                Applied on: {l.appliedOn}
              </div>
            </div>
          ))}
        </div>

        {/* Desktop View: Full Table (md+) */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-slate-50/80 border-b border-slate-100 text-slate-400 font-bold uppercase tracking-wider text-xs">
              <tr>
                <th className="px-5 py-3.5">Leave Type</th>
                <th className="px-5 py-3.5">Dates / Period</th>
                <th className="px-5 py-3.5">Days</th>
                <th className="px-5 py-3.5">Reason</th>
                <th className="px-5 py-3.5">Applied Date</th>
                <th className="px-5 py-3.5 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
              {myLeaves.map((l) => (
                <tr key={l.id} className="hover:bg-slate-50/60">
                  <td className="px-5 py-3.5 font-bold text-slate-900">{l.type}</td>
                  <td className="px-5 py-3.5 text-xs text-slate-600">{l.fromDate} – {l.toDate}</td>
                  <td className="px-5 py-3.5 font-bold text-blue-600">{l.days} Day(s)</td>
                  <td className="px-5 py-3.5 text-xs text-slate-500 max-w-xs">{l.reason}</td>
                  <td className="px-5 py-3.5 text-xs text-slate-400">{l.appliedOn}</td>
                  <td className="px-5 py-3.5 text-right">
                    <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold ${
                      l.status === 'Approved' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' :
                      l.status === 'Rejected' ? 'bg-rose-50 text-rose-700 border border-rose-200' :
                      'bg-amber-50 text-amber-700 border border-amber-200'
                    }`}>
                      {l.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Apply Modal */}
      {showApplyModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/40 backdrop-blur-xs">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
              <div>
                <h3 className="text-base font-black text-slate-900">Request Time Off</h3>
                <p className="text-xs text-slate-500">Will be routed to Marcus Sterling for signoff</p>
              </div>
              <button
                onClick={() => setShowApplyModal(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleApply} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Leave Category</label>
                <select
                  value={formData.type}
                  onChange={e => setFormData({ ...formData, type: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 font-semibold focus:outline-none"
                >
                  <option>Casual Leave</option>
                  <option>Sick Leave</option>
                  <option>Annual Vacation</option>
                  <option>Compensatory Off</option>
                  <option>Unpaid Sabbatical</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">From Date *</label>
                  <input
                    type="date"
                    required
                    value={formData.fromDate}
                    onChange={e => setFormData({ ...formData, fromDate: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">To Date *</label>
                  <input
                    type="date"
                    required
                    value={formData.toDate}
                    onChange={e => setFormData({ ...formData, toDate: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Number of Days</label>
                <input
                  type="number"
                  min="1"
                  max="30"
                  value={formData.days}
                  onChange={e => setFormData({ ...formData, days: parseInt(e.target.value) || 1 })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Reason for Absence *</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Provide reason for time off request..."
                  value={formData.reason}
                  onChange={e => setFormData({ ...formData, reason: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="pt-2 flex gap-2">
                <button
                  type="button"
                  onClick={() => setShowApplyModal(false)}
                  className="flex-1 py-2.5 rounded-xl bg-slate-100 text-slate-700 font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold shadow-md shadow-blue-500/20"
                >
                  Submit Request
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
