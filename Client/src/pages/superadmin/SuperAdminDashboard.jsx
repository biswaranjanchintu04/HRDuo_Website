import React from 'react';
import {
  Building2, Users, CreditCard, TrendingUp, AlertTriangle,
  CheckCircle2, Clock, MoreHorizontal, ArrowUpRight, Globe,
  ShieldCheck, Activity, DollarSign, Zap
} from 'lucide-react';

const stats = [
  { label: 'Total Organizations', value: '1,284', change: '+12', changeType: 'up', icon: Building2, color: 'bg-blue-500', light: 'bg-blue-50 text-blue-700' },
  { label: 'Active Subscriptions', value: '1,091', change: '+8', changeType: 'up', icon: CreditCard, color: 'bg-emerald-500', light: 'bg-emerald-50 text-emerald-700' },
  { label: 'Total Employees', value: '48,239', change: '+1.2k', changeType: 'up', icon: Users, color: 'bg-violet-500', light: 'bg-violet-50 text-violet-700' },
  { label: 'MRR', value: '$94,210', change: '+6.4%', changeType: 'up', icon: DollarSign, color: 'bg-amber-500', light: 'bg-amber-50 text-amber-700' },
];

const recentOrgs = [
  { name: 'TechVision Labs', plan: 'Enterprise', employees: 248, status: 'Active', joined: 'Oct 24, 2026' },
  { name: 'Greenfield Corp', plan: 'Professional', employees: 92, status: 'Active', joined: 'Oct 22, 2026' },
  { name: 'Nexus Solutions', plan: 'Starter', employees: 14, status: 'Trial', joined: 'Oct 20, 2026' },
  { name: 'Apex Analytics', plan: 'Enterprise', employees: 510, status: 'Active', joined: 'Oct 18, 2026' },
  { name: 'CloudBase Inc', plan: 'Professional', employees: 67, status: 'Suspended', joined: 'Oct 15, 2026' },
];

const systemAlerts = [
  { type: 'warning', msg: 'CloudBase Inc subscription payment failed (retry in 2 days)', time: '2h ago' },
  { type: 'info', msg: 'New enterprise org "TechVision Labs" onboarded successfully', time: '6h ago' },
  { type: 'success', msg: 'System backup completed — all 1,284 tenant snapshots saved', time: '12h ago' },
  { type: 'warning', msg: '3 organizations approaching storage quota (>90%)', time: '1d ago' },
];

const planDist = [
  { plan: 'Enterprise', count: 312, pct: 24, color: 'bg-blue-500' },
  { plan: 'Professional', count: 589, pct: 46, color: 'bg-violet-500' },
  { plan: 'Starter', count: 383, pct: 30, color: 'bg-slate-300' },
];

const statusColor = {
  Active: 'bg-emerald-100 text-emerald-700',
  Trial: 'bg-amber-100 text-amber-700',
  Suspended: 'bg-red-100 text-red-700',
};

export default function SuperAdminDashboard() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900">Platform Overview</h1>
          <p className="text-sm text-slate-500 mt-1">Monitor all tenants, revenue, and system health in real time.</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 bg-emerald-50 text-emerald-700 text-xs font-bold px-3 py-1.5 rounded-full border border-emerald-200">
            <Activity size={13} />
            All Systems Operational
          </div>
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
                  {s.change} this month
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
        {/* Recent Organizations */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-slate-100">
          <div className="flex items-center justify-between p-5 border-b border-slate-100">
            <h2 className="font-black text-slate-900">Recent Organizations</h2>
            <button className="text-xs text-blue-600 font-bold hover:underline">View all →</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-xs text-slate-400 font-bold uppercase tracking-wider">
                  <th className="text-left px-5 py-3">Organization</th>
                  <th className="text-left px-5 py-3">Plan</th>
                  <th className="text-left px-5 py-3">Employees</th>
                  <th className="text-left px-5 py-3">Status</th>
                  <th className="text-left px-5 py-3">Joined</th>
                </tr>
              </thead>
              <tbody>
                {recentOrgs.map((org, i) => (
                  <tr key={i} className="border-t border-slate-50 hover:bg-slate-50/60 transition-colors">
                    <td className="px-5 py-3.5 font-semibold text-slate-900">{org.name}</td>
                    <td className="px-5 py-3.5 text-slate-600">{org.plan}</td>
                    <td className="px-5 py-3.5 text-slate-600">{org.employees}</td>
                    <td className="px-5 py-3.5">
                      <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${statusColor[org.status]}`}>
                        {org.status}
                      </span>
                    </td>
                    <td className="px-5 py-3.5 text-slate-500 text-xs">{org.joined}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Plan Distribution */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-5">
          <h2 className="font-black text-slate-900 mb-5">Subscription Plans</h2>
          <div className="space-y-4">
            {planDist.map((p) => (
              <div key={p.plan}>
                <div className="flex items-center justify-between mb-1.5 text-sm">
                  <span className="font-semibold text-slate-700">{p.plan}</span>
                  <span className="font-bold text-slate-900">{p.count} orgs</span>
                </div>
                <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                  <div className={`h-full ${p.color} rounded-full transition-all`} style={{ width: `${p.pct}%` }} />
                </div>
                <div className="text-xs text-slate-400 mt-1">{p.pct}% of total</div>
              </div>
            ))}
          </div>

          <div className="mt-6 pt-5 border-t border-slate-100 space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-500 font-medium">Avg. org size</span>
              <span className="font-bold text-slate-900">37.6 employees</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-500 font-medium">Churn rate (30d)</span>
              <span className="font-bold text-emerald-600">1.2%</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-500 font-medium">Uptime (30d)</span>
              <span className="font-bold text-emerald-600">99.97%</span>
            </div>
          </div>
        </div>
      </div>

      {/* System Alerts */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-5">
        <h2 className="font-black text-slate-900 mb-4">System Alerts</h2>
        <div className="space-y-3">
          {systemAlerts.map((a, i) => (
            <div key={i} className={`flex items-start gap-3 p-3.5 rounded-xl border ${
              a.type === 'warning' ? 'bg-amber-50 border-amber-100' :
              a.type === 'success' ? 'bg-emerald-50 border-emerald-100' :
              'bg-blue-50 border-blue-100'
            }`}>
              {a.type === 'warning' ? <AlertTriangle size={16} className="text-amber-500 mt-0.5 shrink-0" /> :
               a.type === 'success' ? <CheckCircle2 size={16} className="text-emerald-500 mt-0.5 shrink-0" /> :
               <Zap size={16} className="text-blue-500 mt-0.5 shrink-0" />}
              <div className="flex-1 text-sm font-medium text-slate-700">{a.msg}</div>
              <span className="text-xs text-slate-400 shrink-0">{a.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
