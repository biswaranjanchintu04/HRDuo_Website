import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  CalendarCheck, Clock, Award, Wallet, CalendarRange,
  CheckCircle2, ScanFace, FileText,
  TrendingUp, Sparkles, Megaphone, ShieldCheck, Play, Square,
  Check, Calendar, ChevronRight, MapPin
} from 'lucide-react';
import { useHRMS } from '../../context/HRMSContext';
import { useAlert } from '../../context/AlertContext';

export default function EmployeeDashboard() {
  const { isCheckedIn, checkInTime, checkOutTime, toggleCheckIn, notices, holidays, employees } = useHRMS();
  const { showToast } = useAlert();

  const [liveSeconds, setLiveSeconds] = useState(new Date().toLocaleTimeString());

  useEffect(() => {
    const timer = setInterval(() => {
      setLiveSeconds(new Date().toLocaleTimeString());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const myProfile = employees.find(e => e.id === 'EMP001') || {
    name: 'Sophia Chen',
    role: 'Senior Full Stack Engineer',
    department: 'Engineering',
    leaveBalance: { total: 28, casual: 7, sick: 9, annual: 12 }
  };

  const hoursWorkedDisplay = isCheckedIn ? '6h 45m' : (checkOutTime !== '--:--' ? '8h 15m' : '0h 0m');
  const todaysAttendanceDisplay = isCheckedIn ? 'Present' : (checkOutTime !== '--:--' ? 'Completed' : 'Not Clocked In');

  const handleAttendanceClick = () => {
    const res = toggleCheckIn();
    if (res.status === 'checked_in') {
      showToast(`Punched IN at ${res.time}. Have a great shift, Sophia!`, 'success');
    } else {
      showToast(`Punched OUT at ${res.time}. Shift recorded successfully!`, 'info');
    }
  };

  const quickShortcuts = [
    { label: 'Apply Leave', path: '/employee/leaves', icon: CalendarRange, color: 'text-emerald-700 bg-emerald-50 border-emerald-200' },
    { label: 'View Payslip', path: '/employee/salary', icon: Wallet, color: 'text-blue-700 bg-blue-50 border-blue-200' },
    { label: 'Leave Quota', path: '/employee/leave-balance', icon: Award, color: 'text-purple-700 bg-purple-50 border-purple-200' },
    { label: 'Holidays', path: '/employee/holidays', icon: Calendar, color: 'text-amber-700 bg-amber-50 border-amber-200' },
    { label: 'Documents', path: '/employee/documents', icon: FileText, color: 'text-slate-700 bg-slate-50 border-slate-200' },
  ];

  const recentAttendanceHistory = [
    { date: 'Today, Oct 27', in: checkInTime || '09:12 AM', out: checkOutTime || '--:--', status: isCheckedIn ? 'Active' : 'Present', hours: hoursWorkedDisplay },
    { date: 'Mon, Oct 26', in: '09:05 AM', out: '06:15 PM', status: 'Present', hours: '9h 10m' },
    { date: 'Fri, Oct 23', in: '09:18 AM', out: '06:30 PM', status: 'Late', hours: '9h 12m' },
    { date: 'Thu, Oct 22', in: '08:58 AM', out: '06:05 PM', status: 'Present', hours: '9h 07m' },
  ];

  return (
    <div className="space-y-4 sm:space-y-5 font-poppins">
      {/* Mobile Welcome Header */}
      <div className="lg:hidden">
        <h1 className="text-lg font-black text-slate-900 tracking-tight">
          Good morning, Sophia 👋
        </h1>
        <p className="text-xs text-slate-500 font-medium mt-0.5">
          {isCheckedIn ? '🟢 Active Session • Shift in progress' : '⚪ Ready to clock in for today'}
        </p>
      </div>

      {/* Quick Action Chips */}
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

      {/* Hero Section: Punch Terminal + Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Biometric Punch Terminal */}
        <div className="lg:col-span-5 bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/80 shadow-md relative overflow-hidden flex flex-col">
          {/* Ambient glow */}
          <div className={`absolute top-0 right-0 w-52 h-52 rounded-full blur-3xl pointer-events-none opacity-15 ${
            isCheckedIn ? 'bg-rose-500' : 'bg-emerald-500'
          }`} />

          <div className="flex items-center justify-between mb-4 relative">
            <div>
              <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Biometric Punch Terminal
              </div>
              <div className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight font-mono mt-0.5">
                {liveSeconds}
              </div>
            </div>
            <div className="flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-slate-100 text-slate-600 border border-slate-200">
              <MapPin size={10} className="text-[#0061E0]" />
              <span>HQ Wi-Fi Verified</span>
            </div>
          </div>

          {/* Punch Button */}
          <div className="flex flex-col items-center justify-center py-4 relative">
            <button
              onClick={handleAttendanceClick}
              className={`w-36 h-36 sm:w-40 sm:h-40 rounded-full flex flex-col items-center justify-center transition-all transform active:scale-90 shadow-2xl cursor-pointer touch-manipulation ${
                isCheckedIn
                  ? 'bg-gradient-to-tr from-rose-600 to-rose-500 text-white shadow-rose-500/40 ring-8 ring-rose-100'
                  : 'bg-gradient-to-tr from-[#0061E0] to-blue-500 text-white shadow-blue-500/40 ring-8 ring-blue-100'
              }`}
              aria-label={isCheckedIn ? 'Check Out' : 'Check In'}
            >
              {isCheckedIn ? (
                <>
                  <Square className="w-9 h-9 fill-white mb-1" />
                  <span className="text-sm font-black tracking-wider uppercase">Check Out</span>
                  <span className="text-[10px] text-rose-200 font-semibold mt-0.5">{hoursWorkedDisplay}</span>
                </>
              ) : (
                <>
                  <Play className="w-9 h-9 fill-white mb-1 ml-1" />
                  <span className="text-sm font-black tracking-wider uppercase">Check In</span>
                  <span className="text-[10px] text-blue-100 font-semibold mt-0.5">Tap to Punch</span>
                </>
              )}
            </button>

            <p className="text-[11px] text-slate-500 font-medium text-center mt-4 leading-snug">
              {isCheckedIn
                ? '🟢 Active Session • Shift in progress'
                : '⚪ Tap to register on-time attendance'}
            </p>
          </div>

          {/* Shift Details */}
          <div className="mt-auto pt-3 border-t border-slate-100 flex items-center justify-between text-[11px]">
            <span className="text-slate-400 font-medium">Shift: 09:00 AM – 06:00 PM</span>
            <Link to="/face-attendance" className="font-bold text-[#0061E0] hover:underline flex items-center gap-1">
              <ScanFace size={13} />
              <span>Face Kiosk</span>
            </Link>
          </div>
        </div>

        {/* Right Side: Activity + Announcements */}
        <div className="lg:col-span-7 flex flex-col gap-4">
          {/* Recent Punch History */}
          <div className="bg-white rounded-3xl p-4 sm:p-5 border border-slate-200/80 shadow-2xs flex-1">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider">Recent Activity</h3>
                <p className="text-[10px] text-slate-400">Latest attendance punches</p>
              </div>
              <Link to="/employee/attendance" className="text-xs font-bold text-[#0061E0] hover:underline flex items-center gap-0.5">
                <span>Full Timesheet</span>
                <ChevronRight size={13} />
              </Link>
            </div>

            <div className="space-y-2">
              {recentAttendanceHistory.map((rec, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between p-3 rounded-2xl bg-slate-50/80 border border-slate-100 hover:bg-slate-100/70 active:bg-slate-100 transition-colors"
                >
                  <div className="flex items-center gap-2.5">
                    <span className={`w-2.5 h-2.5 rounded-full shrink-0 ${
                      rec.status === 'Active' ? 'bg-emerald-500 animate-pulse' : rec.status === 'Late' ? 'bg-amber-500' : 'bg-blue-500'
                    }`} />
                    <div>
                      <div className="text-xs font-bold text-slate-900">{rec.date}</div>
                      <div className="text-[10px] text-slate-400 font-medium">In: {rec.in} · Out: {rec.out}</div>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-xs font-bold text-slate-800">{rec.hours}</div>
                    <span className={`text-[9px] font-black uppercase px-1.5 py-0.5 rounded ${
                      rec.status === 'Active'
                        ? 'bg-emerald-100 text-emerald-800'
                        : rec.status === 'Late'
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-blue-100 text-blue-800'
                    }`}>
                      {rec.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bulletin & Holidays */}
          <div className="bg-white rounded-3xl p-4 sm:p-5 border border-slate-200/80 shadow-2xs">
            <div className="flex items-center justify-between mb-2.5">
              <div className="flex items-center gap-1.5 text-xs font-black text-slate-900 uppercase tracking-wider">
                <Megaphone size={14} className="text-[#0061E0]" />
                <span>Bulletin</span>
              </div>
              <Link to="/employee/holidays" className="text-[11px] font-bold text-[#0061E0] hover:underline">
                Holiday Calendar
              </Link>
            </div>

            <div className="p-3.5 rounded-2xl bg-blue-50/60 border border-blue-100">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-blue-900">Thanksgiving Holiday</span>
                <span className="text-[9px] font-black bg-blue-200 text-blue-900 px-2 py-0.5 rounded-full">Nov 26</span>
              </div>
              <p className="text-[11px] text-blue-700 mt-1 leading-snug">
                Company offices will remain closed Thursday & Friday. Paid holiday for all team members.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Metric Cards — 2 col mobile, 4 col desktop */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3">
        {[
          { title: "Today's Status", value: todaysAttendanceDisplay, change: isCheckedIn ? 'On Time' : 'Ready', color: 'bg-emerald-600', light: 'bg-emerald-50 text-emerald-700', icon: CalendarCheck },
          { title: 'Check-in Time', value: checkInTime || '09:12 AM', change: 'Biometric Verified', color: 'bg-[#0061E0]', light: 'bg-blue-50 text-blue-700', icon: Clock },
          { title: 'Hours Worked', value: hoursWorkedDisplay, change: 'Target: 8h 00m', color: 'bg-indigo-600', light: 'bg-indigo-50 text-indigo-700', icon: TrendingUp },
          { title: 'Leave Balance', value: `${myProfile.leaveBalance?.total || 28} Days`, change: 'Paid Time Off', color: 'bg-amber-600', light: 'bg-amber-50 text-amber-700', icon: CalendarRange },
        ].map((card) => {
          const Icon = card.icon;
          return (
            <div
              key={card.title}
              className="bg-white rounded-2xl p-3.5 sm:p-4 border border-slate-200/80 shadow-2xs hover:shadow-md active:shadow-sm transition-shadow flex flex-col justify-between"
            >
              <div className="flex items-center justify-between mb-2">
                <div className={`w-9 h-9 rounded-xl ${card.color} text-white flex items-center justify-center shadow-2xs shrink-0`}>
                  <Icon size={17} />
                </div>
                <span className={`text-[9px] font-black px-1.5 py-0.5 rounded-md ${card.light} text-right leading-tight max-w-[72px]`}>
                  {card.change}
                </span>
              </div>
              <div>
                <div className="text-sm sm:text-base font-black text-slate-900 tracking-tight leading-tight">
                  {card.value}
                </div>
                <div className="text-[10px] text-slate-400 font-semibold mt-0.5 leading-tight">{card.title}</div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Leave Balance Banner */}
      <div className="bg-gradient-to-r from-amber-50 to-amber-100/50 rounded-2xl p-4 border border-amber-200/70 shadow-2xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-600 text-white flex items-center justify-center shadow-xs shrink-0">
            <CalendarRange size={20} />
          </div>
          <div>
            <div className="text-sm sm:text-base font-black text-slate-900 leading-tight">
              {myProfile.leaveBalance?.total || 28} Days Available Leave
            </div>
            <div className="text-xs text-amber-800 font-semibold mt-0.5">
              {myProfile.leaveBalance?.casual || 7} Casual · {myProfile.leaveBalance?.sick || 9} Sick · {myProfile.leaveBalance?.annual || 12} Annual
            </div>
          </div>
        </div>
        <Link
          to="/employee/leaves"
          className="px-4 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 active:bg-amber-800 text-white text-xs font-bold shadow-xs transition-colors touch-manipulation shrink-0 w-full sm:w-auto text-center"
        >
          Apply Leave
        </Link>
      </div>
    </div>
  );
}
