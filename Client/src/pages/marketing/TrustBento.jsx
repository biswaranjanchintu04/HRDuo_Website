import React from 'react';
import { ShieldCheck, Lock, Clock, Award, CheckCircle2 } from 'lucide-react';

export function TrustBento() {
  const metrics = [
    { label: "Biometric Matching Time", value: "< 200ms", desc: "Edge browser execution" },
    { label: "Verification Accuracy", value: "99.98%", desc: "Zero buddy-punching" },
    { label: "Payroll Accuracy", value: "100%", desc: "Automated calculations" },
    { label: "Enterprise Uptime", value: "99.95%", desc: "High availability SLA" },
  ];

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="bg-white/95 rounded-3xl sm:rounded-[2.5rem] border border-[#F1E8D9] shadow-[0_4px_24px_rgba(0,0,0,0.04)] p-8 sm:p-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center divide-y lg:divide-y-0 lg:divide-x divide-slate-100">
          {metrics.map((item, idx) => (
            <div key={idx} className={`space-y-1.5 ${idx > 0 ? 'pt-6 lg:pt-0' : ''}`}>
              <span className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                {item.value}
              </span>
              <p className="text-sm font-bold text-[#008C75]">{item.label}</p>
              <p className="text-xs text-slate-500">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* Client Logos / Trust Badges Strip */}
        <div className="mt-8 pt-6 border-t border-slate-100 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs font-bold text-slate-500 uppercase tracking-wider">
          <span className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#008C75]" />
            SOC 2 Type II
          </span>
          <span className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#008C75]" />
            ISO 27001 Certified
          </span>
          <span className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#008C75]" />
            GDPR & DPDP Compliant
          </span>
          <span className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#008C75]" />
            Zero Raw Photo Storage
          </span>
        </div>
      </div>
    </section>
  );
}
