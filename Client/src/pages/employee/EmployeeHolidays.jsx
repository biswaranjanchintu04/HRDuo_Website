import React from 'react';
import { CalendarDays, Calendar, Clock, Globe, Award } from 'lucide-react';
import { useHRMS } from '../../context/HRMSContext';

export default function EmployeeHolidays() {
  const { holidays } = useHRMS();

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-2xl font-black text-slate-900 tracking-tight">Holiday Calendar (2026 – 2027)</h1>
        <p className="text-sm text-slate-500 mt-1">
          Statutory national holidays, paid company time-off, and optional floating observances.
        </p>
      </div>

      <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-2xs">
        <div className="divide-y divide-slate-100">
          {holidays.map((h, i) => (
            <div key={i} className="py-4 first:pt-0 last:pb-0 flex items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex flex-col items-center justify-center shrink-0">
                  <span className="text-[10px] font-bold uppercase">{h.day.substring(0, 3)}</span>
                  <span className="text-sm font-black">{h.date.split('-')[2]}</span>
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">{h.name}</h3>
                  <div className="text-xs text-slate-400 mt-0.5">{h.day} • {h.date}</div>
                </div>
              </div>

              <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                h.type === 'Public Holiday'
                  ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                  : 'bg-purple-50 text-purple-700 border border-purple-200'
              }`}>
                {h.type}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
