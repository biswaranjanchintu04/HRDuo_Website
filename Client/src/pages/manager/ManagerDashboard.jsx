import React from 'react';
import { Link } from 'react-router-dom';
import {
  Users, UserCheck, UserX, Calendar, Clock,
  ArrowRight, Check, X, Award, CheckCircle2, AlertCircle,
  Briefcase, TrendingUp, ChevronRight, Phone, Mail, MessageSquare
} from 'lucide-react';
import { useHRMS } from '../../context/HRMSContext';
import { useAlert } from '../../context/AlertContext';

export default function ManagerDashboard() {
  const { employees, attendance, leaves, updateLeaveStatus } = useHRMS();
  const { showToast, showConfirm } = useAlert();

  const myTeam = employees.filter(e => e.department === 'Engineering' || e.manager === 'Marcus Sterling');
  const teamMembersCount = myTeam.length || 12;
  const presentToday = 10;
  const absentToday = 1;
  const onLeaveToday = 1;
  const pendingApprovals = leaves.filter(l => l.status === 'Pending');
  const pendingApprovalsCount = pendingApprovals.length || 3;

  const dashboardCards = [
    {
      title: 'Team Members',
      value: teamMembersCount,
      change: 'Engineering Pod',
      color: 'bg-[#0061E0]',
      light: 'bg-blue-50 text-blue-700',
      icon: Users
    },
    {
      title: 'Present Today',
      value: presentToday,
      change: '91% on-time',
      color: 'bg-emerald-600',
      light: 'bg-emerald-50 text-emerald-700',
      icon: UserCheck
    },
    {
      title: 'Absent Today',
      value: absentToday,
      change: '1 Unplanned',
      color: 'bg-rose-600',
      light: 'bg-rose-50 text-rose-700',
      icon: UserX
    },
    {
      title: 'On Leave',
      value: onLeaveToday,
      change: 'Approved PTO',
      color: 'bg-amber-600',
      light: 'bg-amber-50 text-amber-700',
      icon: Calendar
    },
    {
      title: 'Pending Approvals',
      value: pendingApprovalsCount,
      change: 'Action Required',
      color: 'bg-purple-600',
      light: 'bg-purple-50 text-purple-700',
      icon: Clock
    }
  ];

  const handleApprove = async (leave) => {
    const confirmed = await showConfirm(`Approve ${leave.type} (${leave.days}d) for ${leave.name}?`);
    if (confirmed) {
      updateLeaveStatus(leave.id, 'Approved');
      showToast(`Approved leave request for ${leave.name}`, 'success');
    }
  };

  const handleReject = async (leave) => {
    const confirmed = await showConfirm(`Reject leave request for ${leave.name}?`);
    if (confirmed) {
      updateLeaveStatus(leave.id, 'Rejected');
      showToast(`Rejected leave request for ${leave.name}`, 'info');
    }
  };

  const quickShortcuts = [
    { label: 'Approvals', path: '/manager/leaves', icon: Clock, color: 'text-purple-700 bg-purple-50 border-purple-200' },
    { label: 'Corrections', path: '/manager/corrections', icon: CheckCircle2, color: 'text-amber-700 bg-amber-50 border-amber-200' },
    { label: 'Team Goals', path: '/manager/performance', icon: TrendingUp, color: 'text-blue-700 bg-blue-50 border-blue-200' },
    { label: 'Reports', path: '/manager/reports', icon: Award, color: 'text-emerald-700 bg-emerald-50 border-emerald-200' },
    { label: 'Messages', path: '/manager/messages', icon: MessageSquare, color: 'text-violet-700 bg-violet-50 border-violet-200' },
  ];

  return (
    <div className="space-y-4 font-poppins">
      {/* Welcome Header - Mobile Only */}
      <div className="lg:hidden">
        <h1 className="text-lg font-black text-slate-900 tracking-tight">Good morning, Marcus 👋</h1>
        <p className="text-xs text-slate-500 font-medium mt-0.5">Engineering Pod • Sprint 4 Active</p>
      </div>

      {/* Quick Action Chips Carousel */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1 pt-0.5 -mx-0.5 px-0.5">
        {quickShortcuts.map((chip) => {
          const Icon = chip.icon;
          return (
            <Link
              key={chip.label}
              to={chip.path}
              className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-2xl border text-xs font-bold shrink-0 shadow-2xs hover:shadow-sm transition-all active:scale-95 touch-manipulation ${chip.color}`}
            >
              <Icon size={14} />
              <span>{chip.label}</span>
            </Link>
          );
        })}
      </div>

      {/* Team Pulse Status Hero Card */}
      <div className="bg-white rounded-3xl p-4 sm:p-5 border border-slate-200/80 shadow-md relative overflow-hidden">
        <div className="flex items-center justify-between mb-3">
          <div>
            <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
              Live Team Overview
            </div>
            <h2 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight">
              Engineering Pod Status
            </h2>
          </div>
          <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-purple-100 text-purple-800 border border-purple-200 whitespace-nowrap">
            Sprint 4 Active
          </span>
        </div>

        {/* Live Attendance Pills */}
        <div className="grid grid-cols-3 gap-2 my-2">
          <div className="p-2.5 rounded-2xl bg-emerald-50 border border-emerald-100 text-center">
            <div className="text-lg font-black text-emerald-800">{presentToday}</div>
            <div className="text-[10px] font-bold text-emerald-600">Present</div>
          </div>
          <div className="p-2.5 rounded-2xl bg-amber-50 border border-amber-100 text-center">
            <div className="text-lg font-black text-amber-800">{onLeaveToday}</div>
            <div className="text-[10px] font-bold text-amber-600">On Leave</div>
          </div>
          <div className="p-2.5 rounded-2xl bg-rose-50 border border-rose-100 text-center">
            <div className="text-lg font-black text-rose-800">{absentToday}</div>
            <div className="text-[10px] font-bold text-rose-600">Absent</div>
          </div>
        </div>

        <p className="text-[11px] text-slate-500 font-medium text-center mt-2">
          ✨ 91% of your pod clocked in on time today.
        </p>
      </div>

      {/* 5 Metric Cards — 2 cols mobile, 3 cols tablet, 5 cols desktop */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5 sm:gap-3">
        {dashboardCards.map((card, idx) => {
          const Icon = card.icon;
          const isFifthOnMobile = idx === 4;
          return (
            <div
              key={card.title}
              className={`bg-white rounded-2xl p-3.5 border border-slate-200/80 shadow-2xs flex flex-col justify-between transition-all hover:shadow-sm ${
                isFifthOnMobile ? 'col-span-2 sm:col-span-1' : ''
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className={`w-8 h-8 rounded-xl ${card.color} text-white flex items-center justify-center shadow-2xs`}>
                  <Icon size={16} />
                </div>
                <span className={`text-[9px] font-black px-1.5 py-0.5 rounded-md ${card.light} text-right leading-tight max-w-[72px]`}>
                  {card.change}
                </span>
              </div>
              <div>
                <div className="text-xl font-black text-slate-900 tracking-tight leading-tight">
                  {card.value}
                </div>
                <div className="text-[10px] text-slate-400 font-semibold mt-0.5 leading-tight">
                  {card.title}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Main Content Layout: Stack on Mobile, 2-Column Grid on Desktop */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Left Column: Direct Reports Roster */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-white rounded-3xl p-4 border border-slate-200/80 shadow-2xs">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-1.5 text-xs font-black text-slate-900 uppercase tracking-wider">
                <Users size={14} className="text-purple-600" />
                <span>My Direct Reports</span>
              </div>
              <Link to="/manager/team" className="text-xs font-bold text-purple-600 hover:underline flex items-center gap-0.5">
                View All ({myTeam.length || 12})
                <ChevronRight size={13} />
              </Link>
            </div>

            <div className="space-y-2">
              {(myTeam.length > 0 ? myTeam : [
                { id: 1, name: 'Sarah Jenkins', role: 'Senior Developer', email: 'sarah@hrduo.com' },
                { id: 2, name: 'Tom Watts', role: 'Frontend Developer', email: 'tom@hrduo.com' },
                { id: 3, name: 'Mia Park', role: 'QA Engineer', email: 'mia@hrduo.com' },
                { id: 4, name: 'Jake Torres', role: 'DevOps Engineer', email: 'jake@hrduo.com' },
              ]).slice(0, 5).map((member) => (
                <div
                  key={member.id}
                  className="flex items-center justify-between p-2.5 rounded-2xl bg-slate-50/70 border border-slate-100 hover:bg-slate-50 active:bg-slate-100 transition-colors"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl bg-purple-100 text-purple-800 font-black text-xs flex items-center justify-center shrink-0">
                      {member.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div className="min-w-0">
                      <div className="text-xs font-bold text-slate-900 truncate">{member.name}</div>
                      <div className="text-[10px] text-slate-400 truncate">{member.role}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 shrink-0">
                    <a
                      href={`mailto:${member.email || 'team@hrduo.com'}`}
                      className="p-2 rounded-lg text-slate-400 hover:text-purple-600 hover:bg-purple-50 active:bg-purple-100 transition-colors touch-manipulation"
                      title="Send Email"
                    >
                      <Mail size={14} />
                    </a>
                    <a
                      href="tel:+15550192"
                      className="p-2 rounded-lg text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 active:bg-emerald-100 transition-colors touch-manipulation"
                      title="Call"
                    >
                      <Phone size={14} />
                    </a>
                  </div>
                </div>
              ))}
            </div>

            <Link
              to="/manager/team"
              className="mt-3 flex items-center justify-center gap-1.5 w-full py-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 active:bg-slate-200 text-xs font-bold text-slate-600 transition-colors border border-slate-100"
            >
              <span>Full Team Directory</span>
              <ArrowRight size={13} />
            </Link>
          </div>
        </div>

        {/* Right Column: Pending Leave Approvals */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white rounded-3xl p-4 sm:p-5 border border-slate-200/80 shadow-2xs">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider">Leave Approvals</h3>
                <p className="text-[10px] text-slate-400">One-tap decision cards</p>
              </div>
              <Link to="/manager/leaves" className="text-xs font-bold text-purple-600 hover:underline flex items-center gap-0.5">
                <span>All ({pendingApprovalsCount})</span>
                <ChevronRight size={13} />
              </Link>
            </div>

            <div className="space-y-3">
              {pendingApprovals.length > 0 ? pendingApprovals.slice(0, 3).map((leave) => (
                <div
                  key={leave.id}
                  className="p-3.5 rounded-2xl bg-slate-50/80 border border-slate-100 flex flex-col gap-2.5"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <div className="text-xs font-black text-slate-900 truncate">{leave.name}</div>
                      <div className="text-[10px] text-slate-500 font-medium mt-0.5">
                        {leave.type} • {leave.days} Day{leave.days > 1 ? 's' : ''} ({leave.startDate} – {leave.endDate})
                      </div>
                    </div>
                    <span className="text-[9px] font-black uppercase px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 shrink-0">
                      Pending
                    </span>
                  </div>

                  <div className="text-[11px] text-slate-600 bg-white p-2.5 rounded-xl border border-slate-100 italic leading-snug">
                    "{leave.reason}"
                  </div>

                  <div className="flex items-center gap-2 pt-0.5">
                    <button
                      onClick={() => handleApprove(leave)}
                      className="flex-1 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-bold text-xs flex items-center justify-center gap-1 shadow-xs transition-colors cursor-pointer touch-manipulation"
                    >
                      <Check size={14} />
                      <span>Approve</span>
                    </button>
                    <button
                      onClick={() => handleReject(leave)}
                      className="flex-1 py-2.5 rounded-xl bg-slate-200 hover:bg-rose-100 active:bg-rose-200 hover:text-rose-700 text-slate-700 font-bold text-xs flex items-center justify-center gap-1 transition-colors cursor-pointer touch-manipulation"
                    >
                      <X size={14} />
                      <span>Reject</span>
                    </button>
                  </div>
                </div>
              )) : (
                /* Fallback demo cards when no data from context */
                [
                  { id: 'd1', name: 'Tom Watts', type: 'Casual', days: 2, startDate: 'Nov 3', endDate: 'Nov 4', reason: 'Personal family appointment.' },
                  { id: 'd2', name: 'Mia Park', type: 'Sick', days: 1, startDate: 'Nov 1', endDate: 'Nov 1', reason: 'Medical check-up.' },
                ].map((leave) => (
                  <div key={leave.id} className="p-3.5 rounded-2xl bg-slate-50/80 border border-slate-100 flex flex-col gap-2.5">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <div className="text-xs font-black text-slate-900">{leave.name}</div>
                        <div className="text-[10px] text-slate-500 font-medium mt-0.5">
                          {leave.type} • {leave.days} Day{leave.days > 1 ? 's' : ''} ({leave.startDate} – {leave.endDate})
                        </div>
                      </div>
                      <span className="text-[9px] font-black uppercase px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 shrink-0">Pending</span>
                    </div>
                    <div className="text-[11px] text-slate-600 bg-white p-2.5 rounded-xl border border-slate-100 italic">"{leave.reason}"</div>
                    <div className="flex items-center gap-2">
                      <button className="flex-1 py-2.5 rounded-xl bg-emerald-600 text-white font-bold text-xs flex items-center justify-center gap-1 touch-manipulation">
                        <Check size={14} /><span>Approve</span>
                      </button>
                      <button className="flex-1 py-2.5 rounded-xl bg-slate-200 text-slate-700 font-bold text-xs flex items-center justify-center gap-1 touch-manipulation">
                        <X size={14} /><span>Reject</span>
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            <Link
              to="/manager/leaves"
              className="mt-3 flex items-center justify-center gap-1.5 w-full py-2.5 rounded-xl bg-purple-50 hover:bg-purple-100 active:bg-purple-200 text-xs font-bold text-purple-700 transition-colors border border-purple-100"
            >
              <span>All Leave Requests</span>
              <ArrowRight size={13} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
