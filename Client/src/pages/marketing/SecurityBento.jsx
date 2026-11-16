import React from 'react';
import { ShieldCheck, Lock, Database, EyeOff, Sparkles } from 'lucide-react';

export function SecurityBento() {
  const securityFeatures = [
    {
      icon: EyeOff,
      title: "Zero Raw Image Retention",
      desc: "Camera photos or video footage are never stored. Video frames are discarded in volatile RAM immediately after vector extraction.",
      color: "bg-[#EBF3FA] text-[#002D62]"
    },
    {
      icon: Lock,
      title: "AES-256 Vector Encryption",
      desc: "Facial landmarks are stored exclusively as 128-dimensional irreversible mathematical floats with enterprise encryption at rest.",
      color: "bg-[#E6F8F8] text-[#00A8A8]"
    },
    {
      icon: Database,
      title: "Multi-Tenant Data Isolation",
      desc: "Strict organizational tenancy barriers ensure your company vectors and financial payroll data remain entirely segregated.",
      color: "bg-[#EBF3FA] text-[#002D62]"
    },
    {
      icon: ShieldCheck,
      title: "Regulatory Compliance",
      desc: "Fully aligned with GDPR, DPDP biometric protections, ISO 27001 data standards, and SOC 2 Type II controls.",
      color: "bg-[#E6F8F8] text-[#00A8A8]"
    }
  ];

  return (
    <section id="security" className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-8 sm:p-12">
        <div className="max-w-3xl mb-12 space-y-3">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#EBF3FA] text-[#002D62] text-xs font-semibold border border-[#D9E2EC]">
            <Lock className="w-3.5 h-3.5 text-[#00A8A8]" />
            Privacy by Architecture
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#002D62]">
            Enterprise Security. <br />
            <span className="text-[#00A8A8]">Absolute Biometric Privacy.</span>
          </h2>
          <p className="text-base sm:text-lg text-[#334E68] font-normal">
            We believe employee biometric data deserves uncompromising protection. Our irreversible mathematical representation makes identity reconstruction impossible.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {securityFeatures.map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <div key={idx} className="p-6 rounded-2xl bg-[#F8FAFC] border border-slate-200/80 space-y-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${feat.color}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-[#002D62] text-base">{feat.title}</h3>
                <p className="text-xs sm:text-sm text-[#486581] leading-relaxed font-normal">{feat.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
