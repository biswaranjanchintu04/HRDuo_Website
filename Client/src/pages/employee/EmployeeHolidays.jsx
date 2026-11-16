import React from 'react';
import { CalendarDays, Gift, Globe, Star, ChevronRight } from 'lucide-react';
import { useHRMS } from '../../context/HRMSContext';

export default function EmployeeHolidays() {
  const { holidays } = useHRMS();

  const upcoming = holidays.filter(h => h.date >= '2026-11-15').slice(0, 2);

  return (
    <div className="space-y-5 max-w-4xl font-poppins">

      {/* ── Hero Header ── */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-purple-600 via-violet-600 to-indigo-700 p-5 sm:p-6 shadow-xl shadow-purple-200/60">
        <div className="absolute -top-8 -right-8 w-44 h-44 rounded-full bg-white/10 blur-2xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-32 h-32 rounded-full bg-violet-400/20 blur-2xl pointer-events-none" />
        <div className="relative">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-xl bg-white/15 backdrop-blur flex items-center justify-center">
              <CalendarDays size={16} className="text-white" />
            </div>
            <span className="text-[11px] font-bold uppercase tracking-widest text-purple-100">Holiday Calendar</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">2026 – 2027 Holidays</h1>
          <p className="text-xs text-purple-100 mt-1">Statutory national holidays, paid company time-off & floating observances</p>

          {upcoming.length > 0 && (
            <div className="mt-3 flex items-center gap-2">
              <div className="flex items-center gap-1.5 bg-white/15 backdrop-blur rounded-xl px-3 py-1.5">
                <Star size={11} className="text-yellow-300 fill-yellow-300" />
                <span className="text-xs font-bold text-white">Next: {upcoming[0]?.name}</span>
                <span className="text-[10px] text-purple-200">— {upcoming[0]?.date}</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ── Stats Row ── */}
      <div className="grid grid-cols-3 gap-2.5">
        <div className="bg-white rounded-2xl p-3.5 border border-purple-100 shadow-xs text-center">
          <div className="text-2xl font-black text-purple-600">{holidays.filter(h => h.type === 'Public Holiday').length}</div>
          <div className="text-[10px] font-bold text-slate-400 mt-0.5 uppercase tracking-wide">Public</div>
        </div>
        <div className="bg-white rounded-2xl p-3.5 border border-indigo-100 shadow-xs text-center">
          <div className="text-2xl font-black text-indigo-600">{holidays.filter(h => h.type !== 'Public Holiday').length}</div>
          <div className="text-[10px] font-bold text-slate-400 mt-0.5 uppercase tracking-wide">Company</div>
        </div>
        <div className="bg-white rounded-2xl p-3.5 border border-slate-100 shadow-xs text-center">
          <div className="text-2xl font-black text-slate-700">{holidays.length}</div>
          <div className="text-[10px] font-bold text-slate-400 mt-0.5 uppercase tracking-wide">Total</div>
        </div>
      </div>

      {/* ── Holiday List ── */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs overflow-hidden">
        <div className="px-5 py-4 border-b border-slate-100 flex items-center gap-2">
          <div className="w-1 h-4 rounded-full bg-purple-600" />
          <h2 className="text-xs font-black text-slate-700 uppercase tracking-wider">All Holidays</h2>
          <span className="ml-auto text-[11px] text-slate-400 font-medium">{holidays.length} days</span>
        </div>
        <div className="divide-y divide-slate-100">
          {holidays.map((h, i) => (
            <div key={i} className="flex items-center gap-4 px-5 py-4 hover:bg-slate-50/60 transition-colors">
              {/* Date box */}
              <div className={`w-12 h-12 rounded-2xl flex flex-col items-center justify-center shrink-0 shadow-sm ${
                h.type === 'Public Holiday'
                  ? 'bg-gradient-to-br from-purple-500 to-indigo-600'
                  : 'bg-gradient-to-br from-blue-500 to-cyan-600'
              }`}>
                <span className="text-[9px] font-bold uppercase text-white/80">{h.day?.substring(0, 3)}</span>
                <span className="text-sm font-black text-white leading-tight">{h.date.split('-')[2]}</span>
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-black text-slate-900 leading-tight truncate">{h.name}</h3>
                <div className="text-[11px] text-slate-400 font-medium mt-0.5">{h.day} · {h.date}</div>
              </div>

              {/* Badge */}
              <span className={`shrink-0 px-2.5 py-1 rounded-full text-[10px] font-bold border ${
                h.type === 'Public Holiday'
                  ? 'bg-purple-50 text-purple-700 border-purple-200'
                  : 'bg-blue-50 text-blue-700 border-blue-200'
              }`}>
                {h.type === 'Public Holiday' ? (
                  <span className="flex items-center gap-1"><Globe size={9} /> Public</span>
                ) : (
                  <span className="flex items-center gap-1"><Gift size={9} /> Company</span>
                )}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
