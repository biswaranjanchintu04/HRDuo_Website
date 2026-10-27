import React, { useState } from 'react';
import { 
  FileText, Search, Filter, ShieldCheck, Download, 
  Clock, User, Laptop, CheckCircle2, AlertTriangle 
} from 'lucide-react';
import { useHRMS } from '../../context/HRMSContext';
import { useAlert } from '../../context/AlertContext';

export default function AuditLogsPage() {
  const { auditLogs } = useHRMS();
  const { showToast } = useAlert();
  const [search, setSearch] = useState('');

  const filtered = auditLogs.filter(log =>
    log.action.toLowerCase().includes(search.toLowerCase()) ||
    log.actor.toLowerCase().includes(search.toLowerCase()) ||
    log.target.toLowerCase().includes(search.toLowerCase()) ||
    log.ip.includes(search)
  );

  const handleExport = () => {
    showToast('Exporting immutable SOC2 compliance audit log (JSON/CSV)...', 'success');
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">Security & Tenant Audit Logs</h1>
          <p className="text-sm text-slate-500 mt-1">
            Immutable system trails for tenant provisioning, permission changes, and security events.
          </p>
        </div>

        <button
          onClick={handleExport}
          className="inline-flex items-center gap-2 bg-white hover:bg-slate-50 text-slate-700 px-4 py-2.5 rounded-xl font-bold text-xs border border-slate-200 shadow-2xs transition-all cursor-pointer"
        >
          <Download size={14} />
          Export Audit Trail
        </button>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-2xl shadow-2xs border border-slate-200/80 p-4">
        <div className="relative">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search by action, actor, target entity, or IP address..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-200 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50/50"
          />
        </div>
      </div>

      {/* Logs Table */}
      <div className="bg-white rounded-2xl shadow-2xs border border-slate-200/80 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-slate-50/80 border-b border-slate-100">
              <tr className="text-xs text-slate-400 font-bold uppercase tracking-wider">
                <th className="px-5 py-3.5">Action Event</th>
                <th className="px-5 py-3.5">Actor Identity</th>
                <th className="px-5 py-3.5">Target Entity</th>
                <th className="px-5 py-3.5">IP Address</th>
                <th className="px-5 py-3.5">Timestamp</th>
                <th className="px-5 py-3.5 text-right">Verification</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
              {filtered.map((log) => (
                <tr key={log.id} className="hover:bg-slate-50/60 transition-colors">
                  <td className="px-5 py-3.5">
                    <div className="font-bold text-slate-900">{log.action}</div>
                    <div className="text-[10px] text-slate-400 font-mono mt-0.5">{log.id}</div>
                  </td>
                  <td className="px-5 py-3.5 text-xs text-slate-800 font-semibold">{log.actor}</td>
                  <td className="px-5 py-3.5 text-xs text-blue-600 font-bold">{log.target}</td>
                  <td className="px-5 py-3.5 font-mono text-xs text-slate-500">{log.ip}</td>
                  <td className="px-5 py-3.5 text-xs text-slate-500">{log.timestamp}</td>
                  <td className="px-5 py-3.5 text-right">
                    <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                      log.status === 'Success'
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        : 'bg-amber-50 text-amber-700 border border-amber-200'
                    }`}>
                      {log.status === 'Success' ? <CheckCircle2 size={11} /> : <AlertTriangle size={11} />}
                      <span>{log.status}</span>
                    </span>
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
