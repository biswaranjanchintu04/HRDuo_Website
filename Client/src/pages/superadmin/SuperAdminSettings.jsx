import React, { useState } from 'react';
import { 
  Settings, Bell, Shield, Globe, Database, Mail, 
  Save, User, Lock, Key, Server, CheckCircle2 
} from 'lucide-react';
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

export default function SuperAdminSettings() {
  const { showToast } = useAlert();

  const [profile, setProfile] = useState({
    name: 'Alexander Vance',
    email: 'alexander.vance@hrduo.internal',
    title: 'Super Platform Director',
    phone: '+1 (555) 678-9012'
  });

  const [notifs, setNotifs] = useState({ email: true, slack: true, sms: false });
  const [security, setSecurity] = useState({ twofa: true, ssoOnly: false, ipWhitelist: true });
  const [maintenance, setMaintenance] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    showToast('Platform profile and global configuration saved successfully!', 'success');
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-2xl font-black text-slate-900 tracking-tight">Super Admin Profile & Platform Governance</h1>
        <p className="text-sm text-slate-500 mt-1">Configure global multi-tenant security, root access keys, and administrator profile.</p>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Administrator Profile Card */}
        <div className="bg-white rounded-3xl shadow-2xs border border-slate-200/80 p-6">
          <div className="flex items-center gap-4 pb-6 border-b border-slate-100 mb-6">
            <div className="w-16 h-16 rounded-2xl bg-indigo-600 text-white font-black text-xl flex items-center justify-center shadow-md">
              AV
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">{profile.name}</h2>
              <div className="text-xs text-indigo-600 font-bold uppercase tracking-wider">Root Platform Administrator</div>
              <div className="text-xs text-slate-400 mt-0.5">Primary Super Admin Account</div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Full Name</label>
              <input
                type="text"
                value={profile.name}
                onChange={e => setProfile({ ...profile, name: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Root Email</label>
              <input
                type="email"
                value={profile.email}
                onChange={e => setProfile({ ...profile, email: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Designation</label>
              <input
                type="text"
                value={profile.title}
                onChange={e => setProfile({ ...profile, title: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Emergency Phone</label>
              <input
                type="text"
                value={profile.phone}
                onChange={e => setProfile({ ...profile, phone: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Global Security Policies */}
        <div className="bg-white rounded-3xl shadow-2xs border border-slate-200/80 p-6">
          <h2 className="font-bold text-slate-900 text-base mb-4 flex items-center gap-2">
            <Shield size={18} className="text-blue-600" />
            Global Platform Security Policies
          </h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between py-2 border-b border-slate-50">
              <div>
                <div className="font-bold text-slate-800 text-xs">Enforce Multi-Factor Authentication (2FA)</div>
                <div className="text-[11px] text-slate-400">Require all tenant administrators to use Authenticator Apps</div>
              </div>
              <Toggle enabled={security.twofa} onChange={(v) => setSecurity(p => ({ ...p, twofa: v }))} />
            </div>

            <div className="flex items-center justify-between py-2 border-b border-slate-50">
              <div>
                <div className="font-bold text-slate-800 text-xs">Strict Tenant Database Isolation</div>
                <div className="text-[11px] text-slate-400">Enforce schema-per-tenant Postgres row level security</div>
              </div>
              <Toggle enabled={security.ipWhitelist} onChange={(v) => setSecurity(p => ({ ...p, ipWhitelist: v }))} />
            </div>

            <div className="flex items-center justify-between py-2">
              <div>
                <div className="font-bold text-slate-800 text-xs">Global Emergency Maintenance Mode</div>
                <div className="text-[11px] text-slate-400">Suspend public logins during scheduled infrastructure upgrade</div>
              </div>
              <Toggle enabled={maintenance} onChange={setMaintenance} />
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-bold text-xs shadow-md shadow-blue-500/20 transition-all cursor-pointer"
          >
            <Save size={15} />
            <span>Save Configuration Changes</span>
          </button>
        </div>
      </form>
    </div>
  );
}
