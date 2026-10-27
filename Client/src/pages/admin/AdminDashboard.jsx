import React, { useState } from 'react';
import {
  Users, UserCheck, UserX, Calendar, Clock, Layers,
  TrendingUp, Plus, ArrowRight, Eye, CheckCircle2, AlertCircle,
  MoreHorizontal, ChevronRight, Sparkles
} from 'lucide-react';
import {
  BarChart, Bar, AreaChart, Area, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer, Legend
} from 'recharts';
import { Link } from 'react-router-dom';
import { useHRMS } from '../../context/HRMSContext';
import { useAlert } from '../../context/AlertContext';

const weeklyAttendance = [
  { day: 'Mon', present: 118, absent: 4, leave: 6 },
  { day: 'Tue', present: 121, absent: 2, leave: 5 },
  { day: 'Wed', present: 114, absent: 8, leave: 6 },
  { day: 'Thu', present: 122, absent: 1, leave: 5 },
  { day: 'Fri', present: 116, absent: 5, leave: 7 },
  { day: 'Sat', present: 45, absent: 0, leave: 0 },
  { day: 'Sun', present: 30, absent: 0, leave: 0 }
];

export default function AdminDashboard() {
  const { employees, attendance, leaves, departments } = useHRMS();
  const { showToast } = useAlert();

  const [tableSearch, setTableSearch] = useState('');

  const totalEmployees = employees.length > 0 ? employees.length : 128;
  const presentToday = attendance.filter(a => a.status === 'Present').length || 114;
  const absentToday = attendance.filter(a => a.status === 'Absent').length || 8;
  const onLeaveToday = leaves.filter(l => l.status === 'Approved').length || 6;
  const pendingApprovals = leaves.filter(l => l.status === 'Pending').length || 5;
  const departmentCount = departments.length || 6;

  const dashboardCards = [
    {
      title: 'Total Employees',
      value: totalEmployees,
      change: '+4 this month',
      color: 'bg-blue-600',
      light: 'bg-blue-50 text-blue-700',
      icon: Users
    },
    {
      title: 'Present Today',
      value: presentToday,
      change: `${Math.round((presentToday / totalEmployees) * 100)}% attendance`,
      color: 'bg-emerald-600',
      light: 'bg-emerald-50 text-emerald-700',
      icon: UserCheck
    },
    {
      title: 'Absent Today',
      value: absentToday,
      change: 'Normal variance',
      color: 'bg-rose-600',
      light: 'bg-rose-50 text-rose-700',
      icon: UserX
    },
    {
      title: 'Employees on Leave',
      value: onLeaveToday,
      change: 'Planned time-off',
      color: 'bg-amber-600',
      light: 'bg-amber-50 text-amber-700',
      icon: Calendar
    },
    {
      title: 'Pending Approvals',
      value: pendingApprovals,
      change: 'Requires action',
      color: 'bg-purple-600',
      light: 'bg-purple-50 text-purple-700',
      icon: Clock
    },
    {
      title: 'Department Overview',
      value: `${departmentCount} Depts`,
      change: 'Full coverage',
      color: 'bg-indigo-600',
      light: 'bg-indigo-50 text-indigo-700',
      icon: Layers
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
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">Company Administration</h1>
          <p className="text-sm text-slate-500 mt-0.5">
            Real-time workforce health, department roster, and operational approvals.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/admin/employees"
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-4 py-2 rounded-xl shadow-md shadow-blue-500/20 transition-all"
          >
            <Plus size={14} />
            <span>Add Employee</span>
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

      {/* Middle Row: Attendance Chart & Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Attendance Trends Bar Chart */}
        <div className="lg:col-span-8 bg-white rounded-3xl p-6 border border-slate-200/80 shadow-2xs">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-base font-bold text-slate-900">Weekly Attendance Dynamics</h2>
              <p className="text-xs text-slate-500">Live roster check-ins vs. planned leaves</p>
            </div>
            <Link to="/admin/attendance" className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1">
              <span>View Full Roster</span>
              <ArrowRight size={13} />
            </Link>
          </div>

          <div className="h-64 sm:h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weeklyAttendance} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                <XAxis dataKey="day" stroke="#94A3B8" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis stroke="#94A3B8" fontSize={11} tickLine={false} axisLine={false} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0F172A', borderRadius: '12px', border: 'none', color: '#fff', fontSize: '12px' }}
                />
                <Legend iconType="circle" wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
                <Bar dataKey="present" name="Present" fill="#2563EB" radius={[4, 4, 0, 0]} />
                <Bar dataKey="leave" name="On Leave" fill="#F59E0B" radius={[4, 4, 0, 0]} />
                <Bar dataKey="absent" name="Absent" fill="#EF4444" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Activity Feed */}
        <div className="lg:col-span-4 bg-white rounded-3xl p-6 border border-slate-200/80 shadow-2xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-bold text-slate-900">Recent Workforce Activity</h2>
              <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">Live</span>
            </div>

            <div className="space-y-3.5">
              {[
                { title: 'Leave Approved', desc: 'Rachel Green approved for Annual Leave (5 days)', time: '15m ago', color: 'text-emerald-600 bg-emerald-50' },
                { title: 'Check-in Recorded', desc: 'Sophia Chen punched in at 09:12 AM', time: '1h ago', color: 'text-blue-600 bg-blue-50' },
                { title: 'New Employee Joined', desc: 'Liam Gallagher added to Engineering Department', time: '3h ago', color: 'text-purple-600 bg-purple-50' },
                { title: 'Shift Policy Synced', desc: 'Core flexible work hours updated company-wide', time: '1d ago', color: 'text-amber-600 bg-amber-50' }
              ].map((act, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className={`w-8 h-8 rounded-xl ${act.color} flex items-center justify-center shrink-0 text-xs font-bold`}>
                    •
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="text-xs font-bold text-slate-900">{act.title}</p>
                      <span className="text-[10px] text-slate-400">{act.time}</span>
                    </div>
                    <p className="text-xs text-slate-500 mt-0.5 leading-snug">{act.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100">
            <Link to="/admin/reports" className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center justify-between">
              <span>Generate Audit Activity Report</span>
              <ArrowRight size={13} />
            </Link>
          </div>
        </div>
      </div>

      {/* Employee Table Section */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-2xs">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-5">
          <div>
            <h2 className="text-base font-bold text-slate-900">Workforce Directory</h2>
            <p className="text-xs text-slate-500">Quick view of team members, roles, and status</p>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="text"
              placeholder="Search table..."
              value={tableSearch}
              onChange={(e) => setTableSearch(e.target.value)}
              className="px-3.5 py-1.5 rounded-xl border border-slate-200 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50/50"
            />
            <Link
              to="/admin/employees"
              className="px-3 py-1.5 rounded-xl bg-blue-50 text-blue-700 font-bold text-xs hover:bg-blue-100 transition-colors"
            >
              Manage All
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
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Location</th>
                <th className="px-4 py-3 text-right">Action</th>
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
                  <td className="px-4 py-3">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      emp.status === 'Active' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' :
                      emp.status === 'On Leave' ? 'bg-amber-50 text-amber-700 border border-amber-200' :
                      'bg-slate-100 text-slate-700'
                    }`}>
                      {emp.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-slate-500">{emp.location}</td>
                  <td className="px-4 py-3 text-right">
                    <Link
                      to={`/admin/employees`}
                      className="text-blue-600 hover:text-blue-800 font-bold"
                    >
                      View
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
