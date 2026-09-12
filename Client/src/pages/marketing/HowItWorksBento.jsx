import React from 'react';
import { Badge } from '../../components/ui/Badge';
import { CheckCircle2, ArrowRight } from 'lucide-react';

export function HowItWorksBento() {
  const steps = [
    {
      num: "01",
      title: "Set Up Your Organization",
      desc: "Configure departments, working shifts, grace periods, and custom salary structures in under 5 minutes."
    },
    {
      num: "02",
      title: "Enroll Biometric Vectors",
      desc: "Employees capture a 3-second face scan from any web browser. Landmarks are encrypted into secure 128D mathematical vectors."
    },
    {
      num: "03",
      title: "Automate Attendance & Payroll",
      desc: "Employees punch in at kiosk stations. Timesheets sync live to compute leaves, overtime, and monthly payslips automatically."
    }
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
        <Badge variant="yellow">Simple Onboarding</Badge>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-slate-900">
          Get Started in 3 Simple Steps
        </h2>
        <p className="text-base sm:text-lg text-slate-600 font-medium">
          Zero complex hardware installations or expensive consulting required.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {steps.map((step, idx) => (
          <div
            key={step.num}
            className="bg-white/95 backdrop-blur-sm rounded-3xl sm:rounded-[2rem] border border-[#F1E8D9] shadow-[0_4px_24px_rgba(0,0,0,0.04)] p-8 relative hover:-translate-y-1 transition-all duration-300"
          >
            <div className="w-12 h-12 rounded-2xl bg-[#FEF3C7] text-amber-700 font-black text-lg flex items-center justify-center mb-6">
              {step.num}
            </div>
            <h3 className="text-xl font-black text-slate-900 mb-2">
              {step.title}
            </h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              {step.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
