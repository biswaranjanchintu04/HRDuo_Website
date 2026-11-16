import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ShieldCheck, 
  Lock, 
  Database, 
  EyeOff, 
  FileCheck, 
  KeyRound, 
  Sparkles, 
  ArrowRight,
  FileText
} from 'lucide-react';

export default function SecurityPage() {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Security & Privacy — Biometric Architecture & Data Protection";
  }, []);

  const securityPillars = [
    {
      icon: EyeOff,
      title: "Zero Raw Image Retention",
      desc: "Camera photos or video footage are never stored on disk or in the database. Video frames exist in temporary volatile RAM for milliseconds to extract mathematical embeddings and are immediately destroyed.",
      badge: "Zero Photos"
    },
    {
      icon: KeyRound,
      title: "128-D Irreversible Math Vectors",
      desc: "Facial landmarks are stored exclusively as 128-dimensional floating-point coordinate vectors. It is mathematically impossible to reconstruct a human face or facial image from these vector embeddings.",
      badge: "Irreversible Math"
    },
    {
      icon: Lock,
      title: "AES-256 & TLS 1.3 Encryption",
      desc: "All vector embeddings and employee data are encrypted at rest using AES-256 standards. In-flight transmission utilizes TLS 1.3 with Perfect Forward Secrecy.",
      badge: "Enterprise Grade"
    },
    {
      icon: Database,
      title: "Multi-Tenant Schema Isolation",
      desc: "Each enterprise operates within cryptographically isolated database partitions. Your company vectors and payroll details are completely segregated.",
      badge: "Full Isolation"
    },
    {
      icon: ShieldCheck,
      title: "Anti-Spoofing & Liveness Detection",
      desc: "Our neural network detects micro-motion, depth clues, and reflective screen textures to reject printed paper photos, mobile screen replays, and video masks with 99.4% precision.",
      badge: "Anti-Spoofing"
    },
    {
      icon: FileCheck,
      title: "Cryptographic Audit Trails",
      desc: "Every administrative action, shift modification, and biometric enrollment is logged with immutable timestamps, IP addresses, and user signatures for regulatory audits.",
      badge: "Audit Ready"
    }
  ];

  return (
    <div className="py-8 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-16 sm:space-y-24">
      
      {/* 1. Hero Section */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#EAF4FF] text-[#2365E9] text-xs font-semibold">
          <Lock className="w-3.5 h-3.5" />
          Enterprise Trust & Privacy Center
        </span>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#090D16] leading-tight">
          Enterprise Security. <br />
          <span className="text-[#2365E9]">Absolute Biometric Privacy.</span>
        </h1>
        <p className="text-base sm:text-lg text-slate-600 font-normal leading-relaxed">
          Employee biometric data requires uncompromising protection. 
          Our architecture guarantees that your workforce's identity is protected by mathematical vector encryption.
        </p>

        <div className="pt-4 flex flex-wrap items-center justify-center gap-3.5">
          <button 
            onClick={() => navigate('/contact')}
            className="bg-[#2365E9] hover:bg-[#1D4ED8] text-white px-6 py-3 rounded-xl font-semibold text-sm flex items-center gap-2 shadow-md shadow-blue-500/20 cursor-pointer"
          >
            <span>Request Security Whitepaper</span>
            <FileText className="w-4 h-4" />
          </button>
          <button 
            onClick={() => navigate('/solutions')}
            className="bg-white hover:bg-slate-50 text-slate-800 border border-slate-200 px-6 py-3 rounded-xl font-semibold text-sm cursor-pointer shadow-xs"
          >
            Explore Platform
          </button>
        </div>
      </div>

      {/* 2. Visual Biometric Pipeline */}
      <div className="bg-white rounded-3xl border border-slate-200/90 p-8 sm:p-12 shadow-sm">
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-[#2365E9]">Privacy By Design</span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#090D16]">
            How We Protect Biometric Data
          </h2>
          <p className="text-slate-600 text-sm">
            From the moment an employee steps in front of the kiosk to punch logging.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-[#F8FAFC] rounded-2xl p-6 border border-slate-200/80 space-y-3">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Stage 1</span>
            <h3 className="text-lg font-bold text-[#090D16]">Kiosk Edge Extraction</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
              The camera stream is analyzed locally in browser memory. 68 landmark points are translated into a 128-D vector float array.
            </p>
            <div className="pt-2 text-xs font-semibold text-rose-600 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
              <span>Raw Video Immediately Purged from RAM</span>
            </div>
          </div>

          <div className="bg-[#F8FAFC] rounded-2xl p-6 border border-slate-200/80 space-y-3">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Stage 2</span>
            <h3 className="text-lg font-bold text-[#090D16]">Encrypted Transmission</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
              Only the mathematical vector hash (not the face) is securely transmitted via TLS 1.3 cryptographic handshake to your tenant server.
            </p>
            <div className="pt-2 text-xs font-semibold text-[#12B76A] flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#12B76A]" />
              <span>TLS 1.3 Forward Secrecy</span>
            </div>
          </div>

          <div className="bg-[#F8FAFC] rounded-2xl p-6 border border-slate-200/80 space-y-3">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Stage 3</span>
            <h3 className="text-lg font-bold text-[#090D16]">Euclidean Vector Match</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
              The vector is compared using sub-second Euclidean distance algorithms against pre-enrolled floats. The punch timestamp is logged.
            </p>
            <div className="pt-2 text-xs font-semibold text-[#2365E9] flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#2365E9]" />
              <span>AES-256 Encrypted at Rest</span>
            </div>
          </div>
        </div>
      </div>

      {/* 3. The 6 Pillars Grid */}
      <div className="space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-[#2365E9]">Security Guarantees</span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#090D16]">
            Engineered for Strict Enterprise Standards
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {securityPillars.map((p, idx) => {
            const Icon = p.icon;
            return (
              <div 
                key={idx}
                className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200/90 shadow-2xs hover:shadow-xs transition-all space-y-3"
              >
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#2365E9] flex items-center justify-center">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700">
                    {p.badge}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-[#090D16]">{p.title}</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                  {p.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* 4. Global Compliance Strip */}
      <div className="bg-[#090D16] text-white rounded-3xl p-8 sm:p-12">
        <div className="max-w-3xl space-y-3">
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white/10 text-white text-xs font-semibold">
            Global Compliance
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold">
            Aligned with World Biometric & Data Privacy Laws
          </h2>
          <p className="text-slate-300 text-sm leading-relaxed">
            Whether your teams operate in the European Union (GDPR), India (DPDP Act 2023), United States, 
            or Southeast Asia, our platform meets and exceeds statutory employee consent and biometric storage mandates.
          </p>
          <div className="pt-3 flex flex-wrap gap-2.5">
            <span className="px-3.5 py-1.5 rounded-xl bg-white/10 border border-white/15 text-xs font-medium">
              SOC 2 Type II
            </span>
            <span className="px-3.5 py-1.5 rounded-xl bg-white/10 border border-white/15 text-xs font-medium">
              GDPR Article 9 Ready
            </span>
            <span className="px-3.5 py-1.5 rounded-xl bg-white/10 border border-white/15 text-xs font-medium">
              DPDP Act 2023 Compliant
            </span>
            <span className="px-3.5 py-1.5 rounded-xl bg-white/10 border border-white/15 text-xs font-medium">
              ISO/IEC 27001 Certified
            </span>
          </div>
        </div>
      </div>

      {/* 5. Bottom CTA */}
      <div className="bg-[#EAF4FF] rounded-3xl border border-[#D0E2FF] p-8 sm:p-12 text-center">
        <div className="max-w-2xl mx-auto space-y-3">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#090D16]">
            Have Questions for Our Security Officers?
          </h2>
          <p className="text-slate-600 text-sm">
            We are glad to sign custom DPAs (Data Processing Agreements) and participate in enterprise vendor security reviews.
          </p>
          <div className="pt-3 flex justify-center">
            <button
              onClick={() => navigate('/contact')}
              className="bg-[#2365E9] hover:bg-[#1D4ED8] text-white px-6 py-3 rounded-xl font-semibold text-sm cursor-pointer shadow-sm"
            >
              Contact Security Team
            </button>
          </div>
        </div>
      </div>

    </div>
  );
}
