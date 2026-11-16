import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Clock, Wallet, CalendarRange, Megaphone, ChevronRight,
  LogIn, LogOut, CheckCircle2, Calendar, FileText,
  CalendarCheck, MapPin
} from 'lucide-react';
import { useHRMS } from '../../context/HRMSContext';
import { useAlert } from '../../context/AlertContext';

export default function EmployeeDashboard() {
  const { isCheckedIn, checkInTime, checkOutTime, toggleCheckIn, notices, holidays, employees } = useHRMS();
  const { showToast } = useAlert();

  const [liveTime, setLiveTime] = useState(
    new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true })
  );

  useEffect(() => {
    const timer = setInterval(() => {
      setLiveTime(new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true }));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const myProfile = employees.find(e => e.id === 'EMP001') || {
    name: 'Sophia Chen',
    role: 'Senior Full Stack Engineer',
    department: 'Engineering',
    leaveBalance: { total: 28, casual: 7, sick: 9, annual: 12 }
  };

  const firstName = myProfile.name.split(' ')[0];
  const now = new Date();
  const hour = now.getHours();
  const greeting = hour < 12 ? 'Good Morning' : hour < 17 ? 'Good Afternoon' : 'Good Evening';
  const todayFormatted = now.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric', year: 'numeric' });

  const hoursWorked = isCheckedIn ? '7h 15m' : (checkOutTime !== '--:--' ? '8h 15m' : '0h 0m');
  const statusDisplay = isCheckedIn ? 'Present' : (checkOutTime !== '--:--' ? 'Completed' : 'Not Clocked In');

  const handlePunch = () => {
    const res = toggleCheckIn();
    if (res.status === 'checked_in') {
      showToast(`Checked IN at ${res.time}. Have a great shift, ${firstName}!`, 'success');
    } else {
      showToast(`Checked OUT at ${res.time}. Shift recorded!`, 'info');
    }
  };

  const recentPunches = [
    { date: 'Today, Oct 28', in: checkInTime || '09:04 AM', out: checkOutTime || '--:--', status: isCheckedIn ? 'Active' : 'Present', hours: hoursWorked },
    { date: 'Tue, Oct 27', in: '09:12 AM', out: '06:00 PM', status: 'Present', hours: '8h 48m' },
    { date: 'Mon, Oct 26', in: '09:04 AM', out: '06:05 PM', status: 'Present', hours: '9h 01m' },
    { date: 'Fri, Oct 23', in: '09:01 AM', out: '06:12 PM', status: 'Present', hours: '9h 11m' },
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto font-poppins">
      {/* ── Welcome Header ── */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 bg-white p-5 sm:p-6 rounded-2xl border border-slate-200/80 shadow-xs">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            {greeting}, {firstName}! 👋
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            {todayFormatted} · {myProfile.department} · {myProfile.role}
          </p>
        </div>
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold border ${
            isCheckedIn
              ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
              : 'bg-slate-100 text-slate-600 border-slate-200'
          }`}>
            <span className={`w-2 h-2 rounded-full ${isCheckedIn ? 'bg-emerald-500 animate-pulse' : 'bg-slate-400'}`} />
            {isCheckedIn ? 'Shift In Progress' : 'Ready to Clock In'}
          </span>
        </div>
      </div>

      {/* ── 4 Key Metric Cards ── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {/* Today's Status */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Status</span>
            <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${isCheckedIn ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-100 text-slate-500'}`}>
              <CheckCircle2 size={18} />
            </div>
          </div>
          <div>
            <div className="text-lg sm:text-xl font-black text-slate-900 leading-tight">{statusDisplay}</div>
            <div className="text-xs text-slate-400 mt-1 font-medium">In: {checkInTime || '09:04 AM'}</div>
          </div>
        </div>

        {/* Hours Worked */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Hours Worked</span>
            <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <Clock size={18} />
            </div>
          </div>
          <div>
            <div className="text-lg sm:text-xl font-black text-slate-900 leading-tight">{hoursWorked}</div>
            <div className="text-xs text-slate-400 mt-1 font-medium">Target: 8h 00m</div>
          </div>
        </div>

        {/* Leave Balance */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Leave Balance</span>
            <div className="w-8 h-8 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
              <CalendarRange size={18} />
            </div>
          </div>
          <div>
            <div className="text-lg sm:text-xl font-black text-slate-900 leading-tight">{myProfile.leaveBalance?.total || 28} Days</div>
            <div className="text-xs text-slate-400 mt-1 font-medium">{myProfile.leaveBalance?.casual || 7} Casual · {myProfile.leaveBalance?.sick || 9} Sick</div>
          </div>
        </div>

        {/* Monthly Net Salary */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Net Salary</span>
            <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <Wallet size={18} />
            </div>
          </div>
          <div>
            <div className="text-lg sm:text-xl font-black text-slate-900 leading-tight">$5,820.00</div>
            <div className="text-xs text-emerald-600 mt-1 font-bold">Disbursed Oct 31</div>
          </div>
        </div>
      </div>

      {/* ── Main Two-Column Layout ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6">

        {/* Left Column: Quick Attendance Punch + Quick Links */}
        <div className="lg:col-span-6 space-y-5">
          {/* Punch Card */}
          <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/80 shadow-xs">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div>
                <h3 className="text-sm font-bold text-slate-900">Attendance Terminal</h3>
                <p className="text-xs text-slate-400 mt-0.5">Punch in/out for today's shift</p>
              </div>
              <div className="flex items-center gap-1 text-[11px] font-bold text-slate-500 bg-slate-50 px-2.5 py-1 rounded-lg border border-slate-200/60">
                <MapPin size={11} className="text-blue-600" />
                <span>HQ Verified</span>
              </div>
            </div>
            <div className="flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-slate-100 text-slate-600 border border-slate-200">
              <MapPin size={10} className="text-[#0061E0]" />
              <span>HQ Wi-Fi Verified</span>
            </div>
          </div>

            {/* Live Clock & Action */}
            <div className="py-6 flex flex-col items-center justify-center text-center">
              <div className="text-3xl sm:text-4xl font-black text-slate-900 font-mono tracking-tight">
                {liveTime}
              </div>
              <p className="text-xs text-slate-400 font-medium mt-1">Shift Schedule: 09:00 AM – 06:00 PM</p>

              <button
                onClick={handlePunch}
                className={`mt-5 px-8 py-3.5 rounded-xl font-bold text-sm text-white flex items-center gap-2 shadow-md transition-all active:scale-95 cursor-pointer ${
                  isCheckedIn
                    ? 'bg-rose-600 hover:bg-rose-700 shadow-rose-500/20'
                    : 'bg-blue-600 hover:bg-blue-700 shadow-blue-500/20'
                }`}
              >
                {isCheckedIn ? <LogOut size={16} /> : <LogIn size={16} />}
                <span>{isCheckedIn ? 'Check Out of Shift' : 'Check In Now'}</span>
              </button>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="text-slate-400 font-medium">Logged today: <strong className="text-slate-700">{hoursWorked}</strong></span>
              <Link to="/employee/attendance" className="font-bold text-blue-600 hover:underline flex items-center gap-0.5">
                Full Timesheet <ChevronRight size={13} />
              </Link>
            </div>
          </div>

          {/* Quick Navigation Cards (4 clean tiles) */}
          <div className="grid grid-cols-2 gap-3">
            <Link
              to="/employee/leaves"
              className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs hover:border-blue-300 hover:shadow-sm transition-all flex items-center gap-3"
            >
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                <CalendarRange size={20} />
              </div>
              <div className="min-w-0">
                <div className="text-xs font-bold text-slate-900 truncate">Apply Leave</div>
                <div className="text-[11px] text-slate-400 truncate">2-step approval</div>
              </div>
            </Link>

            <Link
              to="/employee/salary"
              className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs hover:border-emerald-300 hover:shadow-sm transition-all flex items-center gap-3"
            >
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                <Wallet size={20} />
              </div>
              <div className="min-w-0">
                <div className="text-xs font-bold text-slate-900 truncate">My Payslips</div>
                <div className="text-[11px] text-slate-400 truncate">View & request</div>
              </div>
            </Link>

            <Link
              to="/employee/attendance"
              className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs hover:border-purple-300 hover:shadow-sm transition-all flex items-center gap-3"
            >
              <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
                <Calendar size={20} />
              </div>
              <div className="min-w-0">
                <div className="text-xs font-bold text-slate-900 truncate">Calendar</div>
                <div className="text-[11px] text-slate-400 truncate">Monthly overview</div>
              </div>
            </Link>

            <Link
              to="/employee/documents"
              className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs hover:border-amber-300 hover:shadow-sm transition-all flex items-center gap-3"
            >
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
                <FileText size={20} />
              </div>
              <div className="min-w-0">
                <div className="text-xs font-bold text-slate-900 truncate">Documents</div>
                <div className="text-[11px] text-slate-400 truncate">Company & uploads</div>
              </div>
            </Link>
          </div>

        {/* Right Column: Recent Activity & Announcements */}
        <div className="lg:col-span-6 space-y-5">
          {/* Recent Attendance Punches */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs">
            <div className="flex items-center justify-between pb-3.5 border-b border-slate-100 mb-3">
              <div>
                <h3 className="text-sm font-bold text-slate-900">Recent Attendance</h3>
                <p className="text-xs text-slate-400">Your latest recorded punches</p>
              </div>
              <Link to="/employee/attendance" className="text-xs font-bold text-blue-600 hover:underline">
                View All
              </Link>
            </div>

            <div className="divide-y divide-slate-100">
              {recentPunches.map((p, i) => (
                <div key={i} className="py-2.5 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className={`w-2 h-2 rounded-full shrink-0 ${p.status === 'Active' ? 'bg-emerald-500 animate-pulse' : 'bg-blue-500'}`} />
                    <div>
                      <div className="text-xs font-bold text-slate-900">{p.date}</div>
                      <div className="text-[11px] text-slate-400">In: {p.in} · Out: {p.out}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs font-bold text-slate-700">{p.hours}</div>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      p.status === 'Active' ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-100 text-slate-600'
                    }`}>
                      {p.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <Link to="/employee/holidays" className="flex items-center justify-end gap-1 mt-2.5 text-[11px] font-bold text-[#0061E0] hover:underline">
            <span>View All Holidays</span>
            <ChevronRight size={12} />
          </Link>

          {/* Announcements Bulletin */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs">
            <div className="flex items-center justify-between pb-3.5 border-b border-slate-100 mb-3">
              <div className="flex items-center gap-2">
                <Megaphone size={16} className="text-blue-600" />
                <h3 className="text-sm font-bold text-slate-900">Company Notices</h3>
              </div>
              <Link to="/employee/announcements" className="text-xs font-bold text-blue-600 hover:underline">
                All Bulletins
              </Link>
            </div>

            <div className="space-y-3">
              {(notices?.slice(0, 2) || [
                { title: 'Thanksgiving Holiday Closure', date: 'Nov 26', message: 'Offices will remain closed on Thursday and Friday for Thanksgiving.' },
                { title: 'Q4 Performance Appraisals', date: 'Dec 01', message: 'Annual performance evaluations open on December 1st.' },
              ]).map((notice, idx) => (
                <div key={idx} className="p-3.5 rounded-xl bg-slate-50 border border-slate-100">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-900">{notice.title || notice.name}</span>
                    <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">
                      {notice.date || 'Notice'}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mt-1 leading-snug">
                    {notice.message || notice.body || notice.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <div className="flex items-center justify-between p-3 rounded-2xl bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-100">
            <div>
              <div className="text-sm font-black text-slate-900">No Pending Requests</div>
              <div className="text-[10px] text-amber-600 font-semibold mt-0.5">All leaves cleared</div>
            </div>
            <div className="w-8 h-8 rounded-xl bg-emerald-100 flex items-center justify-center">
              <CheckCircle2 size={16} className="text-emerald-600" />
            </div>
          </div>
          <Link to="/employee/leaves" className="flex items-center justify-end gap-1 mt-2.5 text-[11px] font-bold text-[#0061E0] hover:underline">
            <span>Apply for Leave</span>
            <ChevronRight size={12} />
          </Link>
        </div>
      </div>

    </div>
  );
}
