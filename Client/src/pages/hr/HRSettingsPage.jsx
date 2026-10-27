import React, { useState } from 'react';
import { Settings, Save, Calendar, Clock, ShieldCheck, CheckCircle2, User } from 'lucide-react';
import { useAlert } from '../../context/AlertContext';

export default function HRSettingsPage() {
  const { showToast } = useAlert();

  const [settings, setSettings] = useState({
    casualLeaveQuota: 10,
    sickLeaveQuota: 12,
    annualVacationQuota: 18,
    probationPeriodDays: 90,
    noticePeriodDays: 30,
    autoApproveLeavesUnderDays: 1,
    biometricGraceWindowMinutes: 15
  });

  const handleSave = (e) => {
    e.preventDefault();
    showToast('HR operational policies & statutory leave quotas updated!', 'success');
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-2xl font-black text-slate-900 tracking-tight">HR Operational Settings & Leave Policies</h1>
        <p className="text-sm text-slate-500 mt-1">Configure annual time-off quotas, probation policies, and approval thresholds.</p>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        <div className="bg-white rounded-3xl shadow-2xs border border-slate-200/80 p-6">
          <h2 className="font-bold text-slate-900 text-base mb-4 flex items-center gap-2">
            <Calendar size={18} className="text-blue-600" />
            Annual Statutory Leave Quotas (Per Employee)
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Casual Leave (Days / Yr)</label>
              <input
                type="number"
                value={settings.casualLeaveQuota}
                onChange={e => setSettings({ ...settings, casualLeaveQuota: parseInt(e.target.value) || 0 })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Sick Leave (Days / Yr)</label>
              <input
                type="number"
                value={settings.sickLeaveQuota}
                onChange={e => setSettings({ ...settings, sickLeaveQuota: parseInt(e.target.value) || 0 })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Annual Vacation (Days / Yr)</label>
              <input
                type="number"
                value={settings.annualVacationQuota}
                onChange={e => setSettings({ ...settings, annualVacationQuota: parseInt(e.target.value) || 0 })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold"
              />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow-2xs border border-slate-200/80 p-6">
          <h2 className="font-bold text-slate-900 text-base mb-4 flex items-center gap-2">
            <Clock size={18} className="text-blue-600" />
            Probation & Employment Lifecycle
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Probation Duration (Days)</label>
              <input
                type="number"
                value={settings.probationPeriodDays}
                onChange={e => setSettings({ ...settings, probationPeriodDays: parseInt(e.target.value) || 0 })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Standard Notice Period (Days)</label>
              <input
                type="number"
                value={settings.noticePeriodDays}
                onChange={e => setSettings({ ...settings, noticePeriodDays: parseInt(e.target.value) || 0 })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-bold text-xs shadow-md shadow-blue-500/20 transition-all cursor-pointer"
          >
            <Save size={15} />
            <span>Save HR Policies</span>
          </button>
        </div>
      </form>
    </div>
  );
}
