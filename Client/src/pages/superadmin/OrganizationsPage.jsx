import React, { useState } from 'react';
import { 
  Building2, Plus, Search, MoreHorizontal, Eye, Edit2, 
  Trash2, Filter, Globe, X, Check, ShieldCheck, Mail, Phone, MapPin 
} from 'lucide-react';
import { useHRMS } from '../../context/HRMSContext';
import { useAlert } from '../../context/AlertContext';

export default function OrganizationsPage() {
  const { companies, addCompany, updateCompanyStatus } = useHRMS();
  const { showToast, showConfirm } = useAlert();

  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    industry: 'SaaS & Enterprise Cloud',
    plan: 'Professional',
    employees: '50',
    contactPerson: '',
    email: '',
    phone: '',
    country: 'United States'
  });

  const filtered = companies.filter(c => {
    const matchesSearch = c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.industry.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === 'All' || c.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleCreateCompany = (e) => {
    e.preventDefault();
    if (!formData.name) {
      showToast('Please enter a company name', 'error');
      return;
    }
    addCompany(formData);
    showToast(`Company "${formData.name}" provisioned successfully!`, 'success');
    setShowAddModal(false);
    setFormData({
      name: '',
      industry: 'SaaS & Enterprise Cloud',
      plan: 'Professional',
      employees: '50',
      contactPerson: '',
      email: '',
      phone: '',
      country: 'United States'
    });
  };

  const handleToggleStatus = async (comp) => {
    const newStatus = comp.status === 'Active' ? 'Suspended' : 'Active';
    const confirmed = await showConfirm(`Are you sure you want to mark "${comp.name}" as ${newStatus}?`);
    if (confirmed) {
      updateCompanyStatus(comp.id, newStatus);
      showToast(`Updated status to ${newStatus}`, 'info');
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">Company Management</h1>
          <p className="text-sm text-slate-500 mt-1">
            Oversee tenant provisioning, active workforce seat quotas, and enterprise licenses.
          </p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-xl font-bold text-sm shadow-md shadow-blue-500/20 transition-all cursor-pointer"
        >
          <Plus size={16} />
          Provision Company
        </button>
      </div>

      {/* Search and Status Filters */}
      <div className="bg-white rounded-2xl shadow-2xs border border-slate-200/80 p-4 flex flex-col md:flex-row gap-3 items-center justify-between">
        <div className="relative flex-1 w-full">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search by company name, industry, or admin email..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50/50"
          />
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto">
          <Filter size={15} className="text-slate-400" />
          <span className="text-xs font-bold text-slate-600">Status:</span>
          {['All', 'Active', 'Trial', 'Suspended'].map(st => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                statusFilter === st
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-slate-100 hover:bg-slate-200/70 text-slate-600'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-2xs border border-slate-200/80 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-slate-50/80 border-b border-slate-100">
              <tr className="text-xs text-slate-400 font-bold uppercase tracking-wider">
                <th className="px-5 py-3.5">Company Name</th>
                <th className="px-5 py-3.5">Plan & MRR</th>
                <th className="px-5 py-3.5">Workforce Seats</th>
                <th className="px-5 py-3.5">Status</th>
                <th className="px-5 py-3.5">Contact Person</th>
                <th className="px-5 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
              {filtered.map((org) => (
                <tr key={org.id} className="hover:bg-slate-50/60 transition-colors">
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 text-blue-600 flex items-center justify-center font-bold shrink-0">
                        {org.name.substring(0, 2).toUpperCase()}
                      </div>
                      <div>
                        <div className="font-bold text-slate-900">{org.name}</div>
                        <div className="text-xs text-slate-400 flex items-center gap-1.5 mt-0.5">
                          <Globe size={12} />
                          <span>{org.industry}</span>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-3.5">
                    <span className="inline-block px-2.5 py-0.5 rounded-md text-xs font-bold bg-blue-50 text-blue-700 border border-blue-100">
                      {org.plan}
                    </span>
                    <div className="text-xs text-slate-900 font-semibold mt-1">{org.mrr} / mo</div>
                  </td>
                  <td className="px-5 py-3.5">
                    <div className="text-xs font-bold text-slate-900">
                      {org.employees} / {org.maxEmployees}
                    </div>
                    <div className="w-24 bg-slate-100 h-1.5 rounded-full mt-1.5 overflow-hidden">
                      <div
                        className="bg-blue-600 h-full rounded-full"
                        style={{ width: `${Math.min(100, (org.employees / org.maxEmployees) * 100)}%` }}
                      />
                    </div>
                  </td>
                  <td className="px-5 py-3.5">
                    <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold ${
                      org.status === 'Active' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' :
                      org.status === 'Trial' ? 'bg-blue-50 text-blue-700 border border-blue-200' :
                      'bg-rose-50 text-rose-700 border border-rose-200'
                    }`}>
                      {org.status}
                    </span>
                  </td>
                  <td className="px-5 py-3.5">
                    <div className="text-xs font-bold text-slate-900">{org.contactPerson}</div>
                    <div className="text-xs text-slate-400 font-mono mt-0.5">{org.email}</div>
                  </td>
                  <td className="px-5 py-3.5 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => setSelectedCompany(org)}
                        className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors cursor-pointer"
                        title="View Details"
                      >
                        <Eye size={16} />
                      </button>
                      <button
                        onClick={() => handleToggleStatus(org)}
                        className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                          org.status === 'Active'
                            ? 'text-rose-600 hover:bg-rose-50 border border-rose-200'
                            : 'text-emerald-600 hover:bg-emerald-50 border border-emerald-200'
                        }`}
                      >
                        {org.status === 'Active' ? 'Suspend' : 'Activate'}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {filtered.length === 0 && (
                <tr>
                  <td colSpan={6} className="text-center py-10 text-slate-400 text-sm">
                    No matching companies found for "{search}".
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Company Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/40 backdrop-blur-xs">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-5">
              <div>
                <h3 className="text-lg font-black text-slate-900">Provision New Organization</h3>
                <p className="text-xs text-slate-500">Deploy dedicated tenant workspace and licenses</p>
              </div>
              <button
                onClick={() => setShowAddModal(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleCreateCompany} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Company Legal Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Acme Technologies Inc."
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Industry</label>
                  <select
                    value={formData.industry}
                    onChange={e => setFormData({ ...formData, industry: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs font-medium focus:outline-none"
                  >
                    <option>SaaS & Enterprise Cloud</option>
                    <option>Healthcare & Pharma</option>
                    <option>FinTech & Banking</option>
                    <option>Digital Media & Agency</option>
                    <option>Supply Chain & Logistics</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Subscription Plan</label>
                  <select
                    value={formData.plan}
                    onChange={e => setFormData({ ...formData, plan: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs font-medium focus:outline-none"
                  >
                    <option>Starter ($49/mo)</option>
                    <option>Professional ($199/mo)</option>
                    <option>Enterprise ($499/mo)</option>
                    <option>Custom Tier</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Initial Seats</label>
                  <input
                    type="number"
                    value={formData.employees}
                    onChange={e => setFormData({ ...formData, employees: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Country</label>
                  <input
                    type="text"
                    value={formData.country}
                    onChange={e => setFormData({ ...formData, country: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Primary Contact Person</label>
                  <input
                    type="text"
                    placeholder="Jane Doe"
                    value={formData.contactPerson}
                    onChange={e => setFormData({ ...formData, contactPerson: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Admin Email</label>
                  <input
                    type="email"
                    placeholder="admin@company.com"
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm"
                  />
                </div>
              </div>

              <div className="pt-3 flex gap-3">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-50 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-md shadow-blue-500/20 cursor-pointer"
                >
                  Provision Now
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* View Company Details Modal */}
      {selectedCompany && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/40 backdrop-blur-xs">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center font-bold text-lg">
                  {selectedCompany.name.substring(0, 2).toUpperCase()}
                </div>
                <div>
                  <h3 className="text-base font-black text-slate-900">{selectedCompany.name}</h3>
                  <span className="text-xs text-blue-600 font-semibold">{selectedCompany.slug}</span>
                </div>
              </div>
              <button
                onClick={() => setSelectedCompany(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100"
              >
                <X size={18} />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="flex justify-between py-1.5 border-b border-slate-50">
                <span className="text-slate-400 font-medium">Industry:</span>
                <span className="font-bold text-slate-800">{selectedCompany.industry}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-50">
                <span className="text-slate-400 font-medium">Active Plan:</span>
                <span className="font-bold text-blue-600">{selectedCompany.plan} ({selectedCompany.mrr}/mo)</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-50">
                <span className="text-slate-400 font-medium">Seats Allocated:</span>
                <span className="font-bold text-slate-800">{selectedCompany.employees} / {selectedCompany.maxEmployees}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-50">
                <span className="text-slate-400 font-medium">Admin Contact:</span>
                <span className="font-bold text-slate-800">{selectedCompany.contactPerson} ({selectedCompany.email})</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-50">
                <span className="text-slate-400 font-medium">License Renewal:</span>
                <span className="font-bold text-slate-800">{selectedCompany.renewalDate}</span>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 flex gap-2">
              <button
                onClick={() => setSelectedCompany(null)}
                className="w-full py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-xs font-bold text-slate-700"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
