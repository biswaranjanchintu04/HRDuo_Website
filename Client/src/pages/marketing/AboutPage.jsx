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
  Lock,
  Building2,
  Smartphone
} from 'lucide-react';

export default function AboutPage() {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "About Us — Smart HR. Stronger Together.";
  }, []);

  const values = [
    {
      icon: Zap,
      title: "Sub-Second Speed",
      desc: "Nobody should queue to clock in. Our biometric pipeline verifies identities in under 400 milliseconds on standard web devices.",
      color: "bg-[#EBF3FA] text-[#002D62]"
    },
    {
      icon: Lock,
      title: "Zero Raw Photo Storage",
      desc: "Privacy by design. Facial landmarks exist purely as irreversible 128-D mathematical vectors; raw camera frames are deleted immediately.",
      color: "bg-[#E6F8F8] text-[#00A8A8]"
    },
    {
      icon: Target,
      title: "Zero Hardware Lock-In",
      desc: "Stop paying high AMC costs for fragile fingerprint sensors. Run touchless kiosks on any iPad, Android tablet, or laptop.",
      color: "bg-[#EBF3FA] text-[#002D62]"
    },
    {
      icon: HeartHandshake,
      title: "Single Integrated Ecosystem",
      desc: "Biometric punches, shift rosters, leave approvals, and payroll run seamlessly in sync with zero spreadsheet export friction.",
      color: "bg-[#E6F8F8] text-[#00A8A8]"
    }
  ];

  const milestones = [
    {
      year: "2023",
      title: "The Problem Identified",
      desc: "Frustrated by fingerprint smudge errors, buddy punching, and manual payroll sheets across multiple branches, our team set out to build a hardware-free browser biometric engine."
    },
    {
      year: "2024",
      title: "Sub-Second Face AI Launch",
      desc: "Released our proprietary edge face-matching kiosk algorithm, achieving 99.4% anti-spoof accuracy with zero physical contact."
    },
    {
      year: "2025",
      title: "Attendance-Linked Payroll Engine",
      desc: "Integrated live attendance directly into payroll rules, enabling organizations to run end-to-end salary calculations in a single click."
    },
    {
      year: "2026",
      title: "Specialized Industry Suite Launch",
      desc: "Powering thousands of daily check-ins across Corporate Offices and fast-paced Small Warehouses with tailored geofencing and touchless kiosk solutions."
    }
  ];

  return (
    <div className="py-8 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-16 sm:space-y-24">
      
      {/* 1. About Hero Section */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#EBF3FA] text-[#002D62] text-xs font-semibold border border-[#D9E2EC]">
          <Sparkles className="w-3.5 h-3.5 text-[#00A8A8]" />
          Our Mission & Vision
        </span>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#002D62] leading-tight">
          Reimagining Workforce Technology for the <br />
          <span className="text-[#00A8A8]">Modern Enterprise</span>
        </h1>
        <p className="text-base sm:text-lg text-[#334E68] font-normal leading-relaxed">
          Smart HR. Stronger Together. We believe managing your team shouldn't be bogged down by 
          outdated biometric machines, manual reconciliation errors, or disconnected spreadsheets.
        </p>
      </div>

      {/* 2. Story Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center bg-white rounded-3xl border border-slate-200/90 p-8 sm:p-12 shadow-sm">
        <div className="lg:col-span-7 space-y-5">
          <span className="text-xs font-bold uppercase tracking-wider text-[#00A8A8]">
            The Problem & Innovation
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#002D62] leading-snug">
            Why We Built a Hardware-Free HRMS
          </h2>
          <p className="text-[#334E68] font-normal text-sm sm:text-base leading-relaxed">
            For decades, companies spent lakhs of rupees installing clumsy fingerprint readers at entrance doors. 
            Employees had to wipe grease off sensors, lines stretched down the hall during shift changes, 
            and HR administrators spent weeks every month manually matching attendance punch records against payroll formulas.
          </p>
          <p className="text-[#334E68] font-normal text-sm sm:text-base leading-relaxed">
            We asked: <strong className="text-[#002D62] font-semibold">Why can’t attendance be as instantaneous and contactless as unlocking your smartphone?</strong> 
            And why shouldn't that verified check-in flow directly into payroll, shift management, and leave balances in real time?
          </p>
          <p className="text-[#334E68] font-normal text-sm sm:text-base leading-relaxed">
            Our platform turns any web-enabled device into an intelligent biometric kiosk, 
            cutting hardware costs to zero while ensuring absolute data privacy.
          </p>

          <div className="pt-3 flex flex-wrap items-center gap-6">
            <div>
              <div className="text-2xl sm:text-3xl font-extrabold text-[#002D62]">50,000+</div>
              <div className="text-xs font-medium text-[#627D98] mt-0.5">Daily Punches</div>
            </div>
            <div className="w-px h-10 bg-slate-200" />
            <div>
              <div className="text-2xl sm:text-3xl font-extrabold text-[#00A8A8]">99.4%</div>
              <div className="text-xs font-medium text-[#627D98] mt-0.5">AI Matching Accuracy</div>
            </div>
            <div className="w-px h-10 bg-slate-200" />
            <div>
              <div className="text-2xl sm:text-3xl font-extrabold text-[#002D62]">₹0</div>
              <div className="text-xs font-medium text-[#627D98] mt-0.5">Proprietary Hardware Cost</div>
            </div>
          </div>
        </div>

        {/* Brand Showcase Visual */}
        <div className="lg:col-span-5 flex justify-center">
          <div className="w-full max-w-md bg-[#F8FAFC] rounded-2xl p-6 sm:p-8 border border-slate-200 space-y-6">
            <div className="flex items-center gap-3">
              <img src="/hrduo_logo.png" alt="HRDuo" className="h-10 w-auto" />
            </div>
            <blockquote className="text-[#002D62] text-base sm:text-lg font-semibold leading-relaxed">
              "Smart HR. Stronger Together. Every feature we build is engineered to give hours back to your HR teams and employees."
            </blockquote>
            <div className="pt-4 border-t border-slate-200 flex items-center justify-between text-xs">
              <div>
                <div className="font-bold text-[#002D62]">Engineering & Product Team</div>
                <div className="text-[#627D98]">Autonomous Workforce Solutions</div>
              </div>
              <div className="flex items-center gap-1.5 px-2.5 py-1 bg-[#E6F8F8] text-[#008585] rounded-full font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00A8A8] animate-pulse" />
                <span>Verified</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Core Company Values */}
      <div className="space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-[#00A8A8]">
            Core Principles
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#002D62]">
            What Drives Our Platform
          </h2>
          <p className="text-[#334E68] text-sm">
            These values guide our product roadmap, engineering decisions, and client relationships every day.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((v, idx) => {
            const Icon = v.icon;
            return (
              <div 
                key={idx} 
                className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200/90 shadow-2xs hover:shadow-xs transition-all space-y-3"
              >
                <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${v.color}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-[#002D62] text-base sm:text-lg">
                  {v.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#334E68] leading-relaxed font-normal">
                  {v.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* 4. Journey & Milestones Timeline */}
      <div className="bg-white rounded-3xl border border-slate-200/90 p-8 sm:p-12 shadow-sm">
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-[#00A8A8]">
            Milestones
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#002D62]">
            Our Continuous Evolution
          </h2>
          <p className="text-[#334E68] text-sm">
            A commitment to continuous product improvement for modern businesses.
          </p>
        </div>

        <div className="relative border-l-2 border-slate-200 ml-4 sm:ml-8 pl-6 sm:pl-10 space-y-8">
          {milestones.map((m, idx) => (
            <div key={idx} className="relative group">
              <div className="absolute -left-[33px] sm:-left-[49px] top-1 w-5 h-5 rounded-full bg-white border-4 border-[#002D62] group-hover:border-[#00A8A8] transition-colors" />
              <div className="space-y-1">
                <span className="text-xs font-bold text-[#00A8A8] uppercase tracking-wider">
                  {m.year}
                </span>
                <h3 className="text-lg sm:text-xl font-bold text-[#002D62]">
                  {m.title}
                </h3>
                <p className="text-[#334E68] text-xs sm:text-sm leading-relaxed max-w-3xl">
                  {m.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 5. Bottom Call to Action */}
      <div className="bg-[#EBF3FA] rounded-3xl p-8 sm:p-12 border border-[#D9E2EC] text-center">
        <div className="max-w-2xl mx-auto space-y-4">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#002D62]">
            Ready to Experience Smart Attendance?
          </h2>
          <p className="text-[#334E68] text-sm sm:text-base">
            Whether you manage 10 employees or 10,000, our team is excited to help you streamline your workplace.
          </p>
          <div className="pt-3 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => navigate('/face-attendance')}
              className="bg-gradient-to-r from-[#002D62] to-[#004B8D] hover:from-[#001E42] hover:to-[#003B73] text-white px-6 py-3 rounded-xl font-semibold text-sm flex items-center gap-2 shadow-md cursor-pointer"
            >
              <span>Try Face Kiosk Now</span>
              <ArrowRight className="w-4 h-4 text-[#00C9CE]" />
            </button>
            <button
              onClick={() => navigate('/contact')}
              className="bg-white hover:bg-slate-50 text-[#002D62] border border-slate-200 px-6 py-3 rounded-xl font-semibold text-sm cursor-pointer"
            >
              Schedule Consultation
            </button>
          </div>
        </div>
      </div>

    </div>
  );
}
