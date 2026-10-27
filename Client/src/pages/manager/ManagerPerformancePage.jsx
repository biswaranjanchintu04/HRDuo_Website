import React from 'react';
import { Award, Target, TrendingUp, CheckCircle2, Star, Plus } from 'lucide-react';
import { useAlert } from '../../context/AlertContext';

const teamGoals = [
  { id: 'OKR-01', title: 'Scale Core Platform API to 50k Concurrent Sessions', owner: 'Sophia Chen', progress: 85, dueDate: 'Nov 30, 2026', status: 'On Track' },
  { id: 'OKR-02', title: 'Complete Tailwind Design System Tokenization', owner: 'Liam Gallagher', progress: 92, dueDate: 'Nov 15, 2026', status: 'Ahead' },
  { id: 'OKR-03', title: 'Reduce CI/CD Build Times Under 3 Minutes', owner: 'Noah Campbell', progress: 78, dueDate: 'Dec 10, 2026', status: 'On Track' },
  { id: 'OKR-04', title: 'Implement Zero-Trust Service Mesh across Microservices', owner: 'Marcus Sterling', progress: 65, dueDate: 'Dec 31, 2026', status: 'At Risk' },
];

export default function ManagerPerformancePage() {
  const { showToast } = useAlert();

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">Team Performance & OKR Goals</h1>
          <p className="text-sm text-slate-500 mt-1">
            Track engineering squad key results, milestone progress bars, and individual goals.
          </p>
        </div>
        <button
          onClick={() => showToast('Create OKR Milestone modal opened (Simulation)', 'info')}
          className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-xl font-bold text-xs shadow-md shadow-blue-500/20 transition-all cursor-pointer"
        >
          <Plus size={14} />
          <span>Add Team OKR</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {teamGoals.map((goal) => (
          <div
            key={goal.id}
            className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-mono font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                  {goal.id}
                </span>
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                  goal.status === 'Ahead' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' :
                  goal.status === 'On Track' ? 'bg-blue-50 text-blue-700 border border-blue-200' :
                  'bg-rose-50 text-rose-700 border border-rose-200'
                }`}>
                  {goal.status}
                </span>
              </div>

              <h3 className="text-base font-black text-slate-900">{goal.title}</h3>
              <p className="text-xs text-slate-500 mt-1">Lead Contributor: <span className="font-bold text-slate-800">{goal.owner}</span></p>

              <div className="my-5">
                <div className="flex justify-between text-xs font-bold mb-1.5">
                  <span className="text-slate-700">Attainment Progress</span>
                  <span className="text-blue-600">{goal.progress}%</span>
                </div>
                <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      goal.progress >= 85 ? 'bg-emerald-500' : 'bg-blue-600'
                    }`}
                    style={{ width: `${goal.progress}%` }}
                  />
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400 font-medium">
              <span>Target: {goal.dueDate}</span>
              <button
                onClick={() => showToast(`Updated check-in status for ${goal.id}`, 'success')}
                className="text-xs font-bold text-blue-600 hover:text-blue-800"
              >
                Log Check-in
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
