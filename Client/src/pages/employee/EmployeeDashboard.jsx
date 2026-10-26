import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  CalendarCheck, Clock, Award, Wallet, CalendarRange,
  ArrowRight, CheckCircle2, AlertCircle, ScanFace, FileText,
  TrendingUp, Sparkles, Megaphone, ShieldCheck
} from 'lucide-react';

export default function EmployeeDashboard() {
  const [clockedIn, setClockedIn] = useState(true);
  const [clockInTime] = useState('09:04 AM');

  const stats = [
    {
      label: 'Days Present',
      value: '22',
      sub: 'This Month',
      icon: CalendarCheck,
      color: 'text-emerald-600 bg-emerald-50',
    },
    {
      label: 'Attendance Streak',
      value: '14 Days',
      sub: 'Top 5% in company 🔥',
      icon: Award,
      color: 'text-amber-600 bg-amber-50',
    },
    {
      label: 'Leaves Remaining',
      value: '8.5',
      sub: 'Out of 24 annual days',
      icon: CalendarRange,
      color: 'text-blue-600 bg-blue-50',
    },
    {
      label: 'Net Pay (Oct)',
      value: '$5,820',
      sub: 'Payslip generated',
      icon: Wallet,
      color: 'text-violet-600 bg-violet-50',
    },
  ];

  const recentPunches = [
    { date: 'Today, Oct 26', in: '09:04 AM', out: '—', status: 'Active', hours: '7h 15m' },
    { date: 'Fri, Oct 25', in: '09:01 AM', out: '06:12 PM', status: 'Present', hours: '9h 11m' },
    { date: 'Thu, Oct 24', in: '08:58 AM', out: '06:05 PM', status: 'Present', hours: '9h 07m' },
    { date: 'Wed, Oct 23', in: '09:15 AM', out: '06:30 PM', status: 'Present', hours: '9h 15m' },
  ];

  return (
    <div className="space-y-4 sm:space-y-6 max-w-7xl mx-auto">
      {/* Hero Welcome Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-700 text-white p-5 sm:p-7 md:p-9 shadow-lg shadow-emerald-900/10">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-5 sm:gap-6">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-[11px] sm:text-xs font-bold mb-2.5 tracking-wide uppercase">
              <Sparkles className="w-3.5 h-3.5" /> Employee Self-Service Portal
            </div>
            <h1 className="text-xl sm:text-2xl md:text-3xl font-black tracking-tight">
              Welcome back, Sarah Jenkins 👋
            </h1>
            <p className="text-emerald-100 text-xs sm:text-sm mt-1 max-w-xl">
              Senior Software Engineer • Product & Core Engineering. Verified biometric vector active.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3">
            <Link
              to="/face-kiosk"
              className="px-4 sm:px-5 py-2.5 sm:py-3 rounded-2xl bg-white text-emerald-800 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 hover:bg-emerald-50 transition-all shadow-md active:scale-95"
            >
              <ScanFace className="w-4 h-4 text-emerald-600" />
              Face Kiosk Attendance
            </Link>
            <div className="px-4 sm:px-5 py-2.5 sm:py-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-white font-semibold text-xs sm:text-sm flex items-center justify-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              {clockedIn ? `Clocked in at ${clockInTime}` : 'Not clocked in'}
            </div>
          </div>
        </div>

        {/* Ambient background ring */}
        <div className="absolute -right-10 -bottom-10 w-72 h-72 rounded-full bg-white/10 blur-2xl pointer-events-none" />
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {stats.map((s, idx) => {
          const Icon = s.icon;
          return (
            <div
              key={idx}
              className="bg-white rounded-2xl p-4 sm:p-5 shadow-sm border border-slate-100 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between mb-2 sm:mb-3">
                <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-slate-400 truncate">{s.label}</span>
                <div className={`p-2 rounded-xl ${s.color}`}>
                  <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
              </div>
              <div className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">{s.value}</div>
              <div className="text-[11px] sm:text-xs text-slate-500 font-medium mt-0.5 truncate">{s.sub}</div>
            </div>
          );
        })}
      </div>

      {/* Main Grid: Punch History & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        {/* Recent Attendance Logs */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-4 sm:p-6 shadow-sm border border-slate-100">
          <div className="flex items-center justify-between mb-4 sm:mb-5">
            <div>
              <h2 className="text-sm sm:text-base font-black text-slate-900 flex items-center gap-2">
                <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600" />
                Recent Daily Check-Ins
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">Biometric facial recognition & timestamp audit</p>
            </div>
            <Link
              to="/employee/attendance"
              className="text-xs font-bold text-emerald-600 hover:text-emerald-700 flex items-center gap-1"
            >
              Timesheet <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Mobile Punch Cards (< sm) */}
          <div className="block sm:hidden space-y-2.5">
            {recentPunches.map((p, idx) => (
              <div key={idx} className="p-3 rounded-xl border border-slate-100 bg-slate-50/60 flex items-center justify-between">
                <div>
                  <div className="font-bold text-xs text-slate-900">{p.date}</div>
                  <div className="text-[11px] text-slate-500 font-mono mt-0.5">
                    {p.in} → {p.out}
                  </div>
                </div>
                <div className="text-right">
                  <span
                    className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      p.status === 'Active'
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-slate-200 text-slate-700'
                    }`}
                  >
                    {p.status}
                  </span>
                  <div className="text-[10px] text-slate-400 font-semibold mt-0.5">{p.hours}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop/Tablet Table (sm+) */}
          <div className="hidden sm:block overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-slate-100 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  <th className="pb-3">Date</th>
                  <th className="pb-3">Check In</th>
                  <th className="pb-3">Check Out</th>
                  <th className="pb-3">Duration</th>
                  <th className="pb-3 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {recentPunches.map((p, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-3.5 font-bold text-slate-800">{p.date}</td>
                    <td className="py-3.5 text-slate-600">{p.in}</td>
                    <td className="py-3.5 text-slate-600">{p.out}</td>
                    <td className="py-3.5 text-slate-600 font-medium">{p.hours}</td>
                    <td className="py-3.5 text-right">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold ${
                          p.status === 'Active'
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-slate-100 text-slate-700'
                        }`}
                      >
                        {p.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Column: Quick Leave & Payslip Widget */}
        <div className="space-y-4 sm:space-y-6">
          {/* Quick Leave Apply */}
          <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-5 sm:p-6 text-white shadow-sm">
            <h3 className="text-sm sm:text-base font-bold flex items-center gap-2">
              <CalendarRange className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-400" />
              Apply for Leave
            </h3>
            <p className="text-xs text-slate-300 mt-1">
              Need time off? Submit your request directly to manager Alex Thompson.
            </p>

            <div className="mt-3.5 p-3 bg-white/10 rounded-xl flex items-center justify-between text-xs">
              <span className="text-slate-300">Casual: <strong className="text-white">4.5d</strong></span>
              <span className="text-slate-300">Sick: <strong className="text-white">4.0d</strong></span>
              <span className="text-slate-300">Vacation: <strong className="text-white">6.0d</strong></span>
            </div>

            <Link
              to="/employee/leaves"
              className="mt-3.5 w-full py-2.5 px-4 bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs sm:text-sm rounded-xl flex items-center justify-center gap-2 transition-colors"
            >
              Request Time Off
            </Link>
          </div>

          {/* Monthly Payslip Download Card */}
          <div className="bg-white rounded-2xl p-5 sm:p-6 shadow-sm border border-slate-100">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-xs sm:text-sm font-bold text-slate-900 flex items-center gap-2">
                <FileText className="w-4 h-4 text-violet-600" />
                Latest Payslip (October)
              </h3>
              <span className="text-[10px] sm:text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">
                Paid
              </span>
            </div>
            <p className="text-xs text-slate-500 mb-3.5">
              Net salary of <strong>$5,820.00</strong> credited to HDFC Bank (•••• 4921).
            </p>

            <Link
              to="/employee/salary"
              className="w-full py-2 px-3 border border-slate-200 hover:border-slate-300 rounded-xl text-xs font-bold text-slate-700 flex items-center justify-center gap-1.5 transition-colors"
            >
              <Wallet className="w-3.5 h-3.5 text-violet-600" />
              View Salary Breakdown
            </Link>
          </div>

          {/* Notice Board Preview */}
          <div className="bg-amber-50/70 border border-amber-200/80 rounded-2xl p-4 sm:p-5">
            <div className="flex items-center gap-2 text-amber-900 font-bold text-xs sm:text-sm mb-1">
              <Megaphone className="w-4 h-4 text-amber-600" />
              Company Announcement
            </div>
            <p className="text-xs text-amber-800 leading-relaxed">
              Office will remain closed on November 1st for Diwali Holiday. Happy celebrations to all team members!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
