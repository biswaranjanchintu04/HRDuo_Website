import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { 
  Compass, CheckCircle2, Clock, UserCheck, AlertCircle, Plus, 
  Send, Laptop, ShieldCheck, Search, Filter, Sparkles, X, 
  FileText, Mail, Calendar, Building2, ChevronRight, Check, ArrowRight,
  TrendingDown, Layers, Users, CheckCircle
} from 'lucide-react';
import { useAlert } from '../../context/AlertContext';

const initialCandidates = [
  {
    id: 'ONB-01',
    name: 'Noah Campbell',
    role: 'DevOps & Cloud Architect',
    department: 'Engineering',
    startDate: 'Nov 03, 2026',
    status: 'Near Complete',
    progress: 80,
    avatar: 'NC',
    avatarColor: 'bg-[#002D62]',
    hardware: 'Apple MacBook Pro M3 (Shipped)',
    tasks: [
      { category: 'Compliance', name: 'Identity & I-9 Verification Cleared', done: true },
      { category: 'Hardware', name: 'Apple M3 Pro Laptop Configured & Dispatched', done: true },
      { category: 'Access', name: 'Corporate Email & AWS Root IAM Assigned', done: true },
      { category: 'HR', name: 'Benefits & Health Enrollment Completed', done: true },
      { category: 'Team', name: 'Team Lead 1-on-1 Kickoff Meeting Scheduled', done: false }
    ]
  },
  {
    id: 'ONB-02',
    name: 'Zoe Martinez',
    role: 'Talent Acquisition Partner',
    department: 'People & HR',
    startDate: 'Nov 10, 2026',
    status: 'In Progress',
    progress: 40,
    avatar: 'ZM',
    avatarColor: 'bg-[#00A8A8]',
    hardware: 'Lenovo ThinkPad X1 (Configured)',
    tasks: [
      { category: 'Compliance', name: 'Identity & Background Clearance Verified', done: true },
      { category: 'Hardware', name: 'Lenovo ThinkPad Laptop Provisioned in MDM', done: true },
      { category: 'Access', name: 'Corporate Mailbox & Slack Channels Invited', done: false },
      { category: 'HR', name: 'Direct Deposit Form & Tax W-4 Acknowledged', done: false },
      { category: 'Team', name: 'HR Department Buddy Introduction Scheduled', done: false }
    ]
  },
  {
    id: 'ONB-03',
    name: 'Devon Lane',
    role: 'Full Stack Engineer',
    department: 'Engineering',
    startDate: 'Nov 17, 2026',
    status: 'In Progress',
    progress: 20,
    avatar: 'DL',
    avatarColor: 'bg-[#334E68]',
    hardware: 'Pending IT Warehouse Allocation',
    tasks: [
      { category: 'Compliance', name: 'Formal Offer Letter Signed & Stored in Dossier', done: true },
      { category: 'Hardware', name: 'Hardware Delivery Shipping Address Confirmed', done: false },
      { category: 'Compliance', name: 'Background Verification Clearance Check', done: false },
      { category: 'HR', name: 'Direct Deposit Bank Account Details Submitted', done: false },
      { category: 'Team', name: 'First Day Welcome Schedule & Agenda Shared', done: false }
    ]
  }
];

export default function HROnboarding() {
  const { showToast } = useAlert();
  const [candidates, setCandidates] = useState(initialCandidates);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [showInitiateModal, setShowInitiateModal] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState(null);

  // New onboarding form state
  const [newHireForm, setNewHireForm] = useState({
    name: '',
    role: '',
    department: 'Engineering',
    startDate: new Date().toISOString().split('T')[0],
    hardware: 'Apple MacBook Pro M3',
    manager: 'Marcus Sterling'
  });

  const toggleTask = (candId, taskIdx) => {
    setCandidates(prev => prev.map(c => {
      if (c.id !== candId) return c;
      const newTasks = [...c.tasks];
      newTasks[taskIdx].done = !newTasks[taskIdx].done;
      const completed = newTasks.filter(t => t.done).length;
      const progress = Math.round((completed / newTasks.length) * 100);
      const status = progress === 100 ? 'Fully Ready' : progress >= 75 ? 'Near Complete' : 'In Progress';
      return { ...c, tasks: newTasks, progress, status };
    }));
    showToast('Checklist progress updated in live pipeline', 'info');
  };

  const handleInitiateNewHire = (e) => {
    e.preventDefault();
    if (!newHireForm.name || !newHireForm.role) {
      showToast('Please provide all mandatory details', 'error');
      return;
    }

    const nextId = `ONB-0${candidates.length + 1}`;
    const initials = newHireForm.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase() || 'NH';

    const newCand = {
      id: nextId,
      name: newHireForm.name,
      role: newHireForm.role,
      department: newHireForm.department,
      startDate: newHireForm.startDate,
      status: 'In Progress',
      progress: 20,
      avatar: initials,
      avatarColor: 'bg-[#002D62]',
      hardware: `${newHireForm.hardware} (Requested)`,
      tasks: [
        { category: 'Compliance', name: 'Offer Letter Signed & Acknowledged', done: true },
        { category: 'Hardware', name: `${newHireForm.hardware} Provisioned`, done: false },
        { category: 'Access', name: 'Corporate Email & Identity Setup', done: false },
        { category: 'HR', name: 'Benefits & Direct Deposit Submitted', done: false },
        { category: 'Team', name: 'Team Kickoff Meeting with ' + newHireForm.manager, done: false }
      ]
    };

    setCandidates([newCand, ...candidates]);
    showToast(`Onboarding pipeline initialized for ${newHireForm.name}!`, 'success');
    setShowInitiateModal(false);
    setNewHireForm({
      name: '',
      role: '',
      department: 'Engineering',
      startDate: new Date().toISOString().split('T')[0],
      hardware: 'Apple MacBook Pro M3',
      manager: 'Marcus Sterling'
    });
  };

  const filtered = candidates.filter(c => {
    const matchesSearch = c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.role.toLowerCase().includes(search.toLowerCase()) ||
      c.department.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === 'All' || c.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalTasks = candidates.reduce((s, c) => s + c.tasks.length, 0);
  const doneTasks = candidates.reduce((s, c) => s + c.tasks.filter(t => t.done).length, 0);
  const overallCohortProgress = Math.round((doneTasks / (totalTasks || 1)) * 100);

  return (
    <div className="space-y-6 font-sans">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[11px] font-black uppercase tracking-wider text-[#00A8A8] bg-[#00A8A8]/10 px-2.5 py-0.5 rounded-full border border-[#00A8A8]/20">
              Talent Lifecycle & Readiness
            </span>
            <span className="text-slate-300">•</span>
            <span className="text-xs text-slate-400 font-semibold">Q4 Active Cohort</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-[#002D62] tracking-tight">
            New Hire Onboarding Pipeline
          </h1>
          <p className="text-xs sm:text-sm text-[#334E68] mt-1">
            Automated provisioning workflows, hardware logistics tracking, and statutory compliance checklists.
          </p>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          <button
            onClick={() => setShowInitiateModal(true)}
            className="inline-flex items-center gap-2 bg-[#002D62] hover:bg-[#001D42] text-white px-4 py-2.5 rounded-xl font-bold text-xs shadow-sm hover:shadow-md transition-all cursor-pointer"
          >
            <Plus size={15} />
            <span>Initiate Onboarding</span>
          </button>
        </div>
      </div>

      {/* 4 Perfected KPI Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Active Cohort */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-2xs hover:shadow-sm hover:border-slate-300 transition-all flex flex-col justify-between">
          <div className="flex items-center justify-between gap-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Active Cohort</span>
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#002D62] flex items-center justify-center shrink-0">
              <Compass size={18} />
            </div>
          </div>
          <div className="my-2.5">
            <div className="text-2xl lg:text-3xl font-black text-[#002D62] tracking-tight">
              {candidates.length} <span className="text-sm font-bold text-slate-500">New Hires</span>
            </div>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
            <span className="w-2 h-2 rounded-full bg-[#00A8A8]"></span>
            <span>{overallCohortProgress}% overall completion</span>
          </div>
        </div>

        {/* Card 2: Hardware Logistics */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-2xs hover:shadow-sm hover:border-slate-300 transition-all flex flex-col justify-between">
          <div className="flex items-center justify-between gap-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Hardware Logistics</span>
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
              <Laptop size={18} />
            </div>
          </div>
          <div className="my-2.5">
            <div className="text-2xl lg:text-3xl font-black text-emerald-700 tracking-tight">
              2 / 3 <span className="text-sm font-bold text-emerald-600">Shipped</span>
            </div>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            <span>1 in warehouse staging</span>
          </div>
        </div>

        {/* Card 3: Compliance & I-9 */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-2xs hover:shadow-sm hover:border-slate-300 transition-all flex flex-col justify-between">
          <div className="flex items-center justify-between gap-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Compliance & I-9</span>
            <div className="w-10 h-10 rounded-xl bg-teal-50 text-[#00A8A8] flex items-center justify-center shrink-0">
              <ShieldCheck size={18} />
            </div>
          </div>
          <div className="my-2.5">
            <div className="text-2xl lg:text-3xl font-black text-[#00A8A8] tracking-tight">
              100% <span className="text-sm font-bold text-[#00A8A8]/80">Cleared</span>
            </div>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
            <CheckCircle size={13} className="text-[#00A8A8]" />
            <span>Identity & W-4 verified</span>
          </div>
        </div>

        {/* Card 4: Time-to-Productivity */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-2xs hover:shadow-sm hover:border-slate-300 transition-all flex flex-col justify-between">
          <div className="flex items-center justify-between gap-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Time-to-Productivity</span>
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#002D62] flex items-center justify-center shrink-0">
              <Clock size={18} />
            </div>
          </div>
          <div className="my-2.5">
            <div className="text-2xl lg:text-3xl font-black text-[#002D62] tracking-tight">
              11.8 <span className="text-sm font-bold text-slate-500">Days</span>
            </div>
          </div>
          <div className="flex items-center gap-1 text-xs text-emerald-600 font-bold">
            <TrendingDown size={13} />
            <span>-2.4d vs industry average</span>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar (Segmented Control Bar) */}
      <div className="bg-white rounded-2xl p-3 border border-slate-200/80 shadow-2xs flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        {/* Segmented Filter Pills */}
        <div className="inline-flex items-center p-1 bg-slate-100/80 rounded-xl border border-slate-200/50 overflow-x-auto no-scrollbar">
          {[
            { id: 'All', label: 'All', count: candidates.length },
            { id: 'In Progress', label: 'In Progress', count: candidates.filter(c => c.status === 'In Progress').length },
            { id: 'Near Complete', label: 'Near Complete', count: candidates.filter(c => c.status === 'Near Complete').length },
            { id: 'Fully Ready', label: 'Fully Ready', count: candidates.filter(c => c.status === 'Fully Ready').length }
          ].map((tab) => {
            const isActive = statusFilter === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setStatusFilter(tab.id)}
                className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all shrink-0 cursor-pointer ${
                  isActive
                    ? 'bg-[#002D62] text-white shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                }`}
              >
                <span>{tab.label}</span>
                <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-black ${
                  isActive ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-700'
                }`}>
                  {tab.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-80">
          <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search by candidate or department..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-8 py-2 rounded-xl border border-slate-200 text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#00A8A8] focus:border-transparent bg-white shadow-2xs placeholder:text-slate-400"
          />
          {search && (
            <button
              onClick={() => setSearch('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-0.5 cursor-pointer"
            >
              <X size={13} />
            </button>
          )}
        </div>
      </div>

      {/* Candidate Pipeline Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((cand) => (
          <div
            key={cand.id}
            className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between group"
          >
            <div>
              {/* Card Header */}
              <div className="flex items-start justify-between gap-3 mb-4">
                <div className="flex items-center gap-3">
                  <div className={`w-11 h-11 rounded-2xl ${cand.avatarColor} text-white flex items-center justify-center font-bold text-sm shadow-xs`}>
                    {cand.avatar}
                  </div>
                  <div>
                    <h3 className="text-base font-black text-[#002D62] group-hover:text-[#00A8A8] transition-colors leading-snug">
                      {cand.name}
                    </h3>
                    <p className="text-xs text-slate-500 font-medium truncate max-w-[160px]">{cand.role}</p>
                  </div>
                </div>

                <span className="text-[10px] font-mono font-bold text-[#002D62] bg-[#002D62]/5 px-2 py-0.5 rounded border border-[#002D62]/10 shrink-0">
                  {cand.id}
                </span>
              </div>

              {/* Department & Start Date meta */}
              <div className="flex items-center justify-between text-xs py-2 px-3 bg-slate-50 rounded-xl mb-4 border border-slate-100">
                <span className="font-semibold text-slate-600">{cand.department}</span>
                <span className="text-slate-400 font-medium">Starts: <strong className="text-slate-700">{cand.startDate}</strong></span>
              </div>

              {/* Progress Bar */}
              <div className="mb-4">
                <div className="flex justify-between text-xs font-bold mb-1.5">
                  <span className="text-slate-600">Onboarding Readiness</span>
                  <span className={cand.progress >= 80 ? 'text-emerald-600' : 'text-[#002D62]'}>
                    {cand.progress}%
                  </span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      cand.progress >= 80 
                        ? 'bg-emerald-500' 
                        : 'bg-gradient-to-r from-[#002D62] to-[#00A8A8]'
                    }`}
                    style={{ width: `${cand.progress}%` }}
                  />
                </div>
              </div>

              {/* Checklist Tasks */}
              <div className="space-y-2 mb-4">
                <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                  Readiness Milestones ({cand.tasks.filter(t => t.done).length}/{cand.tasks.length}):
                </div>
                {cand.tasks.map((task, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => toggleTask(cand.id, idx)}
                    className="w-full flex items-start gap-2.5 text-xs text-left p-1.5 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer group/item"
                  >
                    <div className={`w-4 h-4 rounded-md border flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                      task.done 
                        ? 'bg-emerald-500 border-emerald-500 text-white' 
                        : 'border-slate-300 group-hover/item:border-[#00A8A8]'
                    }`}>
                      {task.done && <Check size={11} strokeWidth={3} />}
                    </div>
                    <span className={`text-xs leading-snug ${task.done ? 'line-through text-slate-400 font-normal' : 'text-slate-700 font-semibold'}`}>
                      {task.name}
                    </span>
                  </button>
                ))}
              </div>

              {/* Hardware allocated */}
              <div className="p-2.5 rounded-xl bg-slate-50/80 border border-slate-100 flex items-center gap-2 text-xs text-slate-600 mb-4">
                <Laptop size={14} className="text-slate-400 shrink-0" />
                <span className="truncate">{cand.hardware}</span>
              </div>
            </div>

            {/* Action Footer */}
            <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setSelectedCandidate(cand)}
                className="text-xs font-bold text-[#002D62] hover:text-[#00A8A8] transition-colors cursor-pointer"
              >
                View Dossier
              </button>

              <button
                type="button"
                onClick={() => showToast(`Automated welcome reminder dispatched to ${cand.name}!`, 'success')}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#00A8A8] bg-[#00A8A8]/10 hover:bg-[#00A8A8]/20 px-2.5 py-1 rounded-lg transition-colors cursor-pointer"
              >
                <Send size={12} />
                <span>Send Reminder</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal: Initiate Onboarding (Portaled to document.body for full website blur) */}
      {showInitiateModal && typeof document !== 'undefined' && createPortal(
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6 overflow-y-auto font-sans">
          <div 
            className="fixed inset-0 bg-slate-950/60 backdrop-blur-md transition-opacity duration-300 cursor-pointer"
            onClick={() => setShowInitiateModal(false)}
          />

          <div 
            className="relative z-10 bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl border border-slate-200/80 my-auto animate-in fade-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-5">
              <div>
                <h3 className="text-lg font-black text-[#002D62]">Initiate New Hire Onboarding</h3>
                <p className="text-xs text-slate-500">Configure logistics, IT equipment, and milestone checklists</p>
              </div>
              <button
                onClick={() => setShowInitiateModal(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleInitiateNewHire} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Candidate Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Maya Lin"
                  value={newHireForm.name}
                  onChange={e => setNewHireForm({ ...newHireForm, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-[#00A8A8]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Department</label>
                  <select
                    value={newHireForm.department}
                    onChange={e => setNewHireForm({ ...newHireForm, department: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-[#00A8A8] bg-white"
                  >
                    <option value="Engineering">Engineering</option>
                    <option value="People & HR">People & HR</option>
                    <option value="Sales">Sales</option>
                    <option value="Marketing">Marketing</option>
                    <option value="Finance">Finance</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Designation / Role *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. AI Research Lead"
                    value={newHireForm.role}
                    onChange={e => setNewHireForm({ ...newHireForm, role: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-[#00A8A8]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Official Start Date</label>
                  <input
                    type="date"
                    value={newHireForm.startDate}
                    onChange={e => setNewHireForm({ ...newHireForm, startDate: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-[#00A8A8]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Assigned Manager</label>
                  <input
                    type="text"
                    value={newHireForm.manager}
                    onChange={e => setNewHireForm({ ...newHireForm, manager: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-[#00A8A8]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Work Hardware Package</label>
                <select
                  value={newHireForm.hardware}
                  onChange={e => setNewHireForm({ ...newHireForm, hardware: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-[#00A8A8] bg-white"
                >
                  <option value="Apple MacBook Pro M3">Apple MacBook Pro M3 (16-inch)</option>
                  <option value="Apple MacBook Air M3">Apple MacBook Air M3 (13-inch)</option>
                  <option value="Lenovo ThinkPad X1">Lenovo ThinkPad X1 Carbon</option>
                  <option value="Dell Precision 5690">Dell Precision 5690 Workstation</option>
                </select>
              </div>

              <div className="pt-3 flex gap-3">
                <button
                  type="button"
                  onClick={() => setShowInitiateModal(false)}
                  className="flex-1 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-50 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-[#002D62] hover:bg-[#001D42] text-white text-xs font-bold shadow-md shadow-[#002D62]/20 transition-all cursor-pointer"
                >
                  Deploy Workflow
                </button>
              </div>
            </form>
          </div>
        </div>,
        document.body
      )}

      {/* Modal: View Candidate Dossier */}
      {selectedCandidate && typeof document !== 'undefined' && createPortal(
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6 overflow-y-auto font-sans">
          <div 
            className="fixed inset-0 bg-slate-950/60 backdrop-blur-md transition-opacity duration-300 cursor-pointer"
            onClick={() => setSelectedCandidate(null)}
          />

          <div 
            className="relative z-10 bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl border border-slate-200/80 my-auto animate-in fade-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
              <div className="flex items-center gap-3">
                <div className={`w-12 h-12 rounded-2xl ${selectedCandidate.avatarColor} text-white flex items-center justify-center font-bold text-base shadow-xs`}>
                  {selectedCandidate.avatar}
                </div>
                <div>
                  <h3 className="text-base font-black text-[#002D62]">{selectedCandidate.name}</h3>
                  <p className="text-xs text-slate-500 font-medium">{selectedCandidate.role} • {selectedCandidate.department}</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedCandidate(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3 bg-slate-50 rounded-xl space-y-1.5">
                <div className="flex justify-between">
                  <span className="text-slate-400">Pipeline ID:</span>
                  <span className="font-mono font-bold text-slate-800">{selectedCandidate.id}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Start Date:</span>
                  <span className="font-semibold text-slate-800">{selectedCandidate.startDate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Allocated Machine:</span>
                  <span className="font-semibold text-[#002D62]">{selectedCandidate.hardware}</span>
                </div>
              </div>

              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-2">
                  Detailed Checklist Breakdown:
                </span>
                <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
                  {selectedCandidate.tasks.map((t, idx) => (
                    <div key={idx} className="flex items-center justify-between p-2 rounded-lg bg-slate-50/60 border border-slate-100">
                      <div className="flex items-center gap-2">
                        {t.done ? (
                          <CheckCircle2 size={14} className="text-emerald-500 shrink-0" />
                        ) : (
                          <Clock size={14} className="text-amber-500 shrink-0" />
                        )}
                        <span className="text-xs font-medium text-slate-700">{t.name}</span>
                      </div>
                      <span className={`text-[10px] font-bold px-1.5 py-0.2 rounded ${t.done ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'}`}>
                        {t.done ? 'Done' : 'Pending'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-5 pt-4 border-t border-slate-100 flex gap-2">
              <button
                type="button"
                onClick={() => setSelectedCandidate(null)}
                className="w-full py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-xs font-bold text-slate-700 transition-colors cursor-pointer"
              >
                Close Dossier
              </button>
            </div>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
}
