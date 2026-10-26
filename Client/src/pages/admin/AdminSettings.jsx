import React, { useState } from 'react';
import { Settings, Bell, Shield, User, Building2, Save, Mail, Globe } from 'lucide-react';

const Toggle = ({ enabled, onChange }) => (
  <button onClick={() => onChange(!enabled)} className={`w-11 h-6 rounded-full transition-colors ${enabled ? 'bg-[#008C75]' : 'bg-slate-200'} relative`}>
    <span className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-all ${enabled ? 'left-6' : 'left-1'}`} />
  </button>
);

export default function AdminSettings() {
  const [notifs, setNotifs] = useState({ leaveAlert: true, attendanceAlert: true, payrollAlert: false });
  const [orgName, setOrgName] = useState('HRDuo Demo Corp');
  const [timezone, setTimezone] = useState('Asia/Kolkata');
  const [workStart, setWorkStart] = useState('09:00');
  const [workEnd, setWorkEnd] = useState('18:00');

  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h1 className="text-2xl font-black text-slate-900">Settings</h1>
        <p className="text-sm text-slate-500 mt-1">Configure your organization's HR preferences and policies.</p>
      </div>

      {/* Organization Info */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
        <h2 className="font-black text-slate-900 mb-5 flex items-center gap-2">
          <Building2 size={16} className="text-amber-500" />
          Organization Info
        </h2>
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">Organization Name</label>
            <input value={orgName} onChange={e => setOrgName(e.target.value)} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#008C75] focus:border-transparent" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">Work Start</label>
              <input type="time" value={workStart} onChange={e => setWorkStart(e.target.value)} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#008C75] focus:border-transparent" />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">Work End</label>
              <input type="time" value={workEnd} onChange={e => setWorkEnd(e.target.value)} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#008C75] focus:border-transparent" />
            </div>
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">Timezone</label>
            <select value={timezone} onChange={e => setTimezone(e.target.value)} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#008C75]">
              <option value="Asia/Kolkata">IST — Asia/Kolkata (UTC+5:30)</option>
              <option value="America/New_York">EST — America/New_York (UTC-5)</option>
              <option value="Europe/London">GMT — Europe/London (UTC+0)</option>
              <option value="Asia/Singapore">SGT — Asia/Singapore (UTC+8)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Notifications */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
        <h2 className="font-black text-slate-900 mb-4 flex items-center gap-2">
          <Bell size={16} className="text-blue-600" />
          Notification Preferences
        </h2>
        <div className="space-y-4">
          {[
            { key: 'leaveAlert', label: 'Leave Request Alerts', desc: 'Notify when an employee submits a leave request' },
            { key: 'attendanceAlert', label: 'Absence Alerts', desc: 'Alert when an employee is absent without notice' },
            { key: 'payrollAlert', label: 'Payroll Reminders', desc: 'Remind before payroll processing deadline' },
          ].map(item => (
            <div key={item.key} className="flex items-center justify-between py-2 border-b border-slate-50 last:border-0">
              <div>
                <div className="font-semibold text-slate-800 text-sm">{item.label}</div>
                <div className="text-xs text-slate-400">{item.desc}</div>
              </div>
              <Toggle enabled={notifs[item.key]} onChange={(v) => setNotifs(p => ({ ...p, [item.key]: v }))} />
            </div>
          ))}
        </div>
      </div>

      <button className="inline-flex items-center gap-2 bg-[#008C75] hover:bg-emerald-700 text-white px-6 py-3 rounded-xl font-bold text-sm shadow transition-colors">
        <Save size={16} />
        Save Settings
      </button>
    </div>
  );
}
