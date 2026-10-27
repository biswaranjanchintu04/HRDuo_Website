import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Users, UserPlus, Calendar, Clock, TrendingUp, Cake,
  CalendarCheck, CalendarRange, Wallet, Briefcase, Search,
  ArrowRight, Eye, CheckCircle2, AlertCircle, Sparkles, Filter
} from 'lucide-react';
import { useHRMS } from '../../context/HRMSContext';
import { useAlert } from '../../context/AlertContext';

export default function HRDashboard() {
  const { employees, leaves, attendance } = useHRMS();
  const { showToast } = useAlert();

  const [tableSearch, setTableSearch] = useState('');

  const totalEmployees = employees.length || 128;
  const newJoiners = 8;
  const employeesOnLeave = leaves.filter(l => l.status === 'Approved').length || 6;
  const pendingLeaveRequests = leaves.filter(l => l.status === 'Pending').length || 4;
  const attendanceRate = '94.2%';
  const upcomingBirthdays = 3;

  const dashboardCards = [
    {
      title: 'Total Employees',
      value: totalEmployees,
      change: '+12% YTD',
      color: 'bg-blue-600',
      light: 'bg-blue-50 text-blue-700',
      icon: Users
    },
    {
      title: 'New Joiners',
      value: newJoiners,
      change: 'Joined this month',
      color: 'bg-purple-600',
      light: 'bg-purple-50 text-purple-700',
      icon: UserPlus
    },
    {
      title: 'Employees on Leave',
      value: employeesOnLeave,
      change: 'Active leaves',
      color: 'bg-amber-600',
      light: 'bg-amber-50 text-amber-700',
      icon: Calendar
    },
    {
      title: 'Pending Leave Requests',
      value: pendingLeaveRequests,
      change: 'Awaiting HR action',
      color: 'bg-rose-600',
      light: 'bg-rose-50 text-rose-700',
      icon: Clock
    },
    {
      title: 'Attendance Rate',
      value: attendanceRate,
      change: '+1.8% vs last mo',
      color: 'bg-emerald-600',
      light: 'bg-emerald-50 text-emerald-700',
      icon: TrendingUp
    },
    {
      title: 'Upcoming Birthdays',
      value: upcomingBirthdays,
      change: 'This week',
      color: 'bg-indigo-600',
      light: 'bg-indigo-50 text-indigo-700',
      icon: Cake
    }
  ];

  const filteredEmployees = employees.filter(e =>
    e.name.toLowerCase().includes(tableSearch.toLowerCase()) ||
    e.department.toLowerCase().includes(tableSearch.toLowerCase()) ||
    e.role.toLowerCase().includes(tableSearch.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">HR Operations & People Hub</h1>
          <p className="text-sm text-slate-500 mt-0.5">
            Talent lifecycle, onboarding pipelines, leave approvals, and employee records.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            to="/hr/add-employee"
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-4 py-2 rounded-xl shadow-md shadow-blue-500/20 transition-all"
          >
            <UserPlus size={14} />
            <span>Add Employee</span>
          </Link>
          <Link
            to="/hr/recruitment"
            className="inline-flex items-center gap-2 bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold px-4 py-2 rounded-xl border border-slate-200 shadow-2xs transition-all"
          >
            <Briefcase size={14} />
            <span>Recruitment Pipeline</span>
          </Link>
        </div>
      </div>

      {/* 6 Required Dashboard Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {dashboardCards.map((card) => {
          const Icon = card.icon;
          return (
            <div
              key={card.title}
              className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div className="flex items-center justify-between mb-3">
                <div className={`w-9 h-9 rounded-xl ${card.color} text-white flex items-center justify-center shadow-xs`}>
                  <Icon size={18} />
                </div>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${card.light}`}>
                  {card.change}
                </span>
              </div>
              <div>
                <div className="text-xl font-black text-slate-900 tracking-tight leading-none">
                  {card.value}
                </div>
                <div className="text-xs text-slate-500 font-semibold mt-1 truncate">
                  {card.title}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick Action Rows: Pending Leaves & Upcoming Birthdays */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Pending Requests Queue */}
        <div className="lg:col-span-8 bg-white rounded-3xl p-6 border border-slate-200/80 shadow-2xs">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-base font-bold text-slate-900">Pending Leave Applications</h2>
              <p className="text-xs text-slate-500">Awaiting HR operational approval</p>
            </div>
            <Link to="/hr/leaves" className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1">
              <span>View All Requests</span>
              <ArrowRight size={13} />
            </Link>
          </div>

          <div className="space-y-3">
            {leaves.filter(l => l.status === 'Pending').slice(0, 3).map((leave) => (
              <div
                key={leave.id}
                className="p-3.5 rounded-2xl bg-slate-50/70 border border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-slate-50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <img src={leave.avatar} alt={leave.name} className="w-10 h-10 rounded-full object-cover shrink-0" />
                  <div>
                    <div className="text-xs font-bold text-slate-900">{leave.name}</div>
                    <div className="text-[11px] text-slate-500">{leave.role} • {leave.department}</div>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-xs">
                  <div>
                    <span className="font-bold text-slate-800">{leave.type}</span>
                    <span className="text-slate-400 block text-[11px]">{leave.days} day(s)</span>
                  </div>
                  <Link
                    to="/hr/leaves"
                    className="px-3 py-1.5 rounded-xl bg-blue-600 text-white font-bold text-xs hover:bg-blue-700 transition-colors"
                  >
                    Review
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Birthdays & Anniversaries */}
        <div className="lg:col-span-4 bg-white rounded-3xl p-6 border border-slate-200/80 shadow-2xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-bold text-slate-900">Celebrations This Week</h2>
              <Cake size={18} className="text-pink-500" />
            </div>

            <div className="space-y-3.5">
              {[
                { name: 'Liam Gallagher', event: 'Birthday', date: 'Tomorrow, Oct 28', dept: 'Engineering' },
                { name: 'Aisha Patel', event: '2-Year Work Anniversary', date: 'Thursday, Oct 30', dept: 'Product Design' },
                { name: 'David Kim', event: 'Birthday', date: 'Friday, Oct 31', dept: 'Marketing' }
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 p-2.5 rounded-xl bg-slate-50/50">
                  <div className="w-8 h-8 rounded-full bg-pink-100 text-pink-600 flex items-center justify-center font-bold text-xs shrink-0">
                    🎂
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-bold text-slate-900">{item.name}</div>
                    <div className="text-[10px] text-slate-500">{item.event} • <span className="text-blue-600 font-semibold">{item.date}</span></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100">
            <button
              onClick={() => showToast('Dispatched company-wide automated greetings card!', 'success')}
              className="w-full py-2 rounded-xl bg-pink-50 text-pink-700 font-bold text-xs hover:bg-pink-100 transition-colors"
            >
              Send Automated Greeting
            </button>
          </div>
        </div>
      </div>

      {/* Live Employee Table Section with Search, Filter & Status Badges */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-2xs">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-5">
          <div>
            <h2 className="text-base font-bold text-slate-900">Employee Records Directory</h2>
            <p className="text-xs text-slate-500">Personnel records, employment status, and profile views</p>
          </div>

          <div className="flex items-center gap-2">
            <div className="relative">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search employee..."
                value={tableSearch}
                onChange={(e) => setTableSearch(e.target.value)}
                className="pl-8 pr-3 py-1.5 rounded-xl border border-slate-200 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50/50"
              />
            </div>
            <Link
              to="/hr/employees"
              className="px-3.5 py-1.5 rounded-xl bg-blue-50 text-blue-700 font-bold text-xs hover:bg-blue-100 transition-colors"
            >
              Full Directory
            </Link>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50/80 border-b border-slate-100 text-slate-400 font-bold uppercase tracking-wider">
              <tr>
                <th className="px-4 py-3">Employee</th>
                <th className="px-4 py-3">Department</th>
                <th className="px-4 py-3">Designation</th>
                <th className="px-4 py-3">Work Email</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Joined Date</th>
                <th className="px-4 py-3 text-right">Profile View</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
              {filteredEmployees.slice(0, 6).map((emp) => (
                <tr key={emp.id} className="hover:bg-slate-50/60 transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2.5">
                      <img src={emp.avatar} alt={emp.name} className="w-8 h-8 rounded-full object-cover shrink-0" />
                      <div>
                        <div className="font-bold text-slate-900">{emp.name}</div>
                        <div className="text-[10px] text-slate-400 font-mono">{emp.empId}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 font-semibold text-slate-800">{emp.department}</td>
                  <td className="px-4 py-3 text-slate-600">{emp.role}</td>
                  <td className="px-4 py-3 text-slate-500 font-mono">{emp.email}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      emp.status === 'Active' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' :
                      emp.status === 'On Leave' ? 'bg-amber-50 text-amber-700 border border-amber-200' :
                      'bg-slate-100 text-slate-700'
                    }`}>
                      {emp.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-slate-500">{emp.joiningDate}</td>
                  <td className="px-4 py-3 text-right">
                    <Link
                      to="/hr/employee-details"
                      className="px-2.5 py-1 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-700 font-bold text-xs inline-flex items-center gap-1"
                    >
                      <Eye size={12} />
                      <span>View</span>
                    </Link>
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
