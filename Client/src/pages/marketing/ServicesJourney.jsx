import React from 'react';
import { Star } from 'lucide-react';

export function ServicesJourney() {

  const pipelineSteps = [
    { title: "Biometric Enrollment", desc: "3-second browser face vector capture" },
    { title: "Shift & Policy Setup", desc: "Rotational rosters & grace periods" },
    { title: "Live Face Attendance", desc: "Sub-200ms edge kiosk check-ins" },
    { title: "Dynamic Payroll Run", desc: "1-click salary & payslip generation" }
  ];

  return (
    <section id="services" className="py-10 sm:py-14 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-visible">
      
      {/* 2-Column Desktop Grid with reduced height and compact spacing */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
        
        {/* Left Column Div: Vertical Pipeline Card with Compact Height & Dot Grid */}
        <div className="lg:col-span-5 flex justify-center w-full">
          <div className="w-full max-w-[420px] lg:max-w-[440px] bg-white rounded-3xl sm:rounded-[2.25rem] border border-slate-200/80 shadow-[0_8px_30px_rgba(0,0,0,0.05)] p-5 sm:p-6 relative overflow-hidden bg-[radial-gradient(#d1d5db_1.5px,transparent_1.5px)] [background-size:18px_18px]">
            
            <div className="flex flex-col items-center relative z-10">
              
              {/* Top Display Pill: BOOK DEMO */}
              <div className="bg-[#FF5A36] text-white text-[11px] font-black tracking-wider uppercase px-4 py-1.5 rounded-full flex items-center gap-1.5 shadow-xs select-none cursor-default">
                <span>BOOK DEMO</span>
                <div className="w-3.5 h-3.5 rounded-full bg-white/20 flex items-center justify-center">
                  <Star className="w-2 h-2 fill-white text-white" />
                </div>
              </div>

              {/* Vertical Connecting Pipeline with Compact Step Cards */}
              <div className="w-full my-1 sm:my-1.5 flex flex-col items-center">
                {pipelineSteps.map((step, idx) => (
                  <React.Fragment key={idx}>
                    {/* Connector Line with Circle Ring Node */}
                    <div className="flex flex-col items-center">
                      <div className="w-0.5 h-2 sm:h-2.5 bg-slate-300" />
                      <div className="w-2 h-2 rounded-full bg-white border-[1.5px] border-slate-800 my-0.5" />
                      <div className="w-0.5 h-2 sm:h-2.5 bg-slate-300" />
                    </div>

                    {/* Step Card with Crisp Solid Black Border & 2D Offset Drop Shadow */}
                    <div className="w-full max-w-[240px] sm:max-w-[270px] bg-white border-2 border-slate-950 rounded-xl sm:rounded-2xl py-2 sm:py-2.5 px-4 text-center font-black text-slate-950 text-xs sm:text-sm shadow-[3px_3px_0_0_#000] select-none cursor-default">
                      {step.title}
                    </div>
                  </React.Fragment>
                ))}

                {/* Final Connector Node */}
                <div className="flex flex-col items-center">
                  <div className="w-0.5 h-2 sm:h-2.5 bg-slate-300" />
                  <div className="w-2 h-2 rounded-full bg-white border-[1.5px] border-slate-800 my-0.5" />
                  <div className="w-0.5 h-2 sm:h-2.5 bg-slate-300" />
                </div>
              </div>

              {/* Bottom Display Pill: 100% AUTOMATED */}
              <div className="bg-[#008C75] text-white text-[11px] font-black tracking-wider uppercase px-4 py-1.5 rounded-full flex items-center gap-1.5 shadow-xs select-none cursor-default">
                <span>100% AUTOMATED</span>
                <div className="w-3.5 h-3.5 rounded-full bg-white/20 flex items-center justify-center">
                  <Star className="w-2 h-2 fill-white text-white" />
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Right Column Div: Title, Description & Compact Pop-Out Expert Quote Card */}
        <div className="lg:col-span-7 flex flex-col justify-between space-y-5 sm:space-y-6 text-left w-full">
          
          {/* Header Area */}
          <div className="space-y-2.5">
            <span className="text-xs font-black uppercase tracking-widest text-slate-500 block">
              THE HRDUO WORKFORCE JOURNEY
            </span>

            <h2 className="text-2xl sm:text-4xl lg:text-[42px] font-black tracking-tight text-slate-950 leading-[1.12]">
              From Manual Chaos to <br className="hidden sm:inline" />
              <span className="text-[#008C75]">HRDuo Automation</span>
            </h2>

            <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed max-w-xl">
              Experience the future of workforce management with HRDuo. Rapid biometric facial enrollment, real-time edge kiosk verification, and automated error-free payroll dispatch — unified in one platform.
            </p>
          </div>

          {/* Featured Quote Card with reduced height and pop-out expert image */}
          <div className="relative pt-8 sm:pt-10">
            
            {/* White Speech Bubble floating over top-left corner */}
            <div className="absolute top-4 sm:top-5 left-5 sm:left-7 z-30">
              <div className="relative bg-white border-2 border-black rounded-xl sm:rounded-2xl px-2.5 py-1 shadow-[2px_2px_0_0_#000] flex items-center justify-center">
                <div className="flex gap-1 items-center px-0.5">
                  <svg width="15" height="13" viewBox="0 0 24 24" fill="#000">
                    <path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179z"/>
                  </svg>
                </div>
                {/* Downward pointer tail */}
                <div className="absolute -bottom-1 left-2.5 w-2.5 h-2.5 bg-white border-r-2 border-b-2 border-black transform rotate-45" />
              </div>
            </div>

            {/* Warm Beige Container with compact height */}
            <div className="relative bg-[#F6D7BC] border border-[#ECD0B4] rounded-2xl sm:rounded-[1.75rem] shadow-xs px-5 sm:px-8 pt-7 sm:pt-8 pb-4 sm:pb-5 min-h-[170px] sm:min-h-[190px] flex items-center justify-between">
              
              {/* Left Side: Quote Text & Signature */}
              <div className="w-full sm:w-[60%] space-y-3 z-20 pr-2">
                <blockquote className="text-base sm:text-xl font-black text-slate-950 italic leading-[1.28] tracking-tight">
                  Accuracy comes after <br />
                  automating, not before. <br />
                  Power your team with HRDuo.
                </blockquote>

                {/* Hand-drawn Signature & Printed Name */}
                <div className="pt-0.5 flex flex-col items-start">
                  <svg className="w-32 sm:w-40 h-10 sm:h-12 text-slate-900 -mb-1" viewBox="0 0 160 55" fill="none">
                    {/* B stroke: main downstem and double loop */}
                    <path 
                      d="M 16 10 C 18 22, 19 36, 20 45" 
                      stroke="#0F172A" 
                      strokeWidth="2.6" 
                      strokeLinecap="round" 
                    />
                    <path 
                      d="M 14 14 C 20 6, 38 6, 40 18 C 41 26, 32 28, 22 28 C 34 28, 44 29, 43 38 C 42 45, 28 46, 18 43" 
                      stroke="#0F172A" 
                      strokeWidth="2.4" 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                    />
                    {/* Connecting sweep and S: loop upwards, into S body, and dynamic release */}
                    <path 
                      d="M 38 38 C 46 36, 52 24, 60 14 C 65 7, 73 9, 71 18 C 68 28, 52 32, 56 40 C 60 47, 76 46, 88 40 C 96 36, 104 31, 114 34" 
                      stroke="#0F172A" 
                      strokeWidth="2.4" 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                    />
                    {/* Signature underline flourish */}
                    <path 
                      d="M 22 48 C 50 50, 95 48, 142 42" 
                      stroke="#0F172A" 
                      strokeWidth="2.0" 
                      strokeLinecap="round" 
                    />
                  </svg>
                  <div className="pl-5 sm:pl-7 flex flex-col -mt-0.5">
                    <span className="text-xs sm:text-sm font-black text-slate-950 tracking-tight">
                      Biswaranjan
                    </span>
                    <span className="text-[10px] sm:text-[11px] font-bold text-slate-600 tracking-wide">
                      Product Architecture
                    </span>
                  </div>
                </div>
              </div>

              {/* Right Side: Pop-out Person Cutout */}
              <div className="absolute right-1 sm:right-3 bottom-0 w-[38%] sm:w-[42%] max-w-[190px] sm:max-w-[240px] flex items-end justify-end pointer-events-none z-10">
                <img
                  src="/service_expert_cutout.png"
                  alt="Biswaranjan"
                  className="w-full h-auto object-contain object-bottom -mb-px filter drop-shadow-[0_10px_20px_rgba(0,0,0,0.15)] -mt-10 sm:-mt-14"
                />
              </div>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}
