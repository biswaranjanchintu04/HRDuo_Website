import React, { useState } from 'react';
import {
  FolderArchive, FileText, Download, Upload, Building2, User,
  FolderOpen, FilePlus2, Search, ChevronRight, Shield, Award,
  FileCheck, FileBadge, Scroll, Eye, MoreVertical, Clock, CheckCircle2
} from 'lucide-react';
import { useAlert } from '../../context/AlertContext';

const companyDocuments = [
  {
    id: 'DOC-EMP-01',
    name: 'Official Employment Contract',
    subtitle: 'Signed & Verified',
    type: 'PDF Document',
    size: '1.4 MB',
    date: 'March 15, 2023',
    icon: FileCheck,
    color: 'from-blue-500 to-blue-600',
    bg: 'bg-blue-50',
    textColor: 'text-blue-600',
  },
  {
    id: 'DOC-EMP-02',
    name: 'Annual Performance Appraisal',
    subtitle: '2025–2026 Review',
    type: 'PDF Report',
    size: '2.1 MB',
    date: 'October 10, 2026',
    icon: Award,
    color: 'from-violet-500 to-purple-600',
    bg: 'bg-violet-50',
    textColor: 'text-violet-600',
  },
  {
    id: 'DOC-EMP-03',
    name: 'Health & Medical Insurance Card',
    subtitle: 'Corporate Coverage',
    type: 'ID Card / e-Badge',
    size: '840 KB',
    date: 'January 12, 2026',
    icon: Shield,
    color: 'from-rose-500 to-pink-600',
    bg: 'bg-rose-50',
    textColor: 'text-rose-600',
  },
  {
    id: 'DOC-EMP-04',
    name: 'Form W-2 / Tax Certificate',
    subtitle: 'Withholding Statement',
    type: 'Tax Statement',
    size: '620 KB',
    date: 'February 02, 2026',
    icon: Scroll,
    color: 'from-amber-500 to-orange-500',
    bg: 'bg-amber-50',
    textColor: 'text-amber-600',
  },
  {
    id: 'DOC-EMP-05',
    name: 'AWS Solutions Architect',
    subtitle: 'Professional Certificate',
    type: 'Professional Cert',
    size: '1.8 MB',
    date: 'June 20, 2024',
    icon: FileBadge,
    color: 'from-emerald-500 to-teal-600',
    bg: 'bg-emerald-50',
    textColor: 'text-emerald-600',
  },
];

const MOCK_UPLOAD_DOCS = [
  {
    id: 'MY-DOC-01',
    name: 'Personal ID Proof',
    subtitle: 'Aadhar Card',
    type: 'Identity Document',
    size: '520 KB',
    date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }),
    icon: FileBadge,
    color: 'from-sky-500 to-cyan-600',
    bg: 'bg-sky-50',
    textColor: 'text-sky-600',
  },
  {
    id: 'MY-DOC-02',
    name: 'Educational Degree',
    subtitle: 'University Certificate',
    type: 'Academic Certificate',
    size: '1.2 MB',
    date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }),
    icon: Award,
    color: 'from-indigo-500 to-blue-600',
    bg: 'bg-indigo-50',
    textColor: 'text-indigo-600',
  },
  {
    id: 'MY-DOC-03',
    name: 'Experience Letter',
    subtitle: 'Previous Employer',
    type: 'Experience Letter',
    size: '780 KB',
    date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }),
    icon: FileCheck,
    color: 'from-teal-500 to-emerald-600',
    bg: 'bg-teal-50',
    textColor: 'text-teal-600',
  },
];

export default function EmployeeDocuments() {
  const { showToast } = useAlert();
  const [activeTab, setActiveTab] = useState('company');
  const [myDocs, setMyDocs] = useState([]);
  const [mockUploadIndex, setMockUploadIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');

  const handleDownload = (doc) => {
    showToast(`Downloading "${doc.name}"...`, 'info');
  };

  const handleUpload = () => {
    if (mockUploadIndex < MOCK_UPLOAD_DOCS.length) {
      const newDoc = MOCK_UPLOAD_DOCS[mockUploadIndex];
      setMyDocs(prev => [...prev, newDoc]);
      setMockUploadIndex(prev => prev + 1);
      showToast(`"${newDoc.name}" uploaded successfully!`, 'success');
    } else {
      showToast('Upload Document window opened (Simulation)', 'info');
    }
  };

  const filteredCompany = companyDocuments.filter(d =>
    d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    d.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredMy = myDocs.filter(d =>
    d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    d.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const activeList = activeTab === 'company' ? filteredCompany : filteredMy;

  return (
    <div className="space-y-5 max-w-5xl font-poppins">

      {/* ── Hero Header Card ── */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-[#0061E0] via-blue-600 to-indigo-700 p-5 sm:p-6 shadow-xl shadow-blue-200/60">
        {/* Decorative blobs */}
        <div className="absolute -top-8 -right-8 w-44 h-44 rounded-full bg-white/10 blur-2xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-32 h-32 rounded-full bg-blue-400/20 blur-2xl pointer-events-none" />

        <div className="relative flex items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <div className="w-8 h-8 rounded-xl bg-white/15 backdrop-blur flex items-center justify-center">
                <FolderArchive size={16} className="text-white" />
              </div>
              <span className="text-[11px] font-bold uppercase tracking-widest text-blue-100">Document Vault</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight leading-tight">
              My Personnel Files
            </h1>
            <p className="text-xs text-blue-100 mt-1 leading-snug">
              Contracts, certificates, tax forms & personal uploads
            </p>
          </div>

          {/* Stats pills */}
          <div className="hidden sm:flex flex-col gap-1.5 shrink-0">
            <div className="flex items-center gap-1.5 bg-white/15 backdrop-blur rounded-xl px-3 py-1.5">
              <Building2 size={12} className="text-blue-100" />
              <span className="text-xs font-bold text-white">{companyDocuments.length} Company</span>
            </div>
            <div className="flex items-center gap-1.5 bg-white/15 backdrop-blur rounded-xl px-3 py-1.5">
              <User size={12} className="text-blue-100" />
              <span className="text-xs font-bold text-white">{myDocs.length} My Files</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Search Bar ── */}
      <div className="relative">
        <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
        <input
          type="text"
          placeholder="Search documents..."
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          className="w-full pl-9 pr-4 py-2.5 bg-white rounded-2xl border border-slate-200/80 text-sm font-medium text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 shadow-xs transition-all"
        />
      </div>

      {/* ── Tab Switcher ── */}
      <div className="flex items-center gap-2 bg-slate-100/80 p-1.5 rounded-2xl w-full sm:w-fit">
        {/* Company Tab */}
        <button
          onClick={() => setActiveTab('company')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl font-semibold text-sm transition-all duration-200 cursor-pointer flex-1 sm:flex-none justify-center sm:justify-start ${
            activeTab === 'company'
              ? 'bg-white text-[#0061E0] shadow-sm font-black'
              : 'text-slate-500 hover:text-slate-700'
          }`}
        >
          <Building2 size={15} />
          <span>By Company</span>
          <span className={`inline-flex items-center justify-center min-w-[20px] h-5 px-1.5 rounded-full text-[11px] font-bold transition-colors ${
            activeTab === 'company' ? 'bg-blue-100 text-blue-700' : 'bg-slate-200 text-slate-500'
          }`}>
            {companyDocuments.length}
          </span>
        </button>

        {/* My Docs Tab */}
        <button
          onClick={() => setActiveTab('my')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl font-semibold text-sm transition-all duration-200 cursor-pointer flex-1 sm:flex-none justify-center sm:justify-start ${
            activeTab === 'my'
              ? 'bg-white text-emerald-700 shadow-sm font-black'
              : 'text-slate-500 hover:text-slate-700'
          }`}
        >
          <User size={15} />
          <span>By Me</span>
          <span className={`inline-flex items-center justify-center min-w-[20px] h-5 px-1.5 rounded-full text-[11px] font-bold transition-colors ${
            activeTab === 'my' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-200 text-slate-500'
          }`}>
            {myDocs.length}
          </span>
        </button>
      </div>

      {/* ── Company Documents ── */}
      {activeTab === 'company' && (
        <div className="space-y-3">
          {/* Section label */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-1 h-4 rounded-full bg-[#0061E0]" />
              <span className="text-xs font-black text-slate-700 uppercase tracking-wider">Company Issued Documents</span>
            </div>
            <span className="text-[11px] text-slate-400 font-medium">{filteredCompany.length} files</span>
          </div>

          {filteredCompany.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 bg-white rounded-3xl border border-dashed border-slate-200">
              <Search size={28} className="text-slate-200 mb-2" />
              <p className="text-sm font-semibold text-slate-400">No results for "{searchQuery}"</p>
            </div>
          ) : (
            <div className="space-y-3">
              {filteredCompany.map((doc) => {
                const Icon = doc.icon;
                return (
                  <div
                    key={doc.id}
                    className="group bg-white rounded-3xl p-4 sm:p-5 border border-slate-200/80 shadow-xs hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 flex items-center gap-4"
                  >
                    {/* Doc Icon */}
                    <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${doc.color} text-white flex items-center justify-center shrink-0 shadow-md`}>
                      <Icon size={20} />
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="inline-flex items-center gap-1 bg-blue-50 text-blue-700 text-[10px] font-bold px-2 py-0.5 rounded-full border border-blue-100">
                          <Building2 size={8} />
                          Company Issued
                        </span>
                      </div>
                      <h3 className="text-sm font-black text-slate-900 leading-tight truncate">{doc.name}</h3>
                      <p className="text-[11px] text-slate-400 font-medium mt-0.5">{doc.subtitle} · {doc.size}</p>
                      <div className="flex items-center gap-1 mt-1">
                        <Clock size={9} className="text-slate-300" />
                        <span className="text-[10px] text-slate-400">{doc.date}</span>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-1.5 shrink-0">
                      <button
                        onClick={() => handleDownload(doc)}
                        className="p-2 rounded-xl text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                        title="Download"
                      >
                        <Download size={16} />
                      </button>
                      <button className="p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors" title="Preview">
                        <Eye size={16} />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* ── My Documents ── */}
      {activeTab === 'my' && (
        <div className="space-y-3">
          {/* Header row with upload button */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-1 h-4 rounded-full bg-emerald-500" />
              <span className="text-xs font-black text-slate-700 uppercase tracking-wider">My Uploaded Documents</span>
            </div>
            <button
              onClick={handleUpload}
              className="inline-flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white px-3.5 py-2 rounded-xl font-bold text-xs shadow-md shadow-emerald-500/20 transition-all hover:-translate-y-0.5 cursor-pointer"
            >
              <Upload size={13} />
              <span>Upload</span>
            </button>
          </div>

          {/* Empty State */}
          {myDocs.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 px-6 bg-white rounded-3xl border border-dashed border-slate-200">
              <div className="relative mb-5">
                <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-slate-50 to-slate-100 border border-slate-200 flex items-center justify-center">
                  <FolderOpen size={36} className="text-slate-300" />
                </div>
                <div className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-emerald-500 flex items-center justify-center shadow-md">
                  <Upload size={12} className="text-white" />
                </div>
              </div>
              <h3 className="text-base font-black text-slate-700 mb-1">No documents yet</h3>
              <p className="text-xs text-slate-400 text-center max-w-xs leading-relaxed">
                Upload your personal IDs, certificates, and experience letters to keep everything in one place.
              </p>
              <button
                onClick={handleUpload}
                className="mt-6 inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2.5 rounded-xl font-bold text-sm shadow-md shadow-emerald-500/20 transition-all hover:-translate-y-0.5 cursor-pointer"
              >
                <FilePlus2 size={16} />
                Upload Your First Document
              </button>
            </div>
          ) : (
            <>
              {/* Search results check */}
              {filteredMy.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 bg-white rounded-3xl border border-dashed border-slate-200">
                  <Search size={28} className="text-slate-200 mb-2" />
                  <p className="text-sm font-semibold text-slate-400">No results for "{searchQuery}"</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {filteredMy.map((doc) => {
                    const Icon = doc.icon;
                    return (
                      <div
                        key={doc.id}
                        className="group bg-white rounded-3xl p-4 sm:p-5 border border-slate-200/80 shadow-xs hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 flex items-center gap-4"
                      >
                        {/* Doc Icon */}
                        <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${doc.color} text-white flex items-center justify-center shrink-0 shadow-md`}>
                          <Icon size={20} />
                        </div>

                        {/* Info */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-0.5">
                            <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-700 text-[10px] font-bold px-2 py-0.5 rounded-full border border-emerald-100">
                              <CheckCircle2 size={8} />
                              By Me
                            </span>
                          </div>
                          <h3 className="text-sm font-black text-slate-900 leading-tight truncate">{doc.name}</h3>
                          <p className="text-[11px] text-slate-400 font-medium mt-0.5">{doc.subtitle} · {doc.size}</p>
                          <div className="flex items-center gap-1 mt-1">
                            <Clock size={9} className="text-slate-300" />
                            <span className="text-[10px] text-slate-400">Uploaded: {doc.date}</span>
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-1.5 shrink-0">
                          <button
                            onClick={() => handleDownload(doc)}
                            className="p-2 rounded-xl text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 transition-colors"
                            title="Download"
                          >
                            <Download size={16} />
                          </button>
                          <button className="p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors" title="More">
                            <MoreVertical size={16} />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Upload more prompt */}
              <button
                onClick={handleUpload}
                className="w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl border-2 border-dashed border-emerald-200 text-emerald-600 font-bold text-xs hover:border-emerald-400 hover:bg-emerald-50/60 transition-all cursor-pointer"
              >
                <FilePlus2 size={15} />
                <span>Upload Another Document</span>
              </button>
            </>
          )}
        </div>
      )}

      {/* ── Info Banner ── */}
      <div className="flex items-start gap-3 bg-blue-50/60 border border-blue-100 rounded-2xl p-4">
        <div className="w-8 h-8 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center shrink-0 mt-0.5">
          <Shield size={15} />
        </div>
        <div>
          <div className="text-xs font-black text-blue-900">Secure Document Vault</div>
          <p className="text-[11px] text-blue-700 mt-0.5 leading-snug">
            All documents are encrypted at rest. Only you and authorized HR personnel can access these files.
          </p>
        </div>
      </div>
    </div>
  );
}
