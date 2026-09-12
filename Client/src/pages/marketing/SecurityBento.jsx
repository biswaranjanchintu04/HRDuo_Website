import React from 'react';
import { ShieldCheck, Lock, Database, EyeOff, CheckCircle2 } from 'lucide-react';
import { Badge } from '../../components/ui/Badge';

export function SecurityBento() {
  const securityFeatures = [
    {
      icon: EyeOff,
      title: "Zero Raw Image Retention",
      desc: "HRDuo never saves camera photos or video footage. Images are discarded immediately after vector conversion.",
      color: "bg-[#E6F7F5] text-[#008C75]"
    },
    {
      icon: Lock,
      title: "AES-256 Vector Encryption",
      desc: "Facial landmarks are stored exclusively as 128-dimensional irreversible mathematical floats with military-grade encryption.",
      color: "bg-[#FEF3C7] text-amber-700"
    },
    {
      icon: Database,
      title: "Multi-Tenant Data Isolation",
      desc: "Strict organizational tenancy barriers ensure your company vectors and financial payroll data remain entirely isolated.",
      color: "bg-[#E6F7F5] text-[#008C75]"
    },
    {
      icon: ShieldCheck,
      title: "Regulatory Compliance",
      desc: "Fully aligned with GDPR, DPDP biometric protections, and global employee privacy mandates.",
      color: "bg-[#FEF3C7] text-amber-700"
    }
  ];

  return (
    <section id="security" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="bg-white/95 backdrop-blur-sm rounded-3xl sm:rounded-[2.5rem] border border-[#F1E8D9] shadow-[0_4px_24px_rgba(0,0,0,0.04)] p-8 sm:p-12">
        <div className="max-w-3xl mb-12 space-y-3">
          <Badge variant="teal">
            <Lock className="w-3.5 h-3.5 mr-1" />
            Privacy by Architecture
          </Badge>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-slate-900">
            Enterprise Security. <br />
            <span className="text-[#008C75]">Absolute Biometric Privacy.</span>
          </h2>
          <p className="text-base sm:text-lg text-slate-600 font-medium">
            We believe employee biometric data deserves uncompromising protection. Our mathematical representation makes identity reconstruction impossible.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {securityFeatures.map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <div key={idx} className="p-6 rounded-2xl bg-[#FDFBF7] border border-[#F1E8D9] space-y-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${feat.color}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-slate-900 text-base">{feat.title}</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{feat.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
