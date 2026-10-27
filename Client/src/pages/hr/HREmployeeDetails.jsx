import React, { useState } from 'react';
import { 
  User, Mail, Phone, MapPin, Calendar, Briefcase, 
  DollarSign, Award, Clock, FileText, ArrowLeft, CheckCircle2 
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useHRMS } from '../../context/HRMSContext';
import { useAlert } from '../../context/AlertContext';

export default function HREmployeeDetails() {
  const { employees, attendance, leaves } = useHRMS();
  const { showToast } = useAlert();

  const [selectedEmpId, setSelectedEmpId] = useState(employees[0]?.id || 'EMP001');
  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'attendance' | 'leaves' | 'compensation'

  const employee = employees.find(e => e.id === selectedEmpId || e.empId === selectedEmpId) || employees[0];
  const empAttendance = attendance.filter(a => a.empId === employee.empId);
  const empLeaves = leaves.filter(l => l.empId === employee.empId);

  return (
    <div className="space-y-6 max-w-6xl">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-3">
          <Link
            to="/hr/employees"
            className="p-2 rounded-xl bg-white border border-slate-200 text-slate-500 hover:text-slate-900"
          >
            <ArrowLeft size={16} />
          </Link>
          <div>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">Employee Details & Profile</h1>
            <p className="text-sm text-slate-500">Comprehensive employee profile, attendance records, and leave quotas.</p>
          </div>
        </div>

        {/* Quick selector of employee */}
        <select
          value={selectedEmpId}
          onChange={(e) => setSelectedEmpId(e.target.value)}
          className="px-3 py-2 rounded-xl border border-slate-200 text-xs font-bold bg-white text-slate-800 focus:outline-none"
        >
          {employees.map(e => (
            <option key={e.id} value={e.id}>{e.name} ({e.empId})</option>
          ))}
        </select>
      </div>

      {/* Main Profile Header Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-2xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-6 border-b border-slate-100">
          <div className="flex items-center gap-4">
            <img
              src={employee.avatar}
              alt={employee.name}
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover ring-2 ring-blue-500/20"
            />
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl sm:text-2xl font-black text-slate-900">{employee.name}</h2>
                <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                  employee.status === 'Active' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' :
                  'bg-amber-50 text-amber-700 border border-amber-200'
                }`}>
                  {employee.status}
                </span>
              </div>
              <div className="text-xs text-blue-600 font-bold mt-0.5">{employee.role} • {employee.department}</div>
              <div className="text-xs text-slate-400 mt-1 font-mono">{employee.empId} • Joined {employee.joiningDate}</div>
            </div>
          </div>

          <div className="flex sm:flex-col items-center sm:items-end justify-between gap-1 border-t sm:border-0 pt-3 sm:pt-0">
            <div className="text-xs text-slate-400">Annual Compensation</div>
            <div className="text-xl font-black text-emerald-600">{employee.salary}</div>
            <div className="text-[11px] text-slate-500">Rating: ★ {employee.performanceRating} / 5.0</div>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-2 mt-6 border-b border-slate-100 pb-2">
          {[
            { id: 'overview', label: 'Overview & Bio' },
            { id: 'attendance', label: 'Attendance Logs' },
            { id: 'leaves', label: 'Leave History & Quota' },
            { id: 'compensation', label: 'Job & Compensation' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="mt-6">
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2.5">
                <span className="font-bold uppercase tracking-wider text-slate-400 block mb-2">Contact Details</span>
                <div className="flex justify-between"><span className="text-slate-500">Corporate Email:</span> <span className="font-semibold text-slate-900">{employee.email}</span></div>
                <div className="flex justify-between"><span className="text-slate-500">Mobile Phone:</span> <span className="font-semibold text-slate-900">{employee.phone}</span></div>
                <div className="flex justify-between"><span className="text-slate-500">Assigned Branch:</span> <span className="font-semibold text-slate-900">{employee.location}</span></div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2.5">
                <span className="font-bold uppercase tracking-wider text-slate-400 block mb-2">Reporting Structure</span>
                <div className="flex justify-between"><span className="text-slate-500">Direct Supervisor:</span> <span className="font-semibold text-slate-900">{employee.manager}</span></div>
                <div className="flex justify-between"><span className="text-slate-500">Employment Type:</span> <span className="font-semibold text-slate-900">{employee.employmentType}</span></div>
                <div className="flex justify-between"><span className="text-slate-500">System Role:</span> <span className="font-semibold text-blue-600 font-mono">{employee.userRole}</span></div>
              </div>
            </div>
          )}

          {activeTab === 'attendance' && (
            <div className="space-y-3">
              <div className="text-xs font-bold text-slate-500">Recent punch logs for {employee.name}:</div>
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-slate-400 font-bold uppercase">
                  <tr>
                    <th className="p-2.5">Date</th>
                    <th className="p-2.5">Check-In</th>
                    <th className="p-2.5">Check-Out</th>
                    <th className="p-2.5">Total Hours</th>
                    <th className="p-2.5">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium">
                  {empAttendance.length > 0 ? empAttendance.map(a => (
                    <tr key={a.id}>
                      <td className="p-2.5">{a.date}</td>
                      <td className="p-2.5 font-mono">{a.checkIn}</td>
                      <td className="p-2.5 font-mono">{a.checkOut}</td>
                      <td className="p-2.5 font-bold text-blue-600">{a.workHours}</td>
                      <td className="p-2.5 font-bold text-emerald-600">{a.status}</td>
                    </tr>
                  )) : (
                    <tr>
                      <td colSpan={5} className="p-4 text-center text-slate-400">
                        Today's record: Check-in 09:12 AM • Status: Present
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === 'leaves' && (
            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-3">
                <div className="p-3 bg-blue-50 text-blue-900 rounded-2xl border border-blue-100 text-center">
                  <div className="text-lg font-black">{employee.leaveBalance?.casual || 7} Days</div>
                  <div className="text-[10px] font-bold uppercase text-blue-600">Casual Leave Remaining</div>
                </div>
                <div className="p-3 bg-emerald-50 text-emerald-900 rounded-2xl border border-emerald-100 text-center">
                  <div className="text-lg font-black">{employee.leaveBalance?.sick || 9} Days</div>
                  <div className="text-[10px] font-bold uppercase text-emerald-600">Sick Leave Remaining</div>
                </div>
                <div className="p-3 bg-purple-50 text-purple-900 rounded-2xl border border-purple-100 text-center">
                  <div className="text-lg font-black">{employee.leaveBalance?.annual || 12} Days</div>
                  <div className="text-[10px] font-bold uppercase text-purple-600">Annual Vacation Remaining</div>
                </div>
              </div>

              <div className="text-xs font-bold text-slate-500 pt-2">Past Leave Applications:</div>
              <div className="space-y-2">
                {empLeaves.map(l => (
                  <div key={l.id} className="p-3 rounded-xl bg-slate-50 flex items-center justify-between text-xs">
                    <div>
                      <span className="font-bold text-slate-900">{l.type} ({l.days} days)</span>
                      <span className="text-slate-400 block">{l.fromDate} to {l.toDate} • {l.reason}</span>
                    </div>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-700">
                      {l.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'compensation' && (
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-3 text-xs">
              <div className="flex justify-between py-1 border-b border-slate-100"><span className="text-slate-500">Base Salary Package:</span> <span className="font-black text-slate-900">{employee.salary}</span></div>
              <div className="flex justify-between py-1 border-b border-slate-100"><span className="text-slate-500">Health Coverage Tier:</span> <span className="font-bold text-emerald-600">Comprehensive PPO (100% Employer Paid)</span></div>
              <div className="flex justify-between py-1 border-b border-slate-100"><span className="text-slate-500">401(k) Match:</span> <span className="font-bold text-blue-600">5% Match Vested Immediately</span></div>
              <div className="flex justify-between py-1"><span className="text-slate-500">Last Compensation Review:</span> <span className="font-bold text-slate-800">Q1 2026 Annual Cycle</span></div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
