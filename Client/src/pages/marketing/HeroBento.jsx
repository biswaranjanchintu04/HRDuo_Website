import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowRight, ShieldCheck, MapPin, Sparkles, CheckCircle2, 
  Smartphone, Users, Clock, Zap, Building2, Play
} from 'lucide-react';

export function HeroBento() {
  const navigate = useNavigate();

  return (
    <section className="relative pt-6 sm:pt-12 pb-16 sm:pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden">
      
      {/* Background radial gradient glow matching HRDuo navy and teal */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[720px] h-[420px] bg-gradient-to-tr from-[#002D62]/10 via-[#00A8A8]/10 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Main Centered Hero Content */}
      <div className="max-w-4xl mx-auto text-center flex flex-col items-center">

        {/* HRDuo Brand Pill Badge */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#EBF3FA] border border-[#D9E2EC] text-[#002D62] text-xs sm:text-sm font-semibold mb-6 shadow-2xs"
        >
          <span className="flex h-2 w-2 rounded-full bg-[#00A8A8] animate-pulse" />
          <span>Smart HR. Stronger Together.</span>
          <span className="text-slate-300">|</span>
          <span className="text-[#334E68] font-medium hidden sm:inline">Zero Hardware Lock-in</span>
        </motion.div>

        {/* Primary Headline Matching HRDuo Logo Colors (Navy + Teal) */}
        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-[#002D62] leading-[1.12]"
        >
          Smart HRMS & Payroll for{' '}
          <span className="bg-gradient-to-r from-[#002D62] via-[#004B8D] to-[#00A8A8] bg-clip-text text-transparent">
            Modern Workforces
          </span>
        </motion.h1>

        {/* Subtitle Description */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-base sm:text-xl text-[#334E68] font-normal max-w-2xl mx-auto leading-relaxed pt-5 sm:pt-6"
        >
          One platform for every workforce. Powerful, industry-ready solutions to manage people, operations, shifts, and compliance with simplicity.
        </motion.p>

        {/* Action Buttons Row */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 pt-8 w-full sm:w-auto"
        >
          {/* Primary CTA: Schedule Demo in HRDuo Navy to Teal Gradient */}
          <button
            onClick={() => navigate('/contact')}
            className="w-full sm:w-auto bg-gradient-to-r from-[#002D62] to-[#004B8D] hover:from-[#001E42] hover:to-[#003B73] text-white px-7 py-3.5 rounded-xl font-semibold text-sm sm:text-base flex items-center justify-center gap-2 shadow-lg shadow-blue-950/20 hover:shadow-xl hover:-translate-y-0.5 transition-all cursor-pointer"
          >
            <span>Schedule Demo</span>
            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 text-[#00C9CE]" />
          </button>

          {/* Secondary CTA: Explore Platform */}
          <button
            onClick={() => navigate('/solutions')}
            className="w-full sm:w-auto bg-white hover:bg-slate-50 text-[#002D62] border border-[#D9E2EC] px-6 py-3.5 rounded-xl font-semibold text-sm sm:text-base flex items-center justify-center gap-2 shadow-xs hover:border-[#002D62]/40 transition-all cursor-pointer"
          >
            <Play className="w-4 h-4 text-[#00A8A8] fill-[#00A8A8]" />
            <span>Explore Platform</span>
          </button>
        </motion.div>

        {/* Trust Badges Strip */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 pt-6 text-xs sm:text-sm text-[#486581]"
        >
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-[#00A8A8]" />
            <span>No Credit Card Required</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-[#00A8A8]" />
            <span>5-Minute Onboarding</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-[#00A8A8]" />
            <span>Mobile App & Web Kiosk</span>
          </div>
        </motion.div>

      </div>

      {/* Hero Interactive Telemetry Preview Card */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.35 }}
        className="mt-12 sm:mt-16 max-w-5xl mx-auto"
      >
        <div className="relative rounded-2xl sm:rounded-3xl p-2 sm:p-3 bg-gradient-to-b from-[#002D62]/15 via-slate-100/50 to-slate-200/40 border border-[#D9E2EC] shadow-2xl backdrop-blur-md">
          <div className="bg-white rounded-xl sm:rounded-2xl border border-slate-100 overflow-hidden shadow-inner">
            
            {/* Top Mock Window Bar */}
            <div className="px-4 py-3 bg-[#F8FAFC] border-b border-slate-100 flex items-center justify-between text-xs text-[#627D98]">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-rose-400/80" />
                <span className="w-3 h-3 rounded-full bg-amber-400/80" />
                <span className="w-3 h-3 rounded-full bg-emerald-400/80" />
                <span className="ml-2 font-mono text-[11px] text-[#627D98]">hrduo.com/live-control-center</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#E6F8F8] text-[#008585] font-semibold text-[11px]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00A8A8] animate-ping" />
                  Live Sync Active
                </span>
              </div>
            </div>

            {/* Dashboard Content Grid */}
            <div className="p-4 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-6 bg-[#FAFCFF]">
              
              {/* Left Column: Live Geo-Fencing & Biometric Kiosk Status */}
              <div className="lg:col-span-7 space-y-4">
                <div className="bg-white rounded-xl p-5 border border-slate-100 shadow-xs">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <span className="text-[11px] font-bold uppercase tracking-wider text-[#627D98]">Smart Punch Terminal</span>
                      <h4 className="text-base font-bold text-[#002D62]">Touchless AI Kiosk & GPS Geofence</h4>
                    </div>
                    <span className="px-2.5 py-1 rounded-lg bg-[#EBF3FA] text-[#002D62] text-xs font-semibold">
                      HQ Geofence: 75m Radius
                    </span>
                  </div>

                  {/* Punch Kiosk Simulator Preview */}
                  <div className="rounded-xl bg-gradient-to-br from-[#001E42] to-[#002D62] p-5 text-white flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#002D62] to-[#00A8A8] flex items-center justify-center shadow-lg shadow-teal-500/20">
                        <Smartphone className="w-7 h-7 text-white" />
                      </div>
                      <div>
                        <div className="text-xs text-slate-300">Biometric Recognition</div>
                        <div className="text-lg font-bold text-white flex items-center gap-1.5">
                          <span>Sophia Anderson</span>
                          <CheckCircle2 className="w-4 h-4 text-[#00C9CE]" />
                        </div>
                        <div className="text-[11px] text-slate-400">Senior Full Stack Engineer • 09:00 AM</div>
                      </div>
                    </div>

                    <div className="flex flex-col items-end gap-1">
                      <span className="px-2.5 py-1 rounded-full bg-[#00A8A8]/20 text-[#00C9CE] text-xs font-semibold border border-[#00A8A8]/30">
                        ✓ In-Radius & Anti-Spoof Passed
                      </span>
                      <span className="text-[11px] text-slate-300 font-mono">Punched in 0.42s</span>
                    </div>
                  </div>

                  {/* Mini Geofence Status Map preview */}
                  <div className="mt-4 grid grid-cols-3 gap-2 text-center text-xs">
                    <div className="bg-[#F8FAFC] p-2.5 rounded-lg border border-slate-100">
                      <div className="text-[#627D98] text-[10px] font-bold">PUNCH ACCURACY</div>
                      <div className="text-[#002D62] font-bold text-sm">99.4%</div>
                    </div>
                    <div className="bg-[#F8FAFC] p-2.5 rounded-lg border border-slate-100">
                      <div className="text-[#627D98] text-[10px] font-bold">AVG MATCH TIME</div>
                      <div className="text-[#00A8A8] font-bold text-sm">&lt;1 Second</div>
                    </div>
                    <div className="bg-[#F8FAFC] p-2.5 rounded-lg border border-slate-100">
                      <div className="text-[#627D98] text-[10px] font-bold">GEOFENCE BREACHES</div>
                      <div className="text-[#00A8A8] font-bold text-sm">0 Proxy</div>
                    </div>
                  </div>
                </div>

                {/* Live Activity Feed */}
                <div className="bg-white rounded-xl p-4 border border-slate-100 shadow-xs">
                  <div className="flex items-center justify-between text-xs font-semibold text-[#334E68] mb-3">
                    <span>Recent Real-time Punches</span>
                    <span className="text-[#00A8A8] font-semibold">Auto-refreshing</span>
                  </div>
                  <div className="space-y-2">
                    {[
                      { name: 'Biswaranjan Das', role: 'Lead Architect', time: '09:01 AM', status: 'On Time (Geofence)', color: 'teal' },
                      { name: 'Aarav Sharma', role: 'Sales Executive', time: '09:14 AM', status: 'Field Punch (GPS)', color: 'navy' },
                      { name: 'Priya Nair', role: 'UX Designer', time: '09:20 AM', status: 'WFH Verified', color: 'indigo' },
                    ].map((row, idx) => (
                      <div key={idx} className="flex items-center justify-between p-2 rounded-lg bg-slate-50/80 text-xs">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded-full bg-[#EBF3FA] text-[#002D62] font-bold flex items-center justify-center text-[10px]">
                            {row.name.charAt(0)}
                          </div>
                          <div>
                            <span className="font-semibold text-[#002D62]">{row.name}</span>
                            <span className="text-[#627D98] text-[11px] ml-1.5 hidden sm:inline">({row.role})</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-[#627D98] font-mono text-[11px]">{row.time}</span>
                          <span className="px-2 py-0.5 rounded-md bg-[#E6F8F8] text-[#008585] font-semibold text-[11px]">
                            {row.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column: Attendance-Linked Payroll & 2-Step Leaves */}
              <div className="lg:col-span-5 space-y-4">
                
                {/* Auto Payroll Sync Card */}
                <div className="bg-white rounded-xl p-5 border border-slate-100 shadow-xs">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#627D98]">Automated Payroll</span>
                    <span className="text-xs font-semibold text-[#008585] bg-[#E6F8F8] px-2 py-0.5 rounded">100% Synced</span>
                  </div>
                  <h4 className="text-sm font-bold text-[#002D62] mb-1">Attendance-Linked Salary Run</h4>
                  <p className="text-xs text-[#486581] mb-4">Zero manual spreadsheet calculations. Overtime & leaves auto-computed.</p>

                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-2 text-xs">
                    <div className="flex justify-between text-[#334E68]">
                      <span>Total Active Employees</span>
                      <span className="font-bold text-[#002D62]">142</span>
                    </div>
                    <div className="flex justify-between text-[#334E68]">
                      <span>Present Days Tracked</span>
                      <span className="font-bold text-[#00A8A8]">3,124 Days</span>
                    </div>
                    <div className="flex justify-between text-[#334E68]">
                      <span>Approved Paid Leaves</span>
                      <span className="font-bold text-[#002D62]">46 Days</span>
                    </div>
                    <div className="pt-2 border-t border-slate-200 flex justify-between font-bold text-[#002D62]">
                      <span>Payroll Disbursement</span>
                      <span className="text-[#00A8A8]">Ready to Generate</span>
                    </div>
                  </div>
                </div>

                {/* 2-Step Approval Status */}
                <div className="bg-white rounded-xl p-5 border border-slate-100 shadow-xs">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#627D98]">Leave Workflow</span>
                    <span className="text-xs text-[#00A8A8] font-semibold">Step 2 of 2</span>
                  </div>
                  <h4 className="text-sm font-bold text-[#002D62] mb-2">2-Step Manager → HR Approval</h4>
                  
                  <div className="flex items-center gap-2 text-xs pt-1">
                    <div className="flex-1 p-2 rounded-lg bg-[#E6F8F8] border border-[#D0EFEF] text-center">
                      <div className="font-bold text-[#008585]">1. Manager</div>
                      <div className="text-[10px] text-[#008585]">✓ Approved</div>
                    </div>
                    <div className="text-slate-300">→</div>
                    <div className="flex-1 p-2 rounded-lg bg-[#EBF3FA] border border-[#D9E2EC] text-center">
                      <div className="font-bold text-[#002D62]">2. HR Admin</div>
                      <div className="text-[10px] text-[#002D62]">Pending Sync</div>
                    </div>
                  </div>
                </div>

              </div>

            </div>

          </div>
        </div>
      </motion.div>

      {/* 4 Industry Suites Strip */}
      <div className="mt-16 sm:mt-24">
        <div className="text-center mb-10">
          <span className="text-xs font-bold uppercase tracking-wider text-[#002D62] bg-[#EBF3FA] px-3.5 py-1 rounded-full border border-[#D9E2EC]">
            Tailored Industry Suites
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#002D62] mt-3">
            Built for Every Working Environment
          </h2>
          <p className="text-sm sm:text-base text-[#486581] max-w-xl mx-auto mt-2">
            Whether you operate an enterprise office, a busy fitness center, a multi-campus university, or a 24/7 clinic.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {[
            {
              suite: "Corporate & Enterprise",
              desc: "Multi-branch geofencing, shift roster management, and integrated payroll control.",
              badge: "Enterprise Ready",
              icon: Building2,
              color: "text-[#002D62]",
              bg: "bg-[#EBF3FA]",
            },
            {
              suite: "Gym & Fitness Suite",
              desc: "Member turnstile integrations, trainer check-ins, and flexible hourly session logs.",
              badge: "Turnstile Ready",
              icon: Zap,
              color: "text-[#00A8A8]",
              bg: "bg-[#E6F8F8]",
            },
            {
              suite: "Education & Campuses",
              desc: "Faculty facial kiosk, student attendance, RFID cards, and instant SMS parent alerts.",
              badge: "Campus Kiosk",
              icon: Users,
              color: "text-[#002D62]",
              bg: "bg-[#EBF3FA]",
            },
            {
              suite: "Healthcare Clinics",
              desc: "24/7 rotating nurse shifts, doctor on-call logs, and stringent compliance audits.",
              badge: "24/7 Shifts",
              icon: Clock,
              color: "text-[#00A8A8]",
              bg: "bg-[#E6F8F8]",
            },
          ].map((item, idx) => {
            const Icon = item.icon;
            return (
              <div 
                key={idx}
                className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-2xs hover:shadow-md hover:border-[#00A8A8]/40 transition-all group"
              >
                <div className={`w-12 h-12 rounded-xl ${item.bg} flex items-center justify-center ${item.color} mb-4 group-hover:scale-105 transition-transform`}>
                  <Icon className="w-6 h-6" />
                </div>
                <span className="text-[11px] font-bold text-[#627D98] uppercase tracking-wider block mb-1">
                  {item.badge}
                </span>
                <h3 className="text-base font-bold text-[#002D62] mb-2">
                  {item.suite}
                </h3>
                <p className="text-xs sm:text-sm text-[#486581] leading-relaxed font-normal">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>

    </section>
  );
}
