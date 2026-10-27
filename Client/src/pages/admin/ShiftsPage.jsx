import React, { useState } from 'react';
import { Clock, Plus, Users, Calendar, AlertCircle, Check, Edit2 } from 'lucide-react';
import { useHRMS } from '../../context/HRMSContext';
import { useAlert } from '../../context/AlertContext';

export default function ShiftsPage() {
  const { shifts } = useHRMS();
  const { showToast } = useAlert();

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">Shifts & Work Hours Scheduling</h1>
          <p className="text-sm text-slate-500 mt-1">
            Configure working hours, biometric punch grace periods, lunch breaks, and roster schedules.
          </p>
        </div>
        <button
          onClick={() => showToast('Create Shift Schedule modal opened (Simulation)', 'info')}
          className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-xl font-bold text-xs shadow-md shadow-blue-500/20 transition-all cursor-pointer"
        >
          <Plus size={14} />
          <span>Create Shift</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {shifts.map((shift) => (
          <div
            key={shift.id}
            className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
                  <Clock size={20} />
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
                  {shift.days}
                </span>
              </div>

              <h3 className="text-lg font-black text-slate-900">{shift.name}</h3>
              <div className="text-xl font-black text-blue-600 mt-1">
                {shift.startTime} – {shift.endTime}
              </div>

              <div className="grid grid-cols-3 gap-2 my-5 py-4 border-y border-slate-100 text-xs">
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Grace Window</span>
                  <span className="font-bold text-slate-800 mt-0.5 block">{shift.gracePeriod}</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Meal Break</span>
                  <span className="font-bold text-slate-800 mt-0.5 block">{shift.breakDuration}</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Staff Assigned</span>
                  <span className="font-bold text-slate-800 mt-0.5 block">{shift.activeEmployees} Staff</span>
                </div>
              </div>
            </div>

            <div className="pt-2 flex items-center justify-between text-xs">
              <span className="text-slate-400 font-medium">Auto-punch tolerance enabled</span>
              <button
                onClick={() => showToast(`Editing parameters for ${shift.name}`, 'info')}
                className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1"
              >
                <Edit2 size={13} />
                <span>Edit Shift</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
