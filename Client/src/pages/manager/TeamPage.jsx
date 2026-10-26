import React from 'react';
import { Users, Mail, Phone, Star, CheckCircle2, Clock, XCircle } from 'lucide-react';

const team = [
  { name: 'Sarah Jenkins', role: 'Senior Developer', email: 'sarah@hrduo.com', phone: '+1 555-0101', status: 'Present', tasks: 3, rating: 4.8, avatar: 'SJ', color: 'bg-violet-600' },
  { name: 'Linda Cho', role: 'UX Designer', email: 'linda@hrduo.com', phone: '+1 555-0107', status: 'Present', tasks: 2, rating: 4.6, avatar: 'LC', color: 'bg-pink-600' },
  { name: 'Raj Mehta', role: 'Backend Engineer', email: 'raj@hrduo.com', phone: '+1 555-0108', status: 'On Leave', tasks: 0, rating: 4.5, avatar: 'RM', color: 'bg-blue-600' },
  { name: 'Tom Watts', role: 'Frontend Developer', email: 'tom@hrduo.com', phone: '+1 555-0109', status: 'Present', tasks: 5, rating: 4.2, avatar: 'TW', color: 'bg-teal-600' },
  { name: 'Mia Park', role: 'QA Engineer', email: 'mia@hrduo.com', phone: '+1 555-0110', status: 'Late', tasks: 1, rating: 4.4, avatar: 'MP', color: 'bg-amber-600' },
  { name: 'Jake Torres', role: 'DevOps Engineer', email: 'jake@hrduo.com', phone: '+1 555-0111', status: 'Present', tasks: 4, rating: 4.7, avatar: 'JT', color: 'bg-indigo-600' },
];

const statusConfig = {
  Present: { color: 'bg-emerald-100 text-emerald-700', icon: CheckCircle2 },
  'On Leave': { color: 'bg-blue-100 text-blue-700', icon: Clock },
  Late: { color: 'bg-amber-100 text-amber-700', icon: Clock },
  Absent: { color: 'bg-red-100 text-red-700', icon: XCircle },
};

export default function TeamPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black text-slate-900">My Team</h1>
        <p className="text-sm text-slate-500 mt-1">Engineering Department · {team.length} direct reports</p>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: 'Total Members', value: team.length, color: 'bg-violet-100 text-violet-700' },
          { label: 'Present', value: team.filter(t => t.status === 'Present').length, color: 'bg-emerald-100 text-emerald-700' },
          { label: 'On Leave', value: team.filter(t => t.status === 'On Leave').length, color: 'bg-blue-100 text-blue-700' },
          { label: 'Late', value: team.filter(t => t.status === 'Late').length, color: 'bg-amber-100 text-amber-700' },
        ].map(s => (
          <div key={s.label} className={`rounded-2xl p-4 text-center ${s.color}`}>
            <div className="text-2xl font-black">{s.value}</div>
            <div className="text-xs font-bold mt-1">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Team Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
        {team.map((m, i) => {
          const cfg = statusConfig[m.status];
          const StatusIcon = cfg.icon;
          return (
            <div key={i} className="bg-white rounded-2xl shadow-sm border border-slate-100 p-5 hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3 mb-4">
                <div className={`w-12 h-12 rounded-2xl ${m.color} text-white flex items-center justify-center font-black text-sm shrink-0`}>
                  {m.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-black text-slate-900 truncate">{m.name}</div>
                  <div className="text-xs text-slate-400 truncate">{m.role}</div>
                </div>
                <span className={`inline-flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full shrink-0 ${cfg.color}`}>
                  <StatusIcon size={11} />
                  {m.status}
                </span>
              </div>

              <div className="space-y-1.5 mb-4">
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <Mail size={12} className="shrink-0" />
                  <span className="truncate">{m.email}</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <Phone size={12} className="shrink-0" />
                  <span>{m.phone}</span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-3.5 border-t border-slate-100">
                <div className="flex items-center gap-1.5 text-xs font-bold text-slate-600">
                  <Star size={13} className="text-amber-400 fill-amber-400" />
                  {m.rating} rating
                </div>
                <div className="flex items-center gap-2">
                  <a
                    href={`tel:${m.phone}`}
                    className="p-1.5 bg-slate-100 hover:bg-violet-50 hover:text-violet-600 rounded-lg text-slate-600 transition-colors"
                    title="Call team member"
                  >
                    <Phone size={13} />
                  </a>
                  <a
                    href={`mailto:${m.email}`}
                    className="p-1.5 bg-slate-100 hover:bg-violet-50 hover:text-violet-600 rounded-lg text-slate-600 transition-colors"
                    title="Email team member"
                  >
                    <Mail size={13} />
                  </a>
                  <span className="text-[11px] font-bold text-violet-700 bg-violet-50 px-2 py-0.5 rounded-full">
                    {m.tasks} tasks
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
