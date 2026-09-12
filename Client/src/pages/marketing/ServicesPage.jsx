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
  Clock, 
  Star,
  Check
} from 'lucide-react';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';

export default function ServicesPage() {
  const navigate = useNavigate();
  const [selectedStep, setSelectedStep] = useState(0);

  useEffect(() => {
    document.title = "Services & Implementation — HRDuo Enterprise Support";
  }, []);

  const services = [
    {
      icon: Server,
      title: "White-Glove Enterprise Onboarding",
      desc: "Get your entire company onboarded in under 48 hours. Our implementation engineers handle employee data migration, org-chart mapping, and bulk biometric profile generation with zero business downtime.",
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
      badge: "Hardware Ready",
      features: [
        "Pre-installed, tamper-proof kiosk software",
        "Anti-glare tempered glass and secure enclosures",
        "Plug-and-play Ethernet & Wi-Fi configuration",
        "Bulk discount hardware provisioning"
      ]
    },
    {
      icon: FileCode,
      title: "Custom API & ERP Integrations",
      desc: "Connect HRDuo seamlessly into your existing tech stack. We build and maintain custom webhooks and bi-directional connectors for SAP, Workday, QuickBooks, Slack, and legacy databases.",
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
      badge: "Compliant",
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
        "Guaranteed 99.99% system availability SLA",
        "Monthly performance and attendance review"
      ]
    },
    {
      icon: Clock,
      title: "Camera & Biometric Calibration",
      desc: "Have tricky ambient lighting, backlights, or outdoor gates? Our computer vision engineers calibrate camera exposure, threshold sensitivity, and anti-glare parameters for 99.8% match accuracy in any environment.",
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
      title: "Live Face Attendance",
      subtitle: "Sub-200ms Kiosk Check-In",
      desc: "Kiosks deployed at entrances verify identities in under 200 milliseconds, with offline buffering ensuring zero delays even if Wi-Fi drops."
    },
    {
      step: "04",
      title: "Dynamic Payroll Run",
      subtitle: "1-Click Salary Calculation",
      desc: "At month-end, live attendance automatically calculates net pay, tax, overtime, and deductions, generating tamper-proof PDF payslips in seconds."
    }
  ];

  return (
    <div className="py-8 sm:py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-16 sm:space-y-24">
      
      {/* 1. Hero Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <Badge variant="teal">
          <Wrench className="w-3.5 h-3.5 mr-1" />
          Enterprise Professional Services
        </Badge>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 leading-tight">
          From Setup to Scale. <br />
          <span className="text-[#008C75]">Full-Lifecycle HR Services.</span>
        </h1>
        <p className="text-base sm:text-lg text-slate-600 font-medium leading-relaxed">
          We don't just provide software. Our dedicated implementation specialists, 
          computer vision engineers, and payroll experts ensure your organization achieves maximum efficiency from day one.
        </p>

        <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
          <Button 
            variant="primary" 
            size="lg" 
            onClick={() => navigate('/contact')}
            className="flex items-center gap-2"
          >
            <span>Book Implementation Consultation</span>
            <ArrowRight className="w-4 h-4" />
          </Button>
          <Button 
            variant="outline" 
            size="lg"
            onClick={() => navigate('/solutions')}
          >
            Explore Platform Solutions
          </Button>
        </div>
      </div>

      {/* 2. Interactive Implementation Pipeline */}
      <div className="bg-white rounded-3xl sm:rounded-[2.5rem] border border-[#F1E8D9] p-8 sm:p-12 shadow-[0_8px_30px_rgba(0,0,0,0.06)]">
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-3">
          <Badge variant="yellow">The Implementation Pipeline</Badge>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900">
            How We Get You Live in 4 Simple Stages
          </h2>
          <p className="text-slate-600 text-sm sm:text-base font-medium">
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
                className={`cursor-pointer rounded-2xl sm:rounded-3xl p-6 transition-all duration-300 border-2 ${
                  isSelected
                    ? 'bg-slate-900 text-white border-slate-900 shadow-xl scale-105'
                    : 'bg-[#FDFBF7] text-slate-900 border-slate-200 hover:border-slate-400'
                }`}
              >
                <div className="flex items-center justify-between mb-4">
                  <span className={`text-2xl font-black ${isSelected ? 'text-[#FFC933]' : 'text-[#008C75]'}`}>
                    {stage.step}
                  </span>
                  <div className={`w-3 h-3 rounded-full ${isSelected ? 'bg-[#FFC933]' : 'bg-slate-300'}`} />
                </div>
                <h3 className="font-black text-lg sm:text-xl mb-1">{stage.title}</h3>
                <div className={`text-xs font-bold mb-3 ${isSelected ? 'text-slate-300' : 'text-[#008C75]'}`}>
                  {stage.subtitle}
                </div>
                <p className={`text-xs sm:text-sm leading-relaxed ${isSelected ? 'text-slate-300' : 'text-slate-600'}`}>
                  {stage.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* 3. Comprehensive Services Grid */}
      <div className="space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <Badge variant="teal">End-to-End Capabilities</Badge>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900">
            Our Specialized Service Offerings
          </h2>
          <p className="text-slate-600 text-sm sm:text-base font-medium">
            Tailored technical and operational services to support your unique enterprise workforce requirements.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((svc, idx) => {
            const Icon = svc.icon;
            return (
              <div 
                key={idx} 
                className="bg-white rounded-3xl p-8 border border-[#F1E8D9] shadow-[0_4px_24px_rgba(0,0,0,0.04)] hover:shadow-xl transition-all flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-2xl bg-[#E6F7F5] text-[#008C75] flex items-center justify-center shadow-sm">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-black uppercase tracking-wider px-3 py-1 rounded-full bg-[#FEF3C7] text-amber-900 border border-amber-200">
                      {svc.badge}
                    </span>
                  </div>

                  <h3 className="text-xl font-black text-slate-900">
                    {svc.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                    {svc.desc}
                  </p>

                  <div className="pt-2 border-t border-slate-100 space-y-2">
                    {svc.features.map((feat, fIdx) => (
                      <div key={fIdx} className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#008C75] flex-shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-6">
                  <button
                    onClick={() => navigate('/contact')}
                    className="w-full py-2.5 rounded-full font-bold text-xs bg-slate-100 hover:bg-[#FFC933] text-slate-900 transition-colors flex items-center justify-center gap-1"
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
      <div className="bg-[#008C75] text-white rounded-3xl sm:rounded-[2.5rem] p-8 sm:p-12 shadow-xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8 space-y-3">
            <span className="text-xs font-black uppercase tracking-wider bg-white/20 px-3.5 py-1 rounded-full text-white inline-block">
              Guaranteed Reliability
            </span>
            <h2 className="text-3xl sm:text-4xl font-black">
              Enterprise SLA: 99.99% Uptime with Sub-15 Minute Priority Response
            </h2>
            <p className="text-white/80 text-sm sm:text-base font-medium">
              We understand that employee check-ins and payroll deadlines cannot wait. 
              Our distributed edge architecture and 24/7 engineering team keep your operations running continuously.
            </p>
          </div>

          <div className="lg:col-span-4 flex justify-end">
            <Button
              variant="primary"
              size="lg"
              onClick={() => navigate('/contact')}
              className="w-full sm:w-auto bg-[#FFC933] text-slate-950 hover:bg-[#F59E0B] font-black border-2 border-slate-900 shadow-[4px_4px_0_0_#0F172A]"
            >
              Get Custom SLA Proposal
            </Button>
          </div>
        </div>
      </div>

    </div>
  );
}
