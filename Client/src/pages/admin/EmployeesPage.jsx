import React, { useState } from 'react';
import { Search, Plus, Filter, MoreHorizontal, Edit2, Trash2, Eye, Mail, Phone } from 'lucide-react';

const employees = [
  { id: 'EMP001', name: 'Sarah Jenkins', role: 'Senior Developer', dept: 'Engineering', email: 'sarah@hrduo.com', phone: '+1 555-0101', status: 'Active', joined: 'Jan 15, 2024', avatar: 'SJ' },
  { id: 'EMP002', name: 'Marcus Lee', role: 'Sales Executive', dept: 'Sales', email: 'marcus@hrduo.com', phone: '+1 555-0102', status: 'Active', joined: 'Mar 8, 2024', avatar: 'ML' },
  { id: 'EMP003', name: 'Priya Sharma', role: 'HR Specialist', dept: 'HR & Admin', email: 'priya@hrduo.com', phone: '+1 555-0103', status: 'Active', joined: 'Oct 20, 2026', avatar: 'PS' },
  { id: 'EMP004', name: 'David Kim', role: 'Marketing Lead', dept: 'Marketing', email: 'david@hrduo.com', phone: '+1 555-0104', status: 'Active', joined: 'Jun 5, 2024', avatar: 'DK' },
  { id: 'EMP005', name: 'Anita Roy', role: 'Finance Analyst', dept: 'Finance', email: 'anita@hrduo.com', phone: '+1 555-0105', status: 'On Leave', joined: 'Feb 14, 2024', avatar: 'AR' },
  { id: 'EMP006', name: 'James Obi', role: 'Operations Manager', dept: 'Operations', email: 'james@hrduo.com', phone: '+1 555-0106', status: 'Active', joined: 'Apr 22, 2024', avatar: 'JO' },
  { id: 'EMP007', name: 'Linda Cho', role: 'UX Designer', dept: 'Engineering', email: 'linda@hrduo.com', phone: '+1 555-0107', status: 'Active', joined: 'Aug 1, 2024', avatar: 'LC' },
  { id: 'EMP008', name: 'Raj Mehta', role: 'Backend Engineer', dept: 'Engineering', email: 'raj@hrduo.com', phone: '+1 555-0108', status: 'Active', joined: 'Sep 30, 2024', avatar: 'RM' },
];

const deptColors = {
  Engineering: 'bg-blue-100 text-blue-700',
  Sales: 'bg-emerald-100 text-emerald-700',
  'HR & Admin': 'bg-rose-100 text-rose-700',
  Marketing: 'bg-violet-100 text-violet-700',
  Finance: 'bg-amber-100 text-amber-700',
  Operations: 'bg-teal-100 text-teal-700',
};

const avatarColors = [
  'bg-blue-600', 'bg-emerald-600', 'bg-violet-600', 'bg-rose-600', 'bg-amber-600', 'bg-teal-600', 'bg-indigo-600', 'bg-pink-600'
];

export default function EmployeesPage() {
  const [search, setSearch] = useState('');
  const filtered = employees.filter(e =>
    e.name.toLowerCase().includes(search.toLowerCase()) ||
    e.role.toLowerCase().includes(search.toLowerCase()) ||
    e.dept.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900">Employees</h1>
          <p className="text-sm text-slate-500 mt-1">{employees.length} employees across all departments.</p>
        </div>
        <div className="flex gap-2">
          <button className="inline-flex items-center gap-2 bg-[#FFC933] hover:bg-amber-400 text-slate-950 px-4 py-2.5 rounded-xl font-bold text-sm shadow-sm transition-colors">
            <Plus size={15} />
            Add Employee
          </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-4 flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search by name, role, or department..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#008C75] focus:border-transparent"
          />
        </div>
        <button className="inline-flex items-center gap-2 text-slate-600 border border-slate-200 px-4 py-2.5 rounded-xl font-semibold text-sm hover:bg-slate-50 transition-colors">
          <Filter size={15} />
          Filter
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-50">
              <tr className="text-xs text-slate-400 font-bold uppercase tracking-wider">
                <th className="text-left px-5 py-3.5">Employee</th>
                <th className="text-left px-5 py-3.5">ID</th>
                <th className="text-left px-5 py-3.5">Department</th>
                <th className="text-left px-5 py-3.5">Contact</th>
                <th className="text-left px-5 py-3.5">Status</th>
                <th className="text-left px-5 py-3.5">Joined</th>
                <th className="text-left px-5 py-3.5">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((emp, i) => (
                <tr key={emp.id} className="border-t border-slate-50 hover:bg-slate-50/60 transition-colors">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-9 h-9 rounded-xl ${avatarColors[i % avatarColors.length]} flex items-center justify-center text-white font-black text-xs shrink-0`}>
                        {emp.avatar}
                      </div>
                      <div>
                        <div className="font-bold text-slate-900">{emp.name}</div>
                        <div className="text-xs text-slate-400">{emp.role}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4 font-mono text-xs text-slate-500">{emp.id}</td>
                  <td className="px-5 py-4">
                    <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${deptColors[emp.dept]}`}>{emp.dept}</span>
                  </td>
                  <td className="px-5 py-4">
                    <div className="text-xs text-slate-600 flex items-center gap-1"><Mail size={11} />{emp.email}</div>
                    <div className="text-xs text-slate-400 flex items-center gap-1 mt-0.5"><Phone size={11} />{emp.phone}</div>
                  </td>
                  <td className="px-5 py-4">
                    <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${emp.status === 'Active' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                      {emp.status}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-slate-400 text-xs">{emp.joined}</td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-1">
                      <button className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-500 transition-colors"><Eye size={15} /></button>
                      <button className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-500 transition-colors"><Edit2 size={15} /></button>
                      <button className="p-1.5 rounded-lg hover:bg-red-50 text-slate-500 hover:text-red-600 transition-colors"><Trash2 size={15} /></button>
                    </div>
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
