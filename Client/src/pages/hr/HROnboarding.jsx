import React, { useState } from 'react';
import { Compass, CheckCircle2, Clock, UserCheck, AlertCircle, Plus, Send, Laptop, Shield } from 'lucide-react';
import { useAlert } from '../../context/AlertContext';

const initialCandidates = [
  {
    id: 'ONB-01',
    name: 'Noah Campbell',
    role: 'DevOps & Cloud Architect',
    department: 'Engineering',
    startDate: 'Nov 03, 2026',
    progress: 80,
    tasks: [
      { name: 'Identity Document Verification', done: true },
      { name: 'Apple M3 Pro Laptop Provisioned', done: true },
      { name: 'Corporate Email & AWS Credentials', done: true },
      { name: 'Benefits & Health Enrollment Completed', done: true },
      { name: 'Team Lead 1-on-1 Kickoff Meeting', done: false }
    ]
  },
  {
    id: 'ONB-02',
    name: 'Zoe Martinez',
    role: 'Talent Acquisition Partner',
    department: 'People & HR',
    startDate: 'Nov 10, 2026',
    progress: 40,
    tasks: [
      { name: 'Identity Document Verification', done: true },
      { name: 'Lenovo ThinkPad Laptop Provisioned', done: true },
      { name: 'Corporate Email & Slack Account', done: false },
      { name: 'Benefits & Health Enrollment Completed', done: false },
      { name: 'HR Mentor Introduction', done: false }
    ]
  },
  {
    id: 'ONB-03',
    name: 'Devon Lane',
    role: 'Full Stack Engineer',
    department: 'Engineering',
    startDate: 'Nov 17, 2026',
    progress: 20,
    tasks: [
      { name: 'Offer Letter Signed & Acknowledged', done: true },
      { name: 'Hardware Delivery Address Confirmed', done: false },
      { name: 'Background Verification Clearance', done: false },
      { name: 'Direct Deposit Bank Form Submitted', done: false },
      { name: 'First Day Welcome Schedule', done: false }
    ]
  }
];

export default function HROnboarding() {
  const { showToast } = useAlert();
  const [candidates, setCandidates] = useState(initialCandidates);

  const toggleTask = (candId, taskIdx) => {
    setCandidates(prev => prev.map(c => {
      if (c.id !== candId) return c;
      const newTasks = [...c.tasks];
      newTasks[taskIdx].done = !newTasks[taskIdx].done;
      const completed = newTasks.filter(t => t.done).length;
      const progress = Math.round((completed / newTasks.length) * 100);
      return { ...c, tasks: newTasks, progress };
    }));
    showToast('Onboarding checklist task updated', 'info');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">New Hire Onboarding Pipeline</h1>
          <p className="text-sm text-slate-500 mt-1">
            Automated new employee provisioning, hardware logistics, and documentation checklists.
          </p>
        </div>
        <button
          onClick={() => showToast('Initiated new onboarding workflow (Simulation)', 'info')}
          className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-xl font-bold text-xs shadow-md shadow-blue-500/20 transition-all cursor-pointer"
        >
          <Plus size={14} />
          <span>Initiate Onboarding</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {candidates.map((cand) => (
          <div
            key={cand.id}
            className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-mono font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                  {cand.id}
                </span>
                <span className="text-xs text-slate-400 font-semibold">Start: {cand.startDate}</span>
              </div>

              <h3 className="text-lg font-black text-slate-900">{cand.name}</h3>
              <div className="text-xs text-slate-500 font-medium">{cand.role} • {cand.department}</div>

              {/* Progress Bar */}
              <div className="my-5">
                <div className="flex justify-between text-xs font-bold mb-1.5">
                  <span className="text-slate-700">Checklist Completion</span>
                  <span className="text-blue-600">{cand.progress}%</span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-300 ${
                      cand.progress >= 80 ? 'bg-emerald-500' : 'bg-blue-600'
                    }`}
                    style={{ width: `${cand.progress}%` }}
                  />
                </div>
              </div>

              {/* Task Checklist */}
              <div className="space-y-2.5 my-4">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-2">
                  Mandatory Steps:
                </span>
                {cand.tasks.map((task, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => toggleTask(cand.id, idx)}
                    className="w-full flex items-center gap-2.5 text-xs text-left cursor-pointer group"
                  >
                    <div className={`w-4 h-4 rounded-md border flex items-center justify-center shrink-0 transition-colors ${
                      task.done ? 'bg-emerald-500 border-emerald-500 text-white' : 'border-slate-300 group-hover:border-blue-500'
                    }`}>
                      {task.done && <CheckCircle2 size={12} />}
                    </div>
                    <span className={task.done ? 'line-through text-slate-400 font-medium' : 'text-slate-800 font-semibold'}>
                      {task.name}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="text-slate-400">Welcome Kit Dispatched</span>
              <button
                onClick={() => showToast(`Resent onboarding packet to ${cand.name}`, 'success')}
                className="text-xs font-bold text-blue-600 hover:text-blue-800"
              >
                Send Reminder
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
