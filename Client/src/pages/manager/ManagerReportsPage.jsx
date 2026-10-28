import React from 'react';
import { BarChart3, TrendingUp, Users, CalendarCheck, Download, Star } from 'lucide-react';

const memberPerf = [
  { name: 'Sarah Jenkins', attendance: 97, tasks: 24, tasksDone: 22, rating: 4.8, avatar: 'SJ', color: 'bg-violet-600' },
  { name: 'Linda Cho', attendance: 95, tasks: 18, tasksDone: 17, rating: 4.6, avatar: 'LC', color: 'bg-pink-600' },
  { name: 'Raj Mehta', attendance: 88, tasks: 20, tasksDone: 16, rating: 4.5, avatar: 'RM', color: 'bg-blue-600' },
  { name: 'Tom Watts', attendance: 90, tasks: 22, tasksDone: 19, rating: 4.2, avatar: 'TW', color: 'bg-teal-600' },
  { name: 'Mia Park', attendance: 82, tasks: 15, tasksDone: 12, rating: 4.4, avatar: 'MP', color: 'bg-amber-600' },
  { name: 'Jake Torres', attendance: 94, tasks: 19, tasksDone: 18, rating: 4.7, avatar: 'JT', color: 'bg-indigo-600' },
];

const weeklyAttendance = [
  { week: 'W1', pct: 92 }, { week: 'W2', pct: 88 }, { week: 'W3', pct: 85 }, { week: 'W4', pct: 90 },
];

export default function ManagerReportsPage() {
  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 flex items-center gap-2">
            <BarChart3 className="w-5 h-5 sm:w-6 sm:h-6 text-violet-600 shrink-0" />
            Team Reports
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">Engineering Department · October 2026</p>
        </div>
        <button className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 active:bg-slate-700 text-white px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-colors touch-manipulation self-start sm:self-auto">
          <Download size={15} />
          Export Report
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-4">
        {[
          { label: 'Avg. Attendance', value: '91%', icon: CalendarCheck, color: 'bg-emerald-500' },
          { label: 'Team Size', value: '6', icon: Users, color: 'bg-violet-600' },
          { label: 'Tasks Completed', value: '104', icon: BarChart3, color: 'bg-blue-500' },
          { label: 'Avg. Rating', value: '4.5★', icon: Star, color: 'bg-amber-500' },
        ].map(k => {
          const Icon = k.icon;
          return (
            <div key={k.label} className="bg-white rounded-2xl p-4 sm:p-5 shadow-sm border border-slate-100">
              <div className={`w-9 h-9 ${k.color} rounded-xl flex items-center justify-center mb-3`}>
                <Icon size={16} className="text-white" />
              </div>
              <div className="text-2xl sm:text-3xl font-black text-slate-900">{k.value}</div>
              <div className="text-xs text-slate-500 font-medium mt-1">{k.label}</div>
            </div>
          );
        })}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        {/* Weekly Attendance Bar Chart */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-5 sm:p-6">
          <h2 className="font-black text-slate-900 text-sm sm:text-base mb-5">Weekly Attendance (%)</h2>
          <div className="flex items-end gap-4 sm:gap-6 h-32 sm:h-36">
            {weeklyAttendance.map(w => (
              <div key={w.week} className="flex-1 flex flex-col items-center gap-1">
                <div className="text-xs font-bold text-slate-700">{w.pct}%</div>
                <div
                  className="w-full bg-violet-500 hover:bg-violet-600 rounded-t-xl transition-colors"
                  style={{ height: `${(w.pct - 75) * 5}px` }}
                />
                <div className="text-xs text-slate-400 font-semibold">{w.week}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Task Completion Chart */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-5 sm:p-6">
          <h2 className="font-black text-slate-900 text-sm sm:text-base mb-5">Task Completion Rate</h2>
          <div className="space-y-3.5">
            {memberPerf.map(m => (
              <div key={m.name} className="flex items-center gap-3">
                <div className={`w-7 h-7 rounded-lg ${m.color} text-white font-black text-[10px] flex items-center justify-center shrink-0`}>
                  {m.avatar}
                </div>
                <div className="flex-1 h-2.5 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-violet-500 rounded-full"
                    style={{ width: `${Math.round(m.tasksDone / m.tasks * 100)}%` }}
                  />
                </div>
                <div className="text-xs font-bold text-slate-600 w-12 text-right shrink-0">
                  {m.tasksDone}/{m.tasks}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Individual Performance */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-4 sm:p-5 border-b border-slate-100">
          <h2 className="font-black text-slate-900 text-sm sm:text-base">Individual Performance</h2>
        </div>

        {/* Mobile Cards (< md) */}
        <div className="block md:hidden divide-y divide-slate-100">
          {memberPerf.map((m, i) => (
            <div key={i} className="p-4 flex items-center gap-3">
              <div className={`w-10 h-10 rounded-xl ${m.color} text-white font-black text-xs flex items-center justify-center shrink-0`}>
                {m.avatar}
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-bold text-sm text-slate-900 truncate">{m.name}</div>
                <div className="flex items-center gap-3 mt-1">
                  <span className="text-[10px] font-bold text-emerald-600">{m.attendance}% att.</span>
                  <span className="text-[10px] font-bold text-slate-600">{m.tasksDone}/{m.tasks} tasks</span>
                </div>
                <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden mt-1.5">
                  <div className="h-full bg-violet-500 rounded-full" style={{ width: `${m.attendance}%` }} />
                </div>
              </div>
              <div className="flex items-center gap-1 shrink-0">
                <Star size={12} className="fill-amber-400 text-amber-400" />
                <span className="text-xs font-bold text-amber-600">{m.rating}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop Table (md+) */}
        <div className="hidden md:block overflow-x-auto p-5 sm:p-6">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-xs text-slate-400 font-bold uppercase tracking-wider border-b border-slate-100">
                <th className="text-left pb-3">Team Member</th>
                <th className="text-right pb-3">Attendance %</th>
                <th className="text-right pb-3">Tasks Done</th>
                <th className="text-right pb-3">Rating</th>
                <th className="pb-3 pl-4">Performance Bar</th>
              </tr>
            </thead>
            <tbody>
              {memberPerf.map((m, i) => (
                <tr key={i} className="border-t border-slate-50 hover:bg-slate-50/50">
                  <td className="py-3.5 font-bold text-slate-900 flex items-center gap-2.5">
                    <div className={`w-8 h-8 rounded-lg ${m.color} text-white font-black text-[10px] flex items-center justify-center`}>
                      {m.avatar}
                    </div>
                    {m.name}
                  </td>
                  <td className="py-3.5 text-right font-bold text-emerald-600">{m.attendance}%</td>
                  <td className="py-3.5 text-right font-semibold text-slate-700">{m.tasksDone}/{m.tasks}</td>
                  <td className="py-3.5 text-right">
                    <span className="font-bold text-amber-600 flex items-center justify-end gap-1">
                      <Star size={12} className="fill-amber-400 text-amber-400" />
                      {m.rating}
                    </span>
                  </td>
                  <td className="py-3.5 pl-4">
                    <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
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
