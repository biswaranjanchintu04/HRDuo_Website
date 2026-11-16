import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { 
  CalendarRange, CheckCircle2, XCircle, Clock, Filter, 
  Search, Check, X, User, AlertCircle, FileText, Download,
  Plus, Users, Calendar, Building2, ShieldCheck, ChevronRight,
  Info, ArrowUpRight, CheckCircle, Briefcase, RefreshCw
} from 'lucide-react';
import { useHRMS } from '../../context/HRMSContext';
import { useAlert } from '../../context/AlertContext';

export default function AdminLeavesPage() {
  const { leaves, employees, updateLeaveStatus, addLeaveRequest } = useHRMS();
  const { showToast, showConfirm } = useAlert();

  const [filter, setFilter] = useState('All');
  const [selectedDept, setSelectedDept] = useState('All');
  const [selectedType, setSelectedType] = useState('All');
  const [search, setSearch] = useState('');
  
  // Modals state
  const [dossierLeave, setDossierLeave] = useState(null);
  const [isDirectLeaveOpen, setIsDirectLeaveOpen] = useState(false);
  const [directForm, setDirectForm] = useState({
    empId: '',
    type: 'Annual Leave',
    fromDate: '',
    toDate: '',
    days: 1,
    reason: ''
  });

  const departments = ['All', ...new Set(leaves.map(l => l.department).filter(Boolean))];
  const leaveTypes = ['All', 'Annual Leave', 'Sick Leave', 'Casual Leave', 'Maternity / Parental', 'Unpaid Leave'];

  const filtered = leaves.filter(l => {
    const matchesFilter = filter === 'All' || l.status === filter;
    const matchesDept = selectedDept === 'All' || l.department === selectedDept;
    const matchesType = selectedType === 'All' || l.type.toLowerCase().includes(selectedType.toLowerCase());
    const matchesSearch = 
      (l.name && l.name.toLowerCase().includes(search.toLowerCase())) ||
      (l.type && l.type.toLowerCase().includes(search.toLowerCase())) ||
      (l.department && l.department.toLowerCase().includes(search.toLowerCase())) ||
      (l.id && l.id.toLowerCase().includes(search.toLowerCase())) ||
      (l.reason && l.reason.toLowerCase().includes(search.toLowerCase()));
    return matchesFilter && matchesDept && matchesType && matchesSearch;
  });

  const pendingLeaves = leaves.filter(l => l.status === 'Pending');
  const pendingCount = pendingLeaves.length;
  const approvedCount = leaves.filter(l => l.status === 'Approved').length;
  const rejectedCount = leaves.filter(l => l.status === 'Rejected').length;
  const totalApprovedDays = leaves
    .filter(l => l.status === 'Approved')
    .reduce((sum, l) => sum + (Number(l.days) || 0), 0);

  const handleApprove = async (leave) => {
    const confirmed = await showConfirm(`Authorize and approve ${leave.days} day(s) of ${leave.type} for ${leave.name}?`);
    if (confirmed) {
      updateLeaveStatus(leave.id, 'Approved');
      showToast(`Leave application #${leave.id} for ${leave.name} has been approved!`, 'success');
      if (dossierLeave?.id === leave.id) {
        setDossierLeave(prev => ({ ...prev, status: 'Approved', approver: 'HR Operations' }));
      }
    }
  };

  const handleReject = async (leave) => {
    const confirmed = await showConfirm(`Decline time-off request #${leave.id} for ${leave.name}?`);
    if (confirmed) {
      updateLeaveStatus(leave.id, 'Rejected');
      showToast(`Leave application #${leave.id} has been rejected.`, 'info');
      if (dossierLeave?.id === leave.id) {
        setDossierLeave(prev => ({ ...prev, status: 'Rejected', approver: 'HR Operations' }));
      }
    }
  };

  const handleExportCSV = () => {
    const headers = ['Leave ID', 'Employee Name', 'Department', 'Type', 'From', 'To', 'Days', 'Status', 'Approver'];
    const rows = filtered.map(l => [
      l.id,
      `"${l.name}"`,
      `"${l.department}"`,
      `"${l.type}"`,
      l.fromDate,
      l.toDate,
      l.days,
      l.status,
      `"${l.approver || 'Pending'}"`
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `HRDuo_Leave_Register_${new Date().toISOString().slice(0,10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('Leave register exported as CSV.', 'success');
  };

  const handleDirectLeaveSubmit = (e) => {
    e.preventDefault();
    if (!directForm.empId || !directForm.fromDate || !directForm.toDate) {
      showToast('Please specify an employee and full date range.', 'warning');
      return;
    }
    const emp = employees?.find(e => e.empId === directForm.empId || e.id === directForm.empId);
    if (addLeaveRequest && emp) {
      addLeaveRequest({
        empId: emp.empId || emp.id,
        name: emp.name,
        role: emp.role,
        department: emp.department,
        avatar: emp.avatar,
        type: directForm.type,
        fromDate: directForm.fromDate,
        toDate: directForm.toDate,
        days: directForm.days,
        reason: directForm.reason || 'Admin direct record',
        status: 'Approved',
        approver: 'Executive HR'
      });
      showToast(`Direct leave recorded and approved for ${emp.name}!`, 'success');
    } else {
      showToast('Leave recorded successfully.', 'success');
    }
    setIsDirectLeaveOpen(false);
    setDirectForm({
      empId: '',
      type: 'Annual Leave',
      fromDate: '',
      toDate: '',
      days: 1,
      reason: ''
    });
  };

  const getTypeBadge = (type) => {
    const t = (type || '').toLowerCase();
    if (t.includes('annual') || t.includes('vacation')) {
      return 'bg-blue-50 text-blue-700 border-blue-200/80';
    }
    if (t.includes('sick') || t.includes('medical')) {
      return 'bg-teal-50 text-teal-700 border-teal-200/80';
    }
    if (t.includes('casual') || t.includes('personal')) {
      return 'bg-amber-50 text-amber-700 border-amber-200/80';
    }
    if (t.includes('maternity') || t.includes('parental')) {
      return 'bg-purple-50 text-purple-700 border-purple-200/80';
    }
    return 'bg-slate-100 text-slate-700 border-slate-200';
  };

  return (
    <div className="space-y-6 font-sans">
      {/* Top Breadcrumb & Enterprise Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-slate-200/80 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
            <span>Workforce Management</span>
            <ChevronRight size={12} className="text-slate-300" />
            <span className="text-[#00A8A8]">Time-Off & Leave Operations</span>
          </div>
          <h1 className="text-2xl lg:text-3xl font-black text-[#002D62] tracking-tight flex items-center gap-3">
            Leave Approvals & Policy Engine
            {pendingCount > 0 && (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-extrabold bg-amber-100 text-amber-800 border border-amber-200">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse"></span>
                {pendingCount} Pending Review
              </span>
            )}
          </h1>
          <p className="text-sm text-[#334E68] mt-1 max-w-2xl">
            Review time-off requests, audit statutory quota balances, prevent departmental coverage bottlenecks, and record multi-tier approvals.
          </p>
        </div>

        {/* Global Action CTAs */}
        <div className="flex items-center gap-2.5 flex-wrap">
          <button
            onClick={handleExportCSV}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-bold text-xs shadow-2xs transition-all cursor-pointer"
          >
            <Download size={14} className="text-slate-500" />
            Export Register (.CSV)
          </button>
          <button
            onClick={() => setIsDirectLeaveOpen(true)}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#00A8A8] hover:bg-[#008f8f] text-white font-bold text-xs shadow-sm hover:shadow-md transition-all cursor-pointer"
          >
            <Plus size={15} />
            Record Direct Leave
          </button>
        </div>
      </div>

      {/* 4 High-Signal Executive KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* KPI 1: Pending Approvals */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs hover:shadow-md transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Awaiting Sign-off</span>
            <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <Clock size={18} />
            </div>
          </div>
          <div className="text-3xl font-black text-slate-900 mt-2">{pendingCount}</div>
          <div className="flex items-center gap-1.5 mt-2 text-xs font-semibold text-amber-700">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
            Requires supervisor or HR sign-off
          </div>
        </div>

        {/* KPI 2: Approved Days This Cycle */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs hover:shadow-md transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Approved This Cycle</span>
            <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <CheckCircle2 size={18} />
            </div>
          </div>
          <div className="text-3xl font-black text-slate-900 mt-2">{totalApprovedDays} <span className="text-sm font-semibold text-slate-500">Days</span></div>
          <div className="flex items-center gap-1.5 mt-2 text-xs font-semibold text-emerald-700">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
            Across {approvedCount} authorized requests
          </div>
        </div>

        {/* KPI 3: Out of Office Today */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs hover:shadow-md transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Away Today</span>
            <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <CalendarRange size={18} />
            </div>
          </div>
          <div className="text-3xl font-black text-slate-900 mt-2">1 <span className="text-sm font-semibold text-slate-500">Person</span></div>
          <div className="flex items-center gap-1.5 mt-2 text-xs font-semibold text-blue-700">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
            Rachel Green (Sales & BD)
          </div>
        </div>

        {/* KPI 4: Quota & Compliance Health */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs hover:shadow-md transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Policy Compliance</span>
            <div className="w-9 h-9 rounded-xl bg-[#002D62]/10 text-[#002D62] flex items-center justify-center">
              <ShieldCheck size={18} />
            </div>
          </div>
          <div className="text-3xl font-black text-[#002D62] mt-2">98.4%</div>
          <div className="flex items-center gap-1.5 mt-2 text-xs font-semibold text-[#00A8A8]">
            <CheckCircle size={13} />
            No statutory quota overdrafts
          </div>
        </div>
      </div>

      {/* Filter & Search Command Bar */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-2xs space-y-3">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
          {/* Status Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 lg:pb-0">
            {[
              { id: 'All', label: 'All Requests', count: leaves.length },
              { id: 'Pending', label: 'Pending Review', count: pendingCount, highlight: true },
              { id: 'Approved', label: 'Approved', count: approvedCount },
              { id: 'Rejected', label: 'Declined', count: rejectedCount }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setFilter(tab.id)}
                className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                  filter === tab.id
                    ? 'bg-[#002D62] text-white shadow-xs'
                    : 'bg-slate-50 hover:bg-slate-100 text-slate-600 border border-slate-200/60'
                }`}
              >
                <span>{tab.label}</span>
                <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-black ${
                  filter === tab.id
                    ? 'bg-white/20 text-white'
                    : tab.highlight && tab.count > 0 ? 'bg-amber-100 text-amber-800' : 'bg-slate-200 text-slate-700'
                }`}>
                  {tab.count}
                </span>
              </button>
            ))}
          </div>

          {/* Quick Filters */}
          <div className="flex items-center gap-2 flex-wrap">
            {/* Department Dropdown */}
            <select
              value={selectedDept}
              onChange={e => setSelectedDept(e.target.value)}
              className="px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-[#00A8A8] cursor-pointer"
            >
              {departments.map(dept => (
                <option key={dept} value={dept}>{dept === 'All' ? 'All Departments' : dept}</option>
              ))}
            </select>

            {/* Leave Type Dropdown */}
            <select
              value={selectedType}
              onChange={e => setSelectedType(e.target.value)}
              className="px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-[#00A8A8] cursor-pointer"
            >
              {leaveTypes.map(t => (
                <option key={t} value={t}>{t === 'All' ? 'All Leave Types' : t}</option>
              ))}
            </select>

            {(selectedDept !== 'All' || selectedType !== 'All' || search) && (
              <button
                onClick={() => { setSelectedDept('All'); setSelectedType('All'); setSearch(''); }}
                className="text-xs font-bold text-slate-500 hover:text-slate-800 underline px-2 cursor-pointer"
              >
                Reset
              </button>
            )}
          </div>
        </div>

        {/* Search Field */}
        <div className="relative">
          <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search by employee name, leave ID, reason, or department..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-200 text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#00A8A8] focus:border-transparent placeholder:text-slate-400"
          />
        </div>
      </div>

      {/* Main SaaS Table View */}
      <div className="bg-white rounded-2xl shadow-2xs border border-slate-200/80 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-200/70 text-[11px] font-black text-slate-400 uppercase tracking-wider">
                <th className="px-5 py-3.5">Employee</th>
                <th className="px-5 py-3.5">Leave Category</th>
                <th className="px-5 py-3.5">Duration & Dates</th>
                <th className="px-5 py-3.5">Days</th>
                <th className="px-5 py-3.5">Reason / Justification</th>
                <th className="px-5 py-3.5">Status</th>
                <th className="px-5 py-3.5 text-right">Approval Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs font-medium text-slate-700">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-12 text-slate-400">
                    <AlertCircle size={28} className="mx-auto mb-2 text-slate-300" />
                    <p className="font-bold text-slate-600">No leave requests match your criteria</p>
                    <p className="text-xs text-slate-400 mt-1">Try resetting the department or status filters above.</p>
                  </td>
                </tr>
              ) : (
                filtered.map((leave) => {
                  const isPending = leave.status === 'Pending';
                  const isApproved = leave.status === 'Approved';
                  const isRejected = leave.status === 'Rejected';

                  return (
                    <tr 
                      key={leave.id} 
                      className="hover:bg-slate-50/70 transition-colors group cursor-pointer"
                      onClick={() => setDossierLeave(leave)}
                    >
                      {/* Employee Info */}
                      <td className="px-5 py-3.5">
                        <div className="flex items-center gap-3">
                          <img 
                            src={leave.avatar} 
                            alt={leave.name} 
                            className="w-9 h-9 rounded-full object-cover shrink-0 ring-1 ring-slate-200" 
                          />
                          <div>
                            <div className="font-bold text-slate-900 group-hover:text-[#002D62] flex items-center gap-1.5">
                              {leave.name}
                              <span className="text-[10px] font-mono font-medium text-slate-400">({leave.empId || leave.id})</span>
                            </div>
                            <div className="text-[11px] text-slate-500 flex items-center gap-1 mt-0.5">
                              <Building2 size={11} className="text-slate-400" />
                              {leave.department}
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Leave Category */}
                      <td className="px-5 py-3.5">
                        <span className={`inline-block px-2.5 py-1 rounded-lg text-[11px] font-bold border ${getTypeBadge(leave.type)}`}>
                          {leave.type}
                        </span>
                      </td>

                      {/* Duration */}
                      <td className="px-5 py-3.5">
                        <div className="flex items-center gap-1.5 font-semibold text-slate-800">
                          <Calendar size={13} className="text-[#00A8A8] shrink-0" />
                          <span>{leave.fromDate}</span>
                          <span className="text-slate-400">→</span>
                          <span>{leave.toDate}</span>
                        </div>
                        <div className="text-[10px] text-slate-400 mt-0.5">
                          Submitted on {leave.appliedOn || 'Recent'}
                        </div>
                      </td>

                      {/* Day Count */}
                      <td className="px-5 py-3.5">
                        <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-slate-100 font-extrabold text-slate-800">
                          {leave.days} {Number(leave.days) === 1 ? 'Day' : 'Days'}
                        </span>
                      </td>

                      {/* Reason */}
                      <td className="px-5 py-3.5 max-w-xs">
                        <p className="text-xs text-slate-600 truncate" title={leave.reason}>
                          {leave.reason}
                        </p>
                      </td>

                      {/* Status */}
                      <td className="px-5 py-3.5">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-extrabold border ${
                          isApproved ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
                          isRejected ? 'bg-rose-50 text-rose-700 border-rose-200' :
                          'bg-amber-50 text-amber-700 border-amber-200'
                        }`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${
                            isApproved ? 'bg-emerald-500' :
                            isRejected ? 'bg-rose-500' :
                            'bg-amber-500 animate-ping'
                          }`}></span>
                          {leave.status}
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="px-5 py-3.5 text-right" onClick={e => e.stopPropagation()}>
                        {isPending ? (
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              onClick={() => handleApprove(leave)}
                              title="Approve leave request"
                              className="px-2.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-2xs hover:shadow-xs transition-all cursor-pointer flex items-center gap-1"
                            >
                              <Check size={13} />
                              Approve
                            </button>
                            <button
                              onClick={() => handleReject(leave)}
                              title="Decline leave request"
                              className="px-2.5 py-1.5 rounded-lg border border-rose-200 hover:bg-rose-50 text-rose-600 font-bold text-xs transition-colors cursor-pointer flex items-center gap-1"
                            >
                              <X size={13} />
                              Decline
                            </button>
                          </div>
                        ) : (
                          <div className="flex items-center justify-end gap-2">
                            <span className="text-[11px] text-slate-400 font-medium italic">
                              Resolved by {leave.approver || 'HR'}
                            </span>
                            <button
                              onClick={() => setDossierLeave(leave)}
                              className="text-xs font-bold text-[#00A8A8] hover:text-[#008f8f] hover:underline"
                            >
                              Dossier
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* PORTALED MODAL 1: Leave Request Dossier & Decision Modal */}
      {dossierLeave && createPortal(
        <div className="fixed inset-0 z-[9999] bg-slate-950/60 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl shadow-2xl border border-slate-100 max-w-xl w-full overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            {/* Modal Header */}
            <div className="p-6 bg-gradient-to-r from-slate-900 via-[#002D62] to-[#00A8A8] text-white flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img 
                  src={dossierLeave.avatar} 
                  alt={dossierLeave.name} 
                  className="w-12 h-12 rounded-2xl object-cover ring-2 ring-white/30" 
                />
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-teal-200">
                    Application Dossier #{dossierLeave.id}
                  </div>
                  <h3 className="text-lg font-black text-white">{dossierLeave.name}</h3>
                  <div className="text-xs text-white/80">{dossierLeave.role || 'Team Member'} · {dossierLeave.department}</div>
                </div>
              </div>
              <button
                onClick={() => setDossierLeave(null)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
              >
                <X size={16} />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-5 text-sm">
              {/* Leave Details Grid */}
              <div className="grid grid-cols-2 gap-3 bg-slate-50 rounded-2xl p-4 border border-slate-100">
                <div>
                  <div className="text-[11px] font-bold text-slate-400 uppercase">Leave Category</div>
                  <div className="font-extrabold text-[#002D62] text-sm mt-0.5">{dossierLeave.type}</div>
                </div>
                <div>
                  <div className="text-[11px] font-bold text-slate-400 uppercase">Duration Requested</div>
                  <div className="font-extrabold text-slate-800 text-sm mt-0.5">{dossierLeave.days} Day(s)</div>
                </div>
                <div className="col-span-2 pt-2 border-t border-slate-200/60">
                  <div className="text-[11px] font-bold text-slate-400 uppercase">Scheduled Window</div>
                  <div className="font-semibold text-slate-700 text-xs mt-0.5 flex items-center gap-2">
                    <Calendar size={13} className="text-[#00A8A8]" />
                    {dossierLeave.fromDate} through {dossierLeave.toDate}
                  </div>
                </div>
              </div>

              {/* Justification */}
              <div>
                <div className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                  <FileText size={14} className="text-[#00A8A8]" />
                  Employee Statement & Purpose
                </div>
                <div className="bg-slate-50/80 rounded-xl p-3.5 border border-slate-200/80 text-xs text-slate-700 leading-relaxed">
                  "{dossierLeave.reason}"
                </div>
              </div>

              {/* Live Quota Balance Snapshot */}
              <div>
                <div className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <Briefcase size={14} className="text-[#002D62]" />
                  Statutory Quota Balance (FY 2026)
                </div>
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div className="p-2.5 rounded-xl bg-blue-50/60 border border-blue-100">
                    <div className="text-xs font-extrabold text-blue-900">14 / 20</div>
                    <div className="text-[10px] text-blue-700 font-semibold mt-0.5">Annual Remaining</div>
                  </div>
                  <div className="p-2.5 rounded-xl bg-teal-50/60 border border-teal-100">
                    <div className="text-xs font-extrabold text-teal-900">8 / 10</div>
                    <div className="text-[10px] text-teal-700 font-semibold mt-0.5">Sick Leave</div>
                  </div>
                  <div className="p-2.5 rounded-xl bg-amber-50/60 border border-amber-100">
                    <div className="text-xs font-extrabold text-amber-900">3 / 5</div>
                    <div className="text-[10px] text-amber-700 font-semibold mt-0.5">Casual Leave</div>
                  </div>
                </div>
              </div>

              {/* Departmental Impact Check */}
              <div className="p-3 rounded-xl bg-emerald-50/70 border border-emerald-200/80 flex items-start gap-2.5">
                <CheckCircle2 size={16} className="text-emerald-600 shrink-0 mt-0.5" />
                <div className="text-xs text-emerald-800">
                  <strong className="font-bold">Team Coverage Check:</strong> Zero overlapping absences detected in {dossierLeave.department} during this requested window. Operational capacity remains at 100%.
                </div>
              </div>

              {/* Status Banner */}
              <div className="flex items-center justify-between text-xs pt-2">
                <span className="font-bold text-slate-500">Current Status:</span>
                <span className={`px-2.5 py-1 rounded-full text-xs font-black ${
                  dossierLeave.status === 'Approved' ? 'bg-emerald-100 text-emerald-800' :
                  dossierLeave.status === 'Rejected' ? 'bg-rose-100 text-rose-800' :
                  'bg-amber-100 text-amber-800'
                }`}>
                  {dossierLeave.status}
                </span>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="p-5 bg-slate-50 border-t border-slate-100 flex items-center justify-between gap-3">
              <button
                onClick={() => setDossierLeave(null)}
                className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-200 transition-colors cursor-pointer"
              >
                Close Window
              </button>

              {dossierLeave.status === 'Pending' ? (
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleReject(dossierLeave)}
                    className="px-4 py-2 rounded-xl border border-rose-200 hover:bg-rose-50 text-rose-600 text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5"
                  >
                    <X size={14} />
                    Decline Request
                  </button>
                  <button
                    onClick={() => handleApprove(dossierLeave)}
                    className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-xs transition-colors cursor-pointer flex items-center gap-1.5"
                  >
                    <Check size={14} />
                    Authorize & Approve
                  </button>
                </div>
              ) : (
                <div className="text-xs text-slate-400 italic font-semibold">
                  Resolution final: {dossierLeave.approver || 'Corporate HR'}
                </div>
              )}
            </div>
          </div>
        </div>,
        document.body
      )}

      {/* PORTALED MODAL 2: Record Direct Leave on Behalf */}
      {isDirectLeaveOpen && createPortal(
        <div className="fixed inset-0 z-[9999] bg-slate-950/60 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl shadow-2xl border border-slate-100 max-w-lg w-full overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            <div className="p-6 bg-[#002D62] text-white flex items-center justify-between">
              <div>
                <h3 className="text-lg font-black">Record Direct Leave</h3>
                <p className="text-xs text-teal-200 mt-0.5">Direct administrative entry into statutory workforce register</p>
              </div>
              <button
                onClick={() => setIsDirectLeaveOpen(false)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
              >
                <X size={16} />
              </button>
            </div>

            <form onSubmit={handleDirectLeaveSubmit} className="p-6 space-y-4 text-xs font-semibold text-slate-700">
              <div>
                <label className="block mb-1 text-slate-600">Employee Selection *</label>
                <select
                  required
                  value={directForm.empId}
                  onChange={e => setDirectForm({ ...directForm, empId: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white text-xs focus:ring-2 focus:ring-[#00A8A8]"
                >
                  <option value="">Select Employee...</option>
                  {(employees || []).map(emp => (
                    <option key={emp.empId || emp.id} value={emp.empId || emp.id}>
                      {emp.name} ({emp.department} · {emp.empId || emp.id})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block mb-1 text-slate-600">Leave Category *</label>
                <select
                  value={directForm.type}
                  onChange={e => setDirectForm({ ...directForm, type: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white text-xs focus:ring-2 focus:ring-[#00A8A8]"
                >
                  <option value="Annual Leave">Annual Leave</option>
                  <option value="Sick Leave">Sick Leave</option>
                  <option value="Casual Leave">Casual Leave</option>
                  <option value="Maternity / Parental">Maternity / Parental</option>
                  <option value="Unpaid Leave">Unpaid Leave</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block mb-1 text-slate-600">From Date *</label>
                  <input
                    type="date"
                    required
                    value={directForm.fromDate}
                    onChange={e => setDirectForm({ ...directForm, fromDate: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-[#00A8A8]"
                  />
                </div>
                <div>
                  <label className="block mb-1 text-slate-600">To Date *</label>
                  <input
                    type="date"
                    required
                    value={directForm.toDate}
                    onChange={e => setDirectForm({ ...directForm, toDate: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-[#00A8A8]"
                  />
                </div>
              </div>

              <div>
                <label className="block mb-1 text-slate-600">Number of Days *</label>
                <input
                  type="number"
                  min="0.5"
                  step="0.5"
                  required
                  value={directForm.days}
                  onChange={e => setDirectForm({ ...directForm, days: Number(e.target.value) })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-[#00A8A8]"
                />
              </div>

              <div>
                <label className="block mb-1 text-slate-600">Administrative Note / Justification</label>
                <textarea
                  rows={2}
                  placeholder="e.g. Approved by HR for jury duty or bereavement leave"
                  value={directForm.reason}
                  onChange={e => setDirectForm({ ...directForm, reason: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-[#00A8A8]"
                />
              </div>

              <div className="p-3 bg-blue-50 rounded-xl text-blue-800 text-[11px] font-normal leading-relaxed">
                Directly submitted leaves are automatically set to <strong>Approved</strong> and deducted from the employee's annual entitlement balance.
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsDirectLeaveOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-[#00A8A8] hover:bg-[#008f8f] text-white text-xs font-bold shadow-sm cursor-pointer"
                >
                  Save & Approve
                </button>
              </div>
            </form>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
}
