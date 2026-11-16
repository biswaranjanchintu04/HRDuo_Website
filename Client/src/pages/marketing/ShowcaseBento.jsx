import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ScanFace, Wallet, Calendar, CheckCircle2, ArrowRight, Clock, Shield, Sparkles, MapPin } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function ShowcaseBento() {
  const [activeTab, setActiveTab] = useState('biometrics');
  const navigate = useNavigate();

  const tabs = [
    { id: 'biometrics', label: 'Face AI Kiosk', icon: ScanFace },
    { id: 'geofence', label: 'GPS Geofencing', icon: MapPin },
    { id: 'payroll', label: 'Attendance-Linked Payroll', icon: Wallet },
    { id: 'leaves', label: '2-Step Leave Approvals', icon: Calendar },
  ];

  return (
    <section id="showcase" className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EAF4FF] text-[#2365E9] text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5" />
          Interactive Product Showcase
        </span>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#090D16]">
          Explore the Unified Ecosystem
        </h2>
        <p className="text-base sm:text-lg text-slate-600 font-normal">
          Toggle between core modules to see how our unified platform automates your workplace bottlenecks.
        </p>

        {/* Tab Buttons */}
        <div className="pt-4 flex flex-wrap justify-center gap-2">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isSelected = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-2 transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-[#2365E9] text-white shadow-md shadow-blue-500/20'
                    : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-10">
        <AnimatePresence mode="wait">
          {activeTab === 'biometrics' && (
            <motion.div
              key="biometrics"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
            >
              <div className="lg:col-span-6 space-y-5">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EAF4FF] text-[#2365E9] text-xs font-semibold">
                  <ScanFace className="w-3.5 h-3.5" />
                  Hardware-Free Facial Station
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-[#090D16] leading-tight">
                  Clock in within sub-second speed. <br />
                  <span className="text-[#2365E9]">Zero contact, zero proxy punching.</span>
                </h3>
                <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                  Employees stand in front of any tablet or laptop camera. Our edge neural model extracts facial landmarks, matches encrypted 128-D mathematical vectors, and stamps timestamped attendance instantly.
                </p>

                <div className="space-y-2.5 pt-1">
                  <div className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-[#12B76A] flex-shrink-0" />
                    <span>Liveness anti-spoof detection stops photo or video replay fraud</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-[#12B76A] flex-shrink-0" />
                    <span>High recognition accuracy across varying light and head angles</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-[#12B76A] flex-shrink-0" />
                    <span>Offline punch buffer caches logs if internet connection drops</span>
                  </div>
                </div>

                <div className="pt-2">
                  <button 
                    onClick={() => navigate('/face-attendance')}
                    className="bg-[#2365E9] hover:bg-[#1D4ED8] text-white px-5 py-2.5 rounded-xl font-semibold text-xs sm:text-sm flex items-center gap-1.5 shadow-sm cursor-pointer"
                  >
                    <span>Try Live Kiosk Mode</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Mockup Preview */}
              <div className="lg:col-span-6 bg-[#F8FAFC] rounded-2xl p-5 border border-slate-200/80">
                <div className="bg-white rounded-xl p-5 shadow-xs border border-slate-100 space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Station Live Telemetry</span>
                    <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700">Active</span>
                  </div>
                  <div className="space-y-2.5">
                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-[#EAF4FF] flex items-center justify-center text-[#2365E9] font-bold text-xs">
                          SJ
                        </div>
                        <div>
                          <p className="text-xs font-bold text-[#090D16]">Sarah Jensen</p>
                          <p className="text-[11px] text-slate-500">Engineering Dept · 09:02 AM</p>
                        </div>
                      </div>
                      <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">On Time</span>
                    </div>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-amber-50 flex items-center justify-center text-amber-700 font-bold text-xs">
                          MC
                        </div>
                        <div>
                          <p className="text-xs font-bold text-[#090D16]">Marcus Chen</p>
                          <p className="text-[11px] text-slate-500">Marketing Dept · 09:14 AM</p>
                        </div>
                      </div>
                      <span className="text-xs font-semibold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md">Grace Window</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'geofence' && (
            <motion.div
              key="geofence"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
            >
              <div className="lg:col-span-6 space-y-5">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-[#2365E9] text-xs font-semibold">
                  <MapPin className="w-3.5 h-3.5" />
                  GPS Geofencing Mobile Attendance
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-[#090D16] leading-tight">
                  Accurate branch radius validation. <br />
                  <span className="text-[#2365E9]">Clock in strictly on-premises.</span>
                </h3>
                <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                  Define exact geographic perimeters around headquarters, warehouse facilities, or client job sites. Mobile punches are cryptographically validated against live satellite coordinates.
                </p>

                <div className="space-y-2.5 pt-1">
                  <div className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-[#12B76A] flex-shrink-0" />
                    <span>Rejects mock-location & spoofing apps with OS-level checks</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-[#12B76A] flex-shrink-0" />
                    <span>Configurable radius from 20m to 500m per branch location</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-[#12B76A] flex-shrink-0" />
                    <span>Real-time geo-coordinates logged for audit compliance</span>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-6 bg-[#F8FAFC] rounded-2xl p-5 border border-slate-200/80">
                <div className="bg-white rounded-xl p-5 shadow-xs border border-slate-100 space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Branch Perimeter</span>
                    <span className="text-xs font-semibold text-[#2365E9]">Radius: 50 Meters</span>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-2 text-xs">
                    <div className="flex justify-between font-bold text-[#090D16]">
                      <span>Location</span>
                      <span>HQ Tech Park, Tower B</span>
                    </div>
                    <div className="flex justify-between text-slate-500">
                      <span>Coordinates</span>
                      <span className="font-mono text-[11px]">20.2961° N, 85.8245° E</span>
                    </div>
                    <div className="flex justify-between text-slate-500">
                      <span>Perimeter Breach Filter</span>
                      <span className="text-[#12B76A] font-semibold">Active & Shielded</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'payroll' && (
            <motion.div
              key="payroll"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
            >
              <div className="lg:col-span-6 space-y-5">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold">
                  <Wallet className="w-3.5 h-3.5" />
                  Automated Calculation Engine
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-[#090D16] leading-tight">
                  Zero spreadsheets. <br />
                  <span className="text-[#2365E9]">One-click monthly salary dispatch.</span>
                </h3>
                <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                  Connect biometric hours directly to salaries. Late punches, approved leaves, overtime hours, allowances, and tax withholding are computed automatically.
                </p>

                <div className="space-y-2.5 pt-1">
                  <div className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-[#12B76A] flex-shrink-0" />
                    <span>Customizable pay structures (Basic, HRA, Medical, Allowances)</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-[#12B76A] flex-shrink-0" />
                    <span>Automatic tax slab deductions & statutory compliance</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-[#12B76A] flex-shrink-0" />
                    <span>Batch printable PDF payslips with company branding</span>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-6 bg-[#F8FAFC] rounded-2xl p-5 border border-slate-200/80">
                <div className="bg-white rounded-xl p-5 shadow-xs border border-slate-100 space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Monthly Payroll Batch</span>
                    <span className="text-xs font-semibold text-emerald-600">Calculated (100%)</span>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-2 text-xs">
                    <div className="flex justify-between font-bold text-[#090D16]">
                      <span>Total Net Disbursement</span>
                      <span className="text-base text-[#2365E9]">₹14,82,500.00</span>
                    </div>
                    <div className="flex justify-between text-slate-500">
                      <span>Employees Processed</span>
                      <span className="font-semibold text-slate-700">248 / 248</span>
                    </div>
                    <div className="flex justify-between text-slate-500">
                      <span>Automatic Deductions</span>
                      <span className="font-semibold text-slate-700">₹1,24,200.00</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'leaves' && (
            <motion.div
              key="leaves"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
            >
              <div className="lg:col-span-6 space-y-5">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 text-amber-700 text-xs font-semibold">
                  <Calendar className="w-3.5 h-3.5" />
                  Leave & Time-Off Management
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-[#090D16] leading-tight">
                  2-step leave approvals. <br />
                  <span className="text-[#2365E9]">Manager review to HR verification.</span>
                </h3>
                <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                  Employees submit leave applications directly from mobile or web. Approvals flow transparently through reporting managers to HR with automated quota deductions.
                </p>

                <div className="space-y-2.5 pt-1">
                  <div className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-[#12B76A] flex-shrink-0" />
                    <span>Real-time leave balance tracking (Paid, Sick, Casual, Maternity)</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-[#12B76A] flex-shrink-0" />
                    <span>Departmental calendar view prevents team scheduling conflicts</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-[#12B76A] flex-shrink-0" />
                    <span>Approved leaves seamlessly update payroll timesheets</span>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-6 bg-[#F8FAFC] rounded-2xl p-5 border border-slate-200/80">
                <div className="bg-white rounded-xl p-5 shadow-xs border border-slate-100 space-y-3">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Leave Approval Pipeline</span>
                    <span className="text-xs font-semibold text-[#2365E9]">2-Step Flow</span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between text-xs">
                    <div>
                      <p className="font-bold text-[#090D16]">Annual Vacation (3 Days)</p>
                      <p className="text-slate-500">Alex Morgan · Engineering</p>
                    </div>
                    <span className="font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">Manager Approved</span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between text-xs">
                    <div>
                      <p className="font-bold text-[#090D16]">Sick Leave (1 Day)</p>
                      <p className="text-slate-500">Sophia Williams · Design</p>
                    </div>
                    <span className="font-semibold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-md">HR Confirmed</span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
