import React from 'react';
import { CalendarRange, PieChart, CheckCircle2, Clock, AlertCircle, Plus, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useHRMS } from '../../context/HRMSContext';

export default function EmployeeLeaveBalance() {
  const { employees, leaves } = useHRMS();
  const profile = employees.find(e => e.id === 'EMP001') || {
    name: 'Sophia Chen',
    leaveBalance: { casual: 7, sick: 9, annual: 12, total: 28 }
  };

  const leaveTypes = [
    { name: 'Casual Leave (CL)', available: 7, total: 10, used: 3, color: 'text-blue-600', bar: 'bg-blue-600', policy: 'Maximum 3 consecutive days per application.' },
    { name: 'Sick / Medical Leave (SL)', available: 9, total: 12, used: 3, color: 'text-rose-600', bar: 'bg-rose-600', policy: 'Medical certificate required for > 2 days.' },
    { name: 'Annual Paid Vacation (PL)', available: 12, total: 18, used: 6, color: 'text-emerald-600', bar: 'bg-emerald-600', policy: 'Carry forward up to 8 days into next fiscal year.' },
    { name: 'Compensatory Off (Comp-Off)', available: 2, total: 2, used: 0, color: 'text-purple-600', bar: 'bg-purple-600', policy: 'Valid within 90 days of weekend on-call work.' }
  ];

  return (
    <div className="space-y-6 max-w-5xl">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">Leave Balance & Entitlements</h1>
          <p className="text-sm text-slate-500 mt-1">
            Statutory time-off quotas, consumption breakdown, and company absence policies.
          </p>
        </div>
        <Link
          to="/employee/leaves"
          className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-xl font-bold text-xs shadow-md shadow-blue-500/20 transition-all"
        >
          <Plus size={14} />
          <span>Apply for Time Off</span>
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {leaveTypes.map((t) => (
          <div
            key={t.name}
            className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Quota Type</span>
              <h3 className="text-xs font-black text-slate-900">{t.name}</h3>

              <div className="my-4">
                <div className="text-3xl font-black text-slate-900">{t.available} <span className="text-xs text-slate-400 font-medium">/ {t.total} Days</span></div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden mt-2">
                  <div className={`h-full rounded-full ${t.bar}`} style={{ width: `${(t.available / t.total) * 100}%` }} />
                </div>
              </div>

              <p className="text-[11px] text-slate-500 leading-relaxed">{t.policy}</p>
            </div>

            <div className="pt-3 mt-3 border-t border-slate-100 text-[10px] text-slate-400 font-medium">
              {t.used} Days Consumed in 2026
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
