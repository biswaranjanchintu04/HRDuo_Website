import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ScanFace, Wallet, Calendar, CheckCircle2, ArrowRight, Clock, Shield } from 'lucide-react';
import { Tabs } from '../../components/ui/Tabs';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';

export function ShowcaseBento() {
  const [activeTab, setActiveTab] = useState('biometrics');

  const tabs = [
    { id: 'biometrics', label: 'AI Facial Attendance', icon: ScanFace },
    { id: 'payroll', label: 'Dynamic Payroll', icon: Wallet },
    { id: 'leaves', label: 'Leave Workflows', icon: Calendar },
  ];

  return (
    <section id="showcase" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
        <Badge variant="teal">
          <Clock className="w-3.5 h-3.5 mr-1" />
          Interactive Experience
        </Badge>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-slate-900">
          Explore the Unified Ecosystem
        </h2>
        <p className="text-base sm:text-lg text-slate-600 font-medium">
          Toggle between core modules to see how HRDuo automates your operational bottlenecks.
        </p>

        <div className="pt-4 flex justify-center">
          <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />
        </div>
      </div>

      <div className="bg-white/95 backdrop-blur-sm rounded-3xl sm:rounded-[2.5rem] border border-[#F1E8D9] shadow-[0_4px_24px_rgba(0,0,0,0.04)] p-6 sm:p-10">
        <AnimatePresence mode="wait">
          {activeTab === 'biometrics' && (
            <motion.div
              key="biometrics"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
            >
              <div className="lg:col-span-6 space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E6F7F5] text-[#008C75] text-xs font-bold">
                  <ScanFace className="w-3.5 h-3.5" />
                  Hardware-Free Facial Station
                </div>
                <h3 className="text-3xl font-black text-slate-900 leading-tight">
                  Clock in within 200 milliseconds. <br />
                  <span className="text-[#008C75]">Zero contact, zero proxy.</span>
                </h3>
                <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                  Employees stand in front of any tablet or laptop camera. Our edge neural model extracts facial landmarks, matches encrypted 128D mathematical vectors, and stamps timestamped attendance instantly.
                </p>

                <div className="space-y-3 pt-2">
                  <div className="flex items-center gap-3 text-sm font-semibold text-slate-800">
                    <CheckCircle2 className="w-4 h-4 text-[#008C75]" />
                    <span>Liveness blink detection stops photo or video replay fraud</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm font-semibold text-slate-800">
                    <CheckCircle2 className="w-4 h-4 text-[#008C75]" />
                    <span>Works smoothly in low-light and varying camera angles</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm font-semibold text-slate-800">
                    <CheckCircle2 className="w-4 h-4 text-[#008C75]" />
                    <span>Offline punch buffer caches logs if internet connection drops</span>
                  </div>
                </div>

                <div className="pt-2">
                  <Button variant="primary" onClick={() => window.location.href = '/face-attendance'}>
                    Try Live Kiosk Mode
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </Button>
                </div>
              </div>

              {/* Mockup Preview */}
              <div className="lg:col-span-6 bg-[#FDFBF7] rounded-3xl p-6 border border-[#F1E8D9]">
                <div className="bg-white rounded-2xl p-5 shadow-sm border border-[#F1E8D9] space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                    <span className="text-xs font-bold text-slate-500 uppercase">Station Live Telemetry</span>
                    <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-[#E6F7F5] text-[#008C75]">Operational</span>
                  </div>
                  <div className="space-y-3">
                    <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-[#E6F7F5] flex items-center justify-center text-[#008C75] font-bold text-xs">
                          SJ
                        </div>
                        <div>
                          <p className="text-xs font-bold text-slate-900">Sarah Jensen</p>
                          <p className="text-[11px] text-slate-500">Engineering Dept · 09:02 AM</p>
                        </div>
                      </div>
                      <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full">On Time</span>
                    </div>

                    <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-[#FEF3C7] flex items-center justify-center text-amber-700 font-bold text-xs">
                          MC
                        </div>
                        <div>
                          <p className="text-xs font-bold text-slate-900">Marcus Chen</p>
                          <p className="text-[11px] text-slate-500">Marketing Dept · 09:14 AM</p>
                        </div>
                      </div>
                      <span className="text-xs font-bold text-amber-600 bg-amber-50 px-2.5 py-1 rounded-full">Grace Period</span>
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
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
            >
              <div className="lg:col-span-6 space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FEF3C7] text-amber-800 text-xs font-bold">
                  <Wallet className="w-3.5 h-3.5" />
                  Automated Calculation Engine
                </div>
                <h3 className="text-3xl font-black text-slate-900 leading-tight">
                  Zero spreadsheets. <br />
                  <span className="text-[#008C75]">One-click monthly salary dispatch.</span>
                </h3>
                <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                  Connect biometric hours directly to salaries. Late punches, approved leaves, overtime hours, allowances, and tax withholding are computed automatically.
                </p>

                <div className="space-y-3 pt-2">
                  <div className="flex items-center gap-3 text-sm font-semibold text-slate-800">
                    <CheckCircle2 className="w-4 h-4 text-[#008C75]" />
                    <span>Customizable pay structures (Basic, HRA, Medical, Allowances)</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm font-semibold text-slate-800">
                    <CheckCircle2 className="w-4 h-4 text-[#008C75]" />
                    <span>Automatic tax slab deductions & statutory compliance</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm font-semibold text-slate-800">
                    <CheckCircle2 className="w-4 h-4 text-[#008C75]" />
                    <span>Batch printable PDF payslips with company branding</span>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-6 bg-[#FDFBF7] rounded-3xl p-6 border border-[#F1E8D9]">
                <div className="bg-white rounded-2xl p-5 shadow-sm border border-[#F1E8D9] space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                    <span className="text-xs font-bold text-slate-500 uppercase">Monthly Payroll Batch</span>
                    <span className="text-xs font-bold text-emerald-600">Calculated (100%)</span>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-2 text-xs">
                    <div className="flex justify-between font-bold text-slate-900">
                      <span>Total Net Disbursement</span>
                      <span className="text-base text-[#008C75]">₹14,82,500.00</span>
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
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
            >
              <div className="lg:col-span-6 space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E6F7F5] text-[#008C75] text-xs font-bold">
                  <Calendar className="w-3.5 h-3.5" />
                  Leave & Time-Off Management
                </div>
                <h3 className="text-3xl font-black text-slate-900 leading-tight">
                  Effortless time-off requests. <br />
                  <span className="text-[#008C75]">Instant managerial approvals.</span>
                </h3>
                <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                  Employees submit leave applications directly from their self-service dashboard. Managers receive real-time notifications and approve with one click.
                </p>

                <div className="space-y-3 pt-2">
                  <div className="flex items-center gap-3 text-sm font-semibold text-slate-800">
                    <CheckCircle2 className="w-4 h-4 text-[#008C75]" />
                    <span>Real-time leave balance tracking (Paid, Sick, Casual, Maternity)</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm font-semibold text-slate-800">
                    <CheckCircle2 className="w-4 h-4 text-[#008C75]" />
                    <span>Departmental calendar view prevents team scheduling conflicts</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm font-semibold text-slate-800">
                    <CheckCircle2 className="w-4 h-4 text-[#008C75]" />
                    <span>Approved leaves seamlessly update payroll timesheets</span>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-6 bg-[#FDFBF7] rounded-3xl p-6 border border-[#F1E8D9]">
                <div className="bg-white rounded-2xl p-5 shadow-sm border border-[#F1E8D9] space-y-3">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                    <span className="text-xs font-bold text-slate-500 uppercase">Recent Leave Requests</span>
                    <span className="text-xs font-bold text-amber-600">1 Pending Review</span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between text-xs">
                    <div>
                      <p className="font-bold text-slate-900">Annual Vacation (3 Days)</p>
                      <p className="text-slate-500">Alex Morgan · Product Team</p>
                    </div>
                    <span className="font-bold text-amber-600 bg-amber-50 px-2 py-1 rounded-full">Pending</span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between text-xs">
                    <div>
                      <p className="font-bold text-slate-900">Medical Leave (1 Day)</p>
                      <p className="text-slate-500">Sophia Williams · Design</p>
                    </div>
                    <span className="font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">Approved</span>
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
