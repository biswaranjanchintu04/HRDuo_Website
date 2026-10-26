import React, { useState } from 'react';
import { CalendarRange, Plus, CheckCircle2, Clock, XCircle, AlertCircle, Calendar, X } from 'lucide-react';

const initialLeaveRequests = [
  { id: 1, type: 'Casual Leave', from: 'Nov 12, 2026', to: 'Nov 13, 2026', days: 2, reason: 'Family function in hometown', status: 'Pending', appliedOn: 'Oct 25' },
  { id: 2, type: 'Sick Leave', from: 'Oct 19, 2026', to: 'Oct 19, 2026', days: 1, reason: 'Viral fever and doctor consultation', status: 'Approved', appliedOn: 'Oct 18' },
  { id: 3, type: 'Paid Vacation', from: 'Sep 04, 2026', to: 'Sep 08, 2026', days: 5, reason: 'Annual travel vacation', status: 'Approved', appliedOn: 'Aug 20' },
  { id: 4, type: 'Casual Leave', from: 'Jul 15, 2026', to: 'Jul 15, 2026', days: 1, reason: 'Personal errands', status: 'Rejected', appliedOn: 'Jul 12' },
];

export default function EmployeeLeaves() {
  const [leaves, setLeaves] = useState(initialLeaveRequests);
  const [showApplyModal, setShowApplyModal] = useState(false);
  const [formData, setFormData] = useState({
    type: 'Casual Leave',
    from: '',
    to: '',
    reason: '',
  });

  const handleApply = (e) => {
    e.preventDefault();
    if (!formData.from || !formData.to || !formData.reason) return;

    const newReq = {
      id: Date.now(),
      type: formData.type,
      from: formData.from,
      to: formData.to,
      days: 2,
      reason: formData.reason,
      status: 'Pending',
      appliedOn: 'Today',
    };

    setLeaves([newReq, ...leaves]);
    setShowApplyModal(false);
    setFormData({ type: 'Casual Leave', from: '', to: '', reason: '' });
  };

  return (
    <div className="space-y-4 sm:space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            <CalendarRange className="w-6 h-6 sm:w-7 h-7 text-emerald-600" />
            My Leaves & Time Off
          </h1>
          <p className="text-slate-500 text-xs sm:text-sm mt-0.5">
            Check your remaining leave quota, apply for new leaves, and track approval status.
          </p>
        </div>

        <button
          onClick={() => setShowApplyModal(true)}
          className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm rounded-xl flex items-center justify-center gap-2 shadow-sm transition-all self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          Apply New Leave
        </button>
      </div>

      {/* Leave Balances Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 sm:gap-5">
        <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-100 shadow-sm relative overflow-hidden">
          <div className="text-[11px] sm:text-xs font-bold text-slate-400 uppercase tracking-wider">Casual Leave</div>
          <div className="text-2xl sm:text-3xl font-black text-slate-900 mt-1.5">
            4.5 <span className="text-xs sm:text-sm font-semibold text-slate-400">/ 12 days</span>
          </div>
          <p className="text-[11px] sm:text-xs text-slate-500 mt-1">Personal urgent commitments</p>
          <div className="w-full bg-slate-100 rounded-full h-2 mt-3.5 overflow-hidden">
            <div className="bg-emerald-500 h-2 rounded-full" style={{ width: '38%' }} />
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-100 shadow-sm relative overflow-hidden">
          <div className="text-[11px] sm:text-xs font-bold text-slate-400 uppercase tracking-wider">Sick / Medical Leave</div>
          <div className="text-2xl sm:text-3xl font-black text-slate-900 mt-1.5">
            4.0 <span className="text-xs sm:text-sm font-semibold text-slate-400">/ 8 days</span>
          </div>
          <p className="text-[11px] sm:text-xs text-slate-500 mt-1">Medical emergencies & sickness</p>
          <div className="w-full bg-slate-100 rounded-full h-2 mt-3.5 overflow-hidden">
            <div className="bg-blue-500 h-2 rounded-full" style={{ width: '50%' }} />
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-100 shadow-sm relative overflow-hidden">
          <div className="text-[11px] sm:text-xs font-bold text-slate-400 uppercase tracking-wider">Paid Vacation / Earned</div>
          <div className="text-2xl sm:text-3xl font-black text-slate-900 mt-1.5">
            6.0 <span className="text-xs sm:text-sm font-semibold text-slate-400">/ 10 days</span>
          </div>
          <p className="text-[11px] sm:text-xs text-slate-500 mt-1">Carried forward vacation quota</p>
          <div className="w-full bg-slate-100 rounded-full h-2 mt-3.5 overflow-hidden">
            <div className="bg-violet-500 h-2 rounded-full" style={{ width: '60%' }} />
          </div>
        </div>
      </div>

      {/* Leave History: Mobile Card Feed (visible on < md) */}
      <div className="block md:hidden space-y-3">
        <h2 className="text-sm font-bold text-slate-900 px-1">Application History ({leaves.length})</h2>
        {leaves.map((l) => (
          <div key={l.id} className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-900 text-sm">{l.type}</span>
              <span
                className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                  l.status === 'Approved'
                    ? 'bg-emerald-100 text-emerald-800'
                    : l.status === 'Rejected'
                    ? 'bg-rose-100 text-rose-800'
                    : 'bg-amber-100 text-amber-800'
                }`}
              >
                {l.status === 'Approved' && <CheckCircle2 className="w-3 h-3" />}
                {l.status === 'Rejected' && <XCircle className="w-3 h-3" />}
                {l.status === 'Pending' && <Clock className="w-3 h-3" />}
                {l.status}
              </span>
            </div>

            <div className="text-xs text-slate-600 flex items-center justify-between pt-1">
              <span>Period: <strong className="text-slate-800">{l.from} → {l.to}</strong></span>
              <span className="font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">{l.days} days</span>
            </div>

            <p className="text-xs text-slate-500 italic bg-slate-50 p-2.5 rounded-xl border border-slate-100">
              "{l.reason}"
            </p>

            <div className="text-[10px] text-slate-400 text-right">
              Applied on {l.appliedOn}
            </div>
          </div>
        ))}
      </div>

      {/* Leave History: Desktop Table (hidden on mobile, visible on md+) */}
      <div className="hidden md:block bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <h2 className="text-base font-bold text-slate-900">Application History</h2>
          <span className="text-xs text-slate-500">{leaves.length} Total Requests</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="bg-slate-50/70 border-b border-slate-100 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                <th className="py-3 px-5">Leave Type</th>
                <th className="py-3 px-4">Period</th>
                <th className="py-3 px-4">Duration</th>
                <th className="py-3 px-4">Reason</th>
                <th className="py-3 px-4">Applied Date</th>
                <th className="py-3 px-5 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {leaves.map((l) => (
                <tr key={l.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-4 px-5 font-bold text-slate-900">{l.type}</td>
                  <td className="py-4 px-4 text-slate-600">
                    {l.from} → {l.to}
                  </td>
                  <td className="py-4 px-4 font-semibold text-slate-800">{l.days} {l.days === 1 ? 'day' : 'days'}</td>
                  <td className="py-4 px-4 text-slate-500 max-w-xs truncate">{l.reason}</td>
                  <td className="py-4 px-4 text-xs text-slate-400">{l.appliedOn}</td>
                  <td className="py-4 px-5 text-right">
                    <span
                      className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold ${
                        l.status === 'Approved'
                          ? 'bg-emerald-100 text-emerald-800'
                          : l.status === 'Rejected'
                          ? 'bg-rose-100 text-rose-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {l.status === 'Approved' && <CheckCircle2 className="w-3.5 h-3.5" />}
                      {l.status === 'Rejected' && <XCircle className="w-3.5 h-3.5" />}
                      {l.status === 'Pending' && <Clock className="w-3.5 h-3.5" />}
                      {l.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Apply Leave Modal */}
      {showApplyModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div className="bg-white rounded-t-3xl sm:rounded-3xl max-w-lg w-full p-5 sm:p-6 shadow-2xl animate-in fade-in zoom-in-95 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-1">
              <h3 className="text-lg sm:text-xl font-black text-slate-900">Apply for Time Off</h3>
              <button onClick={() => setShowApplyModal(false)} className="p-1 text-slate-400 hover:text-slate-600 rounded-lg">
                <X size={20} />
              </button>
            </div>
            <p className="text-xs text-slate-500 mb-4 sm:mb-5">
              Submit your request directly to manager Alex Thompson.
            </p>

            <form onSubmit={handleApply} className="space-y-3.5 sm:space-y-4">
              <div>
                <label className="block text-[11px] sm:text-xs font-bold text-slate-700 uppercase mb-1">Leave Type</label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:border-emerald-500 focus:outline-none bg-slate-50/50"
                >
                  <option>Casual Leave</option>
                  <option>Sick Leave</option>
                  <option>Paid Vacation / Earned Leave</option>
                  <option>Maternity / Paternity</option>
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] sm:text-xs font-bold text-slate-700 uppercase mb-1">From Date</label>
                  <input
                    type="date"
                    required
                    value={formData.from}
                    onChange={(e) => setFormData({ ...formData, from: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs sm:text-sm focus:border-emerald-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[11px] sm:text-xs font-bold text-slate-700 uppercase mb-1">To Date</label>
                  <input
                    type="date"
                    required
                    value={formData.to}
                    onChange={(e) => setFormData({ ...formData, to: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs sm:text-sm focus:border-emerald-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] sm:text-xs font-bold text-slate-700 uppercase mb-1">Reason for Absence</label>
                <textarea
                  rows="3"
                  required
                  placeholder="Please state the reason for leave..."
                  value={formData.reason}
                  onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:border-emerald-500 focus:outline-none"
                />
              </div>

              <div className="flex items-center justify-end gap-2.5 pt-3">
                <button
                  type="button"
                  onClick={() => setShowApplyModal(false)}
                  className="px-4 py-2 text-xs sm:text-sm font-bold text-slate-600 hover:bg-slate-100 rounded-xl transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm rounded-xl shadow-sm transition-all"
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
