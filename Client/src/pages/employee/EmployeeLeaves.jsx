import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { CalendarRange, Plus, CheckCircle2, Clock, XCircle, X, User, Building2, ArrowRight, ShieldCheck } from 'lucide-react';
import { useHRMS } from '../../context/HRMSContext';
import { useAlert } from '../../context/AlertContext';

// ─── Two-Step Approval Stepper ────────────────────────────────────────────────
function ApprovalStepper({ status }) {
  // Derive step states from leave status
  const stepConfig = (() => {
    switch (status) {
      case 'Pending':
      case 'Pending Manager':
        return {
          manager: 'pending',
          hr: 'waiting',
          label: 'Step 1 · Awaiting Manager',
          labelColor: 'text-amber-600',
        };
      case 'Manager Approved':
      case 'Approved':
      case 'Pending HR':
        return {
          manager: 'approved',
          hr: 'pending',
          label: 'Step 2 · Awaiting HR',
          labelColor: 'text-blue-600',
        };
      case 'HR Approved':
      case 'Fully Approved':
        return {
          manager: 'approved',
          hr: 'approved',
          label: 'Fully Approved ✓',
          labelColor: 'text-emerald-600',
        };
      case 'Rejected':
        return {
          manager: 'rejected',
          hr: 'waiting',
          label: 'Rejected',
          labelColor: 'text-rose-600',
        };
      default:
        return {
          manager: 'pending',
          hr: 'waiting',
          label: 'Awaiting Approval',
          labelColor: 'text-slate-500',
        };
    }
  })();

  const stepStyle = (state) => {
    switch (state) {
      case 'approved':
        return {
          bubble: 'bg-emerald-500 border-emerald-500 text-white shadow-emerald-200',
          dot: 'bg-emerald-500',
          text: 'text-emerald-600 font-bold',
          badge: 'bg-emerald-50 text-emerald-700 border-emerald-200',
          badgeText: 'Approved',
        };
      case 'pending':
        return {
          bubble: 'bg-amber-400 border-amber-400 text-white shadow-amber-200',
          dot: 'bg-amber-400',
          text: 'text-amber-600 font-bold',
          badge: 'bg-amber-50 text-amber-700 border-amber-200',
          badgeText: 'Pending',
        };
      case 'rejected':
        return {
          bubble: 'bg-rose-500 border-rose-500 text-white shadow-rose-200',
          dot: 'bg-rose-500',
          text: 'text-rose-600 font-bold',
          badge: 'bg-rose-50 text-rose-700 border-rose-200',
          badgeText: 'Rejected',
        };
      case 'waiting':
      default:
        return {
          bubble: 'bg-slate-100 border-slate-200 text-slate-400 shadow-slate-100',
          dot: 'bg-slate-300',
          text: 'text-slate-400 font-medium',
          badge: 'bg-slate-50 text-slate-400 border-slate-200',
          badgeText: 'Waiting',
        };
    }
  };

  const mgr = stepStyle(stepConfig.manager);
  const hr  = stepStyle(stepConfig.hr);

  const lineColor =
    stepConfig.manager === 'approved'
      ? 'bg-emerald-400'
      : 'bg-slate-200';

  return (
    <div className="flex flex-col gap-1 min-w-[180px]">
      {/* Step label */}
      <span className={`text-[10px] font-black uppercase tracking-wide ${stepConfig.labelColor} mb-0.5`}>
        {stepConfig.label}
      </span>

      {/* Stepper row */}
      <div className="flex items-center gap-0">
        {/* Step 1 — Manager */}
        <div className="flex flex-col items-center gap-1">
          <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center shadow-md ${mgr.bubble}`}>
            <User size={14} />
          </div>
          <div className="text-center">
            <div className={`text-[9px] leading-tight ${mgr.text}`}>Marcus</div>
            <div className={`text-[8px] leading-tight ${mgr.text} opacity-80`}>Manager</div>
          </div>
          <span className={`text-[8px] font-bold px-1.5 py-0.5 rounded-full border ${mgr.badge}`}>
            {mgr.badgeText}
          </span>
        </div>

        {/* Connector line */}
        <div className="flex flex-col items-center gap-1 pb-9 mx-1">
          <div className={`h-0.5 w-8 rounded-full ${lineColor}`} />
        </div>

        {/* Step 2 — HR */}
        <div className="flex flex-col items-center gap-1">
          <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center shadow-md ${hr.bubble}`}>
            <Building2 size={14} />
          </div>
          <div className="text-center">
            <div className={`text-[9px] leading-tight ${hr.text}`}>HR Dept.</div>
            <div className={`text-[8px] leading-tight ${hr.text} opacity-80`}>HR Team</div>
          </div>
          <span className={`text-[8px] font-bold px-1.5 py-0.5 rounded-full border ${hr.badge}`}>
            {hr.badgeText}
          </span>
        </div>
      </div>
    </div>
  );
}

// ─── Compact inline stepper for desktop table ────────────────────────────────
function ApprovalStepperCompact({ status }) {
  const stepConfig = (() => {
    switch (status) {
      case 'Pending':
      case 'Pending Manager':
        return { manager: 'pending', hr: 'waiting', label: 'Step 1: Manager', color: 'text-amber-600 bg-amber-50 border-amber-200' };
      case 'Manager Approved':
      case 'Approved':
      case 'Pending HR':
        return { manager: 'approved', hr: 'pending', label: 'Step 2: HR Review', color: 'text-blue-600 bg-blue-50 border-blue-200' };
      case 'HR Approved':
      case 'Fully Approved':
        return { manager: 'approved', hr: 'approved', label: 'Fully Approved', color: 'text-emerald-600 bg-emerald-50 border-emerald-200' };
      case 'Rejected':
        return { manager: 'rejected', hr: 'waiting', label: 'Rejected', color: 'text-rose-600 bg-rose-50 border-rose-200' };
      default:
        return { manager: 'pending', hr: 'waiting', label: 'Pending', color: 'text-slate-500 bg-slate-50 border-slate-200' };
    }
  })();

  const dot = (state) => {
    if (state === 'approved') return 'bg-emerald-500';
    if (state === 'pending')  return 'bg-amber-400 animate-pulse';
    if (state === 'rejected') return 'bg-rose-500';
    return 'bg-slate-200';
  };

  const lineColor = stepConfig.manager === 'approved' ? 'bg-emerald-400' : 'bg-slate-200';

  return (
    <div className="flex items-center justify-end gap-2">
      {/* Mini stepper dots */}
      <div className="flex items-center gap-1">
        {/* Step 1 bubble */}
        <div className={`w-5 h-5 rounded-full flex items-center justify-center ${dot(stepConfig.manager)}`}>
          <User size={9} className="text-white" />
        </div>
        {/* Line */}
        <div className={`h-0.5 w-4 rounded-full ${lineColor}`} />
        {/* Step 2 bubble */}
        <div className={`w-5 h-5 rounded-full flex items-center justify-center ${dot(stepConfig.hr)}`}>
          <Building2 size={9} className="text-white" />
        </div>
      </div>
      {/* Label badge */}
      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${stepConfig.color}`}>
        {stepConfig.label}
      </span>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
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
      reason: formData.reason,
      status: 'Pending Manager',
    });

    showToast('Leave request submitted — routed to Manager → HR for two-step approval!', 'success');
    setShowApplyModal(false);
    setFormData({ type: 'Casual Leave', fromDate: '', toDate: '', days: 1, reason: '' });
  };

  // Extended status colors (kept for any fallback badge rendering)
  const statusColors = {
    Approved:         'bg-emerald-50 text-emerald-700 border-emerald-200',
    'Fully Approved': 'bg-emerald-50 text-emerald-700 border-emerald-200',
    'HR Approved':    'bg-emerald-50 text-emerald-700 border-emerald-200',
    'Manager Approved':'bg-blue-50 text-blue-700 border-blue-200',
    'Pending HR':     'bg-blue-50 text-blue-700 border-blue-200',
    Rejected:         'bg-rose-50 text-rose-700 border-rose-200',
    Pending:          'bg-amber-50 text-amber-700 border-amber-200',
    'Pending Manager':'bg-amber-50 text-amber-700 border-amber-200',
  };

  return (
    <div className="space-y-4 sm:space-y-5 max-w-5xl font-poppins">

      {/* ── Hero Header ── */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-emerald-500 via-teal-600 to-cyan-700 p-5 sm:p-6 shadow-xl shadow-emerald-200/60">
        <div className="absolute -top-8 -right-8 w-44 h-44 rounded-full bg-white/10 blur-2xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-32 h-32 rounded-full bg-teal-400/20 blur-2xl pointer-events-none" />
        <div className="relative flex items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <div className="w-8 h-8 rounded-xl bg-white/15 backdrop-blur flex items-center justify-center">
                <CalendarRange size={16} className="text-white" />
              </div>
              <span className="text-[11px] font-bold uppercase tracking-widest text-emerald-100">Leave Management</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight leading-tight">My Leave Requests</h1>
            <p className="text-xs text-emerald-100 mt-1 leading-snug">Submit time off & track two-step approvals</p>
          </div>
          <button
            onClick={() => setShowApplyModal(true)}
            className="shrink-0 inline-flex items-center gap-1.5 bg-white/20 backdrop-blur hover:bg-white/30 active:bg-white/40 text-white px-4 py-2.5 rounded-2xl font-bold text-xs shadow-md transition-all cursor-pointer touch-manipulation border border-white/30"
          >
            <Plus size={14} />
            <span>Apply Leave</span>
          </button>
        </div>
      </div>

      {/* Approval Flow Info Banner */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 rounded-2xl px-4 py-3 flex items-center gap-3">
        <ShieldCheck className="w-5 h-5 text-blue-500 shrink-0" />
        <div className="flex items-center gap-2 flex-wrap text-xs font-semibold text-slate-600">
          <span className="text-slate-500">Leave Approval Flow:</span>
          <span className="flex items-center gap-1 bg-white border border-amber-200 text-amber-700 px-2 py-0.5 rounded-full">
            <User size={10} /> Manager · Marcus Sterling
          </span>
          <ArrowRight size={12} className="text-slate-400" />
          <span className="flex items-center gap-1 bg-white border border-blue-200 text-blue-700 px-2 py-0.5 rounded-full">
            <Building2 size={10} /> HR Department
          </span>
        </div>
      </div>

      {/* Leave Quota Cards */}
      <div className="grid grid-cols-3 gap-2.5 sm:gap-4">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-3.5 sm:p-4 shadow-md shadow-blue-200/50 text-center">
          <div className="text-[10px] sm:text-xs font-bold text-blue-100 uppercase tracking-wider mb-1">Casual</div>
          <div className="text-2xl sm:text-3xl font-black text-white">{myProfile.leaveBalance?.casual || 7}</div>
          <div className="text-[10px] text-blue-200 mt-0.5 hidden sm:block">Days left</div>
        </div>
        <div className="bg-gradient-to-br from-rose-500 to-rose-600 rounded-2xl p-3.5 sm:p-4 shadow-md shadow-rose-200/50 text-center">
          <div className="text-[10px] sm:text-xs font-bold text-rose-100 uppercase tracking-wider mb-1">Sick</div>
          <div className="text-2xl sm:text-3xl font-black text-white">{myProfile.leaveBalance?.sick || 9}</div>
          <div className="text-[10px] text-rose-200 mt-0.5 hidden sm:block">Days left</div>
        </div>
        <div className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl p-3.5 sm:p-4 shadow-md shadow-emerald-200/50 text-center">
          <div className="text-[10px] sm:text-xs font-bold text-emerald-100 uppercase tracking-wider mb-1">Annual</div>
          <div className="text-2xl sm:text-3xl font-black text-white">{myProfile.leaveBalance?.annual || 12}</div>
          <div className="text-[10px] text-emerald-200 mt-0.5 hidden sm:block">Days left</div>
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
            {/* ── Mobile Cards ── */}
            <div className="block md:hidden divide-y divide-slate-100">
              {myLeaves.map((l) => (
                <div key={l.id} className="p-4 space-y-3">
                  {/* Top row: type + days */}
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="font-bold text-sm text-slate-900">{l.type}</div>
                      <div className="text-[10px] text-slate-400 mt-0.5">{l.fromDate} – {l.toDate}</div>
                    </div>
                    <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full shrink-0">
                      {l.days} Day{l.days > 1 ? 's' : ''}
                    </span>
                  </div>

                  {/* Two-step stepper */}
                  <ApprovalStepper status={l.status} />

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

            {/* ── Desktop Table ── */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="bg-slate-50/80 border-b border-slate-100 text-slate-400 font-bold uppercase tracking-wider text-xs">
                  <tr>
                    <th className="px-5 py-3.5">Leave Type</th>
                    <th className="px-5 py-3.5">Dates / Period</th>
                    <th className="px-5 py-3.5">Days</th>
                    <th className="px-5 py-3.5">Reason</th>
                    <th className="px-5 py-3.5">Applied</th>
                    <th className="px-5 py-3.5 text-right">Approval Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                  {myLeaves.map((l) => (
                    <tr key={l.id} className="hover:bg-slate-50/60">
                      <td className="px-5 py-4 font-bold text-slate-900">{l.type}</td>
                      <td className="px-5 py-4 text-xs text-slate-600">{l.fromDate} – {l.toDate}</td>
                      <td className="px-5 py-4 font-bold text-blue-600">{l.days} Day(s)</td>
                      <td className="px-5 py-4 text-xs text-slate-500 max-w-xs truncate">{l.reason}</td>
                      <td className="px-5 py-4 text-xs text-slate-400">{l.appliedOn}</td>
                      <td className="px-5 py-4">
                        <ApprovalStepperCompact status={l.status} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>

      {/* ── Apply Leave Modal - Portaled to document.body for full website blur ── */}
      {showApplyModal && typeof document !== 'undefined' && createPortal(
        <div className="fixed inset-0 z-[9999] flex flex-col justify-end sm:items-center sm:justify-center p-0 sm:p-4 overflow-y-auto font-sans">
          {/* Full website background blur */}
          <div 
            className="fixed inset-0 bg-slate-950/60 backdrop-blur-md transition-opacity duration-300 cursor-pointer"
            onClick={() => setShowApplyModal(false)}
          />

          <div 
            className="relative z-10 bg-white rounded-t-[2rem] sm:rounded-3xl p-5 sm:p-7 w-full sm:max-w-md shadow-2xl border border-slate-200/80 max-h-[90vh] overflow-y-auto my-auto animate-in fade-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Handle bar — mobile only */}
            <div className="w-10 h-1.5 bg-slate-200 rounded-full mx-auto mb-4 sm:hidden" />

            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
              <div>
                <h3 className="text-base font-black text-[#002D62]">Request Time Off</h3>
                <p className="text-xs text-slate-500 mt-0.5">Routed to Manager → HR for two-step approval</p>
              </div>
              <button
                onClick={() => setShowApplyModal(false)}
                className="p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors touch-manipulation cursor-pointer"
                aria-label="Close"
              >
                <X size={18} />
              </button>
            </div>

            {/* Approval flow mini-banner inside modal */}
            <div className="flex items-center gap-2 bg-slate-50 border border-slate-100 rounded-xl px-3 py-2 mb-4 text-[10px] font-semibold text-slate-500">
              <span className="flex items-center gap-1 text-amber-600">
                <User size={10} /> Marcus Sterling
              </span>
              <ArrowRight size={9} className="text-slate-300" />
              <span className="flex items-center gap-1 text-blue-600">
                <Building2 size={10} /> HR Department
              </span>
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
                  className="flex-1 py-3 rounded-xl bg-[#002D62] hover:bg-[#001D42] text-white font-bold text-sm shadow-md shadow-[#002D62]/20 transition-all touch-manipulation cursor-pointer"
                >
                  Submit Request
                </button>
              </div>
            </form>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
}
