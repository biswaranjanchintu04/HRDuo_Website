import React, { useState } from 'react';
import { 
  CreditCard, DollarSign, TrendingUp, AlertCircle, CheckCircle2, 
  Clock, Download, Plus, Filter, Search, Receipt, ArrowUpRight, Check 
} from 'lucide-react';
import { useHRMS } from '../../context/HRMSContext';
import { useAlert } from '../../context/AlertContext';

export default function PaymentsPage() {
  const { payments } = useHRMS();
  const { showToast } = useAlert();

  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [showRecordModal, setShowRecordModal] = useState(false);

  const filtered = payments.filter(p => {
    const matchesSearch = p.company.toLowerCase().includes(search.toLowerCase()) ||
      p.invoiceNo.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = filterStatus === 'All' || p.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const handleDownloadInvoice = (txn) => {
    showToast(`Downloading invoice ${txn.invoiceNo} for ${txn.company} (PDF)...`, 'info');
  };

  const handleExportAll = () => {
    showToast('Exporting comprehensive billing ledger to CSV...', 'success');
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">Billing & Payments Governance</h1>
          <p className="text-sm text-slate-500 mt-1">
            Reconciliation of multi-tenant invoices, automated gateway transactions, and receivables.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleExportAll}
            className="inline-flex items-center gap-2 bg-white hover:bg-slate-50 text-slate-700 px-4 py-2.5 rounded-xl font-bold text-xs border border-slate-200 shadow-2xs transition-all cursor-pointer"
          >
            <Download size={14} />
            Export Ledger
          </button>
          <button
            onClick={() => setShowRecordModal(true)}
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-xl font-bold text-xs shadow-md shadow-blue-500/20 transition-all cursor-pointer"
          >
            <Plus size={14} />
            Record Payment
          </button>
        </div>
      </div>

      {/* Revenue Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-2xs">
          <div className="flex items-center justify-between text-slate-500 text-xs font-bold mb-3">
            <span>Monthly Recurring (MRR)</span>
            <DollarSign size={16} className="text-blue-600" />
          </div>
          <div className="text-2xl font-black text-slate-900 tracking-tight">$148,500</div>
          <div className="text-[11px] text-emerald-600 font-semibold mt-1">+7.4% MoM organic growth</div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-2xs">
          <div className="flex items-center justify-between text-slate-500 text-xs font-bold mb-3">
            <span>Annual Run Rate (ARR)</span>
            <TrendingUp size={16} className="text-purple-600" />
          </div>
          <div className="text-2xl font-black text-slate-900 tracking-tight">$1.78M</div>
          <div className="text-[11px] text-slate-400 font-semibold mt-1">Contracted enterprise value</div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-2xs">
          <div className="flex items-center justify-between text-slate-500 text-xs font-bold mb-3">
            <span>Pending Receivables</span>
            <Clock size={16} className="text-amber-600" />
          </div>
          <div className="text-2xl font-black text-amber-600 tracking-tight">$4,200</div>
          <div className="text-[11px] text-slate-400 font-semibold mt-1">3 enterprise wire invoices</div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-2xs">
          <div className="flex items-center justify-between text-slate-500 text-xs font-bold mb-3">
            <span>Failed Transactions</span>
            <AlertCircle size={16} className="text-rose-600" />
          </div>
          <div className="text-2xl font-black text-rose-600 tracking-tight">1</div>
          <div className="text-[11px] text-rose-500 font-semibold mt-1">Kobe Robotics (Card expired)</div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-2xl shadow-2xs border border-slate-200/80 p-4 flex flex-col md:flex-row gap-3 items-center justify-between">
        <div className="relative flex-1 w-full">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search by company or invoice #..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-200 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50/50"
          />
        </div>

        <div className="flex items-center gap-2">
          {['All', 'Paid', 'Pending', 'Failed'].map(st => (
            <button
              key={st}
              onClick={() => setFilterStatus(st)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                filterStatus === st
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-slate-100 hover:bg-slate-200/70 text-slate-600'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Transactions Table */}
      <div className="bg-white rounded-2xl shadow-2xs border border-slate-200/80 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-slate-50/80 border-b border-slate-100">
              <tr className="text-xs text-slate-400 font-bold uppercase tracking-wider">
                <th className="px-5 py-3.5">Invoice #</th>
                <th className="px-5 py-3.5">Tenant Organization</th>
                <th className="px-5 py-3.5">Plan Tier</th>
                <th className="px-5 py-3.5">Amount</th>
                <th className="px-5 py-3.5">Payment Method</th>
                <th className="px-5 py-3.5">Date</th>
                <th className="px-5 py-3.5">Status</th>
                <th className="px-5 py-3.5 text-right">Invoice</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
              {filtered.map((t) => (
                <tr key={t.id} className="hover:bg-slate-50/60 transition-colors">
                  <td className="px-5 py-3.5 font-mono text-xs font-bold text-blue-600">{t.invoiceNo}</td>
                  <td className="px-5 py-3.5 font-bold text-slate-900">{t.company}</td>
                  <td className="px-5 py-3.5 text-xs text-slate-500">{t.plan}</td>
                  <td className="px-5 py-3.5 font-black text-slate-900">{t.amount}</td>
                  <td className="px-5 py-3.5 text-xs text-slate-500">{t.method}</td>
                  <td className="px-5 py-3.5 text-xs text-slate-500">{t.date}</td>
                  <td className="px-5 py-3.5">
                    <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold ${
                      t.status === 'Paid' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' :
                      t.status === 'Pending' ? 'bg-amber-50 text-amber-700 border border-amber-200' :
                      'bg-rose-50 text-rose-700 border border-rose-200'
                    }`}>
                      {t.status}
                    </span>
                  </td>
                  <td className="px-5 py-3.5 text-right">
                    <button
                      onClick={() => handleDownloadInvoice(t)}
                      className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors cursor-pointer"
                      title="Download PDF Invoice"
                    >
                      <Download size={15} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Record Payment Modal */}
      {showRecordModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/40 backdrop-blur-xs">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-sm w-full shadow-2xl border border-slate-200">
            <h3 className="text-base font-black text-slate-900 mb-1">Manual Payment Ledger Entry</h3>
            <p className="text-xs text-slate-500 mb-4">Record enterprise offline bank wire or cheque transfer</p>
            <div className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Company</label>
                <input type="text" defaultValue="Apex Global Logistics" className="w-full px-3 py-2 rounded-xl border border-slate-200 font-semibold" />
              </div>
              <div>
                <label className="block font-bold text-slate-700 mb-1">Amount ($)</label>
                <input type="text" defaultValue="$999.00" className="w-full px-3 py-2 rounded-xl border border-slate-200 font-semibold" />
              </div>
              <div>
                <label className="block font-bold text-slate-700 mb-1">Wire Reference #</label>
                <input type="text" placeholder="ACH-901840192" className="w-full px-3 py-2 rounded-xl border border-slate-200 font-semibold" />
              </div>
            </div>
            <div className="mt-5 pt-3 border-t border-slate-100 flex gap-2">
              <button
                onClick={() => setShowRecordModal(false)}
                className="flex-1 py-2 rounded-xl bg-slate-100 text-slate-700 font-bold text-xs"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setShowRecordModal(false);
                  showToast('Payment recorded to ledger successfully!', 'success');
                }}
                className="flex-1 py-2 rounded-xl bg-blue-600 text-white font-bold text-xs shadow-md shadow-blue-500/20"
              >
                Save Payment
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
