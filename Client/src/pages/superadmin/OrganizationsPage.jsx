import React, { useState } from 'react';
import { Building2, Plus, Search, MoreHorizontal, Eye, Edit2, Trash2, Filter, Globe } from 'lucide-react';

const organizations = [
  { id: 1, name: 'TechVision Labs', domain: 'techvision.com', plan: 'Enterprise', employees: 248, status: 'Active', admin: 'john.doe@techvision.com', joined: 'Oct 24, 2026', storage: '68%' },
  { id: 2, name: 'Greenfield Corp', domain: 'greenfield.co', plan: 'Professional', employees: 92, status: 'Active', admin: 'admin@greenfield.co', joined: 'Oct 22, 2026', storage: '31%' },
  { id: 3, name: 'Nexus Solutions', domain: 'nexus.io', plan: 'Starter', employees: 14, status: 'Trial', admin: 'hr@nexus.io', joined: 'Oct 20, 2026', storage: '8%' },
  { id: 4, name: 'Apex Analytics', domain: 'apex.ai', plan: 'Enterprise', employees: 510, status: 'Active', admin: 'ops@apex.ai', joined: 'Oct 18, 2026', storage: '85%' },
  { id: 5, name: 'CloudBase Inc', domain: 'cloudbase.net', plan: 'Professional', employees: 67, status: 'Suspended', admin: 'admin@cloudbase.net', joined: 'Oct 15, 2026', storage: '52%' },
  { id: 6, name: 'SkyBridge Ltd', domain: 'skybridge.io', plan: 'Enterprise', employees: 320, status: 'Active', admin: 'hr@skybridge.io', joined: 'Sep 30, 2026', storage: '44%' },
  { id: 7, name: 'Orion Dynamics', domain: 'orion.com', plan: 'Professional', employees: 145, status: 'Active', admin: 'people@orion.com', joined: 'Sep 18, 2026', storage: '60%' },
];

const statusColor = {
  Active: 'bg-emerald-100 text-emerald-700',
  Trial: 'bg-amber-100 text-amber-700',
  Suspended: 'bg-red-100 text-red-700',
};

const planColor = {
  Enterprise: 'bg-blue-100 text-blue-700',
  Professional: 'bg-violet-100 text-violet-700',
  Starter: 'bg-slate-100 text-slate-700',
};

export default function OrganizationsPage() {
  const [search, setSearch] = useState('');
  const filtered = organizations.filter(o =>
    o.name.toLowerCase().includes(search.toLowerCase()) ||
    o.domain.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900">Organizations</h1>
          <p className="text-sm text-slate-500 mt-1">{organizations.length} tenant organizations managed on this platform.</p>
        </div>
        <button className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-xl font-bold text-sm shadow-sm transition-colors">
          <Plus size={16} />
          Add Organization
        </button>
      </div>

      {/* Search & Filters */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-4 flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search organizations..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <button className="inline-flex items-center gap-2 text-slate-600 border border-slate-200 px-4 py-2.5 rounded-xl font-semibold text-sm hover:bg-slate-50 transition-colors">
          <Filter size={15} />
          Filters
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-50">
              <tr className="text-xs text-slate-400 font-bold uppercase tracking-wider">
                <th className="text-left px-5 py-3.5">Organization</th>
                <th className="text-left px-5 py-3.5">Plan</th>
                <th className="text-left px-5 py-3.5">Employees</th>
                <th className="text-left px-5 py-3.5">Storage</th>
                <th className="text-left px-5 py-3.5">Status</th>
                <th className="text-left px-5 py-3.5">Joined</th>
                <th className="text-left px-5 py-3.5">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((org) => (
                <tr key={org.id} className="border-t border-slate-50 hover:bg-slate-50/60 transition-colors">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center text-white font-black text-sm shrink-0">
                        {org.name[0]}
                      </div>
                      <div>
                        <div className="font-bold text-slate-900">{org.name}</div>
                        <div className="text-xs text-slate-400 flex items-center gap-1">
                          <Globe size={10} />
                          {org.domain}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${planColor[org.plan]}`}>{org.plan}</span>
                  </td>
                  <td className="px-5 py-4 font-semibold text-slate-900">{org.employees}</td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-20 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full ${parseInt(org.storage) > 80 ? 'bg-red-500' : parseInt(org.storage) > 60 ? 'bg-amber-500' : 'bg-emerald-500'}`}
                          style={{ width: org.storage }}
                        />
                      </div>
                      <span className="text-xs text-slate-500">{org.storage}</span>
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${statusColor[org.status]}`}>{org.status}</span>
                  </td>
                  <td className="px-5 py-4 text-slate-500 text-xs">{org.joined}</td>
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
