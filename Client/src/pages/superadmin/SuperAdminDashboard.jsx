import React from 'react';
import {
  Building2, Users, CreditCard, TrendingUp, AlertTriangle,
  CheckCircle2, Clock, MoreHorizontal, ArrowUpRight, Globe,
  ShieldCheck, Activity, DollarSign, Zap, Plus, ArrowRight
} from 'lucide-react';
import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from 'recharts';
import { Link } from 'react-router-dom';
import { useHRMS } from '../../context/HRMSContext';

const companyGrowthData = [
  { month: 'Jan', companies: 85, employees: 7200 },
  { month: 'Feb', companies: 92, employees: 7900 },
  { month: 'Mar', companies: 98, employees: 8500 },
  { month: 'Apr', companies: 106, employees: 9200 },
  { month: 'May', companies: 114, employees: 9950 },
  { month: 'Jun', companies: 122, employees: 10800 },
  { month: 'Jul', companies: 128, employees: 11400 },
  { month: 'Aug', companies: 133, employees: 11950 },
  { month: 'Sep', companies: 138, employees: 12350 },
  { month: 'Oct', companies: 142, employees: 12840 }
];

const revenueData = [
  { month: 'Mar', revenue: 98000, newMrr: 12000 },
  { month: 'Apr', revenue: 108000, newMrr: 10000 },
  { month: 'May', revenue: 116000, newMrr: 8000 },
  { month: 'Jun', revenue: 125000, newMrr: 9000 },
  { month: 'Jul', revenue: 132000, newMrr: 7000 },
  { month: 'Aug', revenue: 139000, newMrr: 7000 },
  { month: 'Sep', revenue: 144000, newMrr: 5000 },
  { month: 'Oct', revenue: 148500, newMrr: 4500 }
];

const subscriptionDistData = [
  { name: 'Enterprise', value: 20, color: '#2563EB', mrr: '$9,980' },
  { name: 'Professional', value: 64, color: '#7C3AED', mrr: '$12,736' },
  { name: 'Starter', value: 58, color: '#059669', mrr: '$2,842' },
  { name: 'Custom Tier', value: 4, color: '#D97706', mrr: '$5,196' },
];

export default function SuperAdminDashboard() {
  const { companies, payments } = useHRMS();

  const totalCompaniesCount = 142;
  const activeCompaniesCount = 136;
  const totalEmployeesCount = '12,840';
  const activeSubsCount = 136;
  const monthlyRevenue = '$148,500';
  const pendingPayments = '$4,200';

  const dashboardCards = [
    {
      title: 'Total Companies',
      value: totalCompaniesCount,
      change: '+14% YoY',
      trend: 'up',
      icon: Building2,
      color: 'bg-blue-600',
      lightColor: 'bg-blue-50 text-blue-700'
    },
    {
      title: 'Active Companies',
      value: activeCompaniesCount,
      change: '95.7% Active',
      trend: 'up',
      icon: Globe,
      color: 'bg-emerald-600',
      lightColor: 'bg-emerald-50 text-emerald-700'
    },
    {
      title: 'Total Employees',
      value: totalEmployeesCount,
      change: '+490 this mo',
      trend: 'up',
      icon: Users,
      color: 'bg-purple-600',
      lightColor: 'bg-purple-50 text-purple-700'
    },
    {
      title: 'Active Subscriptions',
      value: activeSubsCount,
      change: '4 Trialings',
      trend: 'up',
      icon: CreditCard,
      color: 'bg-amber-600',
      lightColor: 'bg-amber-50 text-amber-700'
    },
    {
      title: 'Monthly Recurring Revenue',
      value: monthlyRevenue,
      change: '+7.4% MoM',
      trend: 'up',
      icon: DollarSign,
      color: 'bg-indigo-600',
      lightColor: 'bg-indigo-50 text-indigo-700'
    },
    {
      title: 'Pending Payments',
      value: pendingPayments,
      change: '3 Invoices Due',
      trend: 'down',
      icon: AlertTriangle,
      color: 'bg-rose-600',
      lightColor: 'bg-rose-50 text-rose-700'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">Super Admin Platform Overview</h1>
          <p className="text-sm text-slate-500 mt-0.5">
            Global governance, multi-tenant subscription health, and recurring platform revenue.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold shadow-2xs">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            99.98% System Uptime
          </div>

          <Link
            to="/superadmin/companies"
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-4 py-2 rounded-xl shadow-md shadow-blue-500/20 transition-all"
          >
            <Plus size={14} />
            <span>Provision Company</span>
          </Link>
        </div>
      </div>

      {/* 6 Required Dashboard Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {dashboardCards.map((card) => {
          const Icon = card.icon;
          return (
            <div
              key={card.title}
              className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div className="flex items-center justify-between mb-3">
                <div className={`w-9 h-9 rounded-xl ${card.color} text-white flex items-center justify-center shadow-xs`}>
                  <Icon size={18} />
                </div>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${card.lightColor}`}>
                  {card.change}
                </span>
              </div>
              <div>
                <div className="text-xl font-black text-slate-900 tracking-tight leading-none">
                  {card.value}
                </div>
                <div className="text-xs text-slate-500 font-semibold mt-1 truncate">
                  {card.title}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Required Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Chart 1: Company & Tenant Growth */}
        <div className="lg:col-span-8 bg-white rounded-3xl p-6 border border-slate-200/80 shadow-2xs">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-base font-bold text-slate-900">Company & Workforce Growth</h2>
              <p className="text-xs text-slate-500">Net new tenant organizations onboarded in 2026</p>
            </div>
            <div className="text-right">
              <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-lg border border-blue-100">
                +67% Growth YTD
              </span>
            </div>
          </div>

          <div className="h-64 sm:h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={companyGrowthData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="compGrowth" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563EB" stopOpacity={0.25} />
                    <stop offset="95%" stopColor="#2563EB" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                <XAxis dataKey="month" stroke="#94A3B8" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis stroke="#94A3B8" fontSize={11} tickLine={false} axisLine={false} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0F172A', borderRadius: '12px', border: 'none', color: '#fff', fontSize: '12px' }}
                  itemStyle={{ color: '#93C5FD' }}
                />
                <Area type="monotone" dataKey="companies" name="Total Companies" stroke="#2563EB" strokeWidth={2.5} fillOpacity={1} fill="url(#compGrowth)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 2: Subscription Distribution */}
        <div className="lg:col-span-4 bg-white rounded-3xl p-6 border border-slate-200/80 shadow-2xs flex flex-col justify-between">
          <div>
            <h2 className="text-base font-bold text-slate-900">Subscription Distribution</h2>
            <p className="text-xs text-slate-500">Tier distribution across 142 clients</p>
          </div>

          <div className="h-52 w-full my-2">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={subscriptionDistData}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={80}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {subscriptionDistData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ backgroundColor: '#0F172A', borderRadius: '12px', border: 'none', color: '#fff', fontSize: '12px' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100">
            {subscriptionDistData.map((tier) => (
              <div key={tier.name} className="flex items-center gap-2 text-xs">
                <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: tier.color }} />
                <div className="truncate">
                  <span className="font-bold text-slate-800">{tier.name}: </span>
                  <span className="text-slate-500 font-medium">{tier.value}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Chart 3: Monthly Revenue & Recent Organizations */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Monthly Revenue Bar Chart */}
        <div className="lg:col-span-6 bg-white rounded-3xl p-6 border border-slate-200/80 shadow-2xs">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-base font-bold text-slate-900">Monthly Revenue Stream (MRR)</h2>
              <p className="text-xs text-slate-500">Platform SaaS monthly revenue in USD</p>
            </div>
            <Link to="/superadmin/payments" className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1">
              <span>View Ledger</span>
              <ArrowRight size={13} />
            </Link>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={revenueData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                <XAxis dataKey="month" stroke="#94A3B8" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis stroke="#94A3B8" fontSize={11} tickLine={false} axisLine={false} tickFormatter={(val) => `$${val / 1000}k`} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0F172A', borderRadius: '12px', border: 'none', color: '#fff', fontSize: '12px' }}
                  formatter={(value) => [`$${value.toLocaleString()}`, 'Total MRR']}
                />
                <Bar dataKey="revenue" fill="#3B82F6" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Live Organization Table */}
        <div className="lg:col-span-6 bg-white rounded-3xl p-6 border border-slate-200/80 shadow-2xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-base font-bold text-slate-900">Managed Companies</h2>
                <p className="text-xs text-slate-500">Live tenant roster & subscription health</p>
              </div>
              <Link to="/superadmin/companies" className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1">
                <span>All Companies</span>
                <ArrowRight size={13} />
              </Link>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-100 text-slate-400 font-bold uppercase tracking-wider">
                    <th className="pb-3">Company</th>
                    <th className="pb-3">Plan</th>
                    <th className="pb-3">MRR</th>
                    <th className="pb-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                  {companies.slice(0, 5).map((comp) => (
                    <tr key={comp.id} className="hover:bg-slate-50/60 transition-colors">
                      <td className="py-3 font-bold text-slate-900">
                        <div>{comp.name}</div>
                        <div className="text-[11px] text-slate-400 font-normal">{comp.industry}</div>
                      </td>
                      <td className="py-3">
                        <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-slate-100 text-slate-700">
                          {comp.plan}
                        </span>
                      </td>
                      <td className="py-3 font-semibold text-slate-900">{comp.mrr}</td>
                      <td className="py-3">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          comp.status === 'Active' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' :
                          comp.status === 'Trial' ? 'bg-blue-50 text-blue-700 border border-blue-200' :
                          'bg-rose-50 text-rose-700 border border-rose-200'
                        }`}>
                          {comp.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>Showing top 5 of {companies.length} sample enterprises</span>
            <span className="font-semibold text-blue-600">Sync status: Real-time</span>
          </div>
        </div>
      </div>
    </div>
  );
}
