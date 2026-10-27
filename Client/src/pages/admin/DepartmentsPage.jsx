import React, { useState } from 'react';
import { Layers, Plus, Users, DollarSign, Briefcase, MapPin, X, Check } from 'lucide-react';
import { useHRMS } from '../../context/HRMSContext';
import { useAlert } from '../../context/AlertContext';

export default function DepartmentsPage() {
  const { departments, addDepartment } = useHRMS();
  const { showToast } = useAlert();

  const [showAddModal, setShowAddModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    head: '',
    staffCount: '10',
    budget: '$350,000',
    openJobs: '2',
    location: 'San Francisco HQ'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name) return;
    addDepartment(formData);
    showToast(`Department "${formData.name}" established!`, 'success');
    setShowAddModal(false);
    setFormData({ name: '', head: '', staffCount: '10', budget: '$350,000', openJobs: '2', location: 'San Francisco HQ' });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">Departments Overview</h1>
          <p className="text-sm text-slate-500 mt-1">
            Organize functional business divisions, headcount budgets, and leadership.
          </p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-xl font-bold text-xs shadow-md shadow-blue-500/20 transition-all cursor-pointer"
        >
          <Plus size={14} />
          <span>Add Department</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {departments.map((dept) => (
          <div
            key={dept.id}
            className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
                  <Layers size={20} />
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                  {dept.id}
                </span>
              </div>

              <h3 className="text-lg font-black text-slate-900">{dept.name}</h3>
              <p className="text-xs text-slate-500 mt-1">Head of Division: <span className="font-bold text-slate-800">{dept.head}</span></p>

              <div className="grid grid-cols-2 gap-3 my-5 py-4 border-y border-slate-100">
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Total Staff</span>
                  <span className="text-base font-black text-slate-900">{dept.staffCount} Members</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Annual Budget</span>
                  <span className="text-base font-black text-emerald-600">{dept.budget}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs text-slate-500 pt-1">
              <span className="flex items-center gap-1 font-semibold text-blue-600">
                <Briefcase size={13} />
                {dept.openJobs} Open Positions
              </span>
              <span className="flex items-center gap-1 text-slate-400">
                <MapPin size={13} />
                {dept.location.split('&')[0]}
              </span>
            </div>
          </div>
        ))}
      </div>

      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/40 backdrop-blur-xs">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-sm w-full shadow-2xl border border-slate-200">
            <h3 className="text-base font-black text-slate-900 mb-1">Create New Department</h3>
            <p className="text-xs text-slate-500 mb-4">Define a new operational vertical</p>
            <form onSubmit={handleSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Department Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Artificial Intelligence"
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200"
                />
              </div>
              <div>
                <label className="block font-bold text-slate-700 mb-1">Department Head</label>
                <input
                  type="text"
                  placeholder="Dr. Gregory House"
                  value={formData.head}
                  onChange={e => setFormData({ ...formData, head: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200"
                />
              </div>
              <div>
                <label className="block font-bold text-slate-700 mb-1">Annual Budget</label>
                <input
                  type="text"
                  value={formData.budget}
                  onChange={e => setFormData({ ...formData, budget: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200"
                />
              </div>
              <div className="pt-3 flex gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 py-2 rounded-xl bg-slate-100 text-slate-700 font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2 rounded-xl bg-blue-600 text-white font-bold shadow-md shadow-blue-500/20"
                >
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
