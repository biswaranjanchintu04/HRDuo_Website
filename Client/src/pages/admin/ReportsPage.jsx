import React from 'react';
import { BarChart3, Download, TrendingUp, Users, CalendarCheck, Wallet } from 'lucide-react';

const monthlyAttendance = [
  { month: 'May', pct: 91 }, { month: 'Jun', pct: 88 }, { month: 'Jul', pct: 92 },
  { month: 'Aug', pct: 90 }, { month: 'Sep', pct: 87 }, { month: 'Oct', pct: 93 },
];

const deptPerf = [
  { dept: 'Engineering', attendance: 92, onTime: 88, overtime: 14 },
  { dept: 'Sales', attendance: 89, onTime: 82, overtime: 8 },
  { dept: 'HR & Admin', attendance: 95, onTime: 94, overtime: 3 },
  { dept: 'Marketing', attendance: 85, onTime: 80, overtime: 5 },
  { dept: 'Finance', attendance: 90, onTime: 89, overtime: 2 },
  { dept: 'Operations', attendance: 88, onTime: 83, overtime: 18 },
];

const payrollTrend = [
  { month: 'May', amount: 178000 }, { month: 'Jun', amount: 181000 }, { month: 'Jul', amount: 183000 },
  { month: 'Aug', amount: 180000 }, { month: 'Sep', amount: 184000 }, { month: 'Oct', amount: 186400 },
];

const maxPayroll = Math.max(...payrollTrend.map(p => p.amount));

export default function ReportsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900">Reports & Analytics</h1>
          <p className="text-sm text-slate-500 mt-1">Organization-wide performance and workforce insights.</p>
        </div>
        <button className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-4 py-2.5 rounded-xl font-bold text-sm transition-colors">
          <Download size={15} />
          Download Report
        </button>
      </div>

      {/* Summary KPIs */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: 'Avg. Attendance', value: '90.8%', icon: CalendarCheck, color: 'bg-emerald-500' },
          { label: 'Headcount', value: '248', icon: Users, color: 'bg-blue-500' },
          { label: 'Payroll (Oct)', value: '$186.4K', icon: Wallet, color: 'bg-amber-500' },
          { label: 'Attrition (YTD)', value: '3.2%', icon: TrendingUp, color: 'bg-violet-500' },
        ].map(k => {
          const Icon = k.icon;
          return (
            <div key={k.label} className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
              <div className={`w-9 h-9 ${k.color} rounded-xl flex items-center justify-center mb-3`}>
                <Icon size={16} className="text-white" />
              </div>
              <div className="text-2xl font-black text-slate-900">{k.value}</div>
              <div className="text-xs text-slate-500 font-medium mt-1">{k.label}</div>
            </div>
          );
        })}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Attendance Bar */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
          <h2 className="font-black text-slate-900 mb-5">Monthly Attendance Rate (%)</h2>
          <div className="flex items-end gap-3 h-40">
            {monthlyAttendance.map((m) => (
              <div key={m.month} className="flex-1 flex flex-col items-center gap-1">
                <div className="text-xs font-bold text-slate-700">{m.pct}%</div>
                <div
                  className="w-full bg-blue-500 rounded-t-lg transition-all hover:bg-blue-600"
                  style={{ height: `${(m.pct - 80) * 10}px` }}
                />
                <div className="text-xs text-slate-400">{m.month}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Payroll Trend */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
          <h2 className="font-black text-slate-900 mb-5">Payroll Trend ($)</h2>
          <div className="flex items-end gap-3 h-40">
            {payrollTrend.map((p) => (
              <div key={p.month} className="flex-1 flex flex-col items-center gap-1">
                <div className="text-xs font-bold text-slate-700">${(p.amount / 1000).toFixed(0)}K</div>
                <div
                  className="w-full bg-amber-400 rounded-t-lg transition-all hover:bg-amber-500"
                  style={{ height: `${(p.amount / maxPayroll) * 120}px` }}
                />
                <div className="text-xs text-slate-400">{p.month}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Department Performance */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
        <h2 className="font-black text-slate-900 mb-5">Department Performance</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-xs text-slate-400 font-bold uppercase tracking-wider border-b border-slate-100">
                <th className="text-left pb-3">Department</th>
                <th className="text-right pb-3">Attendance %</th>
                <th className="text-right pb-3">On-Time %</th>
                <th className="text-right pb-3">Overtime (hrs avg)</th>
                <th className="pb-3">Trend</th>
              </tr>
            </thead>
            <tbody>
              {deptPerf.map((d, i) => (
                <tr key={i} className="border-t border-slate-50 hover:bg-slate-50/50">
                  <td className="py-3.5 font-semibold text-slate-900">{d.dept}</td>
                  <td className="py-3.5 text-right font-bold text-emerald-600">{d.attendance}%</td>
                  <td className="py-3.5 text-right font-bold text-blue-600">{d.onTime}%</td>
                  <td className="py-3.5 text-right text-slate-700">{d.overtime}h</td>
                  <td className="py-3.5">
                    <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${d.attendance}%` }} />
                    </div>
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
