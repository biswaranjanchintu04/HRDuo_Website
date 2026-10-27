import React from 'react';
import { Bell, CheckCircle2, Clock, AlertCircle, Sparkles, MessageSquare } from 'lucide-react';
import { useAlert } from '../../context/AlertContext';

const notificationsList = [
  { id: 'NOT-01', title: 'Leave Application Submitted', desc: 'Liam Gallagher submitted a 2-day Sick Leave request for Nov 02.', time: '20 mins ago', type: 'leave' },
  { id: 'NOT-02', title: 'Punch-in Correction Requested', desc: 'Liam Gallagher submitted an attendance correction for Oct 26.', time: '1 hour ago', type: 'attendance' },
  { id: 'NOT-03', title: 'Sprint Milestone Completed', desc: 'Core Platform Guild closed 14 Jira issues ahead of schedule.', time: '4 hours ago', type: 'sprint' },
  { id: 'NOT-04', title: '1-on-1 Reminder', desc: 'Scheduled monthly growth sync with Sophia Chen at 3:00 PM.', time: '1 day ago', type: 'calendar' },
];

export default function ManagerNotificationsPage() {
  const { showToast } = useAlert();

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">Manager Notifications & Activity Feed</h1>
          <p className="text-sm text-slate-500 mt-1">
            Approvals requested, sprint milestones, and automated direct report alerts.
          </p>
        </div>
        <button
          onClick={() => showToast('All manager alerts marked as read', 'success')}
          className="px-4 py-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold transition-all"
        >
          Mark All As Read
        </button>
      </div>

      <div className="space-y-3">
        {notificationsList.map((item) => (
          <div
            key={item.id}
            className="p-5 rounded-3xl bg-white border border-slate-200/80 shadow-2xs hover:shadow-md transition-all flex items-start gap-4"
          >
            <div className="w-10 h-10 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
              <Bell size={18} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-slate-900">{item.title}</h3>
                <span className="text-xs text-slate-400 font-medium">{item.time}</span>
              </div>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
