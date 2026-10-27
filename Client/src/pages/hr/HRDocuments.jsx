import React, { useState } from 'react';
import { FolderArchive, FileText, Download, Plus, Search, Filter, Eye, Shield, CheckCircle2 } from 'lucide-react';
import { useAlert } from '../../context/AlertContext';

const documentsList = [
  { id: 'DOC-01', name: 'Standard Employment Agreement (Template 2026)', category: 'Legal & Contract', size: '2.4 MB', updated: 'Oct 15, 2026', scope: 'Company-wide' },
  { id: 'DOC-02', name: 'Mutual Non-Disclosure Agreement (NDA)', category: 'Compliance', size: '1.1 MB', updated: 'Sep 28, 2026', scope: 'All Staff' },
  { id: 'DOC-03', name: 'Comprehensive Health & Dental Policy Handbook', category: 'Benefits', size: '4.8 MB', updated: 'Oct 20, 2026', scope: 'Full-time' },
  { id: 'DOC-04', name: 'Remote Work & Cyber Security Guidelines', category: 'IT Policy', size: '3.2 MB', updated: 'Aug 10, 2026', scope: 'All Staff' },
  { id: 'DOC-05', name: 'Form W-4 & Tax Withholding Directives', category: 'Payroll & Tax', size: '850 KB', updated: 'Jan 05, 2026', scope: 'US Staff' },
  { id: 'DOC-06', name: 'Equal Opportunity & Harassment Prevention Code', category: 'HR Compliance', size: '2.1 MB', updated: 'May 14, 2026', scope: 'Company-wide' },
];

export default function HRDocuments() {
  const { showToast } = useAlert();
  const [search, setSearch] = useState('');

  const filtered = documentsList.filter(d =>
    d.name.toLowerCase().includes(search.toLowerCase()) ||
    d.category.toLowerCase().includes(search.toLowerCase())
  );

  const handleDownload = (doc) => {
    showToast(`Downloading "${doc.name}" (${doc.size})...`, 'info');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">Employee Documents & Compliance Repository</h1>
          <p className="text-sm text-slate-500 mt-1">
            Central repository for employment contracts, NDAs, tax forms, and company policies.
          </p>
        </div>
        <button
          onClick={() => showToast('Upload New Document modal opened (Simulation)', 'info')}
          className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-xl font-bold text-xs shadow-md shadow-blue-500/20 transition-all cursor-pointer"
        >
          <Plus size={14} />
          <span>Upload Document</span>
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-2xs border border-slate-200/80 p-4">
        <div className="relative">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search policies, forms, or contracts..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-200 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50/50"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((doc) => (
          <div
            key={doc.id}
            className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
                  <FileText size={20} />
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
                  {doc.category}
                </span>
              </div>

              <h3 className="text-base font-black text-slate-900 leading-snug">{doc.name}</h3>
              <p className="text-xs text-slate-400 mt-1">Scope: {doc.scope} • {doc.size}</p>
            </div>

            <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="text-slate-400">Updated {doc.updated}</span>
              <button
                onClick={() => handleDownload(doc)}
                className="inline-flex items-center gap-1.5 font-bold text-blue-600 hover:text-blue-800 cursor-pointer"
              >
                <Download size={13} />
                <span>Download</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
