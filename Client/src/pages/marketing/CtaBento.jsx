import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ScanFace, ArrowRight, CheckCircle2, Sparkles } from 'lucide-react';

export function CtaBento() {
  const navigate = useNavigate();

  return (
    <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-[#001E42] via-[#002D62] to-[#003B73] p-8 sm:p-14 lg:p-16 text-center lg:text-left text-white shadow-xl border border-slate-700/60">
        
        {/* Subtle ambient lighting */}
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-[#00A8A8]/20 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-[#002D62]/40 blur-3xl pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8 space-y-5">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 text-white text-xs font-semibold border border-white/15">
              <Sparkles className="w-3.5 h-3.5 text-[#00C9CE]" />
              Smart HR. Stronger Together.
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight">
              Ready to Upgrade Your <br />
              <span className="bg-gradient-to-r from-white via-cyan-100 to-[#00C9CE] bg-clip-text text-transparent">
                Workforce Operations?
              </span>
            </h2>

            <p className="text-base sm:text-lg text-slate-200 max-w-xl font-normal leading-relaxed">
              Eliminate buddy punching, automate monthly payroll runs, and empower your team with simple, powerful HR tools.
            </p>

            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 sm:gap-6 pt-2 text-xs sm:text-sm text-slate-200 font-medium">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#00C9CE]" />
                Zero hardware cost
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#00C9CE]" />
                14-day free trial
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#00C9CE]" />
                No credit card required
              </span>
            </div>
          </div>

          <div className="lg:col-span-4 flex flex-col gap-3.5 justify-center">
            <button
              onClick={() => navigate('/contact')}
              className="w-full bg-[#00A8A8] hover:bg-[#008F8F] text-white py-3.5 px-6 rounded-xl font-semibold text-sm sm:text-base flex items-center justify-center gap-2 shadow-lg shadow-teal-900/30 transition-all cursor-pointer"
            >
              <span>Schedule a Demo</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => navigate('/face-attendance')}
              className="w-full py-3.5 px-6 rounded-xl font-semibold text-sm sm:text-base bg-white/10 hover:bg-white/15 text-white border border-white/20 transition-all text-center flex items-center justify-center gap-2 cursor-pointer"
            >
              <ScanFace className="w-4 h-4 text-[#00C9CE]" />
              <span>Launch Demo Kiosk</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
