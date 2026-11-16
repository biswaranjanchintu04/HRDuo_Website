import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import {
  Wallet, Download, CheckCircle2, ArrowDownRight, ArrowUpRight,
  FileText, Clock, Send, X, Info, Bell
} from 'lucide-react';

// Mock: PS-2026-10 is pre-approved so employee sees "Download Ready"
const MOCK_APPROVED = new Set(['PS-2026-10']);

export default function EmployeeSalary() {
  const [requestedPayslips, setRequestedPayslips] = useState({});
  // requestedPayslips shape: { [id]: { status: 'pending' | 'ready', note: string } }

  const [modal, setModal] = useState(null);
  // modal shape: { payslipId: string, month: string } | null

  const [noteText, setNoteText] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const payslips = [
    { id: 'PS-2026-10', month: 'October 2026',   gross: '$6,400.00', deductions: '$580.00', net: '$5,820.00', status: 'Paid', payDate: 'Oct 31, 2026' },
    { id: 'PS-2026-09', month: 'September 2026', gross: '$6,400.00', deductions: '$580.00', net: '$5,820.00', status: 'Paid', payDate: 'Sep 30, 2026' },
    { id: 'PS-2026-08', month: 'August 2026',    gross: '$6,400.00', deductions: '$580.00', net: '$5,820.00', status: 'Paid', payDate: 'Aug 31, 2026' },
    { id: 'PS-2026-07', month: 'July 2026',      gross: '$6,400.00', deductions: '$580.00', net: '$5,820.00', status: 'Paid', payDate: 'Jul 31, 2026' },
  ];

  const openModal = (id, month) => {
    setNoteText('');
    setModal({ payslipId: id, month });
  };

  const closeModal = () => {
    if (submitting) return;
    setModal(null);
    setNoteText('');
  };

  const handleConfirmRequest = () => {
    if (!modal) return;
    setSubmitting(true);
    setTimeout(() => {
      setRequestedPayslips(prev => ({
        ...prev,
        [modal.payslipId]: {
          status: MOCK_APPROVED.has(modal.payslipId) ? 'ready' : 'pending',
          note: noteText,
        },
      }));
      setSubmitting(false);
      setModal(null);
      setNoteText('');
    }, 900);
  };

  const handleMockDownload = (id) => {
    alert(`Payslip ${id} downloaded successfully!`);
  };

  // Render the action cell/button for a given payslip row
  const renderAction = (p, compact = false) => {
    const req = requestedPayslips[p.id];

    if (req?.status === 'ready') {
      // Download Ready (mock-approved)
      return (
        <button
          onClick={() => handleMockDownload(p.id)}
          className={
            compact
              ? 'w-full py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-colors'
              : 'px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold inline-flex items-center gap-1.5 transition-colors'
          }
        >
          <Download size={14} />
          Download Ready
        </button>
      );
    }

    if (req?.status === 'pending') {
      // Pending badge
      return (
        <span
          className={
            compact
              ? 'w-full py-2 bg-amber-50 border border-amber-200 text-amber-700 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5'
              : 'px-3 py-1.5 bg-amber-50 border border-amber-200 text-amber-700 rounded-lg text-xs font-bold inline-flex items-center gap-1.5'
          }
        >
          <Clock size={13} />
          Request Pending
        </span>
      );
    }

    // Default: Request Download button
    return (
      <button
        onClick={() => openModal(p.id, p.month)}
        className={
          compact
            ? 'w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-colors'
            : 'px-3 py-1.5 border border-slate-200 hover:border-emerald-400 hover:bg-emerald-50 rounded-lg text-xs font-bold text-slate-700 inline-flex items-center gap-1.5 transition-colors'
        }
      >
        <Send size={13} />
        Request Download
      </button>
    );
  };

  return (
    <div className="space-y-4 sm:space-y-6 max-w-7xl mx-auto font-poppins">

      {/* ── Hero Header ── */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-emerald-600 via-teal-600 to-green-700 p-5 sm:p-6 shadow-xl shadow-emerald-200/60">
        <div className="absolute -top-8 -right-8 w-44 h-44 rounded-full bg-white/10 blur-2xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-32 h-32 rounded-full bg-teal-400/20 blur-2xl pointer-events-none" />
        <div className="relative flex items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <div className="w-8 h-8 rounded-xl bg-white/15 backdrop-blur flex items-center justify-center">
                <Wallet size={16} className="text-white" />
              </div>
              <span className="text-[11px] font-bold uppercase tracking-widest text-emerald-100">Payroll & Compensation</span>
            </div>
            <div className="text-2xl sm:text-3xl font-black text-white tracking-tight">$5,820.00</div>
            <p className="text-xs text-emerald-100 mt-1 flex items-center gap-1.5">
              <CheckCircle2 size={12} />
              Net salary · October 2026 · Direct Deposit
            </p>
          </div>
          {/* Request Payslip button */}
          {requestedPayslips['PS-2026-10']?.status === 'ready' ? (
            <button onClick={() => handleMockDownload('PS-2026-10')}
              className="shrink-0 inline-flex items-center gap-1.5 bg-white text-emerald-700 px-4 py-2.5 rounded-2xl font-black text-xs shadow-md transition-all cursor-pointer">
              <Download size={14} /> Download
            </button>
          ) : requestedPayslips['PS-2026-10']?.status === 'pending' ? (
            <span className="shrink-0 inline-flex items-center gap-1.5 bg-white/20 text-white px-4 py-2.5 rounded-2xl font-bold text-xs border border-white/30">
              <Clock size={13} /> Pending
            </span>
          ) : (
            <button onClick={() => openModal('PS-2026-10', 'October 2026')}
              className="shrink-0 inline-flex items-center gap-1.5 bg-white/20 backdrop-blur hover:bg-white/30 text-white px-4 py-2.5 rounded-2xl font-bold text-xs border border-white/30 shadow-md transition-all cursor-pointer">
              <Send size={13} /> Request Slip
            </button>
          )}
        </div>
      </div>

      {/* ── Current Month Breakdown Card ── */}
      <div className="bg-white rounded-3xl p-5 sm:p-7 shadow-sm border border-slate-100">
        <div className="flex flex-col md:flex-row md:items-center justify-between pb-5 sm:pb-6 border-b border-slate-100 gap-4">
          <div>
            <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-slate-400">Current Month's Net Salary</span>
            <div className="text-3xl sm:text-4xl font-black text-slate-900 mt-1">$5,820.00</div>
            <p className="text-xs text-emerald-600 font-bold mt-1 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> Direct Deposit Processed on Oct 31, 2026
            </p>
          </div>

          <div className="bg-slate-50 rounded-2xl p-3.5 sm:p-4 border border-slate-100 flex items-center gap-3 sm:gap-4 text-xs">
            <div>
              <div className="font-bold text-slate-500 uppercase text-[10px]">Bank Account</div>
              <div className="font-bold text-slate-900 mt-0.5">HDFC Bank Corp</div>
              <div className="font-mono text-slate-400">•••• •••• 4921</div>
            </div>
            <div className="h-8 w-px bg-slate-200" />
            <div>
              <div className="font-bold text-slate-500 uppercase text-[10px]">Tax Regime</div>
              <div className="font-bold text-slate-900 mt-0.5">New Regime 2026</div>
              <div className="text-emerald-600 font-bold">Standard Exemption</div>
            </div>
          </div>
        </div>

        {/* Earnings & Deductions Tables */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 pt-5 sm:pt-6">
          {/* Earnings */}
          <div>
            <h3 className="text-xs sm:text-sm font-bold text-slate-900 uppercase tracking-wider mb-3 sm:mb-4 flex items-center gap-2 text-emerald-700">
              <ArrowUpRight className="w-4 h-4 text-emerald-600" />
              Earnings Breakdown
            </h3>
            <div className="space-y-2.5 text-xs sm:text-sm">
              <div className="flex justify-between py-1.5 border-b border-slate-100">
                <span className="text-slate-600">Basic Salary</span>
                <span className="font-bold text-slate-900">$3,800.00</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-100">
                <span className="text-slate-600">House Rent Allowance (HRA)</span>
                <span className="font-bold text-slate-900">$1,520.00</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-100">
                <span className="text-slate-600">Special Performance Allowance</span>
                <span className="font-bold text-slate-900">$880.00</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-100">
                <span className="text-slate-600">Internet &amp; Utility Reimbursement</span>
                <span className="font-bold text-slate-900">$200.00</span>
              </div>
              <div className="flex justify-between pt-2.5 font-black text-slate-900 text-sm sm:text-base">
                <span>Total Gross Earnings</span>
                <span className="text-emerald-600">$6,400.00</span>
              </div>
            </div>
          </div>

          {/* Deductions */}
          <div>
            <h3 className="text-xs sm:text-sm font-bold text-slate-900 uppercase tracking-wider mb-3 sm:mb-4 flex items-center gap-2 text-rose-700">
              <ArrowDownRight className="w-4 h-4 text-rose-600" />
              Statutory Deductions
            </h3>
            <div className="space-y-2.5 text-xs sm:text-sm">
              <div className="flex justify-between py-1.5 border-b border-slate-100">
                <span className="text-slate-600">Provident Fund (EPF)</span>
                <span className="font-bold text-slate-900">$320.00</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-100">
                <span className="text-slate-600">Income Tax (TDS)</span>
                <span className="font-bold text-slate-900">$180.00</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-100">
                <span className="text-slate-600">Corporate Health Insurance</span>
                <span className="font-bold text-slate-900">$60.00</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-100">
                <span className="text-slate-600">Professional Tax</span>
                <span className="font-bold text-slate-900">$20.00</span>
              </div>
              <div className="flex justify-between pt-2.5 font-black text-slate-900 text-sm sm:text-base">
                <span>Total Deductions</span>
                <span className="text-rose-600">-$580.00</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Historical Payslips ── */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-4 sm:p-5 border-b border-slate-100">
          <h2 className="text-sm sm:text-base font-bold text-slate-900">Historical Payslip Records</h2>
        </div>

        {/* Info banner */}
        <div className="mx-4 sm:mx-5 mt-4 mb-2 flex items-start gap-2.5 bg-blue-50 border border-blue-100 rounded-xl p-3 text-xs text-blue-700">
          <Info className="w-4 h-4 mt-0.5 shrink-0 text-blue-500" />
          <span>
            <strong>Payslip downloads require HR approval.</strong> Click &quot;Request Download&quot; and HR will review and process your request within 24 hours. You&apos;ll be notified once it&apos;s ready.
          </span>
        </div>

        {/* Mobile Cards (< md) */}
        <div className="block md:hidden divide-y divide-slate-100 mt-2">
          {payslips.map((p) => {
            const req = requestedPayslips[p.id];
            return (
              <div key={p.id} className="p-4 space-y-2.5">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-sm text-slate-900">{p.month}</h4>
                    <span className="font-mono text-[10px] text-slate-400">{p.id}</span>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-black text-emerald-600">{p.net}</div>
                    <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">{p.status}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs text-slate-500 bg-slate-50 p-2.5 rounded-xl">
                  <span>Gross: <strong className="text-slate-800">{p.gross}</strong></span>
                  <span>Deductions: <strong className="text-rose-600">{p.deductions}</strong></span>
                </div>

                {/* Success state after request sent */}
                {req && (
                  <div className={`flex items-center gap-2 text-xs rounded-xl px-3 py-2 font-semibold ${req.status === 'ready' ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' : 'bg-amber-50 text-amber-700 border border-amber-100'}`}>
                    {req.status === 'ready'
                      ? <><CheckCircle2 size={13} /> Request Sent ✓ — Download Ready</>
                      : <><Bell size={13} /> Request Sent ✓ — HR will process your request</>
                    }
                  </div>
                )}

                {renderAction(p, true)}
              </div>
            );
          })}
        </div>

        {/* Desktop Table (md+) */}
        <div className="hidden md:block overflow-x-auto mt-2">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="bg-slate-50/70 border-b border-slate-100 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                <th className="py-3 px-5">Slip ID</th>
                <th className="py-3 px-4">Pay Period</th>
                <th className="py-3 px-4">Gross Earnings</th>
                <th className="py-3 px-4">Deductions</th>
                <th className="py-3 px-4">Net Salary</th>
                <th className="py-3 px-4">Disbursed Date</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-5 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {payslips.map((p) => {
                const req = requestedPayslips[p.id];
                return (
                  <tr key={p.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-4 px-5 font-mono text-xs font-bold text-slate-600">{p.id}</td>
                    <td className="py-4 px-4 font-bold text-slate-900">{p.month}</td>
                    <td className="py-4 px-4 text-slate-600">{p.gross}</td>
                    <td className="py-4 px-4 text-rose-600">{p.deductions}</td>
                    <td className="py-4 px-4 font-black text-emerald-600">{p.net}</td>
                    <td className="py-4 px-4 text-xs text-slate-500">{p.payDate}</td>
                    <td className="py-4 px-4">
                      {req ? (
                        <span className={`inline-flex items-center gap-1 text-[11px] font-bold px-2 py-1 rounded-full ${req.status === 'ready' ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'}`}>
                          {req.status === 'ready'
                            ? <><CheckCircle2 size={11} /> Download Ready</>
                            : <><Clock size={11} /> Pending HR Review</>
                          }
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-1 rounded-full bg-emerald-50 text-emerald-700">
                          <CheckCircle2 size={11} /> {p.status}
                        </span>
                      )}
                    </td>
                    <td className="py-4 px-5 text-right">
                      {renderAction(p, false)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── Request Modal ── */}
      {modal && createPortal(
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-slate-950/60 backdrop-blur-md"
            onClick={closeModal}
          />

          {/* Dialog */}
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 space-y-5 animate-fade-in z-10">
            {/* Close button */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition-colors"
              disabled={submitting}
            >
              <X size={18} />
            </button>

            {/* Icon + Title */}
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center shrink-0">
                <FileText className="w-5 h-5 text-emerald-600" />
              </div>
              <div>
                <h3 className="font-black text-slate-900 text-base leading-tight">Request Payslip Download</h3>
                <p className="text-xs text-slate-500 mt-0.5">{modal.month} · {modal.payslipId}</p>
              </div>
            </div>

            {/* Body */}
            <p className="text-sm text-slate-600 leading-relaxed">
              This will send a download request to HR. HR will review and send you the payslip via email or approve the download directly.
            </p>

            {/* Optional note */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Note to HR <span className="font-normal text-slate-400">(optional)</span>
              </label>
              <textarea
                rows={3}
                value={noteText}
                onChange={(e) => setNoteText(e.target.value)}
                placeholder="e.g. Need for visa application, loan processing…"
                className="w-full text-sm border border-slate-200 rounded-xl px-3 py-2.5 text-slate-800 placeholder-slate-400 resize-none focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent transition"
                disabled={submitting}
              />
            </div>

            {/* Actions */}
            <div className="flex gap-3 pt-1">
              <button
                onClick={closeModal}
                disabled={submitting}
                className="flex-1 py-2.5 rounded-xl border border-slate-200 text-sm font-bold text-slate-600 hover:bg-slate-50 transition-colors disabled:opacity-50 cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmRequest}
                disabled={submitting}
                className="flex-1 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-bold flex items-center justify-center gap-2 transition-colors disabled:opacity-70 cursor-pointer"
              >
                {submitting ? (
                  <>
                    <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                    </svg>
                    Sending…
                  </>
                ) : (
                  <>
                    <Send size={15} />
                    Send Request
                  </>
                )}
              </button>
            </div>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
}
