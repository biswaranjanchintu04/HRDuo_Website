import React from 'react';
import {
  Users, CalendarCheck, Wallet, TrendingUp, UserPlus, Clock,
  AlertCircle, CheckCircle2, BarChart3, ArrowUpRight, Bell, Award
} from 'lucide-react';

const stats = [
  { label: 'Total Employees', value: '248', change: '+3 this month', icon: Users, color: 'bg-blue-500', light: 'bg-blue-50 text-blue-700' },
  { label: 'Present Today', value: '219', change: '88.3% attendance', icon: CalendarCheck, color: 'bg-emerald-500', light: 'bg-emerald-50 text-emerald-700' },
  { label: 'On Leave', value: '14', change: '5 pending approval', icon: Clock, color: 'bg-amber-500', light: 'bg-amber-50 text-amber-700' },
  { label: 'Payroll (Oct)', value: '$186,400', change: 'Processed Oct 28', icon: Wallet, color: 'bg-violet-500', light: 'bg-violet-50 text-violet-700' },
];

const recentActivity = [
  { type: 'hire', msg: 'New employee Priya Sharma onboarded — Engineering', time: '1h ago', icon: UserPlus, color: 'text-emerald-600 bg-emerald-50' },
  { type: 'leave', msg: 'Leave request from Raj Mehta approved (Nov 4–6)', time: '2h ago', icon: CheckCircle2, color: 'text-blue-600 bg-blue-50' },
  { type: 'alert', msg: 'Marcus Lee has 4 consecutive late check-ins', time: '3h ago', icon: AlertCircle, color: 'text-amber-600 bg-amber-50' },
  { type: 'payroll', msg: 'October payroll processed — 248 employees', time: '1d ago', icon: Wallet, color: 'text-violet-600 bg-violet-50' },
  { type: 'award', msg: 'Sarah Jenkins recognized as Employee of the Month', time: '2d ago', icon: Award, color: 'text-rose-600 bg-rose-50' },
];

const deptData = [
  { dept: 'Engineering', employees: 82, present: 75, pct: 91 },
  { dept: 'Sales', employees: 45, present: 40, pct: 89 },
  { dept: 'HR & Admin', employees: 18, present: 16, pct: 89 },
  { dept: 'Marketing', employees: 31, present: 26, pct: 84 },
  { dept: 'Finance', employees: 22, present: 19, pct: 86 },
  { dept: 'Operations', employees: 50, present: 43, pct: 86 },
];

const pendingLeaves = [
  { name: 'Raj Mehta', dept: 'Engineering', type: 'Casual', from: 'Nov 4', to: 'Nov 6', days: 3 },
  { name: 'Anita Roy', dept: 'Marketing', type: 'Sick', from: 'Nov 1', to: 'Nov 2', days: 2 },
  { name: 'David Kim', dept: 'Sales', type: 'Annual', from: 'Nov 10', to: 'Nov 14', days: 5 },
];

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900">HR Dashboard</h1>
          <p className="text-sm text-slate-500 mt-1">Monday, October 26, 2026 — Have a productive day!</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="inline-flex items-center gap-2 bg-[#FFC933] hover:bg-amber-400 text-slate-950 px-4 py-2.5 rounded-xl font-bold text-sm shadow-sm transition-colors">
            <UserPlus size={15} />
            Add Employee
          </button>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {stats.map((s) => {
          const Icon = s.icon;
          return (
            <div key={s.label} className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-10 h-10 ${s.color} rounded-xl flex items-center justify-center`}>
                  <Icon size={18} className="text-white" />
                </div>
                <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${s.light}`}>
                  {s.change}
                </span>
              </div>
              <div className="text-2xl font-black text-slate-900">{s.value}</div>
              <div className="text-xs text-slate-500 font-medium mt-1">{s.label}</div>
            </div>
          );
        })}
      </div>

      {/* Middle Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Department Attendance */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-slate-100 p-5">
          <h2 className="font-black text-slate-900 mb-5">Department Attendance Today</h2>
          <div className="space-y-4">
            {deptData.map((d) => (
              <div key={d.dept} className="flex items-center gap-4">
                <div className="w-32 text-sm font-semibold text-slate-700 shrink-0">{d.dept}</div>
                <div className="flex-1 h-2.5 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all ${d.pct >= 90 ? 'bg-emerald-500' : d.pct >= 80 ? 'bg-amber-500' : 'bg-red-500'}`}
                    style={{ width: `${d.pct}%` }}
                  />
                </div>
                <div className="text-sm font-bold text-slate-900 w-10 text-right">{d.pct}%</div>
                <div className="text-xs text-slate-400 w-16 text-right">{d.present}/{d.employees}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Pending Leaves */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-black text-slate-900">Pending Leaves</h2>
            <span className="text-xs font-bold bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full">{pendingLeaves.length} pending</span>
          </div>
          <div className="space-y-3">
            {pendingLeaves.map((l, i) => (
              <div key={i} className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                <div className="font-bold text-sm text-slate-900">{l.name}</div>
                <div className="text-xs text-slate-500 mb-2">{l.dept} · {l.type} Leave · {l.days} days</div>
                <div className="text-xs text-slate-600 mb-3">{l.from} – {l.to}</div>
                <div className="flex gap-2">
                  <button className="flex-1 py-1.5 text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors">Approve</button>
                  <button className="flex-1 py-1.5 text-xs font-bold bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-lg transition-colors">Decline</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-5">
        <h2 className="font-black text-slate-900 mb-4 flex items-center gap-2">
          <Bell size={16} className="text-slate-400" />
          Recent Activity
        </h2>
        <div className="space-y-3">
          {recentActivity.map((a, i) => {
            const Icon = a.icon;
            return (
              <div key={i} className="flex items-start gap-3 py-2 border-b border-slate-50 last:border-0">
                <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${a.color}`}>
                  <Icon size={14} />
                </div>
                <div className="flex-1 text-sm text-slate-700 font-medium">{a.msg}</div>
                <span className="text-xs text-slate-400 shrink-0">{a.time}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
