import React from 'react';
import { Users, Mail, Phone, Star, CheckCircle2, Clock, XCircle, MessageSquare } from 'lucide-react';

const team = [
  { name: 'Sarah Jenkins', role: 'Senior Developer', email: 'sarah@hrduo.com', phone: '+1 555-0101', status: 'Present', tasks: 3, rating: 4.8, avatar: 'SJ', color: 'bg-violet-600' },
  { name: 'Linda Cho', role: 'UX Designer', email: 'linda@hrduo.com', phone: '+1 555-0107', status: 'Present', tasks: 2, rating: 4.6, avatar: 'LC', color: 'bg-pink-600' },
  { name: 'Raj Mehta', role: 'Backend Engineer', email: 'raj@hrduo.com', phone: '+1 555-0108', status: 'On Leave', tasks: 0, rating: 4.5, avatar: 'RM', color: 'bg-blue-600' },
  { name: 'Tom Watts', role: 'Frontend Developer', email: 'tom@hrduo.com', phone: '+1 555-0109', status: 'Present', tasks: 5, rating: 4.2, avatar: 'TW', color: 'bg-teal-600' },
  { name: 'Mia Park', role: 'QA Engineer', email: 'mia@hrduo.com', phone: '+1 555-0110', status: 'Late', tasks: 1, rating: 4.4, avatar: 'MP', color: 'bg-amber-600' },
  { name: 'Jake Torres', role: 'DevOps Engineer', email: 'jake@hrduo.com', phone: '+1 555-0111', status: 'Present', tasks: 4, rating: 4.7, avatar: 'JT', color: 'bg-indigo-600' },
];

const statusConfig = {
  Present: { color: 'bg-emerald-100 text-emerald-700 border-emerald-200', dot: 'bg-emerald-500' },
  'On Leave': { color: 'bg-blue-100 text-blue-700 border-blue-200', dot: 'bg-blue-500' },
  Late: { color: 'bg-amber-100 text-amber-700 border-amber-200', dot: 'bg-amber-500' },
  Absent: { color: 'bg-red-100 text-red-700 border-red-200', dot: 'bg-red-500' },
};

export default function TeamPage() {
  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 flex items-center gap-2">
            <Users className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600 shrink-0" />
            My Team
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">Engineering Department · {team.length} direct reports</p>
        </div>
        <div className="flex items-center gap-2 text-xs text-slate-500 bg-white border border-slate-200 rounded-xl px-3 py-2 w-fit">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="font-semibold">{team.filter(t => t.status === 'Present').length} / {team.length} Present</span>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-4">
        {[
          { label: 'Total Members', value: team.length, color: 'bg-violet-100 text-violet-700' },
          { label: 'Present', value: team.filter(t => t.status === 'Present').length, color: 'bg-emerald-100 text-emerald-700' },
          { label: 'On Leave', value: team.filter(t => t.status === 'On Leave').length, color: 'bg-blue-100 text-blue-700' },
          { label: 'Late', value: team.filter(t => t.status === 'Late').length, color: 'bg-amber-100 text-amber-700' },
        ].map(s => (
          <div key={s.label} className={`rounded-2xl p-3.5 sm:p-4 text-center ${s.color}`}>
            <div className="text-2xl sm:text-3xl font-black">{s.value}</div>
            <div className="text-xs font-bold mt-0.5">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Team Grid — 1 col mobile, 2 col tablet, 3 col desktop */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-4">
        {team.map((m, i) => {
          const cfg = statusConfig[m.status];
          return (
            <div key={i} className="bg-white rounded-2xl shadow-sm border border-slate-100 p-4 sm:p-5 hover:shadow-md active:shadow-sm transition-shadow">
              {/* Card Header */}
              <div className="flex items-start gap-3 mb-4">
                <div className={`w-12 h-12 rounded-2xl ${m.color} text-white flex items-center justify-center font-black text-sm shrink-0 shadow-md`}>
                  {m.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-black text-slate-900 truncate text-sm">{m.name}</div>
                  <div className="text-xs text-slate-400 truncate mt-0.5">{m.role}</div>
                  <span className={`inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full border mt-1 ${cfg.color}`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
                    {m.status}
                  </span>
                </div>
                <div className="flex items-center gap-1 shrink-0 text-xs font-bold text-amber-700">
                  <Star size={12} className="text-amber-400 fill-amber-400" />
                  {m.rating}
                </div>
              </div>

              {/* Contact Info */}
              <div className="space-y-1.5 mb-4">
                <a href={`mailto:${m.email}`} className="flex items-center gap-2 text-xs text-slate-500 hover:text-slate-900 transition-colors py-0.5">
                  <Mail size={12} className="shrink-0 text-slate-400" />
                  <span className="truncate">{m.email}</span>
                </a>
                <a href={`tel:${m.phone}`} className="flex items-center gap-2 text-xs text-slate-500 hover:text-slate-900 transition-colors py-0.5">
                  <Phone size={12} className="shrink-0 text-slate-400" />
                  <span>{m.phone}</span>
                </a>
              </div>

              {/* Footer Actions */}
              <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                <span className="text-[11px] font-bold text-violet-700 bg-violet-50 px-2.5 py-1 rounded-full border border-violet-100">
                  {m.tasks} active task{m.tasks !== 1 ? 's' : ''}
                </span>
                <div className="flex items-center gap-1.5">
                  <a
                    href={`tel:${m.phone}`}
                    className="p-2 bg-slate-100 hover:bg-violet-50 hover:text-violet-600 active:bg-violet-100 rounded-xl text-slate-500 transition-colors touch-manipulation"
                    title="Call"
                  >
                    <Phone size={14} />
                  </a>
                  <a
                    href={`mailto:${m.email}`}
                    className="p-2 bg-slate-100 hover:bg-violet-50 hover:text-violet-600 active:bg-violet-100 rounded-xl text-slate-500 transition-colors touch-manipulation"
                    title="Email"
                  >
                    <Mail size={14} />
                  </a>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
