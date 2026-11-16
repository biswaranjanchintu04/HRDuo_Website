import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ScanFace, Wallet, Users, Clock, ShieldCheck, 
  ArrowRight, Sparkles, CheckCircle2, Zap, MapPin, 
  Building, BellRing, Smartphone, Award
} from 'lucide-react';

export function FeaturesBento() {
  const navigate = useNavigate();

  return (
    <section id="features" className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header with HRDuo brand styling */}
      <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
        <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#EBF3FA] text-[#002D62] text-xs font-semibold border border-[#D9E2EC]">
          <Sparkles className="w-3.5 h-3.5 text-[#00A8A8]" />
          Core Workforce Capabilities
        </span>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#002D62] leading-tight">
          Everything You Need to Run{' '}
          <span className="text-[#00A8A8]">Smart Operations</span>
        </h2>
        <p className="text-base sm:text-lg text-[#334E68] font-normal">
          Replace fragmented tools and physical punch cards. Connect biometric tracking, shift planning, leave approvals, and payroll seamlessly.
        </p>
      </div>

      {/* 12-Column Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        
        {/* Card 1: Touchless Facial AI & Mobile Kiosk (Col 7) */}
        <div className="md:col-span-7 bg-white rounded-3xl border border-slate-200/90 shadow-sm p-7 sm:p-8 flex flex-col justify-between hover:shadow-md hover:border-[#00A8A8]/40 transition-all group">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 rounded-2xl bg-[#EBF3FA] flex items-center justify-center text-[#002D62]">
                <ScanFace className="w-6 h-6" />
              </div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E6F8F8] text-[#008585] text-xs font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00A8A8] animate-pulse" />
                Sub-Second Recognition
              </span>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-[#002D62] mb-2">
                Touchless Face Biometrics Kiosk
              </h3>
              <p className="text-[#334E68] text-sm sm:text-base leading-relaxed font-normal">
                Transform any tablet, phone, or laptop into a high-speed biometric punch terminal. Detects real human liveness with zero buddy-punching and zero proprietary hardware costs.
              </p>
            </div>

            {/* Visual Kiosk Telemetry Card */}
            <div className="bg-[#F8FAFC] rounded-2xl p-4 border border-slate-100">
              <div className="flex items-center justify-between text-xs font-semibold text-[#002D62] mb-3">
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#00A8A8]" />
                  Entrance Station Kiosk
                </span>
                <span className="text-[#008585] bg-[#E6F8F8] px-2 py-0.5 rounded-md font-semibold text-[11px]">
                  Online & Syncing
                </span>
              </div>
              <div className="grid grid-cols-3 gap-2.5 text-center">
                <div className="bg-white p-3 rounded-xl border border-slate-100">
                  <span className="text-[11px] text-[#627D98] block font-medium">Punch Latency</span>
                  <span className="text-base font-bold text-[#002D62]">&lt; 0.4s</span>
                </div>
                <div className="bg-white p-3 rounded-xl border border-slate-100">
                  <span className="text-[11px] text-[#627D98] block font-medium">Anti-Spoofing</span>
                  <span className="text-base font-bold text-[#00A8A8]">Verified</span>
                </div>
                <div className="bg-white p-3 rounded-xl border border-slate-100">
                  <span className="text-[11px] text-[#627D98] block font-medium">Offline Storage</span>
                  <span className="text-base font-bold text-[#002D62]">Auto-Cached</span>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-6 mt-4 border-t border-slate-100 flex items-center justify-between">
            <span className="text-xs text-[#627D98] font-medium">Works with standard cameras & iPads</span>
            <button
              onClick={() => navigate('/face-attendance')}
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#002D62] hover:text-[#00A8A8] cursor-pointer"
            >
              <span>Launch Demo Kiosk</span>
              <ArrowRight className="w-4 h-4 text-[#00A8A8]" />
            </button>
          </div>
        </div>

        {/* Card 2: Attendance-Linked Dynamic Payroll (Col 5) */}
        <div className="md:col-span-5 bg-white rounded-3xl border border-slate-200/90 shadow-sm p-7 sm:p-8 flex flex-col justify-between hover:shadow-md hover:border-[#00A8A8]/40 transition-all">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 rounded-2xl bg-[#E6F8F8] flex items-center justify-center text-[#00A8A8]">
                <Wallet className="w-6 h-6" />
              </div>
              <span className="px-2.5 py-1 rounded-full bg-[#EBF3FA] text-[#002D62] text-xs font-semibold">
                Automated Sync
              </span>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-[#002D62] mb-2">
                Attendance-Linked Payroll
              </h3>
              <p className="text-[#334E68] text-sm leading-relaxed font-normal">
                Biometric timesheets automatically compute working days, overtime, unpaid leaves, and statutory compliance deductions.
              </p>
            </div>

            <div className="space-y-2 pt-1">
              <div className="flex items-center justify-between text-xs p-3 rounded-xl bg-slate-50 border border-slate-100">
                <span className="font-medium text-[#334E68]">Late Grace Rules & Half-Days</span>
                <span className="text-[#008585] font-semibold">Auto-Computed</span>
              </div>
              <div className="flex items-center justify-between text-xs p-3 rounded-xl bg-slate-50 border border-slate-100">
                <span className="font-medium text-[#334E68]">Payslip PDF Generation</span>
                <span className="text-[#002D62] font-semibold">1-Click Batch</span>
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-slate-100 flex items-center justify-between text-xs font-medium text-[#627D98]">
            <span>Direct Bank Transfer Formats</span>
            <span className="text-[#00A8A8] font-semibold">100% Audit Ready</span>
          </div>
        </div>

        {/* Card 3: Geofenced Mobile Punch (Col 4) */}
        <div className="md:col-span-4 bg-white rounded-3xl border border-slate-200/90 shadow-sm p-7 sm:p-8 flex flex-col justify-between hover:shadow-md hover:border-[#00A8A8]/40 transition-all">
          <div className="space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-[#EBF3FA] flex items-center justify-center text-[#002D62]">
              <MapPin className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-[#002D62]">
              GPS Geofenced Punch
            </h3>
            <p className="text-[#334E68] text-sm leading-relaxed font-normal">
              Define precise branch perimeters. Staff can only clock in when physically inside your office, warehouse, or authorized client site.
            </p>
          </div>
          <div className="pt-4 border-t border-slate-100 flex items-center gap-1.5 text-xs text-[#002D62] font-semibold">
            <CheckCircle2 className="w-4 h-4 text-[#00A8A8]" />
            <span>High-accuracy radius lock</span>
          </div>
        </div>

        {/* Card 4: 2-Step Manager → HR Leave Workflow (Col 4) */}
        <div className="md:col-span-4 bg-white rounded-3xl border border-slate-200/90 shadow-sm p-7 sm:p-8 flex flex-col justify-between hover:shadow-md hover:border-[#00A8A8]/40 transition-all">
          <div className="space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-[#E6F8F8] flex items-center justify-center text-[#00A8A8]">
              <Users className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-[#002D62]">
              2-Step Leave Approvals
            </h3>
            <p className="text-[#334E68] text-sm leading-relaxed font-normal">
              Transparent multi-tier hierarchy: Team Managers approve first, followed by final HR verification with instant quota balance deductions.
            </p>
          </div>
          <div className="pt-4 border-t border-slate-100 flex items-center gap-2 text-xs text-[#334E68] font-medium">
            <span className="px-2 py-0.5 rounded bg-[#E6F8F8] text-[#008585] font-semibold">Manager</span>
            <span>→</span>
            <span className="px-2 py-0.5 rounded bg-[#EBF3FA] text-[#002D62] font-semibold">HR Admin</span>
          </div>
        </div>

        {/* Card 5: Real-Time Multi-Branch Sync (Col 4) */}
        <div className="md:col-span-4 bg-white rounded-3xl border border-slate-200/90 shadow-sm p-7 sm:p-8 flex flex-col justify-between hover:shadow-md hover:border-[#00A8A8]/40 transition-all">
          <div className="space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-[#EBF3FA] flex items-center justify-center text-[#002D62]">
              <Clock className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-[#002D62]">
              Multi-Branch Shift Rosters
            </h3>
            <p className="text-[#334E68] text-sm leading-relaxed font-normal">
              Manage rotational morning, evening, and night shifts across multiple city branches with live SSE server-sent push updates.
            </p>
          </div>
          <div className="pt-4 border-t border-slate-100 flex items-center gap-2 text-xs text-[#334E68] font-medium">
            <Zap className="w-4 h-4 text-[#00A8A8]" />
            <span>Instant live activity sync</span>
          </div>
        </div>

      </div>
    </section>
  );
}
