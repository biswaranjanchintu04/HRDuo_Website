import React, { useState } from 'react';
import { LifeBuoy, Plus, Send, CheckCircle2, Clock, HelpCircle, ChevronDown, MessageSquare } from 'lucide-react';
import { useHRMS } from '../../context/HRMSContext';
import { useAlert } from '../../context/AlertContext';

const faqs = [
  { q: 'How do I submit an attendance correction for a missed clock-in?', a: 'Navigate to "My Attendance", locate the date with the missed timestamp, and click "Request Correction". Your manager will review and approve.' },
  { q: 'When is the monthly payroll cutoff date?', a: 'Payroll cutoff is the 25th of each month. Any overtime or bonus claims after the 25th will process in the subsequent cycle.' },
  { q: 'Can I carry forward unused annual leave into next year?', a: 'Yes, up to 8 days of Annual Paid Vacation (PL) can carry forward automatically into the subsequent fiscal year.' },
  { q: 'How do I download my monthly payslips for visa/loan purposes?', a: 'Visit the "Payslips" page from your sidebar where you can view detailed deductions and click "Download Official PDF".' }
];

export default function EmployeeSupport() {
  const { tickets, addTicket } = useHRMS();
  const { showToast } = useAlert();

  const [subject, setSubject] = useState('');
  const [category, setCategory] = useState('Payroll & Compensation');
  const [priority, setPriority] = useState('Medium');
  const [openFaq, setOpenFaq] = useState(null);

  const myTickets = tickets.filter(t => t.requester === 'Sophia Chen' || t.role === 'Employee Ticket');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!subject) return;
    addTicket({
      subject,
      category,
      priority,
      requester: 'Sophia Chen',
      role: 'Employee Ticket'
    });
    showToast('Your HR support ticket has been submitted!', 'success');
    setSubject('');
  };

  return (
    <div className="space-y-6 max-w-5xl">
      <div>
        <h1 className="text-2xl font-black text-slate-900 tracking-tight">HR Support & Help Desk</h1>
        <p className="text-sm text-slate-500 mt-1">
          Submit confidential inquiries to HR People Operations or review frequent workplace guidelines.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Ticket Submission Form */}
        <div className="lg:col-span-5 bg-white rounded-3xl p-6 border border-slate-200/80 shadow-2xs">
          <h2 className="text-base font-bold text-slate-900 mb-4 flex items-center gap-2">
            <LifeBuoy size={18} className="text-blue-600" />
            Raise an HR Ticket
          </h2>

          <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Inquiry Category</label>
              <select
                value={category}
                onChange={e => setCategory(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 font-medium focus:outline-none"
              >
                <option>Payroll & Compensation</option>
                <option>Benefits & Healthcare</option>
                <option>Workplace Equipment & IT</option>
                <option>Leave Balance Discrepancy</option>
                <option>Company Policy Clarification</option>
              </select>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Priority Level</label>
              <select
                value={priority}
                onChange={e => setPriority(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 font-medium focus:outline-none"
              >
                <option value="Low">Low (Standard Inquiry)</option>
                <option value="Medium">Medium (General Support)</option>
                <option value="High">High (Urgent Payroll/Tax Issue)</option>
              </select>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Subject & Details *</label>
              <textarea
                rows={4}
                required
                placeholder="Describe your inquiry or request in detail..."
                value={subject}
                onChange={e => setSubject(e.target.value)}
                className="w-full p-3 rounded-xl border border-slate-200 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md shadow-blue-500/20 flex items-center justify-center gap-2 cursor-pointer"
            >
              <Send size={14} />
              <span>Submit Ticket</span>
            </button>
          </form>
        </div>

        {/* My Open Tickets & FAQ */}
        <div className="lg:col-span-7 space-y-6">
          {/* Active Tickets */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-2xs">
            <h2 className="text-base font-bold text-slate-900 mb-3">My Support Inquiries</h2>
            <div className="space-y-2.5">
              {myTickets.map((t) => (
                <div key={t.id} className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between gap-3 text-xs">
                  <div>
                    <div className="font-bold text-slate-900">{t.subject}</div>
                    <div className="text-[11px] text-slate-400 mt-0.5">{t.ticketNo} • {t.category} • {t.createdAt}</div>
                  </div>
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                    t.status === 'Resolved' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' :
                    t.status === 'In Progress' ? 'bg-blue-50 text-blue-700 border border-blue-200' :
                    'bg-amber-50 text-amber-700 border border-amber-200'
                  }`}>
                    {t.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Quick FAQ Accordion */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-2xs">
            <h2 className="text-base font-bold text-slate-900 mb-3 flex items-center gap-2">
              <HelpCircle size={16} className="text-blue-600" />
              Frequently Asked HR Questions
            </h2>
            <div className="space-y-2">
              {faqs.map((f, i) => (
                <div key={i} className="border border-slate-100 rounded-2xl overflow-hidden">
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full p-3.5 text-left text-xs font-bold text-slate-800 hover:bg-slate-50 flex items-center justify-between gap-2"
                  >
                    <span>{f.q}</span>
                    <ChevronDown size={14} className={`text-slate-400 transition-transform ${openFaq === i ? 'rotate-180' : ''}`} />
                  </button>
                  {openFaq === i && (
                    <div className="p-3.5 pt-0 text-xs text-slate-600 bg-slate-50/50 leading-relaxed">
                      {f.a}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
