import React, { useState } from 'react';
import { Award, Star, CheckCircle2, TrendingUp, Search, Plus, Filter } from 'lucide-react';
import { useHRMS } from '../../context/HRMSContext';
import { useAlert } from '../../context/AlertContext';

const reviewsData = [
  { id: 'REV-01', name: 'Sophia Chen', role: 'Senior Full Stack Engineer', dept: 'Engineering', cycle: 'Q3 2026', selfRating: 4.8, managerRating: 4.9, status: 'Completed', reviewer: 'Marcus Sterling', okrScore: '96%' },
  { id: 'REV-02', name: 'Liam Gallagher', role: 'Frontend UI/UX Specialist', dept: 'Engineering', cycle: 'Q3 2026', selfRating: 4.5, managerRating: 4.7, status: 'Completed', reviewer: 'Marcus Sterling', okrScore: '92%' },
  { id: 'REV-03', name: 'Aisha Patel', role: 'Lead Product Designer', dept: 'Product & Design', cycle: 'Q3 2026', selfRating: 4.9, managerRating: 4.85, status: 'Completed', reviewer: 'Elena Rostova', okrScore: '94%' },
  { id: 'REV-04', name: 'David Kim', role: 'Growth Marketing Director', dept: 'Marketing', cycle: 'Q3 2026', selfRating: 4.6, managerRating: 4.6, status: 'In Review', reviewer: 'Elena Rostova', okrScore: '88%' },
  { id: 'REV-05', name: 'Noah Campbell', role: 'DevOps & Cloud Architect', dept: 'Engineering', cycle: 'Q3 2026', selfRating: 4.8, managerRating: 4.9, status: 'Completed', reviewer: 'Marcus Sterling', okrScore: '98%' },
];

export default function HRPerformance() {
  const { showToast } = useAlert();
  const [search, setSearch] = useState('');

  const filtered = reviewsData.filter(r =>
    r.name.toLowerCase().includes(search.toLowerCase()) ||
    r.role.toLowerCase().includes(search.toLowerCase()) ||
    r.dept.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">Performance Reviews & OKR Governance</h1>
          <p className="text-sm text-slate-500 mt-1">
            Quarterly 360 reviews, goal alignment percentages, and executive appraisal reports.
          </p>
        </div>
        <button
          onClick={() => showToast('Initiated Q4 2026 Performance Appraisal Cycle (Simulation)', 'success')}
          className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-xl font-bold text-xs shadow-md shadow-blue-500/20 transition-all cursor-pointer"
        >
          <Plus size={14} />
          <span>Launch Review Cycle</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-2xs">
          <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Company-wide Average Rating</div>
          <div className="text-2xl font-black text-slate-900">4.82 / 5.0</div>
          <div className="text-[11px] text-emerald-600 font-semibold mt-1">★ High performing workforce</div>
        </div>
        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-2xs">
          <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Q3 Appraisals Completed</div>
          <div className="text-2xl font-black text-blue-600">92%</div>
          <div className="text-[11px] text-slate-400 font-semibold mt-1">118 of 128 submissions recorded</div>
        </div>
        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-2xs">
          <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Target OKR Achievement</div>
          <div className="text-2xl font-black text-purple-600">93.6%</div>
          <div className="text-[11px] text-emerald-600 font-semibold mt-1">+4.2% vs prior quarter</div>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-2xs border border-slate-200/80 p-4">
        <div className="relative">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search performance appraisals by employee, role, or department..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-200 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50/50"
          />
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-2xs border border-slate-200/80 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-slate-50/80 border-b border-slate-100">
              <tr className="text-xs text-slate-400 font-bold uppercase tracking-wider">
                <th className="px-5 py-3.5">Employee</th>
                <th className="px-5 py-3.5">Department</th>
                <th className="px-5 py-3.5">Review Cycle</th>
                <th className="px-5 py-3.5">Manager Score</th>
                <th className="px-5 py-3.5">OKR Attainment</th>
                <th className="px-5 py-3.5">Appraiser</th>
                <th className="px-5 py-3.5 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
              {filtered.map((rev) => (
                <tr key={rev.id} className="hover:bg-slate-50/60 transition-colors">
                  <td className="px-5 py-3.5">
                    <div className="font-bold text-slate-900">{rev.name}</div>
                    <div className="text-xs text-slate-400">{rev.role}</div>
                  </td>
                  <td className="px-5 py-3.5 text-xs text-slate-700 font-semibold">{rev.dept}</td>
                  <td className="px-5 py-3.5 text-xs text-blue-600 font-bold">{rev.cycle}</td>
                  <td className="px-5 py-3.5 font-black text-slate-900">★ {rev.managerRating}</td>
                  <td className="px-5 py-3.5 font-bold text-emerald-600">{rev.okrScore}</td>
                  <td className="px-5 py-3.5 text-xs text-slate-500">{rev.reviewer}</td>
                  <td className="px-5 py-3.5 text-right">
                    <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold ${
                      rev.status === 'Completed' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' :
                      'bg-amber-50 text-amber-700 border border-amber-200'
                    }`}>
                      {rev.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
