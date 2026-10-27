import React from 'react';
import { Megaphone, Calendar, User, Bell } from 'lucide-react';
import { useHRMS } from '../../context/HRMSContext';

export default function EmployeeAnnouncements() {
  const { notices } = useHRMS();

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-2xl font-black text-slate-900 tracking-tight">Company Announcements & Town Halls</h1>
        <p className="text-sm text-slate-500 mt-1">
          Official memos, quarterly updates, and benefits alerts published by leadership.
        </p>
      </div>

      <div className="space-y-4">
        {notices.map((n) => (
          <div
            key={n.id}
            className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-2xs hover:shadow-md transition-all space-y-3"
          >
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-blue-50 text-blue-700 border border-blue-200">
                {n.department}
              </span>
              <span className="text-xs text-slate-400 font-medium flex items-center gap-1">
                <Calendar size={12} />
                {n.date}
              </span>
            </div>

            <h3 className="text-base font-black text-slate-900">{n.title}</h3>
            <p className="text-xs text-slate-600 leading-relaxed">{n.content}</p>

            <div className="pt-3 border-t border-slate-100 text-[11px] text-slate-400">
              Author: <span className="font-semibold text-slate-800">{n.author}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
