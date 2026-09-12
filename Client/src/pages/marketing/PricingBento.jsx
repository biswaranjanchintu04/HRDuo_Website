import React, { useState } from 'react';
import { Check, Sparkles, ArrowRight } from 'lucide-react';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';

export function PricingBento() {
  const [annual, setAnnual] = useState(true);

  const tiers = [
    {
      name: "Starter",
      desc: "For growing teams seeking modern hardware-free attendance.",
      price: annual ? 1999 : 2499,
      period: "/month",
      highlight: false,
      features: [
        "Up to 25 Active Employees",
        "Unlimited Face Attendance Kiosks",
        "Sub-200ms Biometric Matching",
        "Basic Leave Management",
        "CSV & Excel Reports",
        "Standard Email Support"
      ]
    },
    {
      name: "Growth & Business",
      desc: "Complete workforce automation with integrated dynamic payroll.",
      price: annual ? 4799 : 5999,
      period: "/month",
      highlight: true,
      badge: "Most Popular",
      features: [
        "Up to 150 Active Employees",
        "Unlimited Face Attendance Kiosks",
        "Automated Dynamic Payroll Engine",
        "Multi-Tier Shift Management",
        "Liveness Anti-Spoof Protection",
        "Batch PDF Payslip Generation",
        "Priority 24/7 Slack Support"
      ]
    },
    {
      name: "Enterprise",
      desc: "Custom deployment, dedicated database instances, and SLA.",
      price: annual ? 11999 : 14999,
      period: "/month",
      highlight: false,
      features: [
        "Unlimited Employees & Branches",
        "Dedicated Multi-Tenant Instance",
        "Custom ERP & Webhook Integrations",
        "Custom Facial AI Sensitivity Sliders",
        "Dedicated Account Specialist",
        "99.99% Uptime Guarantee SLA"
      ]
    }
  ];

  return (
    <section id="pricing" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
        <Badge variant="yellow">Transparent Pricing</Badge>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-slate-900">
          Simple Plans for Teams of Any Size
        </h2>
        <p className="text-base sm:text-lg text-slate-600 font-medium">
          Start with a 14-day risk-free trial. No credit card required.
        </p>

        {/* Toggle Switch */}
        <div className="pt-2 flex items-center justify-center gap-3">
          <span className={`text-sm font-bold ${!annual ? 'text-slate-900' : 'text-slate-500'}`}>Monthly</span>
          <button
            onClick={() => setAnnual(!annual)}
            className="w-14 h-8 rounded-full bg-[#FFC933] p-1 transition-colors relative border border-slate-900"
          >
            <div
              className={`w-6 h-6 rounded-full bg-slate-950 transition-transform ${
                annual ? 'translate-x-6' : 'translate-x-0'
              }`}
            />
          </button>
          <div className="flex items-center gap-1.5">
            <span className={`text-sm font-bold ${annual ? 'text-slate-900' : 'text-slate-500'}`}>Annual</span>
            <span className="text-[11px] font-extrabold px-2 py-0.5 rounded-full bg-[#E6F7F5] text-[#008C75] border border-[#BCECE5]">
              Save 20%
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
        {tiers.map((tier) => (
          <div
            key={tier.name}
            className={`rounded-3xl sm:rounded-[2.5rem] p-8 sm:p-10 flex flex-col justify-between transition-all duration-300 relative ${
              tier.highlight
                ? 'bg-white border-2 border-slate-900 shadow-2xl ring-4 ring-[#FFC933]/30 -translate-y-2'
                : 'bg-white/95 border border-[#F1E8D9] shadow-[0_4px_24px_rgba(0,0,0,0.04)] hover:shadow-xl'
            }`}
          >
            {tier.highlight && (
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                <span className="bg-[#FFC933] text-slate-950 font-black text-xs px-4 py-1 rounded-full border border-slate-900 shadow-sm uppercase tracking-wider">
                  {tier.badge}
                </span>
              </div>
            )}

            <div>
              <h3 className="text-2xl font-black text-slate-900 mb-1">{tier.name}</h3>
              <p className="text-slate-600 text-xs sm:text-sm min-h-[40px]">{tier.desc}</p>

              <div className="my-6 pb-6 border-b border-slate-100 flex items-baseline gap-1">
                <span className="text-4xl sm:text-5xl font-black text-slate-900">₹{tier.price.toLocaleString('en-IN')}</span>
                <span className="text-slate-500 font-semibold text-sm">{tier.period}</span>
              </div>

              <ul className="space-y-3 mb-8">
                {tier.features.map((feat, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-slate-700">
                    <div className="w-5 h-5 rounded-full bg-[#E6F7F5] flex items-center justify-center text-[#008C75] flex-shrink-0 mt-0.5">
                      <Check className="w-3.5 h-3.5" />
                    </div>
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            <Button
              variant={tier.highlight ? 'primary' : 'outline'}
              className="w-full justify-center py-3.5"
              onClick={() => window.location.href = '/face-attendance'}
            >
              Get Started
              <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
        ))}
      </div>
    </section>
  );
}
