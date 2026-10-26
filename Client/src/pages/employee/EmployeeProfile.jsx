import React, { useState } from 'react';
import { User, Mail, Phone, MapPin, Building, Calendar, ShieldCheck, Edit3, Award, Sparkles, Save } from 'lucide-react';

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
    <div className="space-y-4 sm:space-y-6 max-w-5xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            <User className="w-6 h-6 sm:w-7 h-7 text-emerald-600" />
            My Employee Profile
          </h1>
          <p className="text-slate-500 text-xs sm:text-sm mt-0.5">
            Personal information, employment details, and verified credentials.
          </p>
        </div>

        <button
          onClick={() => setEditing(!editing)}
          className="px-3.5 py-2 border border-slate-200 hover:bg-slate-50 rounded-xl text-xs font-bold text-slate-700 flex items-center gap-1.5 transition-colors self-start sm:self-auto"
        >
          <Edit3 className="w-3.5 h-3.5 text-slate-500" />
          {editing ? 'Cancel Editing' : 'Edit Contact Info'}
        </button>
      </div>

      {saved && (
        <div className="p-3.5 sm:p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold">
          ✓ Profile contact information updated successfully!
        </div>
      )}

      {/* Main Profile Card */}
      <div className="bg-white rounded-3xl p-5 sm:p-7 shadow-sm border border-slate-100">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 sm:gap-6 pb-5 sm:pb-6 border-b border-slate-100">
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=240&auto=format&fit=crop&q=80"
              alt="Sarah Jenkins"
              className="w-24 h-24 rounded-2xl object-cover ring-4 ring-emerald-50 shadow-md"
            />
            <span className="absolute bottom-1 right-1 w-4 h-4 bg-emerald-500 border-2 border-white rounded-full" />
          </div>

          <div className="flex-1 text-center sm:text-left">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mb-1">
              <h2 className="text-2xl font-black text-slate-900">{profile.name}</h2>
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800">
                <ShieldCheck className="w-3.5 h-3.5" /> Biometrics Enrolled
              </span>
            </div>
            <p className="text-sm font-semibold text-slate-500">{profile.role} • {profile.dept}</p>
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 mt-3 text-xs text-slate-500">
              <span className="font-mono font-bold text-slate-700">ID: {profile.empId}</span>
              <span>•</span>
              <span>Joined: {profile.joinDate}</span>
              <span>•</span>
              <span>Reporting to: <strong className="text-slate-700">{profile.manager}</strong></span>
            </div>
          </div>
        </div>

        {/* Profile Details Form / Grid */}
        <form onSubmit={handleSave} className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6">
          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Official Work Email</label>
            <div className="flex items-center gap-2 px-4 py-2.5 bg-slate-50 rounded-xl text-sm font-medium text-slate-800 border border-slate-200">
              <Mail className="w-4 h-4 text-slate-400" />
              {profile.email}
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Mobile Contact</label>
            {editing ? (
              <input
                type="text"
                value={profile.phone}
                onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                className="w-full px-4 py-2.5 bg-white rounded-xl text-sm font-medium text-slate-800 border border-emerald-500 focus:outline-none"
              />
            ) : (
              <div className="flex items-center gap-2 px-4 py-2.5 bg-slate-50 rounded-xl text-sm font-medium text-slate-800 border border-slate-200">
                <Phone className="w-4 h-4 text-slate-400" />
                {profile.phone}
              </div>
            )}
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Office / Base Location</label>
            <div className="flex items-center gap-2 px-4 py-2.5 bg-slate-50 rounded-xl text-sm font-medium text-slate-800 border border-slate-200">
              <Building className="w-4 h-4 text-slate-400" />
              San Francisco Tech Campus (HQ)
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Emergency Contact</label>
            {editing ? (
              <input
                type="text"
                value={profile.emergencyContact}
                onChange={(e) => setProfile({ ...profile, emergencyContact: e.target.value })}
                className="w-full px-4 py-2.5 bg-white rounded-xl text-sm font-medium text-slate-800 border border-emerald-500 focus:outline-none"
              />
            ) : (
              <div className="flex items-center gap-2 px-4 py-2.5 bg-slate-50 rounded-xl text-sm font-medium text-slate-800 border border-slate-200">
                <ShieldCheck className="w-4 h-4 text-slate-400" />
                {profile.emergencyContact}
              </div>
            )}
          </div>

          <div className="md:col-span-2">
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Residential Address</label>
            {editing ? (
              <input
                type="text"
                value={profile.address}
                onChange={(e) => setProfile({ ...profile, address: e.target.value })}
                className="w-full px-4 py-2.5 bg-white rounded-xl text-sm font-medium text-slate-800 border border-emerald-500 focus:outline-none"
              />
            ) : (
              <div className="flex items-center gap-2 px-4 py-2.5 bg-slate-50 rounded-xl text-sm font-medium text-slate-800 border border-slate-200">
                <MapPin className="w-4 h-4 text-slate-400" />
                {profile.address}
              </div>
            )}
          </div>

          {editing && (
            <div className="md:col-span-2 flex justify-end gap-3 pt-2">
              <button
                type="submit"
                className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm rounded-xl flex items-center gap-1.5 shadow-sm transition-all"
              >
                <Save className="w-4 h-4" />
                Save Profile Changes
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
