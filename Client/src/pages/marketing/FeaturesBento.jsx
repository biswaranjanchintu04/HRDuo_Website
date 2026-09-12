import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  ScanFace, Wallet, Users, Clock, ShieldCheck, 
  ArrowRight, Sparkles, Check, CheckCircle2, Zap 
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';

export function FeaturesBento() {
  const navigate = useNavigate();

  return (
    <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
        <Badge variant="yellow">
          <Sparkles className="w-3.5 h-3.5 mr-1" />
          Enterprise Capabilities
        </Badge>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-slate-900 leading-tight">
          Engineered for Accuracy. <br />
          <span className="text-[#008C75]">Loved by Teams.</span>
        </h2>
        <p className="text-base sm:text-lg text-slate-600 font-medium">
          Eliminate manual registers and separate software. Everything from biometric verification to one-click salary dispatch operates in sync.
        </p>
      </div>

      {/* 12-Column Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        
        {/* Card 1: AI Biometric Edge Facial Scanner (Col 7) */}
        <div className="md:col-span-7 bg-white/95 backdrop-blur-sm rounded-3xl sm:rounded-[2.5rem] border border-[#F1E8D9] shadow-[0_4px_24px_rgba(0,0,0,0.04)] p-8 flex flex-col justify-between hover:shadow-xl transition-all group">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 rounded-2xl bg-[#E6F7F5] flex items-center justify-center text-[#008C75]">
                <ScanFace className="w-6 h-6" />
              </div>
              <Badge variant="teal" dot>Edge AI · Sub-200ms</Badge>
            </div>
            <div>
              <h3 className="text-2xl font-black text-slate-900 mb-2">
                Sub-Second Facial Attendance
              </h3>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                Turn any tablet, smartphone, or laptop camera into an enterprise-grade biometric punch station. Instant recognition with zero hardware purchases.
              </p>
            </div>

            {/* Visual Mini Kiosk Simulation */}
            <div className="bg-[#FDFBF7] rounded-2xl p-5 border border-[#F1E8D9] relative overflow-hidden">
              <div className="flex items-center justify-between text-xs font-bold text-slate-700 mb-3">
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                  Front Entrance Station #1
                </span>
                <span className="text-emerald-700 bg-emerald-100/80 px-2.5 py-0.5 rounded-full">Active</span>
              </div>
              <div className="grid grid-cols-3 gap-3 text-center">
                <div className="bg-white p-3 rounded-xl border border-[#F1E8D9]">
                  <span className="text-xs text-slate-500 block">Matched In</span>
                  <span className="text-base font-black text-[#008C75]">184 ms</span>
                </div>
                <div className="bg-white p-3 rounded-xl border border-[#F1E8D9]">
                  <span className="text-xs text-slate-500 block">Confidence</span>
                  <span className="text-base font-black text-slate-900">99.9%</span>
                </div>
                <div className="bg-white p-3 rounded-xl border border-[#F1E8D9]">
                  <span className="text-xs text-slate-500 block">Liveness</span>
                  <span className="text-base font-black text-amber-600">Passed</span>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-6 mt-4 border-t border-slate-100 flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500">Supports offline biometric caching</span>
            <Button
              variant="primary"
              size="sm"
              onClick={() => navigate('/face-attendance')}
            >
              Launch Kiosk
              <ArrowRight className="w-3.5 h-3.5 ml-1" />
            </Button>
          </div>
        </div>

        {/* Card 2: One-Click Dynamic Payroll (Col 5) */}
        <div className="md:col-span-5 bg-white/95 backdrop-blur-sm rounded-3xl sm:rounded-[2.5rem] border border-[#F1E8D9] shadow-[0_4px_24px_rgba(0,0,0,0.04)] p-8 flex flex-col justify-between hover:shadow-xl transition-all">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 rounded-2xl bg-[#FEF3C7] flex items-center justify-center text-amber-600">
                <Wallet className="w-6 h-6" />
              </div>
              <Badge variant="yellow">Automated</Badge>
            </div>
            <div>
              <h3 className="text-2xl font-black text-slate-900 mb-2">
                Dynamic Payroll Engine
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Biometric timesheets automatically calculate allowances, overtime hours, unpaid leaves, and tax deductions in real-time.
              </p>
            </div>

            <div className="space-y-2 pt-2">
              <div className="flex items-center justify-between text-xs p-3 rounded-xl bg-[#FDFBF7] border border-[#F1E8D9]">
                <span className="font-semibold text-slate-700">Late Penalty Rules</span>
                <span className="text-emerald-700 font-bold">Auto-Deducted</span>
              </div>
              <div className="flex items-center justify-between text-xs p-3 rounded-xl bg-[#FDFBF7] border border-[#F1E8D9]">
                <span className="font-semibold text-slate-700">Payslip PDF Generation</span>
                <span className="text-[#008C75] font-bold">1-Click Batch</span>
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-slate-500">
            <span>Direct Bank Transfer Formats</span>
            <span className="text-[#008C75]">100% Error-Free</span>
          </div>
        </div>

        {/* Card 3: Employee Self-Service Portal (Col 4) */}
        <div className="md:col-span-4 bg-white/95 backdrop-blur-sm rounded-3xl sm:rounded-[2.5rem] border border-[#F1E8D9] shadow-[0_4px_24px_rgba(0,0,0,0.04)] p-8 flex flex-col justify-between hover:shadow-xl transition-all">
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-[#E6F7F5] flex items-center justify-center text-[#008C75]">
              <Users className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-black text-slate-900">
              Employee Portal
            </h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Transparent access to punch logs, digital salary slips, and multi-tier leave application workflows.
            </p>
          </div>
          <div className="pt-4 border-t border-slate-100">
            <Button
              variant="outline"
              size="sm"
              className="w-full"
              onClick={() => navigate('/employee/login')}
            >
              Employee Login
            </Button>
          </div>
        </div>

        {/* Card 4: Anti-Spoof Liveness Security (Col 4) */}
        <div className="md:col-span-4 bg-white/95 backdrop-blur-sm rounded-3xl sm:rounded-[2.5rem] border border-[#F1E8D9] shadow-[0_4px_24px_rgba(0,0,0,0.04)] p-8 flex flex-col justify-between hover:shadow-xl transition-all">
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-[#FEF3C7] flex items-center justify-center text-amber-600">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-black text-slate-900">
              Anti-Spoofing & Liveness
            </h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Detects and prevents photo printouts, screen playbacks, and 3D mask attempts with deep eye-blink telemetry.
            </p>
          </div>
          <div className="pt-4 border-t border-slate-100 flex items-center gap-2 text-xs font-bold text-[#008C75]">
            <CheckCircle2 className="w-4 h-4" />
            Zero False Acceptances
          </div>
        </div>

        {/* Card 5: Shift Management & SSE Alerts (Col 4) */}
        <div className="md:col-span-4 bg-white/95 backdrop-blur-sm rounded-3xl sm:rounded-[2.5rem] border border-[#F1E8D9] shadow-[0_4px_24px_rgba(0,0,0,0.04)] p-8 flex flex-col justify-between hover:shadow-xl transition-all">
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-[#E6F7F5] flex items-center justify-center text-[#008C75]">
              <Clock className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-black text-slate-900">
              Shifts & Real-Time Sync
            </h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Rotational rosters, night allowances, and instant Server-Sent Events (SSE) notification broadcasts.
            </p>
          </div>
          <div className="pt-4 border-t border-slate-100 flex items-center gap-2 text-xs font-bold text-slate-700">
            <Zap className="w-4 h-4 text-[#FFC933]" />
            Live Sync across all branches
          </div>
        </div>

      </div>
    </section>
  );
}
