import React from 'react';
import { Link } from 'react-router-dom';
import {
  Users, CalendarCheck, CalendarRange, Wallet, UserPlus,
  Megaphone, ArrowRight, CheckCircle2, Clock, AlertCircle,
  Briefcase, TrendingUp, Sparkles, Award
} from 'lucide-react';

export default function HRDashboard() {
  const stats = [
    { label: 'Total Employees', value: '142', sub: '+8 hired this month', icon: Users, color: 'bg-rose-50 text-rose-600' },
    { label: 'Present Today', value: '131', sub: '92.2% on-time punch', icon: CalendarCheck, color: 'bg-emerald-50 text-emerald-600' },
    { label: 'Pending Leaves', value: '7', sub: 'Requires HR signoff', icon: CalendarRange, color: 'bg-amber-50 text-amber-600' },
    { label: 'Open Positions', value: '5', sub: '24 candidate resumes', icon: UserPlus, color: 'bg-purple-50 text-purple-600' },
  ];

  const recentHires = [
    { name: 'Devon Lane', role: 'Full Stack Engineer', dept: 'Engineering', date: 'Joined Oct 24', avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80' },
    { name: 'Jane Cooper', role: 'UX Researcher', dept: 'Product Design', date: 'Joined Oct 20', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80' },
    { name: 'Robert Fox', role: 'DevOps Specialist', dept: 'Cloud Ops', date: 'Joined Oct 15', avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=100&auto=format&fit=crop&q=80' },
  ];

  const pendingApprovals = [
    { employee: 'Raj Mehta', dept: 'Engineering', type: 'Casual Leave', dates: 'Nov 4 - Nov 6 (3 days)', priority: 'Normal' },
    { employee: 'Linda Cho', dept: 'Design', type: 'Sick Leave', dates: 'Nov 1 - Nov 2 (2 days)', priority: 'Urgent' },
    { employee: 'Michael Chang', dept: 'Finance', type: 'Work From Home', dates: 'Oct 28 (1 day)', priority: 'Normal' },
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Hero Welcome Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-rose-600 via-rose-700 to-pink-700 text-white p-7 md:p-9 shadow-lg shadow-rose-900/10">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-bold mb-3 tracking-wide uppercase">
              <Sparkles className="w-3.5 h-3.5" /> Human Resources Management Center
            </div>
            <h1 className="text-2xl md:text-3xl font-black tracking-tight">
              HR Operations & People Hub
            </h1>
            <p className="text-rose-100 text-sm mt-1 max-w-xl">
              Manage organization hiring, payroll approvals, leave reconciliations, and compliance monitoring from a single operational console.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              to="/hr/recruitment"
              className="px-5 py-3 rounded-2xl bg-white text-rose-800 font-bold text-sm flex items-center gap-2 hover:bg-rose-50 transition-all shadow-md hover:scale-105 transform active:scale-95"
            >
              <UserPlus className="w-4 h-4 text-rose-600" />
              Recruitment Pipeline
            </Link>
            <Link
              to="/hr/payroll"
              className="px-5 py-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-white font-semibold text-sm flex items-center gap-2 hover:bg-white/20 transition-all"
            >
              <Wallet className="w-4 h-4" />
              Run Oct Payroll
            </Link>
          </div>
        </div>

        {/* Ambient background ring */}
        <div className="absolute -right-10 -bottom-10 w-72 h-72 rounded-full bg-white/10 blur-2xl pointer-events-none" />
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s, idx) => {
          const Icon = s.icon;
          return (
            <div
              key={idx}
              className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">{s.label}</span>
                <div className={`p-2.5 rounded-xl ${s.color}`}>
                  <Icon className="w-5 h-5" />
                </div>
              </div>
              <div className="text-2xl font-black text-slate-900 tracking-tight">{s.value}</div>
              <div className="text-xs text-slate-500 font-medium mt-1">{s.sub}</div>
            </div>
          );
        })}
      </div>

      {/* Middle Row: Pending Approvals & New Hires */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Pending Approvals */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="text-base font-black text-slate-900 flex items-center gap-2">
                <CalendarRange className="w-5 h-5 text-rose-600" />
                Leave Approvals Awaiting HR Confirmation
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">Manager pre-approved requests pending final HR compliance authorization</p>
            </div>
            <Link
              to="/hr/leaves"
              className="text-xs font-bold text-rose-600 hover:text-rose-700 flex items-center gap-1"
            >
              View all <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="space-y-3">
            {pendingApprovals.map((req, idx) => (
              <div key={idx} className="p-4 rounded-xl border border-slate-100 bg-slate-50/50 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-slate-50 transition-colors">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-slate-900">{req.employee}</span>
                    <span className="text-xs text-slate-400">• {req.dept}</span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      req.priority === 'Urgent' ? 'bg-rose-100 text-rose-700' : 'bg-slate-200 text-slate-700'
                    }`}>
                      {req.priority}
                    </span>
                  </div>
                  <div className="text-xs text-slate-600 mt-1">
                    <strong className="text-slate-800">{req.type}</strong> — {req.dates}
                  </div>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-auto">
                  <button className="px-3 py-1.5 text-xs font-bold text-slate-600 hover:bg-slate-200/70 rounded-lg transition-colors">
                    Decline
                  </button>
                  <button className="px-3.5 py-1.5 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold rounded-lg shadow-sm transition-colors">
                    Approve
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Joinees */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Award className="w-5 h-5 text-rose-600" />
              New Joiners This Month
            </h3>
            <Link to="/hr/employees" className="text-xs font-bold text-rose-600 hover:underline">
              Directory →
            </Link>
          </div>

          <div className="space-y-3">
            {recentHires.map((h, idx) => (
              <div key={idx} className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-slate-50 transition-colors">
                <img src={h.avatar} alt={h.name} className="w-10 h-10 rounded-full object-cover" />
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-bold text-slate-900 truncate">{h.name}</div>
                  <div className="text-xs text-slate-500 truncate">{h.role} • {h.dept}</div>
                </div>
                <div className="text-[11px] font-medium text-slate-400 whitespace-nowrap">
                  {h.date}
                </div>
              </div>
            ))}
          </div>

          <div className="pt-2 border-t border-slate-100">
            <Link
              to="/hr/recruitment"
              className="w-full py-2.5 bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 transition-colors"
            >
              <UserPlus className="w-4 h-4" />
              Post New Job Requisition
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
