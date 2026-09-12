import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ScanFace, ArrowRight, CheckCircle2, Sparkles } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';

export function CtaBento() {
  const navigate = useNavigate();

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="relative rounded-3xl sm:rounded-[3rem] overflow-hidden bg-gradient-to-br from-[#008C75] via-[#0A6E5D] to-[#0D2538] p-8 sm:p-14 lg:p-16 text-center lg:text-left text-white shadow-2xl">
        {/* Organic yellow and cyan ambient blur rings */}
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-[#FFC933]/20 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-[#2DD4BF]/20 blur-3xl pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8 space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/15 backdrop-blur-md text-white text-xs font-bold border border-white/20">
              <Sparkles className="w-3.5 h-3.5 text-[#FFC933]" />
              Modern Workforce Solutions
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
              Ready to Put <br />
              <span className="text-[#FFC933]">Your People First</span>?
            </h2>

            <p className="text-base sm:text-lg text-teal-100 max-w-xl font-medium leading-relaxed">
              Eliminate buddy punching, automate monthly payroll runs, and empower your team with simple, powerful HR tools.
            </p>

            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 sm:gap-6 pt-2 text-sm text-teal-100 font-semibold">
              <span className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#FFC933]" />
                Zero hardware cost
              </span>
              <span className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#FFC933]" />
                14-day free trial
              </span>
              <span className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#FFC933]" />
                No credit card needed
              </span>
            </div>
          </div>

          <div className="lg:col-span-4 flex flex-col gap-4 justify-center">
            <button
              onClick={() => navigate('/face-attendance')}
              className="w-full bg-[#FFC933] hover:bg-[#F59E0B] text-slate-950 py-4 px-8 rounded-full font-extrabold text-base flex items-center justify-center gap-2 border border-slate-900 shadow-[0_4px_0_0_#0F172A] hover:translate-y-0.5 transition-all"
            >
              <ScanFace className="w-5 h-5" />
              <span>Launch Live Kiosk</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </button>

            <button
              onClick={() => navigate('/login')}
              className="w-full py-3.5 px-8 rounded-full font-bold text-base bg-white/10 hover:bg-white/20 text-white border border-white/20 transition-all text-center"
            >
              Sign In to Portal
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
