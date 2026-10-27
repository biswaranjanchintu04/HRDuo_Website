import React from 'react';
import { 
  LineChart, Activity, Users, Globe, Smartphone, 
  ArrowUpRight, ArrowDownRight, Server, ShieldCheck, Zap 
} from 'lucide-react';
import {
  AreaChart, Area, BarChart, Bar, Line, XAxis, YAxis, 
  CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';

const dailyActiveUsers = [
  { day: 'Mon', dau: 9400, requests: 120000 },
  { day: 'Tue', dau: 10800, requests: 145000 },
  { day: 'Wed', dau: 11200, requests: 152000 },
  { day: 'Thu', dau: 11600, requests: 160000 },
  { day: 'Fri', dau: 10400, requests: 138000 },
  { day: 'Sat', dau: 3200, requests: 42000 },
  { day: 'Sun', dau: 2800, requests: 38000 }
];

const latencyData = [
  { time: '00:00', ms: 42 },
  { time: '04:00', ms: 38 },
  { time: '08:00', ms: 65 },
  { time: '12:00', ms: 72 },
  { time: '16:00', ms: 68 },
  { time: '20:00', ms: 48 },
  { time: '23:59', ms: 40 }
];

export default function PlatformAnalytics() {
  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">Global Platform Analytics</h1>
          <p className="text-sm text-slate-500 mt-1">
            Real-time API throughput, daily active workforce users, and cloud cluster performance.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-slate-500">Live Telemetry:</span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            2,450 req/sec
          </span>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-2xs">
          <div className="flex items-center justify-between text-slate-500 text-xs font-bold mb-3">
            <span>Peak Daily Active Users</span>
            <Users size={16} className="text-blue-600" />
          </div>
          <div className="text-2xl font-black text-slate-900">11,600</div>
          <div className="text-[11px] text-emerald-600 font-semibold mt-1 flex items-center gap-1">
            <ArrowUpRight size={12} />
            +8.3% higher than last Thursday
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-2xs">
          <div className="flex items-center justify-between text-slate-500 text-xs font-bold mb-3">
            <span>Average API Latency</span>
            <Zap size={16} className="text-purple-600" />
          </div>
          <div className="text-2xl font-black text-slate-900">54 ms</div>
          <div className="text-[11px] text-emerald-600 font-semibold mt-1">
            99.9th percentile &lt; 120ms
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-2xs">
          <div className="flex items-center justify-between text-slate-500 text-xs font-bold mb-3">
            <span>Platform Churn Rate</span>
            <Activity size={16} className="text-emerald-600" />
          </div>
          <div className="text-2xl font-black text-emerald-600">0.42%</div>
          <div className="text-[11px] text-slate-400 font-semibold mt-1">
            Best in enterprise SaaS tier
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-2xs">
          <div className="flex items-center justify-between text-slate-500 text-xs font-bold mb-3">
            <span>Active Tenant Pods</span>
            <Server size={16} className="text-indigo-600" />
          </div>
          <div className="text-2xl font-black text-slate-900">24 Nodes</div>
          <div className="text-[11px] text-slate-400 font-semibold mt-1">
            AWS us-east-1 & eu-west-1
          </div>
        </div>
      </div>

      {/* Chart Rows */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8 bg-white rounded-3xl p-6 border border-slate-200/80 shadow-2xs">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-base font-bold text-slate-900">Weekly Active Workforce Sessions</h2>
              <p className="text-xs text-slate-500">Employee clock-ins & self-service traffic by day of week</p>
            </div>
            <span className="text-xs font-bold text-slate-700 bg-slate-100 px-2.5 py-1 rounded-lg">
              Last 7 Days
            </span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={dailyActiveUsers}>
                <defs>
                  <linearGradient id="dauGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#3B82F6" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                <XAxis dataKey="day" stroke="#94A3B8" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis stroke="#94A3B8" fontSize={11} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={{ backgroundColor: '#0F172A', borderRadius: '12px', border: 'none', color: '#fff', fontSize: '12px' }} />
                <Area type="monotone" dataKey="dau" name="Daily Active Users" stroke="#2563EB" strokeWidth={2.5} fillOpacity={1} fill="url(#dauGradient)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="lg:col-span-4 bg-white rounded-3xl p-6 border border-slate-200/80 shadow-2xs flex flex-col justify-between">
          <div>
            <h2 className="text-base font-bold text-slate-900">Global Traffic by Device</h2>
            <p className="text-xs text-slate-500">Breakdown of access terminals</p>
          </div>

          <div className="space-y-4 my-6">
            <div>
              <div className="flex justify-between text-xs font-bold mb-1">
                <span className="text-slate-700">Desktop Web Browsers</span>
                <span className="text-blue-600">62%</span>
              </div>
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                <div className="bg-blue-600 h-full rounded-full" style={{ width: '62%' }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-bold mb-1">
                <span className="text-slate-700">Mobile Self-Service App</span>
                <span className="text-purple-600">26%</span>
              </div>
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                <div className="bg-purple-600 h-full rounded-full" style={{ width: '26%' }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-bold mb-1">
                <span className="text-slate-700">Dedicated Biometric / Kiosk Units</span>
                <span className="text-emerald-600">12%</span>
              </div>
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                <div className="bg-emerald-600 h-full rounded-full" style={{ width: '12%' }} />
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 text-xs text-slate-500 font-medium">
            SSL Handshake: TLS 1.3 Strict • HSTS Preloaded
          </div>
        </div>
      </div>
    </div>
  );
}
