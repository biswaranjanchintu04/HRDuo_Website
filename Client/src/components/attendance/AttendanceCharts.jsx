import React, { useState } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell 
} from 'recharts';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, User, AlertTriangle, Edit2, Save, X, CheckCircle2, ChevronRight } from 'lucide-react';

const COLORS = ['#22C55E', '#EF4444', '#F59E0B', '#8B5CF6'];

const AttendanceCharts = ({ trends, stats, records = [] }) => {
  const [selectedInspectorRecord, setSelectedInspectorRecord] = useState(null);
  const [isEditingPunch, setIsEditingPunch] = useState(false);
  const [overrideCheckIn, setOverrideCheckIn] = useState('');
  const [overrideCheckOut, setOverrideCheckOut] = useState('');

  const pieData = [
    { name: 'Present', value: stats?.onTimeToday || 0 },
    { name: 'Absent', value: stats?.absentToday || 0 },
    { name: 'Late', value: stats?.lateArrivals || 0 },
    { name: 'On Leave', value: stats?.onLeaveToday || 0 },
  ];

  const total = pieData.reduce((sum, item) => sum + item.value, 0);

  // Dynamic bar chart data
  const dynamicBarData = (trends || []).map(t => ({
    name: t.name,
    present: t.present,
    absent: t.absent, 
    leave: t.leave,
  }));

  // Helper to open inspector modal
  const handleOpenInspector = (record) => {
    setSelectedInspectorRecord(record);
    setOverrideCheckIn(record.checkIn || '09:30 AM');
    setOverrideCheckOut(record.checkOut || '06:30 PM');
    setIsEditingPunch(false);
  };

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Attendance Trends Bar Chart */}
        <div className="lg:col-span-2 bg-white p-6 rounded-3xl shadow-sm border border-gray-100 min-h-[440px] flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-lg font-bold text-gray-900 tracking-tight">Attendance Trends (Last 7 Days)</h2>
              <p className="text-xs text-gray-400 font-semibold mt-0.5">Daily breakdown of present, absent, and leave counts</p>
            </div>
            <div className="flex gap-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                <span className="text-xs font-bold text-gray-600">Present</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-rose-500"></div>
                <span className="text-xs font-bold text-gray-600">Absent</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-purple-500"></div>
                <span className="text-xs font-bold text-gray-600">Leave</span>
              </div>
            </div>
          </div>

          <div className="flex-1 w-full min-h-0">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={dynamicBarData} barGap={8}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F3F4F6" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{fill: '#9CA3AF', fontSize: 12, fontWeight: 600}}
                  dy={15}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{fill: '#9CA3AF', fontSize: 12, fontWeight: 600}}
                />
                <Tooltip 
                  cursor={{fill: '#F9FAFB'}}
                  contentStyle={{borderRadius: '20px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)', padding: '12px 16px'}}
                />
                <Bar dataKey="present" fill="#22C55E" radius={[6, 6, 0, 0]} barSize={24} />
                <Bar dataKey="absent" fill="#EF4444" radius={[6, 6, 0, 0]} barSize={24} />
                <Bar dataKey="leave" fill="#8B5CF6" radius={[6, 6, 0, 0]} barSize={24} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Attendance Distribution & Interactive Employee Roster */}
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex flex-col min-h-[440px] text-left">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-gray-900 tracking-tight">Attendance Distribution (Today)</h2>
            <span className="px-2.5 py-1 bg-blue-50 text-[#0061e0] rounded-full text-[10px] font-black uppercase tracking-wider">
              {records.length} Employees
            </span>
          </div>

          {/* Donut Chart */}
          <div className="h-44 w-full relative mb-4">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={70}
                  paddingAngle={8}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
              <span className="text-3xl font-black text-gray-900">{total}</span>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Total</p>
            </div>
          </div>

          {/* Interactive Employee Roster List */}
          <div className="space-y-2 flex-1 max-h-[220px] overflow-y-auto pr-1">
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Click Employee to Inspect Punch & Late Details</p>
            {records.length > 0 ? (
              records.map((record) => {
                const isLate = record.status === 'Late' || (record.checkIn && record.checkIn.includes('09:4') || record.checkIn && record.checkIn.includes('10:'));
                const isAbsent = record.status === 'Absent';
                const isOnLeave = record.status === 'On Leave' || record.status === 'Leave';

                let badgeClass = 'bg-emerald-50 text-emerald-600 border-emerald-100';
                if (isLate) badgeClass = 'bg-amber-50 text-amber-600 border-amber-100';
                else if (isAbsent) badgeClass = 'bg-rose-50 text-rose-600 border-rose-100';
                else if (isOnLeave) badgeClass = 'bg-purple-50 text-purple-600 border-purple-100';

                return (
                  <div
                    key={record.id || record.name}
                    onClick={() => handleOpenInspector(record)}
                    className="p-3 bg-gray-50/80 hover:bg-blue-50/50 border border-gray-100 hover:border-blue-100 rounded-2xl transition-all cursor-pointer flex items-center justify-between group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-xl bg-primary/10 text-primary font-bold text-xs flex items-center justify-center shrink-0">
                        {record.name ? record.name.charAt(0) : 'E'}
                      </div>
                      <div>
                        <h4 className="text-xs font-extrabold text-gray-900 group-hover:text-[#0061e0] transition-colors">{record.name}</h4>
                        <p className="text-[10px] text-gray-400 font-semibold">{record.department || 'Engineering'} • {record.checkIn || '09:30 AM'}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className={`px-2.5 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider border ${badgeClass}`}>
                        {isLate ? 'Late' : record.status || 'Present'}
                      </span>
                      <ChevronRight size={14} className="text-gray-300 group-hover:text-[#0061e0] transition-colors" />
                    </div>
                  </div>
                );
              })
            ) : (
              <p className="text-xs text-gray-400 text-center py-4 font-semibold">No employee attendance records for today</p>
            )}
          </div>
        </div>
      </div>

      {/* Employee Daily Attendance & Late Inspector Modal */}
      <AnimatePresence>
        {selectedInspectorRecord && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[130] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white rounded-[36px] max-w-lg w-full p-6 lg:p-8 shadow-2xl border border-gray-100 flex flex-col gap-6 relative overflow-hidden text-left"
            >
              <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-[#0061e0]/10 text-[#0061e0] font-black text-lg flex items-center justify-center shadow-inner">
                    {selectedInspectorRecord.name ? selectedInspectorRecord.name.charAt(0) : 'E'}
                  </div>
                  <div>
                    <h3 className="text-lg font-black text-gray-900 tracking-tight">{selectedInspectorRecord.name}</h3>
                    <p className="text-xs text-gray-400 font-semibold mt-0.5">{selectedInspectorRecord.department || 'Engineering'} • Today's Log</p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedInspectorRecord(null)}
                  className="p-2 text-gray-400 hover:text-gray-700 bg-gray-50 hover:bg-gray-100 rounded-full transition-all cursor-pointer"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Punch & Shift Details */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-black text-gray-500 uppercase tracking-widest flex items-center gap-1.5">
                    <Clock size={14} className="text-[#0061e0]" /> Punch & Shift Inspector
                  </h4>
                  <button
                    onClick={() => setIsEditingPunch(!isEditingPunch)}
                    className="text-xs font-bold text-[#0061e0] hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <Edit2 size={13} /> {isEditingPunch ? 'Cancel Edit' : 'Edit Punch Times'}
                  </button>
                </div>

                {isEditingPunch ? (
                  <div className="p-4 bg-blue-50/50 border border-blue-100 rounded-3xl space-y-3">
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Admin Check-In</label>
                        <input
                          type="text"
                          value={overrideCheckIn}
                          onChange={(e) => setOverrideCheckIn(e.target.value)}
                          className="w-full bg-white border border-gray-200 rounded-xl py-2 px-3 outline-none font-bold text-xs text-gray-900 mt-1"
                        />
                      </div>
                      <div>
                        <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Admin Check-Out</label>
                        <input
                          type="text"
                          value={overrideCheckOut}
                          onChange={(e) => setOverrideCheckOut(e.target.value)}
                          className="w-full bg-white border border-gray-200 rounded-xl py-2 px-3 outline-none font-bold text-xs text-gray-900 mt-1"
                        />
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        setIsEditingPunch(false);
                        selectedInspectorRecord.checkIn = overrideCheckIn;
                        selectedInspectorRecord.checkOut = overrideCheckOut;
                      }}
                      className="w-full py-2.5 bg-[#0061e0] text-white rounded-xl font-bold text-xs hover:bg-blue-700 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-blue-500/20"
                    >
                      <Save size={14} />
                      <span>Save Punch Override</span>
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
                      <p className="text-[10px] font-bold text-gray-400 uppercase">Check-In Time</p>
                      <p className="text-sm font-black text-gray-900 mt-1">{overrideCheckIn}</p>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
                      <p className="text-[10px] font-bold text-gray-400 uppercase">Check-Out Time</p>
                      <p className="text-sm font-black text-gray-900 mt-1">{overrideCheckOut}</p>
                    </div>
                  </div>
                )}

                {/* Late Arrival Inspector Box */}
                <div className="p-5 bg-gradient-to-br from-slate-900 to-blue-950 text-white rounded-3xl space-y-3 shadow-xl border border-slate-800">
                  <div className="flex items-center justify-between border-b border-white/10 pb-2">
                    <div className="flex items-center gap-2">
                      <AlertTriangle size={16} className="text-amber-400" />
                      <span className="text-xs font-black uppercase tracking-widest text-white">Late Arrival Status</span>
                    </div>
                    <span className="px-2.5 py-0.5 bg-amber-400/20 text-amber-300 border border-amber-400/30 text-[9px] font-bold rounded-full uppercase">
                      Shift Start: 09:30 AM
                    </span>
                  </div>

                  <div className="space-y-1 text-xs">
                    <p className="text-gray-300">
                      Late Arrival Indicator: <span className="font-extrabold text-amber-300">15 Mins Late</span>
                    </p>
                    <p className="text-[11px] text-gray-400 font-medium leading-relaxed">
                      Employee arrived after the 15-minute grace period threshold.
                    </p>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setSelectedInspectorRecord(null)}
                className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-white rounded-2xl font-bold text-xs transition-all shadow-md cursor-pointer"
              >
                Close Inspector
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AttendanceCharts;
