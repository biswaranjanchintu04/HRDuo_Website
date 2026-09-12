import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  HeartHandshake, 
  ShieldCheck, 
  Zap, 
  Users2, 
  Sparkles, 
  ArrowRight, 
  Target, 
  Compass, 
  Award,
  Globe2,
  CheckCircle2,
  Lock
} from 'lucide-react';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';

export default function AboutPage() {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "About Us — HRDuo Story, Mission & Values";
  }, []);

  const values = [
    {
      icon: Zap,
      title: "Uncompromising Speed",
      desc: "Nobody should queue to clock in. We engineered our biometric pipeline to verify identities in under 200 milliseconds.",
      color: "bg-[#FFC933] text-slate-950"
    },
    {
      icon: Lock,
      title: "Privacy by Architecture",
      desc: "We never store raw photos or video footage. Facial landmarks exist only as irreversible 128-D mathematical vectors.",
      color: "bg-[#008C75] text-white"
    },
    {
      icon: Target,
      title: "Zero-Error Precision",
      desc: "From anti-spoof liveness to statutory payroll deductions, our algorithms guarantee mathematical accuracy you can audit.",
      color: "bg-[#FF5A36] text-white"
    },
    {
      icon: HeartHandshake,
      title: "Human-Centric Simplicity",
      desc: "Enterprise software shouldn't require weeks of training. We design interfaces that employees and managers love using.",
      color: "bg-indigo-600 text-white"
    }
  ];

  const milestones = [
    {
      year: "2023",
      title: "The Problem Identified",
      desc: "Frustrated by fingerprint smudge errors, buddy punching, and manual payroll sheets across multiple branches, our founders set out to build a hardware-free browser biometric engine."
    },
    {
      year: "2024",
      title: "Sub-200ms Face AI Launch",
      desc: "Released the proprietary edge face-matching kiosk algorithm, achieving 99.8% anti-spoof accuracy with zero physical contact."
    },
    {
      year: "2025",
      title: "Automated Dynamic Payroll Engine",
      desc: "Integrated live attendance directly into payroll rules, enabling organizations to run end-to-end salary calculations in a single click."
    },
    {
      year: "2026",
      title: "Global Enterprise Scale",
      desc: "Powering thousands of daily check-ins across manufacturing, healthcare, corporate offices, and educational institutions worldwide."
    }
  ];

  return (
    <div className="py-8 sm:py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-16 sm:space-y-24">
      
      {/* 1. About Hero Section */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <Badge variant="teal">
          <Sparkles className="w-3.5 h-3.5 mr-1" />
          Our Mission & Vision
        </Badge>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 leading-tight">
          Reimagining Workforce Technology for the <br />
          <span className="text-[#008C75]">Modern Enterprise.</span>
        </h1>
        <p className="text-base sm:text-lg text-slate-600 font-medium leading-relaxed">
          HRDuo was born from a simple belief: managing your team shouldn't be bogged down by 
          outdated biometric machines, manual reconciliation errors, or disconnected spreadsheets.
        </p>
      </div>

      {/* 2. Story Section: The Origin of HRDuo */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center bg-white rounded-3xl sm:rounded-[2.5rem] border border-[#F1E8D9] p-8 sm:p-12 shadow-[0_4px_24px_rgba(0,0,0,0.04)]">
        <div className="lg:col-span-7 space-y-5">
          <Badge variant="yellow">The Story</Badge>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 leading-snug">
            Why We Founded HRDuo
          </h2>
          <p className="text-slate-600 font-medium text-sm sm:text-base leading-relaxed">
            For decades, companies spent lakhs of rupees installing clumsy fingerprint readers at entrance doors. 
            Employees had to wipe grease off sensors, lines stretched down the hall during shift changes, 
            and HR administrators spent weeks every month manually matching attendance punch records against payroll formulas.
          </p>
          <p className="text-slate-600 font-medium text-sm sm:text-base leading-relaxed">
            We asked: <strong className="text-slate-900">Why can’t attendance be as instantaneous and contactless as unlocking your smartphone?</strong> 
            And why shouldn't that verified check-in flow directly into payroll, shift management, and leave balances in real time?
          </p>
          <p className="text-slate-600 font-medium text-sm sm:text-base leading-relaxed">
            HRDuo answers that question. Today, our platform turns any web-enabled device into an intelligent biometric kiosk, 
            cutting hardware costs to zero while ensuring absolute data privacy.
          </p>

          <div className="pt-2 flex items-center gap-6">
            <div>
              <div className="text-2xl sm:text-3xl font-black text-slate-900">50,000+</div>
              <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mt-0.5">Daily Check-Ins</div>
            </div>
            <div className="w-px h-10 bg-slate-200" />
            <div>
              <div className="text-2xl sm:text-3xl font-black text-[#008C75]">99.99%</div>
              <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mt-0.5">System Reliability</div>
            </div>
            <div className="w-px h-10 bg-slate-200" />
            <div>
              <div className="text-2xl sm:text-3xl font-black text-[#FF5A36]">0</div>
              <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mt-0.5">Raw Photos Saved</div>
            </div>
          </div>
        </div>

        {/* Brand Showcase Visual */}
        <div className="lg:col-span-5 flex justify-center">
          <div className="w-full max-w-md bg-[#FDFBF7] rounded-3xl p-6 sm:p-8 border-2 border-slate-900 shadow-[6px_6px_0_0_#0F172A] space-y-6">
            <div className="flex items-center gap-3">
              <img src="/hrduo_logo.png" alt="HRDuo" className="h-10 w-auto" />
            </div>
            <blockquote className="text-slate-800 text-base sm:text-lg font-bold italic leading-snug">
              "Your People. Our Priority. Every single line of code we write is dedicated to making work life frictionless."
            </blockquote>
            <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
              <div>
                <div className="font-extrabold text-slate-900 text-sm">Engineering & AI Team</div>
                <div className="text-xs text-slate-500">HRDuo Technologies</div>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full border border-emerald-200 text-xs font-bold">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>Verified</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Core Company Values */}
      <div className="space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <Badge variant="teal">What Drives Us</Badge>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900">
            Our Core Operating Principles
          </h2>
          <p className="text-slate-600 text-sm sm:text-base font-medium">
            These values guide our product roadmap, engineering decisions, and customer relationships every day.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((v, idx) => {
            const Icon = v.icon;
            return (
              <div 
                key={idx} 
                className="bg-white rounded-3xl p-6 sm:p-8 border border-[#F1E8D9] shadow-sm hover:shadow-md transition-shadow space-y-4"
              >
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-md ${v.color}`}>
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-black text-slate-900 text-lg sm:text-xl">
                  {v.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                  {v.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* 4. Journey & Milestones Timeline */}
      <div className="bg-white rounded-3xl sm:rounded-[2.5rem] border border-[#F1E8D9] p-8 sm:p-12 shadow-[0_4px_24px_rgba(0,0,0,0.04)]">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <Badge variant="yellow">The Journey</Badge>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900">
            How We Got Here
          </h2>
          <p className="text-slate-600 text-sm sm:text-base font-medium">
            A relentless commitment to simplifying human resource workflows.
          </p>
        </div>

        <div className="relative border-l-2 border-slate-200 ml-4 sm:ml-8 pl-6 sm:pl-10 space-y-10">
          {milestones.map((m, idx) => (
            <div key={idx} className="relative group">
              <div className="absolute -left-[35px] sm:-left-[51px] top-1 w-6 h-6 rounded-full bg-white border-4 border-slate-900 group-hover:border-[#FFC933] transition-colors" />
              <div className="space-y-1">
                <span className="text-xs font-black text-[#008C75] uppercase tracking-wider">
                  {m.year}
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-slate-900">
                  {m.title}
                </h3>
                <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-medium max-w-3xl">
                  {m.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 5. Trust & Certifications Bento */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-[#E6F7F5] rounded-3xl p-6 sm:p-8 border border-[#BCECE5] space-y-3">
          <div className="w-10 h-10 rounded-xl bg-[#008C75] text-white flex items-center justify-center">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-slate-900 text-lg">SOC 2 Type II Compliant</h3>
          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
            Independently audited operational procedures, biometric access controls, and data segregation policies.
          </p>
        </div>

        <div className="bg-[#FEF3C7] rounded-3xl p-6 sm:p-8 border border-[#FDE68A] space-y-3">
          <div className="w-10 h-10 rounded-xl bg-amber-600 text-white flex items-center justify-center">
            <Globe2 className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-slate-900 text-lg">GDPR & DPDP Ready</h3>
          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
            Strict adherence to global biometric privacy laws with employee consent workflows and irreversible vectors.
          </p>
        </div>

        <div className="bg-[#F3E8FF] rounded-3xl p-6 sm:p-8 border border-[#E9D5FF] space-y-3">
          <div className="w-10 h-10 rounded-xl bg-purple-600 text-white flex items-center justify-center">
            <Award className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-slate-900 text-lg">99.99% Guaranteed SLA</h3>
          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
            Edge offline-buffering guarantees that even during internet outages, attendance never misses a beat.
          </p>
        </div>
      </div>

      {/* 6. Bottom Call to Action */}
      <div className="bg-slate-950 text-white rounded-3xl sm:rounded-[2.5rem] p-8 sm:p-12 text-center relative overflow-hidden">
        <div className="max-w-2xl mx-auto space-y-4 relative z-10">
          <h2 className="text-3xl sm:text-4xl font-black">
            Join the Hundreds of Teams Empowered by HRDuo
          </h2>
          <p className="text-slate-300 text-sm sm:text-base font-medium">
            Whether you manage 10 employees or 10,000, our team is excited to help you streamline your workplace.
          </p>
          <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
            <Button
              variant="primary"
              size="lg"
              onClick={() => navigate('/face-attendance')}
              className="flex items-center gap-2"
            >
              <span>Try Face Kiosk Now</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => navigate('/contact')}
              className="border-white/20 text-white hover:bg-white/10"
            >
              Speak with Our Team
            </Button>
          </div>
        </div>
      </div>

    </div>
  );
}
