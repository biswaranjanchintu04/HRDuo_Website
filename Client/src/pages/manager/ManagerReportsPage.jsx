import React from 'react';
import { BarChart3, TrendingUp, Users, CalendarCheck, Download, Star } from 'lucide-react';

const memberPerf = [
  { name: 'Sarah Jenkins', attendance: 97, tasks: 24, tasksDone: 22, rating: 4.8 },
  { name: 'Linda Cho', attendance: 95, tasks: 18, tasksDone: 17, rating: 4.6 },
  { name: 'Raj Mehta', attendance: 88, tasks: 20, tasksDone: 16, rating: 4.5 },
  { name: 'Tom Watts', attendance: 90, tasks: 22, tasksDone: 19, rating: 4.2 },
  { name: 'Mia Park', attendance: 82, tasks: 15, tasksDone: 12, rating: 4.4 },
  { name: 'Jake Torres', attendance: 94, tasks: 19, tasksDone: 18, rating: 4.7 },
];

const weeklyAttendance = [
  { week: 'W1', pct: 92 }, { week: 'W2', pct: 88 }, { week: 'W3', pct: 85 }, { week: 'W4', pct: 90 },
];

export default function ManagerReportsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900">Team Reports</h1>
          <p className="text-sm text-slate-500 mt-1">Engineering Department · October 2026</p>
        </div>
        <button className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-4 py-2.5 rounded-xl font-bold text-sm transition-colors">
          <Download size={15} />
          Export
        </button>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: 'Avg. Attendance', value: '91%', icon: CalendarCheck, color: 'bg-emerald-500' },
          { label: 'Team Size', value: '6', icon: Users, color: 'bg-violet-600' },
          { label: 'Tasks Completed', value: '104', icon: BarChart3, color: 'bg-blue-500' },
          { label: 'Avg. Rating', value: '4.5★', icon: Star, color: 'bg-amber-500' },
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
        {/* Weekly Attendance */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
          <h2 className="font-black text-slate-900 mb-5">Weekly Attendance (%)</h2>
          <div className="flex items-end gap-6 h-36">
            {weeklyAttendance.map(w => (
              <div key={w.week} className="flex-1 flex flex-col items-center gap-1">
                <div className="text-xs font-bold text-slate-700">{w.pct}%</div>
                <div className="w-full bg-violet-500 rounded-t-lg hover:bg-violet-600 transition-colors" style={{ height: `${(w.pct - 75) * 5}px` }} />
                <div className="text-xs text-slate-400">{w.week}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Task Completion */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
          <h2 className="font-black text-slate-900 mb-5">Task Completion Rate</h2>
          <div className="space-y-4">
            {memberPerf.map(m => (
              <div key={m.name} className="flex items-center gap-3">
                <div className="text-sm font-semibold text-slate-700 w-28 shrink-0 truncate">{m.name.split(' ')[0]}</div>
                <div className="flex-1 h-2.5 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-violet-500 rounded-full" style={{ width: `${Math.round(m.tasksDone / m.tasks * 100)}%` }} />
                </div>
                <div className="text-xs font-bold text-slate-700 w-12 text-right">{m.tasksDone}/{m.tasks}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Member Performance Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
        <h2 className="font-black text-slate-900 mb-5">Individual Performance</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-xs text-slate-400 font-bold uppercase tracking-wider border-b border-slate-100">
                <th className="text-left pb-3">Team Member</th>
                <th className="text-right pb-3">Attendance %</th>
                <th className="text-right pb-3">Tasks Done</th>
                <th className="text-right pb-3">Rating</th>
                <th className="pb-3">Performance</th>
              </tr>
            </thead>
            <tbody>
              {memberPerf.map((m, i) => (
                <tr key={i} className="border-t border-slate-50 hover:bg-slate-50/50">
                  <td className="py-3.5 font-bold text-slate-900">{m.name}</td>
                  <td className="py-3.5 text-right font-bold text-emerald-600">{m.attendance}%</td>
                  <td className="py-3.5 text-right font-semibold text-slate-700">{m.tasksDone}/{m.tasks}</td>
                  <td className="py-3.5 text-right">
                    <span className="font-bold text-amber-600 flex items-center justify-end gap-1">
                      <Star size={12} className="fill-amber-400 text-amber-400" />
                      {m.rating}
                    </span>
                  </td>
                  <td className="py-3.5">
                    <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-violet-500 rounded-full" style={{ width: `${m.attendance}%` }} />
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
