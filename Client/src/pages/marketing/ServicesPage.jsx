import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Wrench, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight, 
  Server, 
  Headphones, 
  Layers, 
  FileCode, 
  ShieldCheck, 
  Clock
} from 'lucide-react';

export default function ServicesPage() {
  const navigate = useNavigate();
  const [selectedStep, setSelectedStep] = useState(0);

  useEffect(() => {
    document.title = "Services & Implementation — Enterprise Support & Setup";
  }, []);

  const services = [
    {
      icon: Server,
      title: "Enterprise Onboarding & Migration",
      desc: "Get your entire company onboarded in under 48 hours. Our implementation engineers handle employee data migration, org-chart mapping, and bulk biometric profile generation with zero downtime.",
      badge: "Fast Track",
      features: [
        "Automated CSV/Excel employee data import",
        "Custom role-based permissions setup",
        "Live administrator training sessions",
        "Dedicated implementation specialist"
      ]
    },
    {
      icon: Layers,
      title: "Turnkey Hardware & Kiosk Setup",
      desc: "Need pre-configured kiosk hardware? We provide tested, commercial-grade tablets and durable wall/stand mounts optimized for high-traffic office reception and factory floor entrances.",
      badge: "Kiosk Ready",
      features: [
        "Pre-installed, tamper-proof kiosk software",
        "Anti-glare tempered glass and secure enclosures",
        "Plug-and-play Ethernet & Wi-Fi configuration",
        "Bulk hardware provisioning assistance"
      ]
    },
    {
      icon: FileCode,
      title: "Custom API & ERP Integrations",
      desc: "Connect our platform seamlessly into your existing tech stack. We build and maintain custom webhooks and bi-directional connectors for SAP, Workday, QuickBooks, and legacy databases.",
      badge: "Custom APIs",
      features: [
        "RESTful API with granular OAuth 2.0 access",
        "Real-time attendance & punch event webhooks",
        "Automatic payroll export syncing",
        "Dedicated solutions architect for enterprise IT"
      ]
    },
    {
      icon: ShieldCheck,
      title: "Statutory Compliance & Payroll Advisory",
      desc: "Never worry about labor law fines. Our payroll specialists configure statutory deductions, overtime multipliers, night-shift allowances, and tax withholding rules tailored to your jurisdiction.",
      badge: "Compliance",
      features: [
        "Jurisdiction-specific tax rule alignment",
        "Overtime and holiday compensation formulas",
        "Audit-ready digital compliance archives",
        "Quarterly payroll rule review and updates"
      ]
    },
    {
      icon: Headphones,
      title: "24/7 Dedicated Technical Support",
      desc: "Get rapid answers whenever you need them. Enterprise clients receive a shared Slack/Teams channel, dedicated account manager, and guaranteed sub-15 minute response time SLA.",
      badge: "Sub-15m SLA",
      features: [
        "Direct Slack / Microsoft Teams channel",
        "24/7/365 priority phone & ticket escalation",
        "Guaranteed 99.95% system availability SLA",
        "Monthly performance and attendance review"
      ]
    },
    {
      icon: Clock,
      title: "Vision & Environmental Calibration",
      desc: "Have tricky ambient lighting, backlights, or outdoor gates? Our computer vision engineers calibrate camera exposure, threshold sensitivity, and anti-glare parameters for 99.4% match accuracy.",
      badge: "Vision AI Tuning",
      features: [
        "Environmental lighting and angle analysis",
        "Adaptive threshold tuning per entrance",
        "Liveness anti-spoof parameter calibration",
        "Continuous AI accuracy monitoring"
      ]
    }
  ];

  const pipelineStages = [
    {
      step: "01",
      title: "Biometric Enrollment",
      subtitle: "3-Second Browser Face Capture",
      desc: "Employees snap a quick photo via mobile or web portal. The system instantly extracts 128-D mathematical landmarks and discards the raw image."
    },
    {
      step: "02",
      title: "Shift & Policy Setup",
      subtitle: "Custom Rosters & Rules",
      desc: "Configure working shifts, grace windows, rotational rosters, and overtime multipliers with intuitive policy templates."
    },
    {
      step: "03",
      title: "Live Face & GPS Attendance",
      subtitle: "Sub-Second Kiosk & App Check-In",
      desc: "Kiosks deployed at entrances verify identities in milliseconds, with offline buffering ensuring zero delays even if Wi-Fi drops."
    },
    {
      step: "04",
      title: "Attendance-Linked Payroll",
      subtitle: "1-Click Salary Calculation",
      desc: "At month-end, live attendance automatically calculates net pay, tax, overtime, and deductions, generating tamper-proof PDF payslips in seconds."
    }
  ];

  return (
    <div className="py-8 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-16 sm:space-y-24">
      
      {/* 1. Hero Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#EAF4FF] text-[#2365E9] text-xs font-semibold">
          <Wrench className="w-3.5 h-3.5" />
          Enterprise Professional Services
        </span>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#090D16] leading-tight">
          From Setup to Scale. <br />
          <span className="text-[#2365E9]">Full-Lifecycle HR Services</span>
        </h1>
        <p className="text-base sm:text-lg text-slate-600 font-normal leading-relaxed">
          We don't just provide software. Our dedicated implementation specialists, 
          computer vision engineers, and payroll experts ensure your organization achieves maximum efficiency from day one.
        </p>

        <div className="pt-4 flex flex-wrap items-center justify-center gap-3.5">
          <button 
            onClick={() => navigate('/contact')}
            className="bg-[#2365E9] hover:bg-[#1D4ED8] text-white px-6 py-3 rounded-xl font-semibold text-sm flex items-center gap-2 shadow-md shadow-blue-500/20 cursor-pointer"
          >
            <span>Book Implementation Consultation</span>
            <ArrowRight className="w-4 h-4" />
          </button>
          <button 
            onClick={() => navigate('/solutions')}
            className="bg-white hover:bg-slate-50 text-slate-800 border border-slate-200 px-6 py-3 rounded-xl font-semibold text-sm cursor-pointer shadow-xs"
          >
            Explore Platform Solutions
          </button>
        </div>
      </div>

      {/* 2. Interactive Implementation Pipeline */}
      <div className="bg-white rounded-3xl border border-slate-200/90 p-8 sm:p-12 shadow-sm">
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-[#2365E9]">Implementation Pipeline</span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#090D16]">
            How We Get You Live in 4 Simple Stages
          </h2>
          <p className="text-slate-600 text-sm">
            Our structured onboarding pipeline ensures zero friction, complete data integrity, and total employee adoption.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pipelineStages.map((stage, idx) => {
            const isSelected = selectedStep === idx;
            return (
              <div
                key={idx}
                onClick={() => setSelectedStep(idx)}
                className={`cursor-pointer rounded-2xl p-6 transition-all duration-200 border ${
                  isSelected
                    ? 'bg-[#2365E9] text-white border-[#2365E9] shadow-md shadow-blue-500/20 scale-[1.02]'
                    : 'bg-[#F8FAFC] text-[#090D16] border-slate-200/80 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between mb-4">
                  <span className={`text-2xl font-extrabold ${isSelected ? 'text-white' : 'text-[#2365E9]'}`}>
                    {stage.step}
                  </span>
                  <div className={`w-2.5 h-2.5 rounded-full ${isSelected ? 'bg-white' : 'bg-slate-300'}`} />
                </div>
                <h3 className="font-bold text-base sm:text-lg mb-1">{stage.title}</h3>
                <div className={`text-xs font-semibold mb-3 ${isSelected ? 'text-blue-100' : 'text-[#2365E9]'}`}>
                  {stage.subtitle}
                </div>
                <p className={`text-xs leading-relaxed ${isSelected ? 'text-blue-100' : 'text-slate-600'}`}>
                  {stage.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* 3. Comprehensive Services Grid */}
      <div className="space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-[#2365E9]">Service Offerings</span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#090D16]">
            Our Specialized Service Offerings
          </h2>
          <p className="text-slate-600 text-sm">
            Tailored technical and operational services to support your unique enterprise workforce requirements.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((svc, idx) => {
            const Icon = svc.icon;
            return (
              <div 
                key={idx} 
                className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200/90 shadow-2xs hover:shadow-xs transition-all flex flex-col justify-between"
              >
                <div className="space-y-3.5">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#2365E9] flex items-center justify-center">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700">
                      {svc.badge}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-[#090D16]">
                    {svc.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                    {svc.desc}
                  </p>

                  <div className="pt-2 border-t border-slate-100 space-y-2">
                    {svc.features.map((feat, fIdx) => (
                      <div key={fIdx} className="flex items-center gap-2 text-xs font-medium text-slate-700">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#12B76A] flex-shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-6">
                  <button
                    onClick={() => navigate('/contact')}
                    className="w-full py-2.5 rounded-xl font-semibold text-xs bg-slate-50 hover:bg-slate-100 text-slate-800 border border-slate-200 transition-colors flex items-center justify-center gap-1 cursor-pointer"
                  >
                    <span>Inquire About This Service</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 4. SLA & Enterprise Guarantee Strip */}
      <div className="bg-[#090D16] text-white rounded-3xl p-8 sm:p-12 shadow-md">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8 space-y-3">
            <span className="text-xs font-semibold bg-white/10 px-3 py-1 rounded-full text-white inline-block">
              Guaranteed Reliability
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold">
              Enterprise SLA: 99.95% Uptime with Sub-15 Minute Priority Response
            </h2>
            <p className="text-slate-300 text-sm leading-relaxed">
              We understand that employee check-ins and payroll deadlines cannot wait. 
              Our distributed edge architecture and 24/7 engineering team keep your operations running continuously.
            </p>
          </div>

          <div className="lg:col-span-4 flex justify-start lg:justify-end">
            <button
              onClick={() => navigate('/contact')}
              className="bg-[#2365E9] hover:bg-[#1D4ED8] text-white font-semibold px-6 py-3 rounded-xl text-sm transition-all shadow-md cursor-pointer"
            >
              Get Custom SLA Proposal
            </button>
          </div>
        </div>
      </div>

    </div>
  );
}
