import React, { useState } from 'react';
import { Wallet, Download, CheckCircle2, DollarSign, Building, FileText, ArrowDownRight, ArrowUpRight } from 'lucide-react';

export default function EmployeeSalary() {
  const [downloadingId, setDownloadingId] = useState(null);

  const payslips = [
    { id: 'PS-2026-10', month: 'October 2026', gross: '$6,400.00', deductions: '$580.00', net: '$5,820.00', status: 'Paid', payDate: 'Oct 31, 2026' },
    { id: 'PS-2026-09', month: 'September 2026', gross: '$6,400.00', deductions: '$580.00', net: '$5,820.00', status: 'Paid', payDate: 'Sep 30, 2026' },
    { id: 'PS-2026-08', month: 'August 2026', gross: '$6,400.00', deductions: '$580.00', net: '$5,820.00', status: 'Paid', payDate: 'Aug 31, 2026' },
    { id: 'PS-2026-07', month: 'July 2026', gross: '$6,400.00', deductions: '$580.00', net: '$5,820.00', status: 'Paid', payDate: 'Jul 31, 2026' },
  ];

  const handleDownload = (id) => {
    setDownloadingId(id);
    setTimeout(() => {
      setDownloadingId(null);
      alert(`Payslip ${id} downloaded successfully!`);
    }, 1200);
  };

  return (
    <div className="space-y-4 sm:space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            <Wallet className="w-6 h-6 sm:w-7 h-7 text-emerald-600" />
            My Salary & Compensation
          </h1>
          <p className="text-slate-500 text-xs sm:text-sm mt-0.5">
            Detailed view of your monthly earnings, statutory deductions, bank transfer records, and payslips.
          </p>
        </div>

        <button
          onClick={() => handleDownload('PS-2026-10')}
          className="px-4 py-2 sm:px-5 sm:py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm rounded-xl flex items-center justify-center gap-2 shadow-sm transition-all self-start sm:self-auto"
        >
          <Download className="w-4 h-4" />
          {downloadingId === 'PS-2026-10' ? 'Generating PDF...' : 'Download Latest Payslip'}
        </button>
      </div>

      {/* Current Month Breakdown Card */}
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
                <span className="text-slate-600">Internet & Utility Reimbursement</span>
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

      {/* Historical Payslips */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-4 sm:p-5 border-b border-slate-100">
          <h2 className="text-sm sm:text-base font-bold text-slate-900">Historical Payslip Records</h2>
        </div>

        {/* Mobile Payslip Cards (< md) */}
        <div className="block md:hidden divide-y divide-slate-100">
          {payslips.map((p) => (
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

              <button
                onClick={() => handleDownload(p.id)}
                className="w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
              >
                <Download size={14} />
                {downloadingId === p.id ? 'Downloading...' : 'Download Payslip PDF'}
              </button>
            </div>
          ))}
        </div>

        {/* Desktop Table (md+) */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="bg-slate-50/70 border-b border-slate-100 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                <th className="py-3 px-5">Slip ID</th>
                <th className="py-3 px-4">Pay Period</th>
                <th className="py-3 px-4">Gross Earnings</th>
                <th className="py-3 px-4">Deductions</th>
                <th className="py-3 px-4">Net Salary</th>
                <th className="py-3 px-4">Disbursed Date</th>
                <th className="py-3 px-5 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {payslips.map((p) => (
                <tr key={p.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-4 px-5 font-mono text-xs font-bold text-slate-600">{p.id}</td>
                  <td className="py-4 px-4 font-bold text-slate-900">{p.month}</td>
                  <td className="py-4 px-4 text-slate-600">{p.gross}</td>
                  <td className="py-4 px-4 text-rose-600">{p.deductions}</td>
                  <td className="py-4 px-4 font-black text-emerald-600">{p.net}</td>
                  <td className="py-4 px-4 text-xs text-slate-500">{p.payDate}</td>
                  <td className="py-4 px-5 text-right">
                    <button
                      onClick={() => handleDownload(p.id)}
                      className="px-3 py-1.5 border border-slate-200 hover:border-slate-300 rounded-lg text-xs font-bold text-slate-700 inline-flex items-center gap-1.5 transition-colors"
                    >
                      <Download className="w-3.5 h-3.5 text-slate-500" />
                      {downloadingId === p.id ? 'Saving...' : 'PDF Slip'}
                    </button>
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
