import React from 'react';
import { CheckCircle2, ShieldCheck, Zap, Lock, Award } from 'lucide-react';

export function TrustBento() {
  const metrics = [
    { label: "Biometric AI Speed", value: "< 1 Sec", desc: "Anti-spoof face recognition" },
    { label: "Verification Accuracy", value: "99.4%", desc: "Zero buddy-punching & spoofing" },
    { label: "Hardware Cost", value: "₹0", desc: "No proprietary hardware lock-in" },
    { label: "Enterprise Uptime", value: "99.95%", desc: "Cloud & offline-first sync SLA" },
  ];

  return (
    <section className="py-8 sm:py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-8 sm:p-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center divide-y lg:divide-y-0 lg:divide-x divide-slate-100">
          {metrics.map((item, idx) => (
            <div key={idx} className={`space-y-1.5 ${idx > 0 ? 'pt-6 lg:pt-0' : ''}`}>
              <span className="text-3xl sm:text-4xl font-extrabold text-[#002D62] tracking-tight">
                {item.value}
              </span>
              <p className="text-sm font-semibold text-[#00A8A8]">{item.label}</p>
              <p className="text-xs text-[#627D98]">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* Client Logos / Trust Badges Strip */}
        <div className="mt-8 pt-6 border-t border-slate-100 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs font-semibold text-[#486581] tracking-normal">
          <span className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#00A8A8]" />
            SOC 2 Type II Certified
          </span>
          <span className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#00A8A8]" />
            ISO 27001 Data Security
          </span>
          <span className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#00A8A8]" />
            GDPR & DPDP Act Compliant
          </span>
          <span className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#00A8A8]" />
            Zero Raw Photo Storage
          </span>
        </div>
      </div>
    </section>
  );
}
