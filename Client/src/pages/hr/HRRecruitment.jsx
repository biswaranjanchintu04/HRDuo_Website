import React, { useState } from 'react';
import { UserPlus, Plus, Search, Filter, Briefcase, Mail, Phone, Clock, CheckCircle2, ChevronRight, FileText } from 'lucide-react';

const mockJobs = [
  { id: 1, title: 'Senior Backend Engineer (Node/Go)', dept: 'Engineering', applicants: 14, status: 'Active', type: 'Full-Time', location: 'Hybrid / SF' },
  { id: 2, title: 'Product UI/UX Designer', dept: 'Product', applicants: 8, status: 'Active', type: 'Full-Time', location: 'Remote' },
  { id: 3, title: 'HR Generalist / Operations', dept: 'Human Resources', applicants: 19, status: 'Active', type: 'Full-Time', location: 'On-site' },
  { id: 4, title: 'Enterprise Account Executive', dept: 'Sales & Growth', applicants: 6, status: 'Draft', type: 'Full-Time', location: 'New York' },
];

const mockCandidates = [
  { name: 'Marcus Sterling', job: 'Senior Backend Engineer', stage: 'Technical Interview', score: '94%', exp: '6 yrs', email: 'marcus@example.com' },
  { name: 'Ananya Sharma', job: 'Product UI/UX Designer', stage: 'Portfolio Review', score: '89%', exp: '4 yrs', email: 'ananya@example.com' },
  { name: 'Elena Rostova', job: 'HR Generalist', stage: 'HR Final Round', score: '92%', exp: '5 yrs', email: 'elena@example.com' },
  { name: 'David Kim', job: 'Senior Backend Engineer', stage: 'Offer Dispatched', score: '97%', exp: '7 yrs', email: 'david.k@example.com' },
];

export default function HRRecruitment() {
  const [jobs] = useState(mockJobs);
  const [candidates] = useState(mockCandidates);
  const [activeTab, setActiveTab] = useState('pipeline');

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            <UserPlus className="w-7 h-7 text-rose-600" />
            Recruitment & Talent Acquisition
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Manage job requisitions, candidate interview pipelines, and offer letters.
          </p>
        </div>

        <button className="px-5 py-2.5 bg-rose-600 hover:bg-rose-700 text-white font-bold text-sm rounded-xl flex items-center gap-2 shadow-sm transition-all self-start sm:self-auto">
          <Plus className="w-4 h-4" />
          Create Job Opening
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm">
          <div className="text-xs font-bold text-slate-400 uppercase">Active Openings</div>
          <div className="text-2xl font-black text-slate-900 mt-1">4 Roles</div>
          <div className="text-xs text-rose-600 font-medium mt-0.5">Across 4 departments</div>
        </div>
        <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm">
          <div className="text-xs font-bold text-slate-400 uppercase">Total Applicants</div>
          <div className="text-2xl font-black text-slate-900 mt-1">47</div>
          <div className="text-xs text-slate-500 mt-0.5">+12 this week</div>
        </div>
        <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm">
          <div className="text-xs font-bold text-slate-400 uppercase">Interviews Slated</div>
          <div className="text-2xl font-black text-purple-600 mt-1">9</div>
          <div className="text-xs text-slate-500 mt-0.5">Next 48 hours</div>
        </div>
        <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm">
          <div className="text-xs font-bold text-slate-400 uppercase">Offers Accepted</div>
          <div className="text-2xl font-black text-emerald-600 mt-1">3</div>
          <div className="text-xs text-emerald-600 font-medium mt-0.5">Joining in Nov</div>
        </div>
      </div>

      {/* Main Card: Jobs & Candidates */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex items-center gap-2">
          <button
            onClick={() => setActiveTab('pipeline')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors ${
              activeTab === 'pipeline' ? 'bg-rose-600 text-white' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            Candidate Pipeline (4)
          </button>
          <button
            onClick={() => setActiveTab('jobs')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors ${
              activeTab === 'jobs' ? 'bg-rose-600 text-white' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            Open Job Requisitions (4)
          </button>
        </div>

        {activeTab === 'pipeline' ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="bg-slate-50/70 border-b border-slate-100 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                  <th className="py-3 px-5">Candidate</th>
                  <th className="py-3 px-4">Applied Role</th>
                  <th className="py-3 px-4">Experience</th>
                  <th className="py-3 px-4">Match Score</th>
                  <th className="py-3 px-4">Current Stage</th>
                  <th className="py-3 px-5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {candidates.map((c, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-4 px-5">
                      <div className="font-bold text-slate-900">{c.name}</div>
                      <div className="text-xs text-slate-400">{c.email}</div>
                    </td>
                    <td className="py-4 px-4 font-semibold text-slate-800">{c.job}</td>
                    <td className="py-4 px-4 text-slate-600">{c.exp}</td>
                    <td className="py-4 px-4">
                      <span className="font-black text-rose-600 bg-rose-50 px-2 py-0.5 rounded-md text-xs">
                        {c.score}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-purple-100 text-purple-800">
                        {c.stage}
                      </span>
                    </td>
                    <td className="py-4 px-5 text-right">
                      <button className="px-3 py-1.5 border border-slate-200 hover:border-slate-300 rounded-lg text-xs font-bold text-slate-700 transition-colors">
                        View Dossier
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="bg-slate-50/70 border-b border-slate-100 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                  <th className="py-3 px-5">Job Title</th>
                  <th className="py-3 px-4">Department</th>
                  <th className="py-3 px-4">Type & Location</th>
                  <th className="py-3 px-4">Applicants</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-5 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {jobs.map((j) => (
                  <tr key={j.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-4 px-5 font-bold text-slate-900">{j.title}</td>
                    <td className="py-4 px-4 text-slate-600">{j.dept}</td>
                    <td className="py-4 px-4 text-slate-600">{j.type} • {j.location}</td>
                    <td className="py-4 px-4 font-bold text-rose-600">{j.applicants} applied</td>
                    <td className="py-4 px-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold ${
                        j.status === 'Active' ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-600'
                      }`}>
                        {j.status}
                      </span>
                    </td>
                    <td className="py-4 px-5 text-right">
                      <button className="px-3 py-1.5 border border-slate-200 hover:border-slate-300 rounded-lg text-xs font-bold text-slate-700 transition-colors">
                        Manage Job
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
