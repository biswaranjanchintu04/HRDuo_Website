import React, { useState } from 'react';
import { Settings, Bell, Shield, User, Save, Clock, Award, Users } from 'lucide-react';

const Toggle = ({ enabled, onChange }) => (
  <button
    type="button"
    onClick={() => onChange(!enabled)}
    className={`w-11 h-6 rounded-full transition-colors relative focus:outline-none ${
      enabled ? 'bg-violet-600' : 'bg-slate-200'
    }`}
  >
    <div
      className={`w-4 h-4 rounded-full bg-white transition-transform transform shadow-sm absolute top-1 left-1 ${
        enabled ? 'translate-x-5' : 'translate-x-0'
      }`}
    />
  </button>
);

export default function ManagerSettings() {
  const [departmentName, setDepartmentName] = useState('Engineering & Product');
  const [dailyStandupTime, setDailyStandupTime] = useState('10:00');
  const [notifyOnLeaveRequest, setNotifyOnLeaveRequest] = useState(true);
  const [notifyOnLateCheckin, setNotifyOnLateCheckin] = useState(true);
  const [autoApproveShortLeave, setAutoApproveShortLeave] = useState(false);
  const [weeklyDigest, setWeeklyDigest] = useState(true);
  const [saved, setSaved] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div>
        <h1 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
          <Settings className="w-7 h-7 text-violet-600" />
          Manager Department Settings
        </h1>
        <p className="text-slate-500 text-sm mt-1">
          Configure notifications, shift schedules, and team workflow approval rules.
        </p>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Department Info */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200/80 space-y-4">
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <Users className="w-5 h-5 text-violet-600" />
            Department Parameters
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-600 mb-1.5 uppercase tracking-wider">
                Department Name
              </label>
              <input
                type="text"
                value={departmentName}
                onChange={(e) => setDepartmentName(e.target.value)}
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold focus:bg-white focus:border-violet-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-600 mb-1.5 uppercase tracking-wider">
                Daily Standup Sync Time
              </label>
              <input
                type="time"
                value={dailyStandupTime}
                onChange={(e) => setDailyStandupTime(e.target.value)}
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold focus:bg-white focus:border-violet-500 focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Approval & Alert Rules */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200/80 space-y-4">
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <Bell className="w-5 h-5 text-violet-600" />
            Manager Alerts & Notifications
          </h2>

          <div className="space-y-3 divide-y divide-slate-100">
            <div className="flex items-center justify-between pt-2">
              <div>
                <p className="text-sm font-bold text-slate-900">Instant Leave Request Alerts</p>
                <p className="text-xs text-slate-500">Receive immediate notification when a team member applies for leave.</p>
              </div>
              <Toggle enabled={notifyOnLeaveRequest} onChange={setNotifyOnLeaveRequest} />
            </div>

            <div className="flex items-center justify-between pt-3">
              <div>
                <p className="text-sm font-bold text-slate-900">Late Check-in Notifications</p>
                <p className="text-xs text-slate-500">Alert if a team member clocks in after grace period (after 09:30 AM).</p>
              </div>
              <Toggle enabled={notifyOnLateCheckin} onChange={setNotifyOnLateCheckin} />
            </div>

            <div className="flex items-center justify-between pt-3">
              <div>
                <p className="text-sm font-bold text-slate-900">Auto-Approve Half-Day Leaves (&lt; 4 Hours)</p>
                <p className="text-xs text-slate-500">Automatically grant short leave requests without manual confirmation.</p>
              </div>
              <Toggle enabled={autoApproveShortLeave} onChange={setAutoApproveShortLeave} />
            </div>

            <div className="flex items-center justify-between pt-3">
              <div>
                <p className="text-sm font-bold text-slate-900">Weekly Performance & Attendance Digest</p>
                <p className="text-xs text-slate-500">Receive automated summary of team velocity and attendance on Mondays.</p>
              </div>
              <Toggle enabled={weeklyDigest} onChange={setWeeklyDigest} />
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="flex items-center justify-between">
          {saved ? (
            <span className="text-sm font-bold text-emerald-600 flex items-center gap-1.5">
              ✓ Preferences updated successfully
            </span>
          ) : <span />}

          <button
            type="submit"
            className="px-6 py-2.5 bg-violet-600 hover:bg-violet-700 text-white font-bold text-sm rounded-xl flex items-center gap-2 shadow-sm transition-all"
          >
            <Save className="w-4 h-4" />
            Save Department Settings
          </button>
        </div>
      </form>
    </div>
  );
}
