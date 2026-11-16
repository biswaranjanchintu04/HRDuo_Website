import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { 
  Wallet, Download, Play, CheckCircle2, Clock, Search, 
  DollarSign, FileText, ChevronRight, ShieldCheck, ArrowUpRight, 
  Building2, CreditCard, Check, X, AlertCircle, Printer, 
  ExternalLink, Sparkles, Filter, RefreshCw, Layers, CalendarRange
} from 'lucide-react';
import { useAlert } from '../../context/AlertContext';

const INITIAL_PAYROLL_DATA = [
  { 
    id: 'EMP001', 
    name: 'Sarah Jenkins', 
    role: 'Senior Full Stack Engineer', 
    dept: 'Engineering', 
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
    account: 'Chase Bank •••• 4892',
    taxId: 'US-TX-99824',
    basic: 7500, 
    hra: 1500, 
    bonus: 500, 
    deductions: 920, 
    net: 8580,
    status: 'Ready'
  },
  { 
    id: 'EMP002', 
    name: 'Marcus Sterling', 
    role: 'Engineering Lead', 
    dept: 'Engineering', 
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
    account: 'Bank of America •••• 7120',
    taxId: 'US-TX-88219',
    basic: 8200, 
    hra: 1640, 
    bonus: 1000, 
    deductions: 1080, 
    net: 9760,
    status: 'Ready'
  },
  { 
    id: 'EMP003', 
    name: 'Claire Bennett', 
    role: 'Head of People Operations', 
    dept: 'People & HR', 
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150',
    account: 'Wells Fargo •••• 3341',
    taxId: 'US-TX-66512',
    basic: 6500, 
    hra: 1300, 
    bonus: 400, 
    deductions: 820, 
    net: 7380,
    status: 'Ready'
  },
  { 
    id: 'EMP004', 
    name: 'David Kim', 
    role: 'Growth Marketing Lead', 
    dept: 'Marketing', 
    avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150',
    account: 'Citibank •••• 5590',
    taxId: 'US-TX-44129',
    basic: 5800, 
    hra: 1160, 
    bonus: 300, 
    deductions: 730, 
    net: 6530,
    status: 'Ready'
  },
  { 
    id: 'EMP005', 
    name: 'Anita Roy', 
    role: 'Senior Finance Analyst', 
    dept: 'Finance & Legal', 
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150',
    account: 'J.P. Morgan •••• 1294',
    taxId: 'US-TX-33108',
    basic: 5600, 
    hra: 1120, 
    bonus: 250, 
    deductions: 710, 
    net: 6260,
    status: 'Ready'
  },
  { 
    id: 'EMP006', 
    name: 'Liam Gallagher', 
    role: 'Frontend UI/UX Specialist', 
    dept: 'Engineering', 
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
    account: 'Capital One •••• 9811',
    taxId: 'US-TX-22194',
    basic: 6000, 
    hra: 1200, 
    bonus: 300, 
    deductions: 750, 
    net: 6750,
    status: 'Ready'
  },
  { 
    id: 'EMP007', 
    name: 'Aisha Patel', 
    role: 'Lead Product Designer', 
    dept: 'Product & Design', 
    avatar: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=150',
    account: 'Barclays •••• 6629',
    taxId: 'UK-NI-99104',
    basic: 6800, 
    hra: 1360, 
    bonus: 500, 
    deductions: 860, 
    net: 7800,
    status: 'Ready'
  },
  { 
    id: 'EMP008', 
    name: 'Rachel Green', 
    role: 'Enterprise Account Executive', 
    dept: 'Sales & BD', 
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150',
    account: 'Chase Bank •••• 8820',
    taxId: 'US-TX-77319',
    basic: 5200, 
    hra: 1040, 
    bonus: 1400, 
    deductions: 760, 
    net: 6880,
    status: 'Ready'
  },
];

const fmt = (n) => `$${Number(n || 0).toLocaleString()}`;

export default function PayrollPage() {
  const { showToast } = useAlert();
  
  const [payrollData, setPayrollData] = useState(INITIAL_PAYROLL_DATA);
  const [search, setSearch] = useState('');
  const [selectedDept, setSelectedDept] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  
  // Modals
  const [selectedPayslip, setSelectedPayslip] = useState(null);
  const [isRunPayrollOpen, setIsRunPayrollOpen] = useState(false);
  const [payrollStep, setPayrollStep] = useState(1);
  const [isProcessingBatch, setIsProcessingBatch] = useState(false);
  const [isBatchCompleted, setIsBatchCompleted] = useState(false);

  const departments = ['All', ...new Set(payrollData.map(e => e.dept))];

  const filtered = payrollData.filter(e => {
    const matchesSearch = 
      e.name.toLowerCase().includes(search.toLowerCase()) ||
      e.role.toLowerCase().includes(search.toLowerCase()) ||
      e.dept.toLowerCase().includes(search.toLowerCase()) ||
      e.id.toLowerCase().includes(search.toLowerCase());
    const matchesDept = selectedDept === 'All' || e.dept === selectedDept;
    const matchesStatus = statusFilter === 'All' || e.status === statusFilter;
    return matchesSearch && matchesDept && matchesStatus;
  });

  const totalNet = payrollData.reduce((s, e) => s + e.net, 0);
  const totalGross = payrollData.reduce((s, e) => s + e.basic + e.hra + e.bonus, 0);
  const totalDeductions = payrollData.reduce((s, e) => s + e.deductions, 0);
  const totalEmployerTaxes = Math.round(totalGross * 0.082); // 8.2% statutory employer match

  // Process Batch Wizard Handler
  const handleExecuteDisbursement = () => {
    setIsProcessingBatch(true);
    setTimeout(() => {
      setIsProcessingBatch(false);
      setIsBatchCompleted(true);
      setPayrollData(prev => prev.map(p => ({ ...p, status: 'Disbursed' })));
      showToast('October 2026 Payroll Batch successfully disbursed via Automated Clearing House (ACH)!', 'success');
    }, 1500);
  };

  const handleExportCSV = () => {
    const headers = ['Employee ID', 'Name', 'Department', 'Role', 'Bank Account', 'Basic ($)', 'HRA ($)', 'Bonus ($)', 'Deductions ($)', 'Net Pay ($)', 'Status'];
    const rows = filtered.map(e => [
      e.id,
      `"${e.name}"`,
      `"${e.dept}"`,
      `"${e.role}"`,
      `"${e.account}"`,
      e.basic,
      e.hra,
      e.bonus,
      e.deductions,
      e.net,
      e.status
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `HRDuo_Payroll_October_2026_${new Date().toISOString().slice(0,10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('Payroll ledger exported as CSV.', 'success');
  };

  return (
    <div className="space-y-6 font-sans">
      {/* Top Header & Enterprise Subtitle */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 border-b border-slate-200/80 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
            <span>Financial Operations</span>
            <ChevronRight size={12} className="text-slate-300" />
            <span className="text-[#00A8A8]">Compensation & Payroll Ledger</span>
          </div>
          <div className="flex items-center gap-3 flex-wrap">
            <h1 className="text-2xl lg:text-3xl font-black text-[#002D62] tracking-tight">
              Payroll & Payout Operations
            </h1>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black bg-blue-50 text-[#002D62] border border-blue-200">
              <CalendarRange size={13} className="text-[#00A8A8]" />
              October 2026 Monthly Cycle
            </span>
          </div>
          <p className="text-sm text-[#334E68] mt-1 max-w-2xl">
            Review earnings, statutory withholdings, automated direct deposit pipelines, and generate certified employee payslips.
          </p>
        </div>

        {/* Global Action CTAs */}
        <div className="flex items-center gap-2.5 flex-wrap">
          <button 
            onClick={handleExportCSV}
            className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-bold text-xs shadow-2xs transition-all cursor-pointer"
          >
            <Download size={14} className="text-slate-500" />
            Export Ledger (.CSV)
          </button>
          
          <button
            onClick={() => {
              setIsRunPayrollOpen(true);
              setPayrollStep(1);
              setIsBatchCompleted(false);
            }}
            className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs shadow-sm hover:shadow-md transition-all cursor-pointer ${
              isBatchCompleted
                ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                : 'bg-gradient-to-r from-[#002D62] to-[#00A8A8] hover:opacity-95 text-white'
            }`}
          >
            {isBatchCompleted ? <CheckCircle2 size={16} /> : <Play size={15} />}
            {isBatchCompleted ? 'Payroll Disbursed!' : 'Run Payroll Batch'}
          </button>
        </div>
      </div>

      {/* 4 Financial KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* KPI 1: Total Net Payroll */}
        <div className="bg-gradient-to-br from-[#002D62] to-[#004085] rounded-2xl p-5 text-white shadow-md relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-teal-200 uppercase tracking-wider">Scheduled Net Payout</span>
            <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-teal-300">
              <DollarSign size={18} />
            </div>
          </div>
          <div className="text-3xl font-black mt-2 tracking-tight">{fmt(totalNet)}</div>
          <div className="text-xs text-white/80 mt-2 flex items-center gap-1.5 font-medium">
            <CheckCircle2 size={13} className="text-teal-300" />
            {payrollData.length} team members · Direct Deposit
          </div>
        </div>

        {/* KPI 2: Total Gross */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs hover:shadow-md transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Total Gross Payroll</span>
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
              <Layers size={18} />
            </div>
          </div>
          <div className="text-3xl font-black text-slate-900 mt-2 tracking-tight">{fmt(totalGross)}</div>
          <div className="text-xs text-slate-500 mt-2 font-medium">
            Includes base, HRA, and incentives
          </div>
        </div>

        {/* KPI 3: Total Deductions */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs hover:shadow-md transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Statutory Deductions</span>
            <div className="w-8 h-8 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center">
              <ShieldCheck size={18} />
            </div>
          </div>
          <div className="text-3xl font-black text-rose-600 mt-2 tracking-tight">-{fmt(totalDeductions)}</div>
          <div className="text-xs text-slate-500 mt-2 font-medium">
            Income Tax (TDS) + PF + Healthcare
          </div>
        </div>

        {/* KPI 4: Employer Contributions */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs hover:shadow-md transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Employer Contributions</span>
            <div className="w-8 h-8 rounded-lg bg-teal-50 text-teal-600 flex items-center justify-center">
              <Wallet size={18} />
            </div>
          </div>
          <div className="text-3xl font-black text-[#00A8A8] mt-2 tracking-tight">{fmt(totalEmployerTaxes)}</div>
          <div className="text-xs text-slate-500 mt-2 font-medium">
            FICA + Medical + Pension matching
          </div>
        </div>
      </div>

      {/* Search & Filter Toolbar */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-2xs space-y-3">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
          {/* Status Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 lg:pb-0">
            {[
              { id: 'All', label: 'All Staff', count: payrollData.length },
              { id: 'Ready', label: 'Ready for Payout', count: payrollData.filter(e => e.status === 'Ready').length },
              { id: 'Disbursed', label: 'Disbursed', count: payrollData.filter(e => e.status === 'Disbursed').length },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setStatusFilter(tab.id)}
                className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                  statusFilter === tab.id
                    ? 'bg-[#002D62] text-white shadow-xs'
                    : 'bg-slate-50 hover:bg-slate-100 text-slate-600 border border-slate-200/60'
                }`}
              >
                <span>{tab.label}</span>
                <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-black ${
                  statusFilter === tab.id ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-700'
                }`}>
                  {tab.count}
                </span>
              </button>
            ))}
          </div>

          {/* Department Filter */}
          <div className="flex items-center gap-2">
            <select
              value={selectedDept}
              onChange={e => setSelectedDept(e.target.value)}
              className="px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-[#00A8A8] cursor-pointer"
            >
              {departments.map(dept => (
                <option key={dept} value={dept}>{dept === 'All' ? 'All Departments' : dept}</option>
              ))}
            </select>

            {(selectedDept !== 'All' || search || statusFilter !== 'All') && (
              <button
                onClick={() => { setSelectedDept('All'); setSearch(''); setStatusFilter('All'); }}
                className="text-xs font-bold text-slate-500 hover:text-slate-800 underline px-2 cursor-pointer"
              >
                Reset
              </button>
            )}
          </div>
        </div>

        {/* Search Field */}
        <div className="relative">
          <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search employee by name, role, department, or staff ID..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-200 text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#00A8A8] placeholder:text-slate-400"
          />
        </div>
      </div>

      {/* Main Payroll Table */}
      <div className="bg-white rounded-2xl shadow-2xs border border-slate-200/80 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-200/70 text-[11px] font-black text-slate-400 uppercase tracking-wider">
                <th className="px-5 py-3.5">Employee & Account</th>
                <th className="px-5 py-3.5 text-right">Base Salary</th>
                <th className="px-5 py-3.5 text-right">HRA / Allowances</th>
                <th className="px-5 py-3.5 text-right">Bonuses</th>
                <th className="px-5 py-3.5 text-right">Deductions</th>
                <th className="px-5 py-3.5 text-right">Net Payable</th>
                <th className="px-5 py-3.5 text-center">Disbursement Status</th>
                <th className="px-5 py-3.5 text-right">Official Payslip</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={8} className="text-center py-12 text-slate-400">
                    <AlertCircle size={28} className="mx-auto mb-2 text-slate-300" />
                    <p className="font-bold text-slate-600">No employee compensation records found</p>
                    <p className="text-xs text-slate-400 mt-1">Try modifying your search or department filters.</p>
                  </td>
                </tr>
              ) : (
                filtered.map((e) => (
                  <tr 
                    key={e.id} 
                    className="hover:bg-slate-50/70 transition-colors group cursor-pointer"
                    onClick={() => setSelectedPayslip(e)}
                  >
                    {/* Employee Profile */}
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-3">
                        <img 
                          src={e.avatar} 
                          alt={e.name} 
                          className="w-9 h-9 rounded-full object-cover shrink-0 ring-1 ring-slate-200" 
                        />
                        <div>
                          <div className="font-bold text-slate-900 group-hover:text-[#002D62] flex items-center gap-1.5">
                            {e.name}
                            <span className="text-[10px] font-mono text-slate-400">({e.id})</span>
                          </div>
                          <div className="text-[11px] text-slate-500 mt-0.5 flex items-center gap-2">
                            <span>{e.role} · {e.dept}</span>
                          </div>
                          <div className="text-[10px] font-mono text-slate-400 flex items-center gap-1 mt-0.5">
                            <CreditCard size={10} className="text-slate-400" />
                            {e.account}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Basic */}
                    <td className="px-5 py-3.5 text-right font-semibold text-slate-700">
                      {fmt(e.basic)}
                    </td>

                    {/* HRA */}
                    <td className="px-5 py-3.5 text-right font-semibold text-slate-700">
                      {fmt(e.hra)}
                    </td>

                    {/* Bonus */}
                    <td className="px-5 py-3.5 text-right">
                      {e.bonus > 0 ? (
                        <span className="inline-block px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 font-bold">
                          +{fmt(e.bonus)}
                        </span>
                      ) : (
                        <span className="text-slate-400">—</span>
                      )}
                    </td>

                    {/* Deductions */}
                    <td className="px-5 py-3.5 text-right">
                      <span className="font-bold text-rose-600">
                        -{fmt(e.deductions)}
                      </span>
                    </td>

                    {/* Net Pay */}
                    <td className="px-5 py-3.5 text-right">
                      <span className="font-black text-sm text-[#002D62]">
                        {fmt(e.net)}
                      </span>
                    </td>

                    {/* Status */}
                    <td className="px-5 py-3.5 text-center">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-extrabold border ${
                        e.status === 'Disbursed' 
                          ? 'bg-emerald-50 text-emerald-700 border-emerald-200' 
                          : 'bg-blue-50 text-[#002D62] border-blue-200'
                      }`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${
                          e.status === 'Disbursed' ? 'bg-emerald-500' : 'bg-[#00A8A8]'
                        }`}></span>
                        {e.status}
                      </span>
                    </td>

                    {/* Action */}
                    <td className="px-5 py-3.5 text-right" onClick={evt => evt.stopPropagation()}>
                      <button
                        onClick={() => setSelectedPayslip(e)}
                        className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold text-xs transition-colors cursor-pointer"
                      >
                        <FileText size={12} className="text-[#00A8A8]" />
                        Payslip
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
            {/* Table Footer Totals */}
            <tfoot className="bg-slate-50/90 border-t-2 border-slate-200 text-xs font-black text-slate-900">
              <tr>
                <td className="px-5 py-4">
                  <div className="font-black text-slate-900">TOTAL BATCH DISBURSEMENT ({filtered.length})</div>
                  <div className="text-[10px] text-slate-400 font-semibold mt-0.5">Automated Net Clearing Pool</div>
                </td>
                <td className="px-5 py-4 text-right font-bold text-slate-700">{fmt(filtered.reduce((s, e) => s + e.basic, 0))}</td>
                <td className="px-5 py-4 text-right font-bold text-slate-700">{fmt(filtered.reduce((s, e) => s + e.hra, 0))}</td>
                <td className="px-5 py-4 text-right font-bold text-emerald-600">+{fmt(filtered.reduce((s, e) => s + e.bonus, 0))}</td>
                <td className="px-5 py-4 text-right font-bold text-rose-600">-{fmt(filtered.reduce((s, e) => s + e.deductions, 0))}</td>
                <td className="px-5 py-4 text-right font-black text-base text-[#002D62]">{fmt(filtered.reduce((s, e) => s + e.net, 0))}</td>
                <td colSpan={2} className="px-5 py-4 text-center text-xs font-bold text-emerald-700">
                  <span className="inline-flex items-center gap-1">
                    <ShieldCheck size={14} /> 100% Tax Compliant
                  </span>
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>

      {/* PORTALED MODAL 1: Run Payroll Multi-Step Wizard */}
      {isRunPayrollOpen && createPortal(
        <div className="fixed inset-0 z-[9999] bg-slate-950/60 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl shadow-2xl border border-slate-100 max-w-xl w-full overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            {/* Modal Header */}
            <div className="p-6 bg-gradient-to-r from-slate-900 via-[#002D62] to-[#00A8A8] text-white flex items-center justify-between">
              <div>
                <div className="text-xs font-bold uppercase tracking-wider text-teal-200">
                  Compensation Execution Wizard
                </div>
                <h3 className="text-xl font-black text-white mt-0.5">Run October 2026 Payroll</h3>
              </div>
              <button
                onClick={() => setIsRunPayrollOpen(false)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
              >
                <X size={16} />
              </button>
            </div>

            {/* Stepper Progress */}
            <div className="bg-slate-50 px-6 py-3 border-b border-slate-200/80 flex items-center justify-between text-xs font-bold">
              {[
                { num: 1, label: 'Attendance Audit' },
                { num: 2, label: 'Tax & Compliance' },
                { num: 3, label: 'ACH Authorization' },
              ].map(st => (
                <div key={st.num} className="flex items-center gap-2">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-black ${
                    payrollStep === st.num 
                      ? 'bg-[#002D62] text-white' 
                      : payrollStep > st.num 
                      ? 'bg-emerald-600 text-white' 
                      : 'bg-slate-200 text-slate-500'
                  }`}>
                    {payrollStep > st.num ? <Check size={12} /> : st.num}
                  </div>
                  <span className={payrollStep >= st.num ? 'text-slate-900 font-extrabold' : 'text-slate-400'}>
                    {st.label}
                  </span>
                </div>
              ))}
            </div>

            {/* Step Contents */}
            <div className="p-6 space-y-4 text-xs font-semibold text-slate-700">
              {payrollStep === 1 && (
                <div className="space-y-4">
                  <div className="p-4 bg-emerald-50/80 rounded-2xl border border-emerald-200/80 flex items-start gap-3">
                    <CheckCircle2 size={20} className="text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <div className="font-extrabold text-emerald-900 text-sm">Timesheets & Hours Verified</div>
                      <div className="text-emerald-700 text-xs mt-1">
                        All 8 active employees have full attendance records and approved time-off reconciled. No unexcused deficit flags found.
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-100">
                      <div className="text-slate-400 text-[11px] uppercase">Eligible Employees</div>
                      <div className="text-lg font-black text-slate-900 mt-1">{payrollData.length} Staff</div>
                    </div>
                    <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-100">
                      <div className="text-slate-400 text-[11px] uppercase">Reconciled Overtime</div>
                      <div className="text-lg font-black text-slate-900 mt-1">$0.00 (Standard)</div>
                    </div>
                  </div>
                </div>
              )}

              {payrollStep === 2 && (
                <div className="space-y-4">
                  <div className="p-4 bg-blue-50/80 rounded-2xl border border-blue-200/80 flex items-start gap-3">
                    <ShieldCheck size={20} className="text-[#002D62] shrink-0 mt-0.5" />
                    <div>
                      <div className="font-extrabold text-[#002D62] text-sm">Statutory Engine Synchronized</div>
                      <div className="text-blue-800 text-xs mt-1">
                        Federal Withholding, Social Security, Medicare, and Provident Fund deductions have been automatically computed based on Q4 2026 tables.
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2 bg-slate-50 p-4 rounded-xl border border-slate-100 text-xs">
                    <div className="flex justify-between py-1 border-b border-slate-200">
                      <span className="text-slate-500">Gross Payroll Amount:</span>
                      <span className="font-bold text-slate-800">{fmt(totalGross)}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-slate-200">
                      <span className="text-slate-500">Total Statutory Withholding:</span>
                      <span className="font-bold text-rose-600">-{fmt(totalDeductions)}</span>
                    </div>
                    <div className="flex justify-between py-1 font-extrabold">
                      <span className="text-slate-900">Total Net Disbursement:</span>
                      <span className="text-[#002D62] font-black">{fmt(totalNet)}</span>
                    </div>
                  </div>
                </div>
              )}

              {payrollStep === 3 && (
                <div className="space-y-4">
                  {isBatchCompleted ? (
                    <div className="text-center py-6 space-y-2">
                      <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-3">
                        <Check size={28} />
                      </div>
                      <h4 className="text-lg font-black text-slate-900">Disbursement Complete!</h4>
                      <p className="text-xs text-slate-500 max-w-sm mx-auto">
                        Transaction reference <code className="font-mono bg-slate-100 px-1 py-0.5 rounded">ACH-2026-10-8841</code> queued for automated settlement on Nov 05, 2026.
                      </p>
                    </div>
                  ) : (
                    <>
                      <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200 flex items-start gap-3">
                        <AlertCircle size={20} className="text-amber-600 shrink-0 mt-0.5" />
                        <div>
                          <div className="font-extrabold text-amber-900 text-sm">Final Disbursement Authorization</div>
                          <div className="text-amber-800 text-xs mt-1">
                            Clicking "Disburse ACH Payouts" will initiate bank transfer instructions for {fmt(totalNet)} across {payrollData.length} verified accounts.
                          </div>
                        </div>
                      </div>

                      <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-between text-xs">
                        <span className="text-slate-500">Authorized Officer:</span>
                        <span className="font-bold text-slate-900">Claire Bennett (Head of People)</span>
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>

            {/* Modal Actions */}
            <div className="p-5 bg-slate-50 border-t border-slate-100 flex items-center justify-between gap-3">
              <button
                onClick={() => setIsRunPayrollOpen(false)}
                className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-200 transition-colors cursor-pointer"
              >
                {isBatchCompleted ? 'Done & Close' : 'Cancel'}
              </button>

              <div className="flex items-center gap-2">
                {payrollStep > 1 && !isBatchCompleted && (
                  <button
                    onClick={() => setPayrollStep(prev => prev - 1)}
                    className="px-4 py-2 rounded-xl border border-slate-200 hover:bg-slate-100 text-slate-700 text-xs font-bold transition-colors cursor-pointer"
                  >
                    Back
                  </button>
                )}

                {payrollStep < 3 && (
                  <button
                    onClick={() => setPayrollStep(prev => prev + 1)}
                    className="px-4 py-2 rounded-xl bg-[#002D62] hover:bg-[#001f44] text-white text-xs font-bold shadow-xs transition-colors cursor-pointer flex items-center gap-1.5"
                  >
                    Continue <ChevronRight size={14} />
                  </button>
                )}

                {payrollStep === 3 && !isBatchCompleted && (
                  <button
                    onClick={handleExecuteDisbursement}
                    disabled={isProcessingBatch}
                    className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-extrabold shadow-md transition-all cursor-pointer flex items-center gap-2 disabled:opacity-50"
                  >
                    {isProcessingBatch ? (
                      <>
                        <RefreshCw size={14} className="animate-spin" />
                        Transmitting to Federal ACH...
                      </>
                    ) : (
                      <>
                        <Play size={14} />
                        Disburse ACH Payouts ({fmt(totalNet)})
                      </>
                    )}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}

      {/* PORTALED MODAL 2: Official Employee Payslip View */}
      {selectedPayslip && createPortal(
        <div className="fixed inset-0 z-[9999] bg-slate-950/60 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl shadow-2xl border border-slate-100 max-w-2xl w-full overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            {/* Payslip Header Bar */}
            <div className="p-6 bg-gradient-to-r from-slate-900 to-[#002D62] text-white flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-teal-300">
                  <FileText size={22} />
                </div>
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-teal-300">Official Compensation Document</div>
                  <h3 className="text-lg font-black text-white">Payslip · October 2026</h3>
                </div>
              </div>
              <button
                onClick={() => setSelectedPayslip(null)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
              >
                <X size={16} />
              </button>
            </div>

            {/* Payslip Document Body */}
            <div className="p-6 sm:p-8 space-y-6 text-xs text-slate-700 font-sans">
              {/* Corporate Letterhead Header */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pb-6 border-b border-slate-200/80 gap-3">
                <div>
                  <div className="text-xl font-black text-[#002D62] tracking-tight">HRDuo Technologies Inc.</div>
                  <p className="text-[11px] text-slate-400 mt-0.5">500 Howard Street, Suite 400 · San Francisco, CA 94105</p>
                  <p className="text-[10px] text-slate-400 font-mono">Tax ID: US-EIN-992-04812 · NAICS: 541511</p>
                </div>
                <div className="text-left sm:text-right bg-blue-50/60 p-3 rounded-xl border border-blue-100">
                  <div className="text-[10px] uppercase font-bold text-slate-400">Pay Period</div>
                  <div className="font-extrabold text-[#002D62] text-xs">Oct 01, 2026 – Oct 31, 2026</div>
                  <div className="text-[10px] text-slate-500 font-medium">Disbursed on Nov 05, 2026</div>
                </div>
              </div>

              {/* Employee Summary Card */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-50 p-4 rounded-2xl border border-slate-100 text-xs">
                <div>
                  <div className="text-[10px] font-bold text-slate-400 uppercase">Employee Name</div>
                  <div className="font-bold text-slate-900 mt-0.5">{selectedPayslip.name}</div>
                  <div className="text-[10px] font-mono text-slate-500">{selectedPayslip.id}</div>
                </div>
                <div>
                  <div className="text-[10px] font-bold text-slate-400 uppercase">Designation</div>
                  <div className="font-bold text-slate-900 mt-0.5">{selectedPayslip.role}</div>
                  <div className="text-[10px] text-slate-500">{selectedPayslip.dept}</div>
                </div>
                <div>
                  <div className="text-[10px] font-bold text-slate-400 uppercase">Disbursement Mode</div>
                  <div className="font-bold text-slate-900 mt-0.5">Direct Deposit</div>
                  <div className="text-[10px] font-mono text-slate-500">{selectedPayslip.account}</div>
                </div>
                <div>
                  <div className="text-[10px] font-bold text-slate-400 uppercase">Statutory PAN/Tax ID</div>
                  <div className="font-bold text-slate-900 mt-0.5">{selectedPayslip.taxId}</div>
                  <div className="text-[10px] text-emerald-600 font-bold">100% Tax Compliant</div>
                </div>
              </div>

              {/* Earnings vs Deductions Breakdown Columns */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Earnings Column */}
                <div className="border border-slate-200/80 rounded-2xl p-4">
                  <div className="text-xs font-black text-emerald-800 uppercase tracking-wider pb-2 border-b border-slate-100 flex items-center justify-between">
                    <span>Earnings</span>
                    <span>Amount</span>
                  </div>
                  <div className="space-y-2.5 pt-3">
                    <div className="flex justify-between">
                      <span className="text-slate-600">Base Salary</span>
                      <span className="font-bold text-slate-900">{fmt(selectedPayslip.basic)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">House Rent Allowance (HRA)</span>
                      <span className="font-bold text-slate-900">{fmt(selectedPayslip.hra)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Performance Incentive / Bonus</span>
                      <span className="font-bold text-emerald-600">{fmt(selectedPayslip.bonus)}</span>
                    </div>
                    <div className="flex justify-between pt-2 border-t border-slate-100 font-black text-slate-900">
                      <span>Total Gross Earnings</span>
                      <span className="text-emerald-700">{fmt(selectedPayslip.basic + selectedPayslip.hra + selectedPayslip.bonus)}</span>
                    </div>
                  </div>
                </div>

                {/* Deductions Column */}
                <div className="border border-slate-200/80 rounded-2xl p-4">
                  <div className="text-xs font-black text-rose-800 uppercase tracking-wider pb-2 border-b border-slate-100 flex items-center justify-between">
                    <span>Statutory Deductions</span>
                    <span>Amount</span>
                  </div>
                  <div className="space-y-2.5 pt-3">
                    <div className="flex justify-between">
                      <span className="text-slate-600">Income Tax (TDS / Federal)</span>
                      <span className="font-bold text-slate-900">{fmt(Math.round(selectedPayslip.deductions * 0.65))}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Provident Fund (PF / 401k)</span>
                      <span className="font-bold text-slate-900">{fmt(Math.round(selectedPayslip.deductions * 0.25))}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Medical Insurance Pool</span>
                      <span className="font-bold text-slate-900">{fmt(Math.round(selectedPayslip.deductions * 0.10))}</span>
                    </div>
                    <div className="flex justify-between pt-2 border-t border-slate-100 font-black text-slate-900">
                      <span>Total Deductions</span>
                      <span className="text-rose-600">-{fmt(selectedPayslip.deductions)}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Net Payable Highlight Card */}
              <div className="p-4 bg-gradient-to-r from-blue-50 via-teal-50/50 to-emerald-50 rounded-2xl border border-blue-200/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div>
                  <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Net Disbursed Take-Home</div>
                  <div className="text-2xl font-black text-[#002D62] mt-0.5">{fmt(selectedPayslip.net)}</div>
                  <div className="text-[11px] text-slate-500 font-medium italic mt-0.5">
                    Transferred to {selectedPayslip.account}
                  </div>
                </div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white shadow-2xs border border-emerald-200 text-emerald-700 text-xs font-bold">
                  <CheckCircle2 size={14} className="text-emerald-500" />
                  Direct Deposit Authorized
                </div>
              </div>

              <div className="text-[10px] text-slate-400 text-center">
                This is a computer-generated salary advice and requires no physical signature under the Electronic Transactions Act.
              </div>
            </div>

            {/* Modal Actions */}
            <div className="p-5 bg-slate-50 border-t border-slate-100 flex items-center justify-between gap-3">
              <button
                onClick={() => setSelectedPayslip(null)}
                className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-200 transition-colors cursor-pointer"
              >
                Close Document
              </button>
              
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    window.print();
                  }}
                  className="px-4 py-2 rounded-xl border border-slate-200 hover:bg-slate-100 text-slate-700 text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <Printer size={14} />
                  Print Payslip
                </button>
                <button
                  onClick={() => {
                    showToast(`Downloading official payslip for ${selectedPayslip.name}...`, 'success');
                  }}
                  className="px-4 py-2 rounded-xl bg-[#00A8A8] hover:bg-[#008f8f] text-white text-xs font-bold shadow-xs transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <Download size={14} />
                  Download PDF
                </button>
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
}
