import React from 'react';
import { Users2, Plus, ArrowRight, CheckCircle2, Target, Sparkles } from 'lucide-react';
import { useHRMS } from '../../context/HRMSContext';
import { useAlert } from '../../context/AlertContext';

export default function TeamsPage() {
  const { teams } = useHRMS();
  const { showToast } = useAlert();

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">Teams & Functional Squads</h1>
          <p className="text-sm text-slate-500 mt-1">
            Cross-departmental pods, project velocity, and lead accountability.
          </p>
        </div>
        <button
          onClick={() => showToast('Create Cross-functional Pod modal opened (Simulation)', 'info')}
          className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-xl font-bold text-xs shadow-md shadow-blue-500/20 transition-all cursor-pointer"
        >
          <Plus size={14} />
          <span>Create New Team</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {teams.map((team) => (
          <div
            key={team.id}
            className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center font-bold">
                  <Users2 size={20} />
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                  {team.department}
                </span>
              </div>

              <h3 className="text-lg font-black text-slate-900">{team.name}</h3>
              <p className="text-xs text-slate-500 mt-0.5">Pod Lead: <span className="font-bold text-slate-800">{team.lead}</span></p>

              <div className="my-5 p-3.5 rounded-2xl bg-slate-50 border border-slate-100">
                <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5 mb-1">
                  <Target size={12} className="text-purple-600" />
                  Primary Project Focus
                </div>
                <div className="text-xs font-bold text-slate-900">{team.project}</div>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="font-bold text-purple-600">{team.members} Active Contributors</span>
              <button
                onClick={() => showToast(`Opening roster for ${team.name}`, 'info')}
                className="text-slate-400 hover:text-slate-700 font-bold flex items-center gap-1"
              >
                <span>Roster</span>
                <ArrowRight size={12} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
