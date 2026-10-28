import React, { useState, useMemo } from 'react';
import {
  CalendarCheck, Clock, Download, ChevronLeft, ChevronRight,
  Calendar, CheckCircle2, AlertCircle, Award, Sparkles,
  Info, Filter, Sun, Palmtree, PartyPopper, Check, X,
  MapPin, ShieldCheck, ArrowRight, CornerDownRight
} from 'lucide-react';
import { useHRMS } from '../../context/HRMSContext';
import { useAlert } from '../../context/AlertContext';

// Helper for month formatting
const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

// Standard base attendance data for October 2026 for Sophia Chen (EMP001)
const BASE_ATTENDANCE_OCTOBER = {
  '2026-10-01': { in: '09:02 AM', out: '06:08 PM', hours: '9h 06m', status: 'Present', notes: 'Biometric Verified' },
  '2026-10-02': { in: '08:58 AM', out: '06:15 PM', hours: '9h 17m', status: 'Present', notes: 'Biometric Verified' },
  '2026-10-05': { in: '09:05 AM', out: '06:00 PM', hours: '8h 55m', status: 'Present', notes: 'Biometric Verified' },
  '2026-10-06': { in: '08:55 AM', out: '06:10 PM', hours: '9h 15m', status: 'Present', notes: 'Biometric Verified' },
  '2026-10-07': { in: '09:01 AM', out: '06:05 PM', hours: '9h 04m', status: 'Present', notes: 'Biometric Verified' },
  '2026-10-08': { in: '09:10 AM', out: '06:12 PM', hours: '9h 02m', status: 'Present', notes: 'Biometric Verified' },
  '2026-10-09': { in: '08:57 AM', out: '06:00 PM', hours: '9h 03m', status: 'Present', notes: 'Biometric Verified' },
  '2026-10-13': { in: '09:04 AM', out: '06:14 PM', hours: '9h 10m', status: 'Present', notes: 'Biometric Verified' },
  '2026-10-14': { in: '09:00 AM', out: '06:03 PM', hours: '9h 03m', status: 'Present', notes: 'Biometric Verified' },
  '2026-10-15': { in: '08:52 AM', out: '06:20 PM', hours: '9h 28m', status: 'Present', notes: 'Biometric Verified' },
  '2026-10-16': { in: '09:06 AM', out: '06:02 PM', hours: '8h 56m', status: 'Present', notes: 'Biometric Verified' },
  '2026-10-20': { in: '09:00 AM', out: '06:02 PM', hours: '9h 02m', status: 'Present', notes: 'Biometric Verified' },
  '2026-10-21': { in: '09:35 AM', out: '06:40 PM', hours: '9h 05m', status: 'Late', notes: 'Traffic delay approved' },
  '2026-10-22': { in: '08:58 AM', out: '06:05 PM', hours: '9h 07m', status: 'Present', notes: 'Biometric Verified' },
  '2026-10-23': { in: '09:01 AM', out: '06:12 PM', hours: '9h 11m', status: 'Present', notes: 'Biometric Verified' },
  '2026-10-26': { in: '09:04 AM', out: '06:05 PM', hours: '9h 01m', status: 'Present', notes: 'Biometric Verified' },
  '2026-10-27': { in: '09:12 AM', out: '06:00 PM', hours: '8h 48m', status: 'Present', notes: 'Biometric Verified' },
  '2026-10-28': { in: '09:04 AM', out: '—', hours: '7h 15m', status: 'Present', notes: 'Biometric Verified (Today)' },
};

export default function EmployeeAttendance() {
  const { holidays = [], leaves = [], isCheckedIn, checkInTime, checkOutTime, submitCorrection } = useHRMS();
  const { showToast } = useAlert();

  // Active view: 'calendar' or 'timesheet'
  const [activeView, setActiveView] = useState('calendar');

  // Calendar navigation state - default to current mock month October 2026
  const [currentDate, setCurrentDate] = useState(new Date(2026, 9, 28)); // Oct 28, 2026
  const [selectedDateStr, setSelectedDateStr] = useState('2026-10-28');
  const [tableFilter, setTableFilter] = useState('All');

  // Correction request modal
  const [showCorrectionModal, setShowCorrectionModal] = useState(false);
  const [correctionReason, setCorrectionReason] = useState('');
  const [correctionReqTime, setCorrectionReqTime] = useState('09:00 AM');

  // My leaves (Sophia Chen / EMP001)
  const myLeaves = useMemo(() => {
    return leaves.filter(l => l.empId === 'EMP001' || l.name === 'Sophia Chen');
  }, [leaves]);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth(); // 0-indexed

  // Navigation handlers
  const handlePrevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  const handleToday = () => {
    const today = new Date(2026, 9, 28);
    setCurrentDate(today);
    setSelectedDateStr('2026-10-28');
  };

  // Build calendar matrix
  const { calendarDays, monthlyStats } = useMemo(() => {
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const daysInPrevMonth = new Date(year, month, 0).getDate();

    const days = [];
    let presentCount = 0;
    let lateCount = 0;
    let leaveCount = 0;
    let holidayCount = 0;
    let weekendCount = 0;
    let workingDaysTotal = 0;

    // Helper to format date string YYYY-MM-DD
    const formatDate = (y, m, d) => {
      const mm = String(m + 1).padStart(2, '0');
      const dd = String(d).padStart(2, '0');
      return `${y}-${mm}-${dd}`;
    };

    // 1. Previous month trailing days
    for (let i = firstDayOfMonth - 1; i >= 0; i--) {
      const d = daysInPrevMonth - i;
      const prevM = month === 0 ? 11 : month - 1;
      const prevY = month === 0 ? year - 1 : year;
      const dateStr = formatDate(prevY, prevM, d);
      days.push({
        dateNumber: d,
        dateStr,
        isCurrentMonth: false,
        dayOfWeek: new Date(prevY, prevM, d).getDay(),
      });
    }

    // 2. Current month days
    for (let d = 1; d <= daysInMonth; d++) {
      const dateStr = formatDate(year, month, d);
      const dayDate = new Date(year, month, d);
      const dayOfWeek = dayDate.getDay();
      const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;

      // Check Holiday
      const holiday = holidays.find(h => h.date === dateStr);

      // Check Leave
      const leave = myLeaves.find(l => {
        if (!l.fromDate) return false;
        const to = l.toDate || l.fromDate;
        return dateStr >= l.fromDate && dateStr <= to && l.status !== 'Rejected';
      });

      // Check Attendance record
      let attendanceRecord = BASE_ATTENDANCE_OCTOBER[dateStr];

      // Live override for today (Oct 28, 2026)
      if (dateStr === '2026-10-28' && isCheckedIn) {
        attendanceRecord = {
          in: checkInTime || '09:04 AM',
          out: checkOutTime !== '--:--' ? checkOutTime : 'In Progress',
          hours: '7h 15m',
          status: 'Present',
          notes: 'Biometric Verified'
        };
      }

      // Determine day category
      let category = 'working';
      let title = '';
      let subtext = '';

      if (holiday) {
        category = 'holiday';
        title = holiday.name;
        subtext = holiday.type;
        holidayCount++;
      } else if (leave) {
        category = 'leave';
        title = leave.type;
        subtext = leave.status === 'Approved' ? 'Approved' : 'Pending';
        leaveCount++;
      } else if (isWeekend) {
        category = 'weekend';
        title = 'Weekly Off';
        subtext = dayOfWeek === 0 ? 'Sunday' : 'Saturday';
        weekendCount++;
      } else {
        workingDaysTotal++;
        if (attendanceRecord) {
          if (attendanceRecord.status === 'Late') {
            category = 'late';
            title = 'Late Arrival';
            subtext = `In: ${attendanceRecord.in}`;
            lateCount++;
            presentCount++;
          } else {
            category = 'present';
            title = 'Present';
            subtext = attendanceRecord.hours;
            presentCount++;
          }
        } else if (year === 2026 && month === 9 && d > 28) {
          category = 'future';
          title = 'Scheduled';
          subtext = '09:00 AM - 06:00 PM';
        } else if (dayDate > new Date(2026, 9, 28)) {
          category = 'future';
          title = 'Upcoming Shift';
          subtext = 'Standard Day Shift';
        } else {
          category = 'absent';
          title = 'Absent';
          subtext = 'No punch logged';
        }
      }

      days.push({
        dateNumber: d,
        dateStr,
        isCurrentMonth: true,
        dayOfWeek,
        isWeekend,
        isToday: dateStr === '2026-10-28',
        holiday,
        leave,
        attendanceRecord,
        category,
        title,
        subtext,
      });
    }

    // 3. Next month leading days (to fill 35 or 42 grid cells)
    const totalSlots = days.length <= 35 ? 35 : 42;
    const remainingSlots = totalSlots - days.length;
    for (let d = 1; d <= remainingSlots; d++) {
      const nextM = month === 11 ? 0 : month + 1;
      const nextY = month === 11 ? year + 1 : year;
      const dateStr = formatDate(nextY, nextM, d);
      days.push({
        dateNumber: d,
        dateStr,
        isCurrentMonth: false,
        dayOfWeek: new Date(nextY, nextM, d).getDay(),
      });
    }

    return {
      calendarDays: days,
      monthlyStats: {
        workingDays: workingDaysTotal,
        presentDays: presentCount,
        lateDays: lateCount,
        leaveDays: leaveCount,
        holidayDays: holidayCount,
        weekendDays: weekendCount,
        attendanceRate: workingDaysTotal > 0 ? Math.round((presentCount / workingDaysTotal) * 100) : 0,
        avgHours: '9h 08m',
      }
    };
  }, [year, month, holidays, myLeaves, isCheckedIn, checkInTime, checkOutTime]);

  // Selected Day Details
  const selectedDayInfo = useMemo(() => {
    const found = calendarDays.find(d => d.dateStr === selectedDateStr && d.isCurrentMonth);
    if (found) return found;

    // Fallback to today
    return calendarDays.find(d => d.isToday) || calendarDays.find(d => d.isCurrentMonth);
  }, [calendarDays, selectedDateStr]);

  // Flat list for Timesheet Table
  const tableRecords = useMemo(() => {
    return calendarDays
      .filter(d => d.isCurrentMonth)
      .map(d => {
        let status = 'Scheduled';
        let checkIn = '—';
        let checkOut = '—';
        let hours = '—';
        let notes = '—';

        if (d.category === 'holiday') {
          status = 'Holiday';
          notes = `${d.holiday?.name} (${d.holiday?.type})`;
        } else if (d.category === 'leave') {
          status = 'Leave';
          notes = `${d.leave?.type} • ${d.leave?.reason || 'Approved'}`;
        } else if (d.category === 'weekend') {
          status = 'Weekend';
          notes = 'Weekly Off';
        } else if (d.category === 'present' || d.category === 'late') {
          status = d.category === 'late' ? 'Late' : 'Present';
          checkIn = d.attendanceRecord?.in || '09:00 AM';
          checkOut = d.attendanceRecord?.out || '06:00 PM';
          hours = d.attendanceRecord?.hours || '9h 00m';
          notes = d.attendanceRecord?.notes || 'Biometric Verified';
        } else if (d.category === 'absent') {
          status = 'Absent';
          notes = 'Unexcused Absence';
        } else {
          status = 'Scheduled';
          notes = 'Regular Shift (09:00 AM - 06:00 PM)';
        }

        const dateObj = new Date(d.dateStr + 'T00:00:00');
        const formattedDate = dateObj.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
        const weekdayName = WEEKDAYS[d.dayOfWeek];

        return {
          dateStr: d.dateStr,
          date: formattedDate,
          day: weekdayName,
          in: checkIn,
          out: checkOut,
          hours,
          status,
          notes,
          category: d.category,
        };
      })
      .filter(r => {
        if (tableFilter === 'All') return true;
        if (tableFilter === 'Present') return r.status === 'Present';
        if (tableFilter === 'Late') return r.status === 'Late';
        if (tableFilter === 'Leave') return r.status === 'Leave';
        if (tableFilter === 'Holiday') return r.status === 'Holiday';
        if (tableFilter === 'Weekend') return r.status === 'Weekend';
        return true;
      });
  }, [calendarDays, tableFilter]);

  const handleExportCSV = () => {
    showToast('Exporting attendance timesheet & calendar to CSV...', 'success');
  };

  const handleCorrectionSubmit = (e) => {
    e.preventDefault();
    if (!correctionReason.trim()) {
      showToast('Please provide a reason for the punch correction', 'error');
      return;
    }
    if (submitCorrection) {
      submitCorrection({
        empId: 'EMP001',
        name: 'Sophia Chen',
        date: selectedDateStr,
        originalCheckIn: selectedDayInfo?.attendanceRecord?.in || 'Missed',
        requestedCheckIn: correctionReqTime,
        reason: correctionReason,
      });
    }
    showToast(`Punch correction request submitted for ${selectedDateStr}`, 'success');
    setShowCorrectionModal(false);
    setCorrectionReason('');
  };

  return (
    <div className="space-y-4 sm:space-y-6 max-w-7xl mx-auto pb-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 bg-white p-4 sm:p-6 rounded-2xl border border-slate-100 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-emerald-50 text-emerald-600">
              <CalendarCheck className="w-5 h-5 sm:w-6 sm:h-6" />
            </span>
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              Attendance & Calendar
            </h1>
          </div>
          <p className="text-slate-500 text-xs sm:text-sm mt-1">
            Real-time daily attendance tracking, approved leaves, and company holiday schedule.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto flex-wrap">
          {/* View switcher tabs */}
          <div className="flex items-center p-1 bg-slate-100 rounded-xl text-xs font-bold text-slate-600">
            <button
              onClick={() => setActiveView('calendar')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
                activeView === 'calendar'
                  ? 'bg-white text-emerald-700 shadow-xs font-black'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Calendar className="w-3.5 h-3.5" />
              Calendar View
            </button>
            <button
              onClick={() => setActiveView('timesheet')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
                activeView === 'timesheet'
                  ? 'bg-white text-emerald-700 shadow-xs font-black'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Clock className="w-3.5 h-3.5" />
              Timesheet List
            </button>
          </div>

          <button
            onClick={handleExportCSV}
            className="px-3.5 py-2 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold text-xs rounded-xl flex items-center gap-2 shadow-xs transition-all"
          >
            <Download className="w-3.5 h-3.5 text-slate-500" />
            <span className="hidden sm:inline">Export</span> CSV
          </button>
        </div>
      </div>

      {/* Monthly Stats Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-2.5 sm:gap-3.5">
        <div className="bg-white rounded-2xl p-3.5 sm:p-4 border border-slate-100 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-[10px] sm:text-xs font-bold text-slate-400 uppercase tracking-wider">Working Days</span>
            <span className="w-2 h-2 rounded-full bg-slate-300"></span>
          </div>
          <div className="text-xl sm:text-2xl font-black text-slate-900 mt-1">{monthlyStats.workingDays}</div>
          <div className="text-[11px] text-slate-500 mt-0.5">{MONTH_NAMES[month]} {year}</div>
        </div>

        <div className="bg-white rounded-2xl p-3.5 sm:p-4 border border-emerald-100/60 shadow-xs bg-gradient-to-b from-white to-emerald-50/20">
          <div className="flex items-center justify-between">
            <span className="text-[10px] sm:text-xs font-bold text-emerald-700 uppercase tracking-wider">Present Days</span>
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
          </div>
          <div className="text-xl sm:text-2xl font-black text-emerald-600 mt-1">{monthlyStats.presentDays}</div>
          <div className="text-[11px] text-emerald-700 font-medium mt-0.5">{monthlyStats.attendanceRate}% Attendance</div>
        </div>

        <div className="bg-white rounded-2xl p-3.5 sm:p-4 border border-sky-100/60 shadow-xs bg-gradient-to-b from-white to-sky-50/20">
          <div className="flex items-center justify-between">
            <span className="text-[10px] sm:text-xs font-bold text-sky-700 uppercase tracking-wider">Leaves Taken</span>
            <Palmtree className="w-3.5 h-3.5 text-sky-500" />
          </div>
          <div className="text-xl sm:text-2xl font-black text-sky-600 mt-1">{monthlyStats.leaveDays}</div>
          <div className="text-[11px] text-slate-500 mt-0.5">Approved Time-off</div>
        </div>

        <div className="bg-white rounded-2xl p-3.5 sm:p-4 border border-purple-100/60 shadow-xs bg-gradient-to-b from-white to-purple-50/20">
          <div className="flex items-center justify-between">
            <span className="text-[10px] sm:text-xs font-bold text-purple-700 uppercase tracking-wider">Holidays</span>
            <PartyPopper className="w-3.5 h-3.5 text-purple-500" />
          </div>
          <div className="text-xl sm:text-2xl font-black text-purple-600 mt-1">{monthlyStats.holidayDays}</div>
          <div className="text-[11px] text-purple-700 font-medium mt-0.5">Company & Public</div>
        </div>

        <div className="col-span-2 md:col-span-1 bg-white rounded-2xl p-3.5 sm:p-4 border border-slate-100 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-[10px] sm:text-xs font-bold text-slate-400 uppercase tracking-wider">Avg Work Hours</span>
            <Clock className="w-3.5 h-3.5 text-slate-400" />
          </div>
          <div className="text-xl sm:text-2xl font-black text-blue-600 mt-1">{monthlyStats.avgHours}</div>
          <div className="text-[11px] text-slate-500 mt-0.5">Per worked day</div>
        </div>
      </div>

      {activeView === 'calendar' ? (
        /* ================= CALENDAR VIEW ================= */
        <div className="space-y-4 sm:space-y-5">
          {/* Calendar Box */}
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
            {/* Calendar Controls & Month Switcher */}
            <div className="p-3.5 sm:p-5 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <div className="flex items-center bg-slate-50 border border-slate-200 rounded-xl p-0.5">
                  <button
                    onClick={handlePrevMonth}
                    className="p-1.5 hover:bg-white hover:shadow-xs rounded-lg text-slate-600 hover:text-slate-900 transition-all"
                    title="Previous month"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={handleNextMonth}
                    className="p-1.5 hover:bg-white hover:shadow-xs rounded-lg text-slate-600 hover:text-slate-900 transition-all"
                    title="Next month"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>

                <h2 className="text-base sm:text-lg font-black text-slate-900">
                  {MONTH_NAMES[month]} {year}
                </h2>

                <button
                  onClick={handleToday}
                  className="ml-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 px-2.5 py-1 rounded-lg border border-emerald-200/60 transition-colors"
                >
                  Today
                </button>
              </div>

              {/* Status Legend */}
              <div className="flex items-center gap-2.5 sm:gap-3 text-xs flex-wrap">
                <span className="flex items-center gap-1.5 text-slate-600">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                  <span className="text-[11px] font-medium">Present</span>
                </span>
                <span className="flex items-center gap-1.5 text-slate-600">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
                  <span className="text-[11px] font-medium">Late</span>
                </span>
                <span className="flex items-center gap-1.5 text-slate-600">
                  <span className="w-2.5 h-2.5 rounded-full bg-sky-500"></span>
                  <span className="text-[11px] font-medium">Leave</span>
                </span>
                <span className="flex items-center gap-1.5 text-slate-600">
                  <span className="w-2.5 h-2.5 rounded-full bg-purple-500"></span>
                  <span className="text-[11px] font-medium">Holiday</span>
                </span>
                <span className="flex items-center gap-1.5 text-slate-600">
                  <span className="w-2.5 h-2.5 rounded-full bg-slate-300"></span>
                  <span className="text-[11px] font-medium">Weekend</span>
                </span>
              </div>
            </div>

            {/* Days of Week Header */}
            <div className="grid grid-cols-7 border-b border-slate-100 bg-slate-50/80 text-center">
              {WEEKDAYS.map((wd, i) => (
                <div
                  key={wd}
                  className={`py-2 text-[11px] font-bold tracking-wider uppercase ${
                    i === 0 || i === 6 ? 'text-slate-400' : 'text-slate-600'
                  }`}
                >
                  <span className="hidden sm:inline">{wd}</span>
                  <span className="sm:hidden">{wd.charAt(0)}</span>
                </div>
              ))}
            </div>

            {/* Calendar Days Grid */}
            <div className="grid grid-cols-7 gap-[1px] bg-slate-200/70 p-[1px]">
              {calendarDays.map((day, idx) => {
                const isSelected = day.isCurrentMonth && day.dateStr === selectedDateStr;

                if (!day.isCurrentMonth) {
                  return (
                    <div
                      key={idx}
                      className="bg-slate-50/50 p-1.5 sm:p-2 min-h-[58px] sm:min-h-[96px] text-slate-300 select-none"
                    >
                      <span className="text-xs font-medium">{day.dateNumber}</span>
                    </div>
                  );
                }

                // Styling based on category
                let tileBg = 'bg-white hover:bg-slate-50/80';
                let dotColor = 'bg-slate-300';
                let badgeClass = '';

                if (day.category === 'holiday') {
                  tileBg = 'bg-purple-50/40 hover:bg-purple-50/70';
                  dotColor = 'bg-purple-500';
                  badgeClass = 'bg-purple-100 text-purple-800 border-purple-200';
                } else if (day.category === 'leave') {
                  tileBg = 'bg-sky-50/40 hover:bg-sky-50/70';
                  dotColor = 'bg-sky-500';
                  badgeClass = 'bg-sky-100 text-sky-800 border-sky-200';
                } else if (day.category === 'weekend') {
                  tileBg = 'bg-slate-50/70 text-slate-400';
                  dotColor = 'bg-slate-300';
                  badgeClass = 'bg-slate-100 text-slate-500';
                } else if (day.category === 'late') {
                  tileBg = 'bg-amber-50/40 hover:bg-amber-50/70';
                  dotColor = 'bg-amber-500';
                  badgeClass = 'bg-amber-100 text-amber-800 border-amber-200';
                } else if (day.category === 'present') {
                  tileBg = 'bg-emerald-50/30 hover:bg-emerald-50/60';
                  dotColor = 'bg-emerald-500';
                  badgeClass = 'bg-emerald-100 text-emerald-800 border-emerald-200';
                } else if (day.category === 'absent') {
                  tileBg = 'bg-rose-50/40 hover:bg-rose-50/70';
                  dotColor = 'bg-rose-500';
                  badgeClass = 'bg-rose-100 text-rose-800 border-rose-200';
                }

                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setSelectedDateStr(day.dateStr)}
                    className={`relative p-1.5 sm:p-2.5 min-h-[64px] sm:min-h-[100px] flex flex-col justify-between text-left transition-all cursor-pointer ${tileBg} ${
                      isSelected
                        ? 'ring-2 ring-emerald-600 ring-offset-2 z-10 shadow-sm rounded-lg bg-white'
                        : ''
                    }`}
                  >
                    {/* Top Row: Date number & Today Pill */}
                    <div className="flex items-center justify-between w-full">
                      <span
                        className={`text-xs sm:text-sm font-black rounded-full w-6 h-6 flex items-center justify-center transition-colors ${
                          day.isToday
                            ? 'bg-emerald-600 text-white shadow-xs'
                            : isSelected
                            ? 'bg-slate-900 text-white'
                            : 'text-slate-800'
                        }`}
                      >
                        {day.dateNumber}
                      </span>

                      {/* Dot for mobile view */}
                      <span className={`sm:hidden w-2 h-2 rounded-full ${dotColor}`}></span>

                      {/* Category micro icon for desktop */}
                      <span className="hidden sm:inline-flex">
                        {day.category === 'holiday' && (
                          <span className="text-[10px] text-purple-600 font-bold bg-purple-100 px-1.5 py-0.5 rounded">Holiday</span>
                        )}
                        {day.category === 'leave' && (
                          <span className="text-[10px] text-sky-600 font-bold bg-sky-100 px-1.5 py-0.5 rounded">Leave</span>
                        )}
                        {day.category === 'late' && (
                          <span className="text-[10px] text-amber-600 font-bold bg-amber-100 px-1.5 py-0.5 rounded">Late</span>
                        )}
                      </span>
                    </div>

                    {/* Desktop Content inside tile */}
                    <div className="hidden sm:block mt-1 space-y-1 w-full overflow-hidden">
                      {day.category === 'holiday' && (
                        <div className="text-[11px] font-bold text-purple-900 truncate" title={day.holiday?.name}>
                          🎉 {day.holiday?.name}
                        </div>
                      )}

                      {day.category === 'leave' && (
                        <div className="text-[11px] font-bold text-sky-900 truncate" title={day.leave?.type}>
                          🏖️ {day.leave?.type}
                        </div>
                      )}

                      {day.category === 'present' && (
                        <div className="space-y-0.5">
                          <div className="text-[10px] font-mono text-emerald-800 font-semibold truncate">
                            In {day.attendanceRecord?.in}
                          </div>
                          <div className="text-[10px] font-bold text-emerald-600">
                            {day.attendanceRecord?.hours}
                          </div>
                        </div>
                      )}

                      {day.category === 'late' && (
                        <div className="space-y-0.5">
                          <div className="text-[10px] font-mono text-amber-800 font-bold truncate">
                            In {day.attendanceRecord?.in}
                          </div>
                          <div className="text-[10px] font-semibold text-amber-700">
                            {day.attendanceRecord?.hours}
                          </div>
                        </div>
                      )}

                      {day.category === 'weekend' && (
                        <div className="text-[10px] text-slate-400 font-medium">
                          Weekly Off
                        </div>
                      )}

                      {day.category === 'future' && (
                        <div className="text-[10px] text-slate-400 truncate">
                          Shift: 9 AM
                        </div>
                      )}

                      {day.category === 'absent' && (
                        <div className="text-[10px] font-bold text-rose-600">
                          Absent
                        </div>
                      )}
                    </div>

                    {/* Mobile Label / Micro Tag */}
                    <div className="sm:hidden mt-0.5 text-[9px] font-bold truncate w-full text-slate-500">
                      {day.category === 'holiday' && <span className="text-purple-600">Holiday</span>}
                      {day.category === 'leave' && <span className="text-sky-600">Leave</span>}
                      {day.category === 'present' && <span className="text-emerald-600">Present</span>}
                      {day.category === 'late' && <span className="text-amber-600">Late</span>}
                      {day.category === 'weekend' && <span>Off</span>}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Day Inspection Details Card (Shown for Selected Date) */}
          {selectedDayInfo && (
            <div className="bg-white rounded-2xl p-4 sm:p-6 border border-slate-200/80 shadow-xs space-y-4 animate-in fade-in duration-200">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                      Day Inspection Details
                    </span>
                    {selectedDayInfo.isToday && (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-emerald-100 text-emerald-800">
                        Current Day
                      </span>
                    )}
                  </div>
                  <h3 className="text-lg sm:text-xl font-black text-slate-900 mt-0.5">
                    {new Date(selectedDayInfo.dateStr + 'T00:00:00').toLocaleDateString('en-US', {
                      weekday: 'long',
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </h3>
                </div>

                {/* Status Badge */}
                <div className="self-start sm:self-auto">
                  {selectedDayInfo.category === 'holiday' && (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-bold text-xs bg-purple-100 text-purple-800 border border-purple-200">
                      <PartyPopper className="w-4 h-4 text-purple-600" />
                      {selectedDayInfo.holiday?.type || 'Public Holiday'}
                    </span>
                  )}
                  {selectedDayInfo.category === 'leave' && (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-bold text-xs bg-sky-100 text-sky-800 border border-sky-200">
                      <Palmtree className="w-4 h-4 text-sky-600" />
                      {selectedDayInfo.leave?.type} ({selectedDayInfo.leave?.status})
                    </span>
                  )}
                  {selectedDayInfo.category === 'present' && (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-bold text-xs bg-emerald-100 text-emerald-800 border border-emerald-200">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      Present (Biometric Verified)
                    </span>
                  )}
                  {selectedDayInfo.category === 'late' && (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-bold text-xs bg-amber-100 text-amber-800 border border-amber-200">
                      <AlertCircle className="w-4 h-4 text-amber-600" />
                      Late Arrival (Approved)
                    </span>
                  )}
                  {selectedDayInfo.category === 'weekend' && (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-bold text-xs bg-slate-100 text-slate-600 border border-slate-200">
                      <Sun className="w-4 h-4 text-slate-500" />
                      Weekly Rest Off
                    </span>
                  )}
                  {selectedDayInfo.category === 'future' && (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-bold text-xs bg-slate-100 text-slate-700">
                      <Clock className="w-4 h-4 text-slate-500" />
                      Upcoming Scheduled Shift
                    </span>
                  )}
                  {selectedDayInfo.category === 'absent' && (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-bold text-xs bg-rose-100 text-rose-800 border border-rose-200">
                      <X className="w-4 h-4 text-rose-600" />
                      Unexcused Absence
                    </span>
                  )}
                </div>
              </div>

              {/* Day Specific Breakdown */}
              {selectedDayInfo.category === 'holiday' ? (
                <div className="bg-purple-50/60 rounded-xl p-4 border border-purple-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-purple-600 text-white flex items-center justify-center font-bold">
                      🎉
                    </div>
                    <div>
                      <h4 className="font-bold text-purple-950 text-sm sm:text-base">
                        {selectedDayInfo.holiday?.name}
                      </h4>
                      <p className="text-xs text-purple-700 mt-0.5">
                        Statutory paid time-off across all company offices and facilities.
                      </p>
                    </div>
                  </div>
                  <div className="text-xs font-bold text-purple-800 bg-white/80 px-3 py-1.5 rounded-lg border border-purple-200 self-start sm:self-auto">
                    {selectedDayInfo.holiday?.type}
                  </div>
                </div>
              ) : selectedDayInfo.category === 'leave' ? (
                <div className="bg-sky-50/60 rounded-xl p-4 border border-sky-100 space-y-3">
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-sky-600 text-white flex items-center justify-center font-bold">
                        🏖️
                      </div>
                      <div>
                        <h4 className="font-bold text-sky-950 text-sm sm:text-base">
                          {selectedDayInfo.leave?.type}
                        </h4>
                        <p className="text-xs text-sky-700 mt-0.5">
                          Reason: {selectedDayInfo.leave?.reason || 'Personal time-off request'}
                        </p>
                      </div>
                    </div>
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-white text-emerald-700 border border-emerald-200">
                      Status: {selectedDayInfo.leave?.status}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 pt-2 text-xs border-t border-sky-100">
                    <div>
                      <span className="text-sky-600 font-medium">Requested Duration:</span>
                      <div className="font-bold text-slate-800">{selectedDayInfo.leave?.days || 1} Day(s)</div>
                    </div>
                    <div>
                      <span className="text-sky-600 font-medium">Approved By:</span>
                      <div className="font-bold text-slate-800">{selectedDayInfo.leave?.approver || 'Marcus Sterling'}</div>
                    </div>
                    <div>
                      <span className="text-sky-600 font-medium">Applied Date:</span>
                      <div className="font-bold text-slate-800">{selectedDayInfo.leave?.appliedOn || 'Recent'}</div>
                    </div>
                  </div>
                </div>
              ) : selectedDayInfo.category === 'weekend' ? (
                <div className="bg-slate-50 rounded-xl p-4 border border-slate-100 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-slate-200 text-slate-600 flex items-center justify-center font-bold">
                    ☕
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800 text-sm sm:text-base">
                      Weekend Rest Day
                    </h4>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Standard corporate non-working day. Overtime policies apply if on-call support is activated.
                    </p>
                  </div>
                </div>
              ) : (
                /* Workday / Present / Late / Scheduled / Absent */
                <div className="space-y-3">
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                    <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                      <span className="text-[10px] font-bold text-slate-400 uppercase">First Punch In</span>
                      <div className="text-base font-black font-mono text-slate-900 mt-1">
                        {selectedDayInfo.attendanceRecord?.in || (selectedDayInfo.category === 'future' ? '09:00 AM' : '—')}
                      </div>
                      <span className="text-[10px] text-slate-500">
                        {selectedDayInfo.attendanceRecord ? 'Terminal 04 (HQ)' : 'Scheduled'}
                      </span>
                    </div>

                    <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                      <span className="text-[10px] font-bold text-slate-400 uppercase">Last Punch Out</span>
                      <div className="text-base font-black font-mono text-slate-900 mt-1">
                        {selectedDayInfo.attendanceRecord?.out || (selectedDayInfo.category === 'future' ? '06:00 PM' : '—')}
                      </div>
                      <span className="text-[10px] text-slate-500">
                        {selectedDayInfo.attendanceRecord ? 'Biometric Exit' : 'Scheduled'}
                      </span>
                    </div>

                    <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                      <span className="text-[10px] font-bold text-slate-400 uppercase">Working Hours</span>
                      <div className="text-base font-black text-emerald-600 mt-1">
                        {selectedDayInfo.attendanceRecord?.hours || (selectedDayInfo.category === 'future' ? '9h 00m' : '—')}
                      </div>
                      <span className="text-[10px] text-slate-500">8h Base Requirement</span>
                    </div>

                    <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                      <span className="text-[10px] font-bold text-slate-400 uppercase">Shift Assigned</span>
                      <div className="text-base font-black text-slate-800 mt-1">General</div>
                      <span className="text-[10px] text-slate-500">09:00 AM – 06:00 PM</span>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2 text-xs">
                    <div className="flex items-center gap-2 text-slate-500">
                      <ShieldCheck className="w-4 h-4 text-emerald-600" />
                      <span>
                        Verification:{' '}
                        <strong className="text-slate-800">
                          {selectedDayInfo.attendanceRecord?.notes || 'Face Biometric Match (99.8%)'}
                        </strong>
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          setCorrectionReqTime(selectedDayInfo.attendanceRecord?.in || '09:00 AM');
                          setShowCorrectionModal(true);
                        }}
                        className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-lg transition-colors cursor-pointer"
                      >
                        Request Punch Correction
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      ) : (
        /* ================= TIMESHEET LIST VIEW ================= */
        <div className="bg-white rounded-2xl shadow-xs border border-slate-200/80 overflow-hidden">
          {/* Table Filter Tabs */}
          <div className="p-3.5 sm:p-4 border-b border-slate-100 flex items-center justify-between gap-3 flex-wrap">
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
              {['All', 'Present', 'Late', 'Leave', 'Holiday', 'Weekend'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setTableFilter(tab)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-colors cursor-pointer ${
                    tableFilter === tab
                      ? 'bg-emerald-600 text-white shadow-xs'
                      : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            <div className="text-xs text-slate-400 font-medium">
              Showing {tableRecords.length} records in {MONTH_NAMES[month]} {year}
            </div>
          </div>

          {/* Mobile Card View (< md) */}
          <div className="block md:hidden divide-y divide-slate-100">
            {tableRecords.map((r, idx) => (
              <div key={idx} className="p-4 space-y-2 hover:bg-slate-50/60 transition-colors">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="font-bold text-sm text-slate-900">{r.date}</span>
                    <span className="text-xs text-slate-400 ml-2">({r.day})</span>
                  </div>
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                      r.status === 'Present'
                        ? 'bg-emerald-100 text-emerald-800'
                        : r.status === 'Late'
                        ? 'bg-amber-100 text-amber-800'
                        : r.status === 'Leave'
                        ? 'bg-sky-100 text-sky-800'
                        : r.status === 'Holiday'
                        ? 'bg-purple-100 text-purple-800'
                        : r.status === 'Absent'
                        ? 'bg-rose-100 text-rose-800'
                        : 'bg-slate-100 text-slate-500'
                    }`}
                  >
                    {r.status}
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-2 text-xs bg-slate-50/80 p-2.5 rounded-xl border border-slate-100">
                  <div>
                    <div className="text-[10px] text-slate-400 uppercase font-bold">Punch In</div>
                    <div className="font-mono font-semibold text-slate-800 mt-0.5">{r.in}</div>
                  </div>
                  <div>
                    <div className="text-[10px] text-slate-400 uppercase font-bold">Punch Out</div>
                    <div className="font-mono font-semibold text-slate-800 mt-0.5">{r.out}</div>
                  </div>
                  <div>
                    <div className="text-[10px] text-slate-400 uppercase font-bold">Hours</div>
                    <div className="font-bold text-slate-800 mt-0.5">{r.hours}</div>
                  </div>
                </div>

                <div className="text-[11px] text-slate-500 flex items-center justify-between">
                  <span>Note: {r.notes}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop Table View (md+) */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="bg-slate-50/70 border-b border-slate-100 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                  <th className="py-3 px-5">Date</th>
                  <th className="py-3 px-4">Day</th>
                  <th className="py-3 px-4">Punch In</th>
                  <th className="py-3 px-4">Punch Out</th>
                  <th className="py-3 px-4">Total Hours</th>
                  <th className="py-3 px-4">Details / Notes</th>
                  <th className="py-3 px-5 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {tableRecords.map((r, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3.5 px-5 font-bold text-slate-900">{r.date}</td>
                    <td className="py-3.5 px-4 text-slate-600">{r.day}</td>
                    <td className="py-3.5 px-4 font-mono text-slate-700">{r.in}</td>
                    <td className="py-3.5 px-4 font-mono text-slate-700">{r.out}</td>
                    <td className="py-3.5 px-4 font-semibold text-slate-800">{r.hours}</td>
                    <td className="py-3.5 px-4 text-xs text-slate-500 max-w-xs truncate">{r.notes}</td>
                    <td className="py-3.5 px-5 text-right">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold ${
                          r.status === 'Present'
                            ? 'bg-emerald-100 text-emerald-800'
                            : r.status === 'Late'
                            ? 'bg-amber-100 text-amber-800'
                            : r.status === 'Leave'
                            ? 'bg-sky-100 text-sky-800'
                            : r.status === 'Holiday'
                            ? 'bg-purple-100 text-purple-800'
                            : r.status === 'Absent'
                            ? 'bg-rose-100 text-rose-800'
                            : 'bg-slate-100 text-slate-500'
                        }`}
                      >
                        {r.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Punch Correction Modal */}
      {showCorrectionModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-md w-full p-5 sm:p-6 shadow-xl space-y-4 border border-slate-100">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-base sm:text-lg font-black text-slate-900">
                Request Punch Correction
              </h3>
              <button
                onClick={() => setShowCorrectionModal(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCorrectionSubmit} className="space-y-3.5 text-xs sm:text-sm">
              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase mb-1">
                  Selected Date
                </label>
                <input
                  type="text"
                  value={selectedDateStr}
                  disabled
                  className="w-full px-3 py-2 bg-slate-100 rounded-xl font-mono text-slate-700 font-bold border border-slate-200"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase mb-1">
                  Requested Punch-In Time
                </label>
                <input
                  type="text"
                  value={correctionReqTime}
                  onChange={(e) => setCorrectionReqTime(e.target.value)}
                  placeholder="e.g. 09:00 AM"
                  className="w-full px-3 py-2 bg-white rounded-xl border border-slate-200 focus:outline-emerald-600 font-mono text-slate-800 font-semibold"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase mb-1">
                  Reason for Correction
                </label>
                <textarea
                  rows={3}
                  value={correctionReason}
                  onChange={(e) => setCorrectionReason(e.target.value)}
                  placeholder="Explain why punch was delayed or missing (e.g. biometric kiosk scanner timeout, offsite client meeting)..."
                  className="w-full px-3 py-2 bg-white rounded-xl border border-slate-200 focus:outline-emerald-600 text-slate-800 resize-none"
                  required
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowCorrectionModal(false)}
                  className="px-4 py-2 rounded-xl text-slate-600 font-bold hover:bg-slate-100 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-xs transition-colors"
                >
                  Submit Request
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
