import React from 'react';
import { Sparkles } from 'lucide-react';

export function HowItWorksBento() {
  const steps = [
    {
      num: "01",
      title: "Quick 5-Minute Setup",
      desc: "Configure departments, working shifts, grace periods, geofence radius, and custom salary structures effortlessly."
    },
    {
      num: "02",
      title: "Enroll Biometrics or GPS",
      desc: "Employees enroll via a 3-second face scan from any browser. Mathematical landmarks are encrypted into secure 128-D vectors."
    },
    {
      num: "03",
      title: "Live Attendance & Payroll",
      desc: "Employees clock in via tablets or mobile GPS. Timesheets sync live to compute leaves, overtime, and monthly payslips automatically."
    }
  ];

  return (
    <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
        <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#EBF3FA] text-[#002D62] text-xs font-semibold border border-[#D9E2EC]">
          <Sparkles className="w-3.5 h-3.5 text-[#00A8A8]" />
          Simple Onboarding
        </span>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#002D62]">
          Get Started in 3 Simple Steps
        </h2>
        <p className="text-base sm:text-lg text-[#334E68] font-normal">
          Zero complex hardware installations or expensive consulting required.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {steps.map((step) => (
          <div
            key={step.num}
            className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-7 sm:p-8 relative hover:-translate-y-1 transition-all duration-300"
          >
            <div className="w-11 h-11 rounded-xl bg-[#EBF3FA] text-[#002D62] font-extrabold text-base flex items-center justify-center mb-5 border border-[#D9E2EC]">
              {step.num}
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-[#002D62] mb-2">
              {step.title}
            </h3>
            <p className="text-[#334E68] text-xs sm:text-sm leading-relaxed font-normal">
              {step.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
