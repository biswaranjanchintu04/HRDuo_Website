import React, { useState } from 'react';
import { User, Mail, Phone, MapPin, Building, ShieldCheck, Edit3, Save, X } from 'lucide-react';

export default function EmployeeProfile() {
  const [editing, setEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: 'Sarah Jenkins',
    role: 'Senior Software Engineer',
    empId: 'EMP-001',
    dept: 'Product Engineering',
    email: 'sarah@hrduo.com',
    phone: '+1 (555) 349-2041',
    address: '450 Innovation Parkway, Suite 300, San Francisco, CA',
    joinDate: 'March 15, 2023',
    manager: 'Alex Thompson',
    emergencyContact: 'David Jenkins (+1 555-882-1922)',
  });
  const [saved, setSaved] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    setEditing(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="space-y-4 sm:space-y-5 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            <User className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-600 shrink-0" />
            My Profile
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Personal information, employment details & verified credentials.
          </p>
        </div>

        <button
          onClick={() => setEditing(!editing)}
          className={`flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl font-bold text-xs transition-colors self-start sm:self-auto touch-manipulation ${
            editing
              ? 'bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200'
              : 'bg-white border border-slate-200 hover:bg-slate-50 text-slate-700'
          }`}
        >
          {editing ? <X className="w-3.5 h-3.5" /> : <Edit3 className="w-3.5 h-3.5" />}
          {editing ? 'Cancel' : 'Edit Contact Info'}
        </button>
      </div>

      {/* Save success banner */}
      {saved && (
        <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 shrink-0" />
          Profile contact information updated successfully!
        </div>
      )}

      {/* Main Profile Card */}
      <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
        {/* Profile Hero Banner */}
        <div className="bg-gradient-to-r from-emerald-600 to-emerald-500 h-24 sm:h-28 relative" />

        <div className="px-5 sm:px-7 pb-5 sm:pb-7">
          {/* Avatar + Name section */}
          <div className="flex flex-col sm:flex-row sm:items-end gap-4 -mt-10 sm:-mt-12 mb-5 sm:mb-6">
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=240&auto=format&fit=crop&q=80"
                alt="Sarah Jenkins"
                className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover ring-4 ring-white shadow-lg"
              />
              <span className="absolute bottom-1 right-1 w-3.5 h-3.5 sm:w-4 sm:h-4 bg-emerald-500 border-2 border-white rounded-full" />
            </div>

            <div className="flex-1 pb-2">
              <div className="flex flex-wrap items-center gap-2 mb-0.5">
                <h2 className="text-xl sm:text-2xl font-black text-slate-900">{profile.name}</h2>
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
                  <ShieldCheck className="w-3 h-3" /> Biometrics Enrolled
                </span>
              </div>
              <p className="text-sm font-semibold text-slate-500">{profile.role} · {profile.dept}</p>
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-2 text-xs text-slate-500">
                <span className="font-mono font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded-md">ID: {profile.empId}</span>
                <span>Joined: {profile.joinDate}</span>
                <span>Reports to: <strong className="text-slate-700">{profile.manager}</strong></span>
              </div>
            </div>
          </div>

          {/* Profile Details Form */}
          <form onSubmit={handleSave} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Email — Read only */}
            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Official Work Email</label>
              <div className="flex items-center gap-2.5 px-3.5 py-3 bg-slate-50 rounded-xl text-sm font-medium text-slate-700 border border-slate-200">
                <Mail className="w-4 h-4 text-slate-400 shrink-0" />
                <span className="truncate">{profile.email}</span>
              </div>
            </div>

            {/* Mobile Contact — Editable */}
            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Mobile Contact</label>
              {editing ? (
                <input
                  type="tel"
                  value={profile.phone}
                  onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                  className="w-full px-3.5 py-3 bg-white rounded-xl text-sm font-medium text-slate-800 border border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              ) : (
                <div className="flex items-center gap-2.5 px-3.5 py-3 bg-slate-50 rounded-xl text-sm font-medium text-slate-700 border border-slate-200">
                  <Phone className="w-4 h-4 text-slate-400 shrink-0" />
                  {profile.phone}
                </div>
              )}
            </div>

            {/* Office Location — Read only */}
            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Office / Base Location</label>
              <div className="flex items-center gap-2.5 px-3.5 py-3 bg-slate-50 rounded-xl text-sm font-medium text-slate-700 border border-slate-200">
                <Building className="w-4 h-4 text-slate-400 shrink-0" />
                San Francisco HQ
              </div>
            </div>

            {/* Emergency Contact — Editable */}
            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Emergency Contact</label>
              {editing ? (
                <input
                  type="text"
                  value={profile.emergencyContact}
                  onChange={(e) => setProfile({ ...profile, emergencyContact: e.target.value })}
                  className="w-full px-3.5 py-3 bg-white rounded-xl text-sm font-medium text-slate-800 border border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              ) : (
                <div className="flex items-center gap-2.5 px-3.5 py-3 bg-slate-50 rounded-xl text-sm font-medium text-slate-700 border border-slate-200">
                  <ShieldCheck className="w-4 h-4 text-slate-400 shrink-0" />
                  <span className="truncate">{profile.emergencyContact}</span>
                </div>
              )}
            </div>

            {/* Residential Address — Editable, full width */}
            <div className="sm:col-span-2">
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Residential Address</label>
              {editing ? (
                <input
                  type="text"
                  value={profile.address}
                  onChange={(e) => setProfile({ ...profile, address: e.target.value })}
                  className="w-full px-3.5 py-3 bg-white rounded-xl text-sm font-medium text-slate-800 border border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              ) : (
                <div className="flex items-center gap-2.5 px-3.5 py-3 bg-slate-50 rounded-xl text-sm font-medium text-slate-700 border border-slate-200">
                  <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
                  <span>{profile.address}</span>
                </div>
              )}
            </div>

            {/* Save button when editing */}
            {editing && (
              <div className="sm:col-span-2 flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setEditing(false)}
                  className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-sm rounded-xl transition-colors touch-manipulation"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm rounded-xl flex items-center gap-1.5 shadow-sm transition-all touch-manipulation"
                >
                  <Save className="w-4 h-4" />
                  Save Changes
                </button>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
