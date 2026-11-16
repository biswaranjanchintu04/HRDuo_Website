import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Check, 
  Sparkles, 
  ArrowRight, 
  HelpCircle, 
  ShieldCheck, 
  Zap, 
  Users 
} from 'lucide-react';

export default function PricingPage() {
  const navigate = useNavigate();
  const [annual, setAnnual] = useState(true);

  useEffect(() => {
    document.title = "Pricing & Plans — Transparent Workforce Subscriptions";
  }, []);

  const tiers = [
    {
      name: "Starter",
      tagline: "Essential biometric attendance for small growing teams.",
      price: annual ? 1499 : 1899,
      period: "/month",
      badge: null,
      highlight: false,
      buttonText: "Start 14-Day Free Trial",
      features: [
        "Up to 25 Active Employees",
        "Unlimited Face Attendance Kiosks",
        "Sub-Second Biometric Edge Match",
        "GPS Geofencing Mobile Punch",
        "Standard Leave Management",
        "CSV & Excel Timesheet Reports",
        "Standard Email Support (24h turnaround)"
      ]
    },
    {
      name: "Pro Workforce",
      tagline: "Complete automation with live attendance & dynamic payroll.",
      price: annual ? 3999 : 4999,
      period: "/month",
      badge: "Most Popular",
      highlight: true,
      buttonText: "Start 14-Day Free Trial",
      features: [
        "Up to 100 Active Employees",
        "Unlimited Face Attendance Kiosks",
        "Attendance-Linked Payroll Engine",
        "2-Step Leave Approvals (Manager → HR)",
        "Multi-Tier Shift & Grace Window Rules",
        "Anti-Spoofing & Liveness AI",
        "Batch PDF Payslip Generation",
        "Employee Mobile & Self-Service Portal",
        "Priority 24/7 Support"
      ]
    },
    {
      name: "Enterprise",
      tagline: "Custom scale, dedicated database, API webhooks, and 99.95% SLA.",
      price: annual ? 8999 : 10999,
      period: "/month",
      badge: "Full Power",
      highlight: false,
      buttonText: "Schedule Enterprise Demo",
      features: [
        "Unlimited Employees & Branches",
        "Turnstile & Hardware Biometric API",
        "Custom Shift Patterns & Rotational Rosters",
        "Custom ERP & Webhook Integrations",
        "Dedicated Implementation Architect",
        "99.95% Uptime Guarantee SLA",
        "Quarterly Compliance & Audit Review"
      ]
    }
  ];

  const faqs = [
    {
      q: "Can I use our existing tablets or laptops as kiosks?",
      a: "Yes! The platform runs seamlessly in any modern web browser (Chrome, Edge, Safari) and does not require proprietary scanners. Any device with a standard webcam can serve as a high-security attendance kiosk."
    },
    {
      q: "Is there a free trial?",
      a: "Yes, we offer a 14-day fully featured risk-free trial. No credit card is required to begin testing facial attendance, geofencing, and payroll automation."
    },
    {
      q: "Can we switch between monthly and annual plans?",
      a: "You can upgrade, downgrade, or switch between billing intervals at any time. When switching to annual, you automatically save 20% on all plans."
    },
    {
      q: "What happens if our team grows beyond plan limits?",
      a: "You can instantly scale your employee tier with one click in the Admin Billing Settings without any service disruption."
    },
    {
      q: "Do you store raw photos of our employees?",
      a: "Never. We extract 128-dimensional irreversible mathematical vectors and discard camera images instantly in memory. We are fully compliant with GDPR and biometric data protection regulations."
    }
  ];

  return (
    <div className="py-8 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-16 sm:space-y-24">

      {/* 1. Header & Billing Toggle */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#EBF3FA] text-[#002D62] text-xs font-semibold border border-[#D9E2EC]">
          <Sparkles className="w-3.5 h-3.5 text-[#00A8A8]" />
          Transparent Pricing
        </span>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#002D62] leading-tight">
          Simple Plans for Teams of <br />
          <span className="text-[#00A8A8]">Any Shape & Scale</span>
        </h1>
        <p className="text-base sm:text-lg text-[#334E68] font-normal leading-relaxed">
          Zero hidden fees. Zero hardware lock-in. Start with our 14-day trial and experience the fastest biometric attendance platform.
        </p>

        {/* Toggle Switch */}
        <div className="pt-4 flex items-center justify-center gap-3">
          <span className={`text-sm font-semibold ${!annual ? 'text-[#002D62]' : 'text-[#627D98]'}`}>
            Monthly Billing
          </span>
          <button
            onClick={() => setAnnual(!annual)}
            className="w-13 h-7 rounded-full bg-slate-200 p-1 transition-colors relative focus:outline-none cursor-pointer"
            aria-label="Toggle annual billing"
          >
            <div
              className={`w-5 h-5 rounded-full bg-[#002D62] shadow-sm transition-transform duration-200 ${
                annual ? 'translate-x-6' : 'translate-x-0'
              }`}
            />
          </button>
          <div className="flex items-center gap-2">
            <span className={`text-sm font-semibold ${annual ? 'text-[#002D62]' : 'text-[#627D98]'}`}>
              Annual Billing
            </span>
            <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-[#E6F8F8] text-[#008585] border border-[#D0EFEF]">
              Save 20%
            </span>
          </div>
        </div>
      </div>

      {/* 2. Pricing Tiers */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
        {tiers.map((tier) => (
          <div
            key={tier.name}
            className={`rounded-3xl p-8 sm:p-9 flex flex-col justify-between transition-all duration-300 relative ${tier.highlight
                ? 'bg-white border-2 border-[#002D62] shadow-xl shadow-blue-900/10 lg:-translate-y-2'
                : 'bg-white border border-slate-200/90 shadow-sm hover:shadow-md hover:border-slate-300'
              }`}
          >
            {tier.badge && (
              <div className="absolute -top-3.5 right-8 bg-gradient-to-r from-[#002D62] to-[#004B8D] text-white font-semibold text-[11px] uppercase tracking-wider py-1 px-3.5 rounded-full shadow-sm">
                {tier.badge}
              </div>
            )}

            <div>
              <h3 className="text-2xl font-bold text-[#002D62] mb-1">{tier.name}</h3>
              <p className="text-xs sm:text-sm text-[#486581] font-normal mb-6 min-h-[36px]">
                {tier.tagline}
              </p>

              <div className="flex items-baseline gap-1 mb-6 pb-6 border-b border-slate-100">
                <span className="text-4xl sm:text-5xl font-extrabold text-[#002D62]">
                  ₹{tier.price.toLocaleString('en-IN')}
                </span>
                <span className="text-sm font-medium text-[#627D98]">{tier.period}</span>
              </div>

              <div className="space-y-3 mb-8">
                <div className="text-xs font-bold uppercase tracking-wider text-[#627D98]">
                  Included Features:
                </div>
                {tier.features.map((feat, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#334E68]">
                    <Check className="w-4 h-4 text-[#00A8A8] flex-shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={() => navigate('/contact')}
              className={`w-full py-3.5 rounded-xl font-semibold text-sm flex items-center justify-center gap-1.5 transition-all cursor-pointer ${tier.highlight
                  ? 'bg-gradient-to-r from-[#002D62] to-[#004B8D] hover:from-[#001E42] hover:to-[#003B73] text-white shadow-md'
                  : 'bg-slate-50 hover:bg-slate-100 text-[#002D62] border border-slate-200'
                }`}
            >
              <span>{tier.buttonText}</span>
              <ArrowRight className="w-4 h-4 text-[#00C9CE]" />
            </button>
          </div>
        ))}
      </div>

      {/* 3. Frequently Asked Questions */}
      <div className="max-w-3xl mx-auto space-y-6">
        <div className="text-center space-y-2 mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#002D62]">
            Frequently Asked Questions
          </h2>
          <p className="text-[#334E68] text-sm">
            Everything you need to know about billing, onboarding, and facial attendance security.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div key={idx} className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-2xs">
              <h3 className="text-base font-bold text-[#002D62] mb-2 flex items-start gap-2">
                <HelpCircle className="w-5 h-5 text-[#00A8A8] flex-shrink-0 mt-0.5" />
                <span>{faq.q}</span>
              </h3>
              <p className="text-sm text-[#334E68] pl-7 leading-relaxed font-normal">
                {faq.a}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* 4. Bottom Support CTA Card */}
      <div className="bg-[#EBF3FA] rounded-3xl p-8 sm:p-10 border border-[#D9E2EC] flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center sm:text-left">
          <h3 className="text-xl sm:text-2xl font-bold text-[#002D62]">
            Need a custom enterprise agreement or on-premise installation?
          </h3>
          <p className="text-sm text-[#334E68] max-w-xl">
            Our engineering team provides dedicated SLA agreements, turnstile hardware integration, and multi-tenant database clusters.
          </p>
        </div>
        <button
          onClick={() => navigate('/contact')}
          className="bg-gradient-to-r from-[#002D62] to-[#004B8D] hover:from-[#001E42] hover:to-[#003B73] text-white px-6 py-3.5 rounded-xl font-semibold text-sm whitespace-nowrap shadow-md cursor-pointer"
        >
          Talk to Enterprise Sales
        </button>
      </div>

    </div>
  );
}
