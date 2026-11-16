import React from 'react';
import { CheckCircle2, Sparkles, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function ServicesJourney() {
  const navigate = useNavigate();

  const pipelineSteps = [
    { title: "Biometric Enrollment", desc: "3-second browser face vector capture" },
    { title: "Shift & Policy Setup", desc: "Rotational rosters & grace periods" },
    { title: "Live Face & GPS Punch", desc: "Sub-second verification kiosks" },
    { title: "Attendance-Linked Payroll", desc: "1-click salary & payslip generation" }
  ];

  return (
    <section id="services" className="py-10 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-visible">
      
      {/* 2-Column Desktop Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
        
        {/* Left Column: Vertical Pipeline Card */}
        <div className="lg:col-span-5 flex justify-center w-full">
          <div className="w-full max-w-[420px] lg:max-w-[440px] bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-7 relative overflow-hidden">
            
            <div className="flex flex-col items-center relative z-10">
              
              {/* Top Display Pill */}
              <div className="bg-[#EBF3FA] text-[#002D62] text-xs font-semibold px-4 py-1.5 rounded-full flex items-center gap-1.5 shadow-2xs select-none border border-[#D9E2EC]">
                <span className="w-2 h-2 rounded-full bg-[#00A8A8] animate-pulse" />
                <span>INTEGRATED WORKFLOW</span>
              </div>

              {/* Vertical Connecting Pipeline */}
              <div className="w-full my-2 flex flex-col items-center">
                {pipelineSteps.map((step, idx) => (
                  <React.Fragment key={idx}>
                    {/* Connector Line */}
                    <div className="flex flex-col items-center">
                      <div className="w-0.5 h-3 bg-slate-200" />
                      <div className="w-2 h-2 rounded-full bg-[#002D62] my-0.5" />
                      <div className="w-0.5 h-3 bg-slate-200" />
                    </div>

                    {/* Step Card */}
                    <div className="w-full max-w-[280px] bg-[#F8FAFC] border border-slate-200/80 rounded-xl py-2.5 px-4 text-center font-bold text-[#002D62] text-xs sm:text-sm shadow-2xs">
                      <div>{step.title}</div>
                      <div className="text-[11px] text-[#627D98] font-normal mt-0.5">{step.desc}</div>
                    </div>
                  </React.Fragment>
                ))}

                {/* Final Connector Node */}
                <div className="flex flex-col items-center">
                  <div className="w-0.5 h-3 bg-slate-200" />
                  <div className="w-2 h-2 rounded-full bg-[#00A8A8] my-0.5" />
                  <div className="w-0.5 h-3 bg-slate-200" />
                </div>
              </div>

              {/* Bottom Display Pill */}
              <div className="bg-[#E6F8F8] text-[#008585] text-xs font-semibold px-4 py-1.5 rounded-full flex items-center gap-1.5 shadow-2xs select-none border border-[#D0EFEF]">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#00A8A8]" />
                <span>100% AUTOMATED ENGINE</span>
              </div>

            </div>
          </div>
        </div>

        {/* Right Column: Title, Description & Modern Quote Card */}
        <div className="lg:col-span-7 flex flex-col justify-between space-y-6 text-left w-full">
          
          {/* Header Area */}
          <div className="space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#00A8A8]">
              The Modern Workforce Journey
            </span>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#002D62] leading-tight">
              From Manual Paperwork to <br />
              <span className="text-[#00A8A8]">Seamless Automation</span>
            </h2>

            <p className="text-sm sm:text-base text-[#334E68] font-normal leading-relaxed max-w-xl">
              Experience the future of workforce management. Rapid biometric facial enrollment, real-time edge kiosk verification, GPS geofencing, and automated error-free payroll dispatch — unified in one platform.
            </p>
          </div>

          {/* Featured Quote Card */}
          <div className="relative pt-6">
            <div className="relative bg-[#F8FAFC] border border-slate-200/90 rounded-2xl shadow-xs px-6 sm:px-8 py-6 min-h-[160px] flex items-center justify-between">
              
              {/* Left Side: Quote Text */}
              <div className="w-full sm:w-[65%] space-y-3 z-20">
                <blockquote className="text-base sm:text-lg font-semibold text-[#002D62] italic leading-snug">
                  "Accuracy comes after automating, not before. Power your team with smart attendance and automated payroll."
                </blockquote>

                <div className="flex flex-col">
                  <span className="text-xs sm:text-sm font-bold text-[#002D62]">
                    Biswaranjan
                  </span>
                  <span className="text-[11px] text-[#627D98] font-normal">
                    Product Architecture & Engineering
                  </span>
                </div>
              </div>

              {/* Right Side: Pop-out Person Cutout */}
              <div className="absolute right-2 sm:right-4 bottom-0 w-[35%] max-w-[170px] flex items-end justify-end pointer-events-none z-10">
                <img
                  src="/service_expert_cutout.png"
                  alt="Biswaranjan"
                  className="w-full h-auto object-contain object-bottom -mb-px filter drop-shadow-md"
                />
              </div>

            </div>
          </div>

        </div>

      </div>

    </section>
  );
}
