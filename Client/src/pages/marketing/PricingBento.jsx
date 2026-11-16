import React, { useState } from 'react';
import { Check, Sparkles, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function PricingBento() {
  const [annual, setAnnual] = useState(true);
  const navigate = useNavigate();

  const tiers = [
    {
      name: "Starter",
      desc: "For small teams starting with mobile GPS & kiosk attendance.",
      price: annual ? 1499 : 1899,
      period: "/month",
      highlight: false,
      features: [
        "Up to 25 Active Employees",
        "Unlimited Face Attendance Kiosks",
        "Sub-Second Biometric Matching",
        "GPS Geofencing Mobile Punch",
        "Standard Leave Management",
        "CSV & Excel Timesheet Reports",
        "Standard Email Support"
      ]
    },
    {
      name: "Pro Workforce",
      desc: "Complete workforce automation with attendance-linked payroll.",
      price: annual ? 3999 : 4999,
      period: "/month",
      highlight: true,
      badge: "Most Popular",
      features: [
        "Up to 100 Active Employees",
        "Unlimited Face Attendance Kiosks",
        "Attendance-Linked Payroll Engine",
        "2-Step Leave Approvals (Manager → HR)",
        "Multi-Branch & Shift Rosters",
        "Anti-Spoofing & Liveness AI",
        "Batch PDF Payslip Generation",
        "Priority 24/7 Support"
      ]
    },
    {
      name: "Enterprise",
      desc: "Tailored for large organizations, campuses, and gym suites.",
      price: annual ? 8999 : 10999,
      period: "/month",
      highlight: false,
      features: [
        "Unlimited Employees & Locations",
        "Turnstile & Biometric Hardware API",
        "Custom Shift Patterns & Night Rosters",
        "Custom ERP & Webhook Integrations",
        "Dedicated Account Specialist",
        "99.95% Enterprise SLA Guarantee"
      ]
    }
  ];

  return (
    <section id="pricing" className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
        <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#EBF3FA] text-[#002D62] text-xs font-semibold border border-[#D9E2EC]">
          <Sparkles className="w-3.5 h-3.5 text-[#00A8A8]" />
          Transparent Pricing
        </span>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#002D62]">
          Simple, Predictable Plans for Every Team
        </h2>
        <p className="text-base sm:text-lg text-[#334E68] font-normal">
          Start with a 14-day risk-free trial. Zero hardware lock-in. No credit card required.
        </p>

        {/* Toggle Switch */}
        <div className="pt-4 flex items-center justify-center gap-3">
          <span className={`text-sm font-semibold ${!annual ? 'text-[#002D62]' : 'text-[#627D98]'}`}>Monthly</span>
          <button
            onClick={() => setAnnual(!annual)}
            className="w-13 h-7 rounded-full bg-slate-200 p-1 transition-colors relative cursor-pointer"
            aria-label="Toggle annual billing"
          >
            <div
              className={`w-5 h-5 rounded-full bg-[#002D62] shadow-sm transition-transform ${
                annual ? 'translate-x-6' : 'translate-x-0'
              }`}
            />
          </button>
          <div className="flex items-center gap-1.5">
            <span className={`text-sm font-semibold ${annual ? 'text-[#002D62]' : 'text-[#627D98]'}`}>Annual</span>
            <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-[#E6F8F8] text-[#008585] border border-[#D0EFEF]">
              Save 20%
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
        {tiers.map((tier) => (
          <div
            key={tier.name}
            className={`rounded-3xl p-8 sm:p-9 flex flex-col justify-between transition-all duration-300 relative ${
              tier.highlight
                ? 'bg-white border-2 border-[#002D62] shadow-xl shadow-blue-900/10 -translate-y-2'
                : 'bg-white border border-slate-200/90 shadow-sm hover:shadow-md hover:border-slate-300'
            }`}
          >
            {tier.highlight && (
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                <span className="bg-gradient-to-r from-[#002D62] to-[#004B8D] text-white font-semibold text-xs px-4 py-1 rounded-full shadow-md uppercase tracking-wider">
                  {tier.badge}
                </span>
              </div>
            )}

            <div>
              <h3 className="text-xl font-bold text-[#002D62] mb-1">{tier.name}</h3>
              <p className="text-[#486581] text-xs sm:text-sm min-h-[40px] leading-relaxed">{tier.desc}</p>

              <div className="my-6 pb-6 border-b border-slate-100 flex items-baseline gap-1">
                <span className="text-4xl sm:text-5xl font-extrabold text-[#002D62]">₹{tier.price.toLocaleString('en-IN')}</span>
                <span className="text-[#627D98] font-medium text-sm">{tier.period}</span>
              </div>

              <ul className="space-y-3 mb-8">
                {tier.features.map((feat, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#334E68]">
                    <div className="w-5 h-5 rounded-full bg-[#E6F8F8] flex items-center justify-center text-[#00A8A8] flex-shrink-0 mt-0.5">
                      <Check className="w-3.5 h-3.5" />
                    </div>
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            <button
              className={`w-full py-3 rounded-xl font-semibold text-sm flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                tier.highlight
                  ? 'bg-gradient-to-r from-[#002D62] to-[#004B8D] hover:from-[#001E42] hover:to-[#003B73] text-white shadow-md'
                  : 'bg-slate-50 hover:bg-slate-100 text-[#002D62] border border-slate-200'
              }`}
              onClick={() => navigate('/contact')}
            >
              <span>Get Started</span>
              <ArrowRight className="w-4 h-4 text-[#00C9CE]" />
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
