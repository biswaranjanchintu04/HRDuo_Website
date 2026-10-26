import React, { useState } from 'react';
import { Settings, Bell, Shield, Globe, Database, Mail, Save, ToggleLeft, ToggleRight } from 'lucide-react';

const Toggle = ({ enabled, onChange }) => (
  <button onClick={() => onChange(!enabled)} className={`w-11 h-6 rounded-full transition-colors ${enabled ? 'bg-blue-600' : 'bg-slate-200'} relative`}>
    <span className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-all ${enabled ? 'left-6' : 'left-1'}`} />
  </button>
);

export default function SuperAdminSettings() {
  const [notifs, setNotifs] = useState({ email: true, slack: false, sms: true });
  const [security, setSecurity] = useState({ twofa: true, ssoOnly: false, sessionTimeout: true });
  const [maintenance, setMaintenance] = useState(false);

  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h1 className="text-2xl font-black text-slate-900">Platform Settings</h1>
        <p className="text-sm text-slate-500 mt-1">Configure global platform preferences and security policies.</p>
      </div>

      {/* Maintenance Mode */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center">
              <Settings size={18} className="text-red-600" />
            </div>
            <div>
              <div className="font-bold text-slate-900">Maintenance Mode</div>
              <div className="text-xs text-slate-500">Temporarily disable access for all tenants</div>
            </div>
          </div>
          <Toggle enabled={maintenance} onChange={setMaintenance} />
        </div>
        {maintenance && (
          <div className="mt-4 p-3 bg-red-50 rounded-xl border border-red-100 text-sm text-red-700 font-semibold">
            ⚠️ Maintenance mode is ON — all tenant logins are blocked.
          </div>
        )}
      </div>

      {/* Notification Settings */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
        <h2 className="font-black text-slate-900 mb-4 flex items-center gap-2">
          <Bell size={16} className="text-blue-600" />
          Notification Channels
        </h2>
        <div className="space-y-4">
          {[
            { key: 'email', label: 'Email Alerts', desc: 'Receive platform alerts via email' },
            { key: 'slack', label: 'Slack Notifications', desc: 'Push alerts to your Slack workspace' },
            { key: 'sms', label: 'SMS Alerts', desc: 'Critical alerts via SMS' },
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

      {/* Security */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
        <h2 className="font-black text-slate-900 mb-4 flex items-center gap-2">
          <Shield size={16} className="text-violet-600" />
          Security Policies
        </h2>
        <div className="space-y-4">
          {[
            { key: 'twofa', label: 'Require 2FA for all admins', desc: 'Force two-factor authentication' },
            { key: 'ssoOnly', label: 'SSO-Only login', desc: 'Disable password login, require SSO' },
            { key: 'sessionTimeout', label: 'Session auto-timeout (30 min)', desc: 'Log out inactive sessions' },
          ].map(item => (
            <div key={item.key} className="flex items-center justify-between py-2 border-b border-slate-50 last:border-0">
              <div>
                <div className="font-semibold text-slate-800 text-sm">{item.label}</div>
                <div className="text-xs text-slate-400">{item.desc}</div>
              </div>
              <Toggle enabled={security[item.key]} onChange={(v) => setSecurity(p => ({ ...p, [item.key]: v }))} />
            </div>
          ))}
        </div>
      </div>

      <button className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-bold text-sm shadow transition-colors">
        <Save size={16} />
        Save Settings
      </button>
    </div>
  );
}
