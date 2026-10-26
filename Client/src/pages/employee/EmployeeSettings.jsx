import React, { useState } from 'react';
import { Settings, Bell, Shield, Lock, Smartphone, Save, ScanFace, Check } from 'lucide-react';

const Toggle = ({ enabled, onChange }) => (
  <button
    type="button"
    onClick={() => onChange(!enabled)}
    className={`w-11 h-6 rounded-full transition-colors relative focus:outline-none ${
      enabled ? 'bg-emerald-600' : 'bg-slate-200'
    }`}
  >
    <div
      className={`w-4 h-4 rounded-full bg-white transition-transform transform shadow-sm absolute top-1 left-1 ${
        enabled ? 'translate-x-5' : 'translate-x-0'
      }`}
    />
  </button>
);

export default function EmployeeSettings() {
  const [shiftAlert, setShiftAlert] = useState(true);
  const [payslipAlert, setPayslipAlert] = useState(true);
  const [leaveStatusAlert, setLeaveStatusAlert] = useState(true);
  const [saved, setSaved] = useState(false);

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [pwSaved, setPwSaved] = useState(false);

  const handleSavePreferences = (e) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const handleChangePassword = (e) => {
    e.preventDefault();
    if (!currentPassword || !newPassword) return;
    setPwSaved(true);
    setCurrentPassword('');
    setNewPassword('');
    setTimeout(() => setPwSaved(false), 2500);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div>
        <h1 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
          <Settings className="w-7 h-7 text-emerald-600" />
          Employee Settings & Security
        </h1>
        <p className="text-slate-500 text-sm mt-1">
          Customize notifications, manage biometric credentials, and update password.
        </p>
      </div>

      {/* Notifications Preferences */}
      <form onSubmit={handleSavePreferences} className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 space-y-4">
        <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
          <Bell className="w-5 h-5 text-emerald-600" />
          Notification Preferences
        </h2>

        <div className="space-y-3 divide-y divide-slate-100">
          <div className="flex items-center justify-between pt-2">
            <div>
              <p className="text-sm font-bold text-slate-900">Shift Check-In Reminders</p>
              <p className="text-xs text-slate-500">Receive alert 15 minutes before 09:00 AM shift starts.</p>
            </div>
            <Toggle enabled={shiftAlert} onChange={setShiftAlert} />
          </div>

          <div className="flex items-center justify-between pt-3">
            <div>
              <p className="text-sm font-bold text-slate-900">Payslip Generation Alerts</p>
              <p className="text-xs text-slate-500">Get notified via email when monthly payslip PDF is ready.</p>
            </div>
            <Toggle enabled={payslipAlert} onChange={setPayslipAlert} />
          </div>

          <div className="flex items-center justify-between pt-3">
            <div>
              <p className="text-sm font-bold text-slate-900">Leave Approval Updates</p>
              <p className="text-xs text-slate-500">Immediate push alerts when your leave request is approved or reviewed.</p>
            </div>
            <Toggle enabled={leaveStatusAlert} onChange={setLeaveStatusAlert} />
          </div>
        </div>

        <div className="flex items-center justify-between pt-2">
          {saved && <span className="text-xs font-bold text-emerald-600">✓ Preferences saved</span>}
          <button
            type="submit"
            className="ml-auto px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-sm transition-all"
          >
            Save Preferences
          </button>
        </div>
      </form>

      {/* Biometric Credentials Status */}
      <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-emerald-50 text-emerald-600 rounded-2xl">
            <ScanFace className="w-8 h-8" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900">Face Recognition Biometrics</h3>
            <p className="text-xs text-slate-500">128-d face descriptor vector enrolled on Oct 15, 2026.</p>
            <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-600 mt-1">
              <Check className="w-3.5 h-3.5" /> High Confidence Template Active
            </span>
          </div>
        </div>

        <a
          href="/face-kiosk"
          className="px-4 py-2 border border-slate-200 hover:bg-slate-50 rounded-xl text-xs font-bold text-slate-700 transition-colors whitespace-nowrap"
        >
          Test Kiosk Punch
        </a>
      </div>

      {/* Change Password */}
      <form onSubmit={handleChangePassword} className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 space-y-4">
        <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
          <Lock className="w-5 h-5 text-emerald-600" />
          Change Password
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-600 uppercase mb-1">Current Password</label>
            <input
              type="password"
              placeholder="••••••••••••"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-emerald-500 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-600 uppercase mb-1">New Password</label>
            <input
              type="password"
              placeholder="Min. 8 characters"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-emerald-500 focus:outline-none"
            />
          </div>
        </div>

        <div className="flex items-center justify-between pt-2">
          {pwSaved && <span className="text-xs font-bold text-emerald-600">✓ Password updated successfully</span>}
          <button
            type="submit"
            className="ml-auto px-5 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl shadow-sm transition-all"
          >
            Update Password
          </button>
        </div>
      </form>
    </div>
  );
}
