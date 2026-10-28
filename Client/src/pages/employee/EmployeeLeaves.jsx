import React, { useState } from 'react';
import { CalendarRange, Plus, CheckCircle2, Clock, XCircle, X } from 'lucide-react';
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

  const statusColors = {
    Approved: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    Rejected: 'bg-rose-50 text-rose-700 border-rose-200',
    Pending: 'bg-amber-50 text-amber-700 border-amber-200',
  };

  return (
    <div className="space-y-4 sm:space-y-5 max-w-5xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            <CalendarRange className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600 shrink-0" />
            My Leave Requests
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Submit time off, check balances, and track approvals.
          </p>
        </div>

        <button
          onClick={() => setShowApplyModal(true)}
          className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white px-4 py-2.5 rounded-xl font-bold text-xs shadow-md shadow-blue-500/20 transition-all cursor-pointer touch-manipulation self-start sm:self-auto"
        >
          <Plus size={15} />
          <span>Apply for Leave</span>
        </button>
      </div>

      {/* Leave Quota Cards — horizontal scroll on mobile */}
      <div className="grid grid-cols-3 gap-2.5 sm:gap-4">
        <div className="bg-white rounded-2xl p-3.5 sm:p-4 border border-blue-100 shadow-2xs text-center sm:text-left">
          <div className="text-[10px] sm:text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Casual</div>
          <div className="text-xl sm:text-2xl font-black text-blue-600">{myProfile.leaveBalance?.casual || 7}</div>
          <div className="text-[10px] text-slate-400 mt-0.5 hidden sm:block">Days available</div>
        </div>
        <div className="bg-white rounded-2xl p-3.5 sm:p-4 border border-rose-100 shadow-2xs text-center sm:text-left">
          <div className="text-[10px] sm:text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Sick</div>
          <div className="text-xl sm:text-2xl font-black text-rose-600">{myProfile.leaveBalance?.sick || 9}</div>
          <div className="text-[10px] text-slate-400 mt-0.5 hidden sm:block">Days available</div>
        </div>
        <div className="bg-white rounded-2xl p-3.5 sm:p-4 border border-emerald-100 shadow-2xs text-center sm:text-left">
          <div className="text-[10px] sm:text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Annual</div>
          <div className="text-xl sm:text-2xl font-black text-emerald-600">{myProfile.leaveBalance?.annual || 12}</div>
          <div className="text-[10px] text-slate-400 mt-0.5 hidden sm:block">Days available</div>
        </div>
      </div>

      {/* Applications History */}
      <div className="bg-white rounded-2xl shadow-2xs border border-slate-200/80 overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between">
          <h2 className="text-sm font-bold text-slate-900">My Leave Applications</h2>
          <span className="text-xs text-slate-400">{myLeaves.length} records</span>
        </div>

        {myLeaves.length === 0 ? (
          <div className="py-12 text-center">
            <CalendarRange className="w-10 h-10 text-slate-200 mx-auto mb-3" />
            <p className="text-sm font-semibold text-slate-400">No leave applications yet</p>
            <p className="text-xs text-slate-300 mt-1">Tap "Apply for Leave" to submit a request</p>
          </div>
        ) : (
          <>
            {/* Mobile Cards */}
            <div className="block md:hidden divide-y divide-slate-100">
              {myLeaves.map((l) => (
                <div key={l.id} className="p-4 space-y-2.5">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="font-bold text-sm text-slate-900">{l.type}</div>
                      <div className="text-[10px] text-slate-400 mt-0.5">{l.fromDate} – {l.toDate}</div>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">
                        {l.days} Day{l.days > 1 ? 's' : ''}
                      </span>
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${statusColors[l.status] || statusColors.Pending}`}>
                        {l.status}
                      </span>
                    </div>
                  </div>

                  {l.reason && (
                    <div className="text-xs text-slate-500 bg-slate-50 p-2.5 rounded-xl border border-slate-100 italic leading-snug">
                      "{l.reason}"
                    </div>
                  )}

                  <div className="text-[10px] text-slate-400">
                    Applied: {l.appliedOn}
                  </div>
                </div>
              ))}
            </div>

            {/* Desktop Table */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="bg-slate-50/80 border-b border-slate-100 text-slate-400 font-bold uppercase tracking-wider text-xs">
                  <tr>
                    <th className="px-5 py-3.5">Leave Type</th>
                    <th className="px-5 py-3.5">Dates / Period</th>
                    <th className="px-5 py-3.5">Days</th>
                    <th className="px-5 py-3.5">Reason</th>
                    <th className="px-5 py-3.5">Applied</th>
                    <th className="px-5 py-3.5 text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                  {myLeaves.map((l) => (
                    <tr key={l.id} className="hover:bg-slate-50/60">
                      <td className="px-5 py-3.5 font-bold text-slate-900">{l.type}</td>
                      <td className="px-5 py-3.5 text-xs text-slate-600">{l.fromDate} – {l.toDate}</td>
                      <td className="px-5 py-3.5 font-bold text-blue-600">{l.days} Day(s)</td>
                      <td className="px-5 py-3.5 text-xs text-slate-500 max-w-xs truncate">{l.reason}</td>
                      <td className="px-5 py-3.5 text-xs text-slate-400">{l.appliedOn}</td>
                      <td className="px-5 py-3.5 text-right">
                        <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold border ${statusColors[l.status] || statusColors.Pending}`}>
                          {l.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>

      {/* Apply Leave Modal — Bottom sheet on mobile, centered on desktop */}
      {showApplyModal && (
        <div className="fixed inset-0 z-50 flex flex-col justify-end sm:items-center sm:justify-center p-0 sm:p-4 bg-slate-950/40 backdrop-blur-sm">
          {/* Tap outside to close */}
          <div className="absolute inset-0" onClick={() => setShowApplyModal(false)} />

          <div className="relative bg-white rounded-t-[2rem] sm:rounded-3xl p-5 sm:p-7 w-full sm:max-w-md shadow-2xl border border-slate-200 z-10 max-h-[90vh] overflow-y-auto">
            {/* Handle bar — mobile only */}
            <div className="w-10 h-1.5 bg-slate-200 rounded-full mx-auto mb-4 sm:hidden" />

            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
              <div>
                <h3 className="text-base font-black text-slate-900">Request Time Off</h3>
                <p className="text-xs text-slate-500 mt-0.5">Routed to Marcus Sterling for approval</p>
              </div>
              <button
                onClick={() => setShowApplyModal(false)}
                className="p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors touch-manipulation"
                aria-label="Close"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleApply} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">Leave Category</label>
                <select
                  value={formData.type}
                  onChange={e => setFormData({ ...formData, type: e.target.value })}
                  className="w-full px-3.5 py-3 rounded-xl border border-slate-200 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
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
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">From Date *</label>
                  <input
                    type="date"
                    required
                    value={formData.fromDate}
                    onChange={e => setFormData({ ...formData, fromDate: e.target.value })}
                    className="w-full px-3.5 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">To Date *</label>
                  <input
                    type="date"
                    required
                    value={formData.toDate}
                    onChange={e => setFormData({ ...formData, toDate: e.target.value })}
                    className="w-full px-3.5 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">Number of Days</label>
                <input
                  type="number"
                  min="1"
                  max="30"
                  value={formData.days}
                  onChange={e => setFormData({ ...formData, days: parseInt(e.target.value) || 1 })}
                  className="w-full px-3.5 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">Reason for Absence *</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Provide reason for time off request..."
                  value={formData.reason}
                  onChange={e => setFormData({ ...formData, reason: e.target.value })}
                  className="w-full p-3.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                />
              </div>

              <div className="flex gap-3 pt-1">
                <button
                  type="button"
                  onClick={() => setShowApplyModal(false)}
                  className="flex-1 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-sm transition-colors touch-manipulation"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-bold text-sm shadow-md shadow-blue-500/20 transition-colors touch-manipulation"
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
