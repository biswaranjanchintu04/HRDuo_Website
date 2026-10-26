import React from 'react';
import { CreditCard, DollarSign, TrendingUp, AlertCircle, CheckCircle2, Clock, Download } from 'lucide-react';

const transactions = [
  { org: 'TechVision Labs', plan: 'Enterprise', amount: '$2,400', date: 'Oct 24, 2026', status: 'Paid', method: 'Visa ••4829' },
  { org: 'Greenfield Corp', plan: 'Professional', amount: '$890', date: 'Oct 22, 2026', status: 'Paid', method: 'Mastercard ••7231' },
  { org: 'Apex Analytics', plan: 'Enterprise', amount: '$2,400', date: 'Oct 18, 2026', status: 'Paid', method: 'Visa ••3310' },
  { org: 'CloudBase Inc', plan: 'Professional', amount: '$890', date: 'Oct 15, 2026', status: 'Failed', method: 'Visa ••9912' },
  { org: 'SkyBridge Ltd', plan: 'Enterprise', amount: '$2,400', date: 'Oct 12, 2026', status: 'Paid', method: 'Amex ••0045' },
  { org: 'Orion Dynamics', plan: 'Professional', amount: '$890', date: 'Oct 10, 2026', status: 'Refunded', method: 'Visa ••5588' },
  { org: 'Nexus Solutions', plan: 'Starter', amount: '$190', date: 'Oct 5, 2026', status: 'Paid', method: 'PayPal' },
];

const statusColor = {
  Paid: 'bg-emerald-100 text-emerald-700',
  Failed: 'bg-red-100 text-red-700',
  Refunded: 'bg-amber-100 text-amber-700',
  Pending: 'bg-slate-100 text-slate-600',
};

const StatusIcon = ({ status }) => {
  if (status === 'Paid') return <CheckCircle2 size={13} className="text-emerald-500" />;
  if (status === 'Failed') return <AlertCircle size={13} className="text-red-500" />;
  return <Clock size={13} className="text-amber-500" />;
};

export default function PaymentsPage() {
  const totalMRR = 94210;
  const totalARR = totalMRR * 12;
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900">Payments & Billing</h1>
          <p className="text-sm text-slate-500 mt-1">Track subscriptions, revenue, and billing transactions.</p>
        </div>
        <button className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-4 py-2.5 rounded-xl font-bold text-sm shadow-sm transition-colors">
          <Download size={15} />
          Export Report
        </button>
      </div>

      {/* Revenue Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-gradient-to-br from-blue-500 to-blue-700 rounded-2xl p-5 text-white shadow-lg">
          <div className="flex items-center gap-2 mb-3 opacity-80 text-sm font-semibold">
            <DollarSign size={16} />
            Monthly Recurring Revenue
          </div>
          <div className="text-3xl font-black">${totalMRR.toLocaleString()}</div>
          <div className="text-sm mt-1 opacity-70">+6.4% from last month</div>
        </div>
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
          <div className="flex items-center gap-2 mb-3 text-slate-500 text-sm font-semibold">
            <TrendingUp size={16} />
            Annual Recurring Revenue
          </div>
          <div className="text-3xl font-black text-slate-900">${(totalARR / 1000000).toFixed(2)}M</div>
          <div className="text-sm mt-1 text-slate-400">Projected ARR</div>
        </div>
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
          <div className="flex items-center gap-2 mb-3 text-slate-500 text-sm font-semibold">
            <CreditCard size={16} />
            Failed Payments (30d)
          </div>
          <div className="text-3xl font-black text-red-600">3</div>
          <div className="text-sm mt-1 text-slate-400">Requires attention</div>
        </div>
      </div>

      {/* Transaction Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="flex items-center justify-between p-5 border-b border-slate-100">
          <h2 className="font-black text-slate-900">Recent Transactions</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-50">
              <tr className="text-xs text-slate-400 font-bold uppercase tracking-wider">
                <th className="text-left px-5 py-3.5">Organization</th>
                <th className="text-left px-5 py-3.5">Plan</th>
                <th className="text-left px-5 py-3.5">Amount</th>
                <th className="text-left px-5 py-3.5">Date</th>
                <th className="text-left px-5 py-3.5">Method</th>
                <th className="text-left px-5 py-3.5">Status</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((t, i) => (
                <tr key={i} className="border-t border-slate-50 hover:bg-slate-50/60 transition-colors">
                  <td className="px-5 py-4 font-bold text-slate-900">{t.org}</td>
                  <td className="px-5 py-4 text-slate-600">{t.plan}</td>
                  <td className="px-5 py-4 font-bold text-slate-900">{t.amount}</td>
                  <td className="px-5 py-4 text-slate-500 text-xs">{t.date}</td>
                  <td className="px-5 py-4 text-slate-500">{t.method}</td>
                  <td className="px-5 py-4">
                    <span className={`inline-flex items-center gap-1.5 text-xs font-bold px-2.5 py-1 rounded-full ${statusColor[t.status]}`}>
                      <StatusIcon status={t.status} />
                      {t.status}
                    </span>
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
