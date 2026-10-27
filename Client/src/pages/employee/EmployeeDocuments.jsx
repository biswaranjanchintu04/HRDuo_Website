import React from 'react';
import { FolderArchive, FileText, Download, Upload, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { useAlert } from '../../context/AlertContext';

const myDocuments = [
  { id: 'DOC-EMP-01', name: 'Official Employment Contract (Signed)', type: 'PDF Document', size: '1.4 MB', date: 'March 15, 2023' },
  { id: 'DOC-EMP-02', name: 'Annual Performance Appraisal 2025-2026', type: 'PDF Report', size: '2.1 MB', date: 'October 10, 2026' },
  { id: 'DOC-EMP-03', name: 'Corporate Health & Medical Insurance Card', type: 'ID Card / e-Badge', size: '840 KB', date: 'January 12, 2026' },
  { id: 'DOC-EMP-04', name: 'Form W-2 / Tax Withholding Certificate', type: 'Tax Statement', size: '620 KB', date: 'February 02, 2026' },
  { id: 'DOC-EMP-05', name: 'AWS Certified Solutions Architect Certificate', type: 'Professional Cert', size: '1.8 MB', date: 'June 20, 2024' },
];

export default function EmployeeDocuments() {
  const { showToast } = useAlert();

  const handleDownload = (doc) => {
    showToast(`Downloading "${doc.name}"...`, 'info');
  };

  const handleUpload = () => {
    showToast('Upload Personal Document window opened (Simulation)', 'info');
  };

  return (
    <div className="space-y-6 max-w-5xl">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">My Personnel Documents</h1>
          <p className="text-sm text-slate-500 mt-1">
            Access your signed contracts, tax statements, health insurance badges, and certificates.
          </p>
        </div>
        <button
          onClick={handleUpload}
          className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-xl font-bold text-xs shadow-md shadow-blue-500/20 transition-all cursor-pointer"
        >
          <Upload size={14} />
          <span>Upload Document</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {myDocuments.map((doc) => (
          <div
            key={doc.id}
            className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-2xs hover:shadow-md transition-all flex items-start justify-between gap-4"
          >
            <div className="flex items-start gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                <FileText size={22} />
              </div>
              <div>
                <h3 className="text-xs font-bold text-slate-900 leading-snug">{doc.name}</h3>
                <div className="text-[11px] text-slate-400 mt-1">{doc.type} • {doc.size}</div>
                <div className="text-[10px] text-emerald-600 font-semibold mt-1">Issued: {doc.date}</div>
              </div>
            </div>

            <button
              onClick={() => handleDownload(doc)}
              className="p-2 rounded-xl text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-colors shrink-0"
              title="Download Document"
            >
              <Download size={16} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
