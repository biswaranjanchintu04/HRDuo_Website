import React, { useState } from 'react';
import { Plus, Search, CheckCircle2, Clock, AlertCircle, Trash2, Edit2, Calendar } from 'lucide-react';

const initialTasks = [
  { id: 1, title: 'API Integration — v2.4', assignee: 'Raj Mehta', due: 'Nov 1', priority: 'High', status: 'In Progress', desc: 'Complete REST API integration for the v2.4 release.' },
  { id: 2, title: 'Dashboard Redesign', assignee: 'Linda Cho', due: 'Nov 3', priority: 'Medium', status: 'In Review', desc: 'Redesign the admin dashboard for better UX.' },
  { id: 3, title: 'Fix login bug #423', assignee: 'Tom Watts', due: 'Oct 28', priority: 'High', status: 'In Progress', desc: 'Fix authentication token expiry issue in mobile.' },
  { id: 4, title: 'Write unit tests for auth module', assignee: 'Sarah Jenkins', due: 'Nov 5', priority: 'Medium', status: 'To Do', desc: 'Achieve 90%+ test coverage on the auth module.' },
  { id: 5, title: 'Performance profiling', assignee: 'Jake Torres', due: 'Nov 8', priority: 'Low', status: 'To Do', desc: 'Profile and optimize slow API endpoints.' },
  { id: 6, title: 'Sprint planning — Nov', assignee: 'Alex Thompson', due: 'Oct 31', priority: 'High', status: 'Done', desc: 'Finalize stories and estimates for November sprint.' },
];

const priorityColor = { High: 'bg-red-100 text-red-700', Medium: 'bg-amber-100 text-amber-700', Low: 'bg-slate-100 text-slate-600' };
const statusColumns = ['To Do', 'In Progress', 'In Review', 'Done'];
const statusColors = {
  'To Do': 'bg-slate-100 text-slate-600',
  'In Progress': 'bg-violet-100 text-violet-700',
  'In Review': 'bg-blue-100 text-blue-700',
  'Done': 'bg-emerald-100 text-emerald-700',
};

export default function TasksPage() {
  const [tasks, setTasks] = useState(initialTasks);
  const [search, setSearch] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [activeMobileCol, setActiveMobileCol] = useState('All');
  const [newTask, setNewTask] = useState({ title: '', assignee: '', due: '', priority: 'Medium', status: 'To Do' });

  const addTask = () => {
    if (!newTask.title) return;
    setTasks([...tasks, { ...newTask, id: Date.now() }]);
    setNewTask({ title: '', assignee: '', due: '', priority: 'Medium', status: 'To Do' });
    setShowForm(false);
  };

  const filtered = tasks.filter(t =>
    t.title.toLowerCase().includes(search.toLowerCase()) ||
    t.assignee.toLowerCase().includes(search.toLowerCase())
  );

  const displayedColumns = activeMobileCol === 'All' ? statusColumns : [activeMobileCol];

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900">Task Management</h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">Manage, delegate, and track team deliverable progress.</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="inline-flex items-center justify-center gap-2 bg-violet-600 hover:bg-violet-700 text-white px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-colors shadow-sm self-start sm:self-auto"
        >
          <Plus size={16} />
          Create Task
        </button>
      </div>

      {showForm && (
        <div className="bg-white rounded-2xl shadow-sm border border-violet-200 p-4 sm:p-5 space-y-3">
          <h3 className="font-black text-slate-900 text-sm sm:text-base">Create New Task</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <input
              placeholder="Task title"
              value={newTask.title}
              onChange={e => setNewTask(p => ({ ...p, title: e.target.value }))}
              className="px-3.5 py-2 sm:py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 col-span-1 sm:col-span-2"
            />
            <input
              placeholder="Assignee name"
              value={newTask.assignee}
              onChange={e => setNewTask(p => ({ ...p, assignee: e.target.value }))}
              className="px-3.5 py-2 sm:py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
            />
            <input
              type="date"
              value={newTask.due}
              onChange={e => setNewTask(p => ({ ...p, due: e.target.value }))}
              className="px-3.5 py-2 sm:py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
            />
            <select
              value={newTask.priority}
              onChange={e => setNewTask(p => ({ ...p, priority: e.target.value }))}
              className="px-3.5 py-2 sm:py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
            >
              <option>High</option><option>Medium</option><option>Low</option>
            </select>
            <select
              value={newTask.status}
              onChange={e => setNewTask(p => ({ ...p, status: e.target.value }))}
              className="px-3.5 py-2 sm:py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
            >
              {statusColumns.map(s => <option key={s}>{s}</option>)}
            </select>
          </div>
          <div className="flex gap-2 pt-1">
            <button onClick={addTask} className="bg-violet-600 hover:bg-violet-700 text-white px-4 py-2 rounded-xl font-bold text-xs sm:text-sm transition-colors">
              Save Task
            </button>
            <button onClick={() => setShowForm(false)} className="border border-slate-200 text-slate-600 px-4 py-2 rounded-xl font-bold text-xs sm:text-sm hover:bg-slate-50 transition-colors">
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Search & Mobile Column Filter Bar */}
      <div className="space-y-3">
        <div className="relative">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search tasks or assignees..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 sm:py-2.5 rounded-xl border border-slate-200 bg-white text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
          />
        </div>

        {/* Mobile Filter Tabs (< sm) */}
        <div className="flex sm:hidden items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
          {['All', ...statusColumns].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveMobileCol(tab)}
              className={`px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap transition-colors ${
                activeMobileCol === tab
                  ? 'bg-violet-600 text-white shadow-sm'
                  : 'bg-white border border-slate-200 text-slate-600'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Kanban-style columns */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {displayedColumns.map(col => {
          const colTasks = filtered.filter(t => t.status === col);
          return (
            <div key={col} className="bg-slate-50 rounded-2xl p-4 border border-slate-100">
              <div className="flex items-center justify-between mb-3">
                <span className={`text-xs font-black px-2.5 py-1 rounded-full ${statusColors[col]}`}>{col}</span>
                <span className="text-xs font-bold text-slate-400">{colTasks.length}</span>
              </div>
              <div className="space-y-2.5">
                {colTasks.map(t => (
                  <div key={t.id} className="bg-white rounded-xl p-3.5 border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                    <div className="font-bold text-sm text-slate-900 mb-1">{t.title}</div>
                    <div className="text-xs text-slate-400 mb-2 flex items-center justify-between">
                      <span>{t.assignee}</span>
                      <span className="font-mono">Due {t.due}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${priorityColor[t.priority]}`}>{t.priority}</span>
                      <span className="text-[10px] font-bold text-violet-600 bg-violet-50 px-2 py-0.5 rounded-full">{t.status}</span>
                    </div>
                  </div>
                ))}
                {colTasks.length === 0 && (
                  <div className="text-xs text-slate-400 text-center py-6">No tasks in this lane</div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
