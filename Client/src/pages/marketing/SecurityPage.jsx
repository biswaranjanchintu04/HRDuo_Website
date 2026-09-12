import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ShieldCheck, 
  Lock, 
  Database, 
  EyeOff, 
  FileCheck, 
  KeyRound, 
  Server, 
  Sparkles, 
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  FileText
} from 'lucide-react';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';

export default function SecurityPage() {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Security & Privacy — HRDuo Biometric Architecture";
  }, []);

  const securityPillars = [
    {
      icon: EyeOff,
      title: "Zero Raw Image Retention",
      desc: "HRDuo never saves camera photos or video footage to disk or database. Captured video frames exist in temporary volatile RAM for milliseconds only to extract mathematical embeddings, and are immediately destroyed.",
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
      desc: "All vector embeddings and employee data are encrypted at rest using AES-256 standards with automated key rotation. In-flight transmission utilizes TLS 1.3 with Perfect Forward Secrecy.",
      badge: "Bank-Grade"
    },
    {
      icon: Database,
      title: "Multi-Tenant Schema Isolation",
      desc: "Each enterprise customer operates within cryptographically isolated database partitions. Your company vectors and payroll details are completely inaccessible to other tenants.",
      badge: "Complete Isolation"
    },
    {
      icon: ShieldCheck,
      title: "Active 3D Liveness & Anti-Spoofing",
      desc: "Our neural network detects micro-motion, depth clues, and reflective screen textures to reject printed paper photos, mobile screen replays, and silicone masks with 99.8% precision.",
      badge: "Anti-Spoofing"
    },
    {
      icon: FileCheck,
      title: "Comprehensive Audit Logging",
      desc: "Every administrative action, shift modification, and biometric enrollment is logged with immutable cryptographic timestamps, IP addresses, and user signatures for regulatory audits.",
      badge: "Audit Ready"
    }
  ];

  return (
    <div className="py-8 sm:py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-16 sm:space-y-24">
      
      {/* 1. Hero Section */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <Badge variant="teal">
          <Lock className="w-3.5 h-3.5 mr-1" />
          Enterprise Trust & Privacy Center
        </Badge>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 leading-tight">
          Enterprise Security. <br />
          <span className="text-[#008C75]">Absolute Biometric Privacy.</span>
        </h1>
        <p className="text-base sm:text-lg text-slate-600 font-medium leading-relaxed">
          Employee biometric data requires uncompromising protection. 
          HRDuo was architected from the ground up to guarantee that your workforce's identity is protected by mathematical encryption.
        </p>

        <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
          <Button 
            variant="primary" 
            size="lg" 
            onClick={() => navigate('/contact')}
            className="flex items-center gap-2"
          >
            <span>Request Security Whitepaper</span>
            <FileText className="w-4 h-4" />
          </Button>
          <Button 
            variant="outline" 
            size="lg"
            onClick={() => navigate('/solutions')}
          >
            Explore Platform
          </Button>
        </div>
      </div>

      {/* 2. Visual Biometric Pipeline: How We Protect Vectors */}
      <div className="bg-white rounded-3xl sm:rounded-[2.5rem] border border-[#F1E8D9] p-8 sm:p-12 shadow-[0_8px_30px_rgba(0,0,0,0.06)]">
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-3">
          <Badge variant="yellow">Privacy By Design</Badge>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900">
            How HRDuo Protects Biometric Data
          </h2>
          <p className="text-slate-600 text-sm sm:text-base font-medium">
            From the moment an employee steps in front of the kiosk to punch logging.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-[#FDFBF7] rounded-3xl p-6 sm:p-8 border border-[#F1E8D9] space-y-3 relative">
            <span className="text-xs font-black text-slate-400 uppercase tracking-widest">Stage 1</span>
            <h3 className="text-xl font-black text-slate-900">Kiosk Edge Extraction</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
              The camera stream is analyzed locally in browser WebAssembly memory. 68 landmark points are translated into a 128-D vector float array.
            </p>
            <div className="pt-2 text-xs font-bold text-red-600 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-red-500" />
              <span>Raw Video Immediately Purged from RAM</span>
            </div>
          </div>

          <div className="bg-[#FDFBF7] rounded-3xl p-6 sm:p-8 border border-[#F1E8D9] space-y-3 relative">
            <span className="text-xs font-black text-slate-400 uppercase tracking-widest">Stage 2</span>
            <h3 className="text-xl font-black text-slate-900">Encrypted Transmission</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
              Only the mathematical vector hash (not the face) is securely transmitted via TLS 1.3 cryptographic handshake to your tenant server.
            </p>
            <div className="pt-2 text-xs font-bold text-[#008C75] flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span>TLS 1.3 Perfect Forward Secrecy</span>
            </div>
          </div>

          <div className="bg-[#FDFBF7] rounded-3xl p-6 sm:p-8 border border-[#F1E8D9] space-y-3 relative">
            <span className="text-xs font-black text-slate-400 uppercase tracking-widest">Stage 3</span>
            <h3 className="text-xl font-black text-slate-900">Euclidean Matching & Storage</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
              The vector is compared using sub-200ms Euclidean distance algorithms against pre-enrolled floats. The punch timestamp is logged.
            </p>
            <div className="pt-2 text-xs font-bold text-amber-700 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-amber-500" />
              <span>AES-256 Vector Encrypted at Rest</span>
            </div>
          </div>
        </div>
      </div>

      {/* 3. The 6 Pillars Grid */}
      <div className="space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <Badge variant="teal">Security Guarantees</Badge>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900">
            Engineered for Strict Enterprise Standards
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {securityPillars.map((p, idx) => {
            const Icon = p.icon;
            return (
              <div 
                key={idx}
                className="bg-white rounded-3xl p-8 border border-[#F1E8D9] shadow-sm hover:shadow-md transition-shadow space-y-4"
              >
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-[#E6F7F5] text-[#008C75] flex items-center justify-center">
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-[11px] font-bold px-3 py-1 rounded-full bg-slate-100 text-slate-800">
                    {p.badge}
                  </span>
                </div>
                <h3 className="text-xl font-black text-slate-900">{p.title}</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                  {p.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* 4. Compliance Badges Banner */}
      <div className="bg-slate-900 text-white rounded-3xl sm:rounded-[2.5rem] p-8 sm:p-12">
        <div className="max-w-3xl space-y-4">
          <Badge variant="yellow">Global Compliance</Badge>
          <h2 className="text-3xl sm:text-4xl font-black">
            Aligned with World Biometric & Data Privacy Laws
          </h2>
          <p className="text-slate-300 text-sm sm:text-base font-medium leading-relaxed">
            Whether your teams operate in the European Union (GDPR), United States, India (DPDP Act 2023), 
            or Southeast Asia, HRDuo meets and exceeds statutory employee consent and biometric storage mandates.
          </p>
          <div className="pt-4 flex flex-wrap gap-3">
            <span className="px-4 py-2 rounded-xl bg-white/10 border border-white/20 text-xs font-bold">
              SOC 2 Type II Ready
            </span>
            <span className="px-4 py-2 rounded-xl bg-white/10 border border-white/20 text-xs font-bold">
              GDPR Article 9 Compliant
            </span>
            <span className="px-4 py-2 rounded-xl bg-white/10 border border-white/20 text-xs font-bold">
              DPDP Act 2023 Biometric Standards
            </span>
            <span className="px-4 py-2 rounded-xl bg-white/10 border border-white/20 text-xs font-bold">
              ISO/IEC 27001 Information Security
            </span>
          </div>
        </div>
      </div>

      {/* 5. Bottom CTA */}
      <div className="bg-white rounded-3xl sm:rounded-[2.5rem] border border-[#F1E8D9] p-8 sm:p-12 text-center shadow-sm">
        <div className="max-w-2xl mx-auto space-y-4">
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900">
            Have Questions for Our Security Officers?
          </h2>
          <p className="text-slate-600 text-sm sm:text-base font-medium">
            We are glad to sign custom DPAs (Data Processing Agreements) and participate in enterprise vendor security reviews.
          </p>
          <div className="pt-4 flex justify-center gap-4">
            <Button
              variant="primary"
              size="lg"
              onClick={() => navigate('/contact')}
            >
              Contact Security Team
            </Button>
          </div>
        </div>
      </div>

    </div>
  );
}
