import React from 'react';
import { MapPin, Plus, Building2, Globe, Users, Clock, Wifi } from 'lucide-react';
import { useHRMS } from '../../context/HRMSContext';
import { useAlert } from '../../context/AlertContext';

export default function WorkLocationsPage() {
  const { locations } = useHRMS();
  const { showToast } = useAlert();

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">Work Locations & Facilities</h1>
          <p className="text-sm text-slate-500 mt-1">
            Manage physical campus branches, remote geographical clusters, and IP whitelisting.
          </p>
        </div>
        <button
          onClick={() => showToast('Register Location modal opened (Simulation)', 'info')}
          className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-xl font-bold text-xs shadow-md shadow-blue-500/20 transition-all cursor-pointer"
        >
          <Plus size={14} />
          <span>Add Location</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {locations.map((loc) => (
          <div
            key={loc.id}
            className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
                  <MapPin size={20} />
                </div>
                {loc.isHQ && (
                  <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                    Corporate Headquarters
                  </span>
                )}
              </div>

              <h3 className="text-lg font-black text-slate-900">{loc.name}</h3>
              <p className="text-xs text-slate-500 mt-0.5">{loc.address}</p>

              <div className="grid grid-cols-2 gap-3 my-5 py-4 border-y border-slate-100 text-xs">
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Timezone</span>
                  <span className="font-bold text-slate-900 flex items-center gap-1 mt-0.5">
                    <Clock size={12} className="text-blue-600" />
                    {loc.timezone}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Staff Allocated</span>
                  <span className="font-bold text-slate-900 flex items-center gap-1 mt-0.5">
                    <Users size={12} className="text-emerald-600" />
                    {loc.activeEmployees} / {loc.capacity}
                  </span>
                </div>
              </div>
            </div>

            <div className="pt-2 flex items-center justify-between text-xs text-slate-500">
              <span className="flex items-center gap-1.5 text-slate-600 font-medium">
                <Wifi size={13} className="text-emerald-500" />
                Dedicated Geo-Fence & IP Whitelist Active
              </span>
              <button
                onClick={() => showToast(`Configuring branch network rules for ${loc.name}`, 'info')}
                className="text-xs font-bold text-blue-600 hover:text-blue-800"
              >
                Settings
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
