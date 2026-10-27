import React, { useState } from 'react';
import { Award, Plus, Search, Filter, Briefcase, ArrowUpRight } from 'lucide-react';
import { useHRMS } from '../../context/HRMSContext';
import { useAlert } from '../../context/AlertContext';

export default function DesignationsPage() {
  const { designations } = useHRMS();
  const { showToast } = useAlert();
  const [search, setSearch] = useState('');

  const filtered = designations.filter(d =>
    d.title.toLowerCase().includes(search.toLowerCase()) ||
    d.department.toLowerCase().includes(search.toLowerCase()) ||
    d.grade.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">Designations & Job Architecture</h1>
          <p className="text-sm text-slate-500 mt-1">
            Standardize career progression ladders, seniority grades (L1–L6), and base compensation.
          </p>
        </div>
        <button
          onClick={() => showToast('Create Designation modal opened (Simulation)', 'info')}
          className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-xl font-bold text-xs shadow-md shadow-blue-500/20 transition-all cursor-pointer"
        >
          <Plus size={14} />
          <span>Add Designation</span>
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-2xs border border-slate-200/80 p-4">
        <div className="relative">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search by designation title, department, or grade band..."
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
                <th className="px-5 py-3.5">Designation Title</th>
                <th className="px-5 py-3.5">Department</th>
                <th className="px-5 py-3.5">Career Grade Band</th>
                <th className="px-5 py-3.5">Benchmark Base Pay</th>
                <th className="px-5 py-3.5">Active Staff</th>
                <th className="px-5 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
              {filtered.map((des) => (
                <tr key={des.id} className="hover:bg-slate-50/60 transition-colors">
                  <td className="px-5 py-3.5 font-bold text-slate-900">{des.title}</td>
                  <td className="px-5 py-3.5 text-xs text-slate-600">{des.department}</td>
                  <td className="px-5 py-3.5">
                    <span className="px-2.5 py-1 rounded-md text-[11px] font-bold bg-blue-50 text-blue-700 border border-blue-200">
                      {des.grade}
                    </span>
                  </td>
                  <td className="px-5 py-3.5 font-semibold text-emerald-600">{des.baseSalary}</td>
                  <td className="px-5 py-3.5 text-xs text-slate-700 font-bold">{des.staffCount} Staff</td>
                  <td className="px-5 py-3.5 text-right">
                    <button
                      onClick={() => showToast(`Configured career pathway for ${des.title}`, 'info')}
                      className="text-xs font-bold text-blue-600 hover:text-blue-800"
                    >
                      Configure
                    </button>
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
