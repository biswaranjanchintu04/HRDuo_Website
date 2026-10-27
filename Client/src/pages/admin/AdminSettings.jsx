import React, { useState } from 'react';
import { Settings, Bell, Shield, User, Building2, Save, Mail, Globe, CheckCircle2 } from 'lucide-react';
import { useAlert } from '../../context/AlertContext';

const Toggle = ({ enabled, onChange }) => (
  <button
    type="button"
    onClick={() => onChange(!enabled)}
    className={`w-11 h-6 rounded-full transition-colors ${enabled ? 'bg-blue-600' : 'bg-slate-200'} relative cursor-pointer`}
  >
    <span className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow-md transition-all ${enabled ? 'left-6' : 'left-1'}`} />
  </button>
);

export default function AdminSettings() {
  const { showToast } = useAlert();

  const [orgName, setOrgName] = useState('Acme Technologies Inc.');
  const [adminName, setAdminName] = useState('Elena Rostova');
  const [adminEmail, setAdminEmail] = useState('admin@hrduo.com');
  const [timezone, setTimezone] = useState('PST (UTC-8)');
  const [workStart, setWorkStart] = useState('09:00');
  const [workEnd, setWorkEnd] = useState('18:00');
  const [notifs, setNotifs] = useState({ leaveAlert: true, attendanceAlert: true, payrollAlert: true });

  const handleSave = (e) => {
    e.preventDefault();
    showToast('Company administrative preferences saved successfully!', 'success');
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-2xl font-black text-slate-900 tracking-tight">Company HR Settings</h1>
        <p className="text-sm text-slate-500 mt-1">Configure company working policies, office hours, and administrative profile.</p>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Administrator Profile Card */}
        <div className="bg-white rounded-3xl shadow-2xs border border-slate-200/80 p-6">
          <div className="flex items-center gap-4 pb-6 border-b border-slate-100 mb-6">
            <div className="w-16 h-16 rounded-2xl bg-blue-600 text-white font-black text-xl flex items-center justify-center shadow-md">
              ER
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">{adminName}</h2>
              <div className="text-xs text-blue-600 font-bold uppercase tracking-wider">VP Operations & Company Admin</div>
              <div className="text-xs text-slate-400 mt-0.5">Primary Org Administrator</div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Company Registered Name</label>
              <input
                type="text"
                value={orgName}
                onChange={e => setOrgName(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Administrator Email</label>
              <input
                type="email"
                value={adminEmail}
                onChange={e => setAdminEmail(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Default Operating Timezone</label>
              <input
                type="text"
                value={timezone}
                onChange={e => setTimezone(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Work Start</label>
                <input
                  type="time"
                  value={workStart}
                  onChange={e => setWorkStart(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-semibold"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Work End</label>
                <input
                  type="time"
                  value={workEnd}
                  onChange={e => setWorkEnd(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-semibold"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Notifications Card */}
        <div className="bg-white rounded-3xl shadow-2xs border border-slate-200/80 p-6">
          <h2 className="font-bold text-slate-900 text-base mb-4 flex items-center gap-2">
            <Bell size={18} className="text-blue-600" />
            Alert Subscriptions
          </h2>
          <div className="space-y-3">
            <div className="flex items-center justify-between py-2 border-b border-slate-50">
              <div>
                <div className="font-bold text-slate-800 text-xs">Workforce Leave Requests Alert</div>
                <div className="text-[11px] text-slate-400">Receive notifications when employees submit time-off requests</div>
              </div>
              <Toggle enabled={notifs.leaveAlert} onChange={v => setNotifs({ ...notifs, leaveAlert: v })} />
            </div>

            <div className="flex items-center justify-between py-2 border-b border-slate-50">
              <div>
                <div className="font-bold text-slate-800 text-xs">Biometric Kiosk Anomaly Alarms</div>
                <div className="text-[11px] text-slate-400">Alert on late check-ins and device connectivity changes</div>
              </div>
              <Toggle enabled={notifs.attendanceAlert} onChange={v => setNotifs({ ...notifs, attendanceAlert: v })} />
            </div>

            <div className="flex items-center justify-between py-2">
              <div>
                <div className="font-bold text-slate-800 text-xs">Monthly Payroll Generation Reminders</div>
                <div className="text-[11px] text-slate-400">Monthly reminder 3 days prior to pay-day cutoff</div>
              </div>
              <Toggle enabled={notifs.payrollAlert} onChange={v => setNotifs({ ...notifs, payrollAlert: v })} />
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-bold text-xs shadow-md shadow-blue-500/20 transition-all cursor-pointer"
          >
            <Save size={15} />
            <span>Save Company Settings</span>
          </button>
        </div>
      </form>
    </div>
  );
}
