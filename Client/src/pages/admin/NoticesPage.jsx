import React, { useState } from 'react';
import { Megaphone, Plus, Edit2, Trash2, Pin, Bell } from 'lucide-react';

const initialNotices = [
  { id: 1, title: 'Office Closed — Diwali Holiday', body: 'The office will remain closed on November 1st on account of Diwali. Wishing everyone a happy festival!', date: 'Oct 26, 2026', author: 'HR Administrator', pinned: true, audience: 'All' },
  { id: 2, title: 'Q4 Performance Reviews Starting Nov 5', body: 'All department heads must schedule 1:1 performance review meetings with their team members between November 5–15. Please use the HR portal to submit review forms.', date: 'Oct 24, 2026', author: 'HR Administrator', pinned: false, audience: 'Managers' },
  { id: 3, title: 'New Health Insurance Benefits Effective Nov 1', body: 'We are expanding our group health insurance to include dental and vision coverage. HR will share enrollment details via email.', date: 'Oct 22, 2026', author: 'HR Administrator', pinned: false, audience: 'All' },
  { id: 4, title: 'Mandatory IT Security Training — Oct 30', body: 'All employees are required to complete the annual cybersecurity awareness training by Oct 30. Link shared on company email.', date: 'Oct 18, 2026', author: 'IT Department', pinned: false, audience: 'All' },
];

export default function NoticesPage() {
  const [notices, setNotices] = useState(initialNotices);
  const [showForm, setShowForm] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newBody, setNewBody] = useState('');

  const addNotice = () => {
    if (!newTitle.trim()) return;
    setNotices([{
      id: Date.now(), title: newTitle, body: newBody, date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      author: 'HR Administrator', pinned: false, audience: 'All'
    }, ...notices]);
    setNewTitle(''); setNewBody(''); setShowForm(false);
  };

  const deleteNotice = (id) => setNotices(notices.filter(n => n.id !== id));
  const togglePin = (id) => setNotices(notices.map(n => n.id === id ? { ...n, pinned: !n.pinned } : n));

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900">Notice Board</h1>
          <p className="text-sm text-slate-500 mt-1">Post and manage company-wide announcements.</p>
        </div>
        <button onClick={() => setShowForm(!showForm)} className="inline-flex items-center gap-2 bg-[#FFC933] hover:bg-amber-400 text-slate-950 px-4 py-2.5 rounded-xl font-bold text-sm transition-colors shadow-sm">
          <Plus size={15} />
          New Notice
        </button>
      </div>

      {/* New Notice Form */}
      {showForm && (
        <div className="bg-white rounded-2xl shadow-sm border border-[#FFC933]/40 p-5 space-y-3">
          <h3 className="font-black text-slate-900">Create New Notice</h3>
          <input
            value={newTitle}
            onChange={e => setNewTitle(e.target.value)}
            placeholder="Notice title..."
            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#008C75] focus:border-transparent"
          />
          <textarea
            value={newBody}
            onChange={e => setNewBody(e.target.value)}
            placeholder="Notice content..."
            rows={4}
            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#008C75] focus:border-transparent resize-none"
          />
          <div className="flex gap-2">
            <button onClick={addNotice} className="bg-slate-900 hover:bg-[#008C75] text-white px-5 py-2.5 rounded-xl font-bold text-sm transition-colors">Post Notice</button>
            <button onClick={() => setShowForm(false)} className="border border-slate-200 text-slate-600 px-5 py-2.5 rounded-xl font-bold text-sm hover:bg-slate-50 transition-colors">Cancel</button>
          </div>
        </div>
      )}

      {/* Notices List */}
      <div className="space-y-4">
        {[...notices].sort((a, b) => b.pinned - a.pinned).map((notice) => (
          <div key={notice.id} className={`bg-white rounded-2xl shadow-sm border p-6 transition-all ${notice.pinned ? 'border-amber-300 bg-amber-50/30' : 'border-slate-100'}`}>
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 flex-wrap mb-1">
                  {notice.pinned && <Pin size={13} className="text-amber-500 fill-amber-400" />}
                  <h3 className="font-black text-slate-900">{notice.title}</h3>
                  <span className="text-xs font-bold bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full">{notice.audience}</span>
                </div>
                <p className="text-sm text-slate-600 leading-relaxed mb-3">{notice.body}</p>
                <div className="text-xs text-slate-400">By {notice.author} · {notice.date}</div>
              </div>
              <div className="flex items-center gap-1 shrink-0">
                <button onClick={() => togglePin(notice.id)} className={`p-1.5 rounded-lg transition-colors ${notice.pinned ? 'text-amber-500 bg-amber-50' : 'hover:bg-slate-100 text-slate-400'}`}>
                  <Pin size={15} />
                </button>
                <button className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 transition-colors"><Edit2 size={15} /></button>
                <button onClick={() => deleteNotice(notice.id)} className="p-1.5 rounded-lg hover:bg-red-50 text-slate-400 hover:text-red-600 transition-colors"><Trash2 size={15} /></button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
