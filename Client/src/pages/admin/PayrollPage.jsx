import React, { useState } from 'react';
import { Wallet, Download, Play, CheckCircle2, Clock, Search, DollarSign } from 'lucide-react';

const payrollData = [
  { id: 'EMP001', name: 'Sarah Jenkins', role: 'Senior Developer', dept: 'Engineering', basic: 7500, hra: 1500, bonus: 500, deductions: 920, net: 8580 },
  { id: 'EMP002', name: 'Marcus Lee', role: 'Sales Executive', dept: 'Sales', basic: 5000, hra: 1000, bonus: 1200, deductions: 650, net: 6550 },
  { id: 'EMP003', name: 'Priya Sharma', role: 'HR Specialist', dept: 'HR & Admin', basic: 4500, hra: 900, bonus: 0, deductions: 540, net: 4860 },
  { id: 'EMP004', name: 'David Kim', role: 'Marketing Lead', dept: 'Marketing', basic: 5800, hra: 1160, bonus: 300, deductions: 730, net: 6530 },
  { id: 'EMP005', name: 'Anita Roy', role: 'Finance Analyst', dept: 'Finance', basic: 5200, hra: 1040, bonus: 0, deductions: 630, net: 5610 },
  { id: 'EMP006', name: 'James Obi', role: 'Operations Manager', dept: 'Operations', basic: 6500, hra: 1300, bonus: 400, deductions: 830, net: 7370 },
  { id: 'EMP007', name: 'Linda Cho', role: 'UX Designer', dept: 'Engineering', basic: 5500, hra: 1100, bonus: 200, deductions: 680, net: 6120 },
  { id: 'EMP008', name: 'Raj Mehta', role: 'Backend Engineer', dept: 'Engineering', basic: 6000, hra: 1200, bonus: 0, deductions: 750, net: 6450 },
];

const fmt = (n) => `$${n.toLocaleString()}`;

export default function PayrollPage() {
  const [search, setSearch] = useState('');
  const [processed, setProcessed] = useState(false);
  const filtered = payrollData.filter(e => e.name.toLowerCase().includes(search.toLowerCase()));
  const totalNet = payrollData.reduce((s, e) => s + e.net, 0);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900">Payroll — October 2026</h1>
          <p className="text-sm text-slate-500 mt-1">Manage and process employee salaries for the current month.</p>
        </div>
        <div className="flex gap-2">
          <button className="inline-flex items-center gap-2 border border-slate-200 text-slate-700 px-4 py-2.5 rounded-xl font-bold text-sm hover:bg-slate-50 transition-colors">
            <Download size={15} />
            Export
          </button>
          <button
            onClick={() => setProcessed(true)}
            className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-sm transition-colors shadow-sm ${processed ? 'bg-emerald-600 text-white' : 'bg-[#FFC933] hover:bg-amber-400 text-slate-950'}`}
          >
            {processed ? <CheckCircle2 size={15} /> : <Play size={15} />}
            {processed ? 'Payroll Processed!' : 'Run Payroll'}
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-gradient-to-br from-amber-400 to-amber-600 rounded-2xl p-5 text-white shadow-lg">
          <div className="text-sm font-semibold opacity-80 mb-2 flex items-center gap-1.5"><DollarSign size={14} />Total Net Payroll</div>
          <div className="text-3xl font-black">{fmt(totalNet)}</div>
          <div className="text-sm opacity-70 mt-1">{payrollData.length} employees</div>
        </div>
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
          <div className="text-sm font-semibold text-slate-500 mb-2">Total Gross</div>
          <div className="text-3xl font-black text-slate-900">{fmt(payrollData.reduce((s, e) => s + e.basic + e.hra + e.bonus, 0))}</div>
          <div className="text-xs text-slate-400 mt-1">Before deductions</div>
        </div>
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
          <div className="text-sm font-semibold text-slate-500 mb-2">Total Deductions</div>
          <div className="text-3xl font-black text-slate-900">{fmt(payrollData.reduce((s, e) => s + e.deductions, 0))}</div>
          <div className="text-xs text-slate-400 mt-1">Tax + PF + Ins.</div>
        </div>
      </div>

      {/* Search */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-4">
        <div className="relative">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search employee..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#008C75] focus:border-transparent"
          />
        </div>
      </div>

      {/* Payroll Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-50">
              <tr className="text-xs text-slate-400 font-bold uppercase tracking-wider">
                <th className="text-left px-5 py-3.5">Employee</th>
                <th className="text-right px-5 py-3.5">Basic</th>
                <th className="text-right px-5 py-3.5">HRA</th>
                <th className="text-right px-5 py-3.5">Bonus</th>
                <th className="text-right px-5 py-3.5">Deductions</th>
                <th className="text-right px-5 py-3.5">Net Pay</th>
                <th className="text-left px-5 py-3.5">Payslip</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((e) => (
                <tr key={e.id} className="border-t border-slate-50 hover:bg-slate-50/60 transition-colors">
                  <td className="px-5 py-4">
                    <div className="font-bold text-slate-900">{e.name}</div>
                    <div className="text-xs text-slate-400">{e.role} · {e.dept}</div>
                  </td>
                  <td className="px-5 py-4 text-right text-slate-700">{fmt(e.basic)}</td>
                  <td className="px-5 py-4 text-right text-slate-700">{fmt(e.hra)}</td>
                  <td className="px-5 py-4 text-right text-emerald-600 font-semibold">{fmt(e.bonus)}</td>
                  <td className="px-5 py-4 text-right text-red-500 font-semibold">-{fmt(e.deductions)}</td>
                  <td className="px-5 py-4 text-right font-black text-slate-900">{fmt(e.net)}</td>
                  <td className="px-5 py-4">
                    <button className="inline-flex items-center gap-1 text-xs font-bold text-blue-600 hover:underline">
                      <Download size={12} /> Download
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot className="bg-slate-50 border-t-2 border-slate-200">
              <tr>
                <td className="px-5 py-4 font-black text-slate-900">TOTAL ({filtered.length})</td>
                <td className="px-5 py-4 text-right font-bold">{fmt(filtered.reduce((s, e) => s + e.basic, 0))}</td>
                <td className="px-5 py-4 text-right font-bold">{fmt(filtered.reduce((s, e) => s + e.hra, 0))}</td>
                <td className="px-5 py-4 text-right font-bold text-emerald-600">{fmt(filtered.reduce((s, e) => s + e.bonus, 0))}</td>
                <td className="px-5 py-4 text-right font-bold text-red-500">-{fmt(filtered.reduce((s, e) => s + e.deductions, 0))}</td>
                <td className="px-5 py-4 text-right font-black text-amber-600 text-base">{fmt(filtered.reduce((s, e) => s + e.net, 0))}</td>
                <td />
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  );
}
