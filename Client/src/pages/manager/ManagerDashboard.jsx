import React from 'react';
import {
  Users, CalendarCheck, Clock, ClipboardList, TrendingUp,
  CheckCircle2, AlertCircle, ArrowRight, Award, Bell
} from 'lucide-react';

const stats = [
  { label: 'Team Size', value: '18', change: '2 joining next week', icon: Users, color: 'bg-violet-600', light: 'bg-violet-50 text-violet-700' },
  { label: 'Present Today', value: '15', change: '83.3% attendance', icon: CalendarCheck, color: 'bg-emerald-500', light: 'bg-emerald-50 text-emerald-700' },
  { label: 'Pending Leaves', value: '3', change: 'Needs approval', icon: Clock, color: 'bg-amber-500', light: 'bg-amber-50 text-amber-700' },
  { label: 'Open Tasks', value: '12', change: '4 due this week', icon: ClipboardList, color: 'bg-blue-500', light: 'bg-blue-50 text-blue-700' },
];

const teamMembers = [
  { name: 'Sarah Jenkins', role: 'Senior Dev', status: 'Present', time: '9:02 AM', tasks: 3 },
  { name: 'Linda Cho', role: 'UX Designer', status: 'Present', time: '9:10 AM', tasks: 2 },
  { name: 'Raj Mehta', role: 'Backend Dev', status: 'On Leave', time: '—', tasks: 0 },
  { name: 'Tom Watts', role: 'Frontend Dev', status: 'Present', time: '9:24 AM', tasks: 5 },
  { name: 'Mia Park', role: 'QA Engineer', status: 'Late', time: '10:05 AM', tasks: 1 },
];

const pendingLeaves = [
  { name: 'Tom Watts', type: 'Casual', from: 'Nov 3', to: 'Nov 4', days: 2 },
  { name: 'Mia Park', type: 'Sick', from: 'Nov 1', to: 'Nov 1', days: 1 },
  { name: 'Sarah Jenkins', type: 'Annual', from: 'Nov 15', to: 'Nov 19', days: 5 },
];

const taskSummary = [
  { title: 'API Integration — v2.4', assignee: 'Raj Mehta', due: 'Nov 1', priority: 'High', status: 'In Progress' },
  { title: 'Dashboard Redesign', assignee: 'Linda Cho', due: 'Nov 3', priority: 'Medium', status: 'In Review' },
  { title: 'Fix login bug #423', assignee: 'Tom Watts', due: 'Oct 28', priority: 'High', status: 'In Progress' },
];

const statusColor = {
  Present: 'bg-emerald-100 text-emerald-700',
  'On Leave': 'bg-blue-100 text-blue-700',
  Late: 'bg-amber-100 text-amber-700',
  Absent: 'bg-red-100 text-red-700',
};

const priorityColor = {
  High: 'bg-red-100 text-red-700',
  Medium: 'bg-amber-100 text-amber-700',
  Low: 'bg-slate-100 text-slate-600',
};

export default function ManagerDashboard() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900">Manager Dashboard</h1>
          <p className="text-sm text-slate-500 mt-1">Hi Alex 👋 — Engineering Team · Monday, October 26, 2026</p>
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
        {/* Team Status */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-slate-100 p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-black text-slate-900">Team Status Today</h2>
            <button className="text-xs text-violet-600 font-bold hover:underline">View all →</button>
          </div>
          <div className="space-y-3">
            {teamMembers.map((m, i) => (
              <div key={i} className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-violet-600 text-white flex items-center justify-center text-xs font-black shrink-0">
                    {m.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <div className="font-bold text-slate-900 text-sm">{m.name}</div>
                    <div className="text-xs text-slate-400">{m.role}</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-xs text-slate-500 hidden sm:block">{m.tasks} tasks</div>
                  <div className="text-xs text-slate-400 font-mono hidden sm:block">{m.time}</div>
                  <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${statusColor[m.status]}`}>{m.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pending Leaves */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-black text-slate-900">Leave Approvals</h2>
            <span className="text-xs font-bold bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full">{pendingLeaves.length}</span>
          </div>
          <div className="space-y-3">
            {pendingLeaves.map((l, i) => (
              <div key={i} className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                <div className="font-bold text-sm text-slate-900">{l.name}</div>
                <div className="text-xs text-slate-500 mb-2">{l.type} · {l.days} days · {l.from}{l.from !== l.to ? ` – ${l.to}` : ''}</div>
                <div className="flex gap-2">
                  <button className="flex-1 py-1.5 text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors">Approve</button>
                  <button className="flex-1 py-1.5 text-xs font-bold bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-lg transition-colors">Decline</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tasks */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-black text-slate-900">Priority Tasks</h2>
          <button className="text-xs text-violet-600 font-bold hover:underline">View all →</button>
        </div>
        <div className="space-y-3">
          {taskSummary.map((t, i) => (
            <div key={i} className="flex items-center justify-between p-3.5 border border-slate-100 rounded-xl hover:bg-slate-50 transition-colors">
              <div className="flex-1">
                <div className="font-bold text-sm text-slate-900">{t.title}</div>
                <div className="text-xs text-slate-400 mt-0.5">{t.assignee} · Due {t.due}</div>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${priorityColor[t.priority]}`}>{t.priority}</span>
                <span className="text-xs font-bold bg-violet-100 text-violet-700 px-2 py-0.5 rounded-full">{t.status}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
