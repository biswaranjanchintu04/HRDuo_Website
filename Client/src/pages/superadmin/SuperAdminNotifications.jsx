import React, { useState } from 'react';
import { 
  Bell, Megaphone, Send, Plus, Search, Filter, 
  CheckCircle2, AlertTriangle, Info, Calendar, X 
} from 'lucide-react';
import { useHRMS } from '../../context/HRMSContext';
import { useAlert } from '../../context/AlertContext';

export default function SuperAdminNotifications() {
  const { notices, addNotice } = useHRMS();
  const { showToast } = useAlert();

  const [showBroadcastModal, setShowBroadcastModal] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [priority, setPriority] = useState('High');

  const handleBroadcast = (e) => {
    e.preventDefault();
    if (!title || !content) return;
    addNotice({
      title,
      content,
      priority,
      author: 'Alexander Vance (Super Admin)',
      department: 'Global Platform Broadcast'
    });
    showToast('Broadcast dispatched to all 142 tenant organizations!', 'success');
    setShowBroadcastModal(false);
    setTitle('');
    setContent('');
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">Platform Broadcasts & Alerts</h1>
          <p className="text-sm text-slate-500 mt-1">
            Publish maintenance windows, emergency security advisories, and feature release notes.
          </p>
        </div>

        <button
          onClick={() => setShowBroadcastModal(true)}
          className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-xl font-bold text-xs shadow-md shadow-blue-500/20 transition-all cursor-pointer"
        >
          <Megaphone size={15} />
          Create Broadcast
        </button>
      </div>

      {/* Broadcast Feed */}
      <div className="space-y-4">
        {notices.map((notice) => (
          <div
            key={notice.id}
            className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-2xs hover:shadow-md transition-all flex flex-col md:flex-row md:items-start justify-between gap-4"
          >
            <div className="flex items-start gap-4">
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${
                notice.priority === 'High' ? 'bg-rose-50 text-rose-600 border border-rose-100' :
                notice.priority === 'Medium' ? 'bg-amber-50 text-amber-600 border border-amber-100' :
                'bg-blue-50 text-blue-600 border border-blue-100'
              }`}>
                <Bell size={22} />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                    notice.priority === 'High' ? 'bg-rose-100 text-rose-700' :
                    notice.priority === 'Medium' ? 'bg-amber-100 text-amber-700' :
                    'bg-slate-100 text-slate-700'
                  }`}>
                    {notice.priority} Priority
                  </span>
                  <span className="text-xs text-slate-400 font-medium flex items-center gap-1">
                    <Calendar size={12} />
                    {notice.date}
                  </span>
                </div>
                <h3 className="text-base font-bold text-slate-900">{notice.title}</h3>
                <p className="text-xs text-slate-600 mt-1.5 leading-relaxed max-w-3xl">
                  {notice.content}
                </p>
                <div className="text-[11px] text-slate-400 font-medium mt-3">
                  Author: <span className="font-semibold text-slate-700">{notice.author}</span> • Scope: <span className="text-blue-600 font-semibold">{notice.department}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Broadcast Modal */}
      {showBroadcastModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/40 backdrop-blur-xs">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
              <div>
                <h3 className="text-base font-black text-slate-900">Publish Global Broadcast</h3>
                <p className="text-xs text-slate-500">Alert will render on all tenant admin dashboards</p>
              </div>
              <button
                onClick={() => setShowBroadcastModal(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleBroadcast} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Notice Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Scheduled Infrastructure Maintenance Windows"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Priority Tier</label>
                <select
                  value={priority}
                  onChange={(e) => setPriority(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-medium focus:outline-none"
                >
                  <option value="High">High (Immediate Banner)</option>
                  <option value="Medium">Medium (Informational)</option>
                  <option value="Low">Low (Policy Update)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Broadcast Details</label>
                <textarea
                  rows={4}
                  required
                  placeholder="Detail the update, expected duration, and impact..."
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="w-full p-3 rounded-xl border border-slate-200 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="pt-2 flex gap-2">
                <button
                  type="button"
                  onClick={() => setShowBroadcastModal(false)}
                  className="flex-1 py-2.5 rounded-xl bg-slate-100 text-slate-700 font-bold text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md shadow-blue-500/20 flex items-center justify-center gap-1.5"
                >
                  <Send size={14} />
                  <span>Send Broadcast</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
