import React, { useState } from 'react';
import { 
  CreditCard, Check, ShieldCheck, Zap, Download, 
  ArrowUpRight, Users, Sparkles, CheckCircle2, AlertCircle 
} from 'lucide-react';
import { useHRMS } from '../../context/HRMSContext';
import { useAlert } from '../../context/AlertContext';

export default function CompanySubscriptionPage() {
  const { showToast } = useAlert();
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);

  const plan = {
    name: 'Enterprise Tier',
    cycle: 'Annual Billing',
    price: '$4,990 / year',
    seatsUsed: 128,
    seatsTotal: 150,
    renewalDate: 'December 31, 2026',
    status: 'Active',
    features: [
      'Up to 150 active workforce seats',
      'Dedicated biometrics & face attendance kiosk',
      'All 5 specialized role portals',
      'Automated payroll & tax deductions',
      'Unlimited company announcements',
      'SOC2 and GDPR compliance audit logs',
      'Priority 1-hour dedicated SLA support'
    ]
  };

  const invoices = [
    { id: 'INV-2026-088', date: 'Oct 21, 2026', amount: '$4,990.00', status: 'Paid', method: 'Corporate Wire (ACH)' },
    { id: 'INV-2025-042', date: 'Oct 21, 2025', amount: '$4,490.00', status: 'Paid', method: 'Corporate Wire (ACH)' },
    { id: 'INV-2024-011', date: 'Oct 21, 2024', amount: '$3,800.00', status: 'Paid', method: 'Credit Card (Visa •••• 4012)' }
  ];

  const handleDownloadInvoice = (inv) => {
    showToast(`Downloading official invoice ${inv.id} (PDF)...`, 'info');
  };

  return (
    <div className="space-y-6 max-w-5xl">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">Company Subscription & Plan Licensing</h1>
          <p className="text-sm text-slate-500 mt-1">
            Current enterprise tier parameters, seat utilization, and billing statements.
          </p>
        </div>
        <button
          onClick={() => setShowUpgradeModal(true)}
          className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-xl font-bold text-xs shadow-md shadow-blue-500/20 transition-all cursor-pointer"
        >
          <Sparkles size={14} />
          <span>Upgrade Plan / Add Seats</span>
        </button>
      </div>

      {/* Main Active Plan Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-2xs">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-6 border-b border-slate-100">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 mb-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Active Enterprise License
            </div>
            <h2 className="text-2xl font-black text-slate-900">{plan.name}</h2>
            <div className="text-xs text-slate-500 mt-0.5">Renewing on <span className="font-bold text-slate-800">{plan.renewalDate}</span></div>
          </div>
          <div className="text-left sm:text-right">
            <div className="text-2xl font-black text-blue-600">{plan.price}</div>
            <div className="text-xs text-slate-400 font-medium">{plan.cycle}</div>
          </div>
        </div>

        {/* Seat Usage Progress */}
        <div className="my-6">
          <div className="flex items-center justify-between text-xs font-bold mb-2">
            <span className="text-slate-700">Workforce Seat Allocation</span>
            <span className="text-blue-600">{plan.seatsUsed} / {plan.seatsTotal} Seats Utilized (85%)</span>
          </div>
          <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
            <div
              className="bg-blue-600 h-full rounded-full transition-all"
              style={{ width: `${(plan.seatsUsed / plan.seatsTotal) * 100}%` }}
            />
          </div>
          <div className="text-[11px] text-slate-400 mt-1.5">
            22 spare employee seats available before next tier upgrade is required.
          </div>
        </div>

        {/* Feature List */}
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-3">
            Contracted License Capabilities:
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {plan.features.map((feat, i) => (
              <div key={i} className="flex items-center gap-2 text-xs font-medium text-slate-700">
                <CheckCircle2 size={14} className="text-emerald-500 shrink-0" />
                <span>{feat}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Invoice History */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-2xs">
        <h3 className="text-base font-bold text-slate-900 mb-4">Invoice & Payment History</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-100 text-slate-400 font-bold uppercase tracking-wider">
              <tr>
                <th className="px-4 py-3">Invoice #</th>
                <th className="px-4 py-3">Billing Date</th>
                <th className="px-4 py-3">Amount</th>
                <th className="px-4 py-3">Payment Method</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3 text-right">Download</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
              {invoices.map((inv) => (
                <tr key={inv.id} className="hover:bg-slate-50/60">
                  <td className="px-4 py-3 font-mono font-bold text-blue-600">{inv.id}</td>
                  <td className="px-4 py-3 text-slate-500">{inv.date}</td>
                  <td className="px-4 py-3 font-bold text-slate-900">{inv.amount}</td>
                  <td className="px-4 py-3 text-slate-500">{inv.method}</td>
                  <td className="px-4 py-3">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                      {inv.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <button
                      onClick={() => handleDownloadInvoice(inv)}
                      className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors cursor-pointer"
                      title="Download PDF"
                    >
                      <Download size={14} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Upgrade Modal */}
      {showUpgradeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/40 backdrop-blur-xs">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-sm w-full shadow-2xl border border-slate-200 text-center">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto mb-3">
              <Sparkles size={24} />
            </div>
            <h3 className="text-base font-black text-slate-900">Add Workforce Seats</h3>
            <p className="text-xs text-slate-500 mt-1 mb-4">Expand seat capacity from 150 to 250 employees.</p>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-xs font-bold text-slate-800 mb-4">
              Estimated Prorated Cost: +$450 / quarter
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setShowUpgradeModal(false)}
                className="flex-1 py-2 rounded-xl bg-slate-100 text-slate-700 font-bold text-xs"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setShowUpgradeModal(false);
                  showToast('Seat allocation upgraded to 250 seats!', 'success');
                }}
                className="flex-1 py-2 rounded-xl bg-blue-600 text-white font-bold text-xs shadow-md shadow-blue-500/20"
              >
                Confirm Upgrade
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
