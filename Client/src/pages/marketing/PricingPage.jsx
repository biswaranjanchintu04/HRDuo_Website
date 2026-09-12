import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Check, 
  Sparkles, 
  ArrowRight, 
  HelpCircle, 
  ShieldCheck, 
  Calculator, 
  Zap, 
  Users 
} from 'lucide-react';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';

export default function PricingPage() {
  const navigate = useNavigate();
  const [annual, setAnnual] = useState(true);
  const [employeeCount, setEmployeeCount] = useState(60);

  useEffect(() => {
    document.title = "Pricing & Plans — HRDuo Transparent Subscriptions";
  }, []);

  const tiers = [
    {
      name: "Starter",
      tagline: "Essential facial attendance for small growing teams.",
      price: annual ? 1999 : 2499,
      period: "/month",
      badge: null,
      highlight: false,
      buttonText: "Start 14-Day Free Trial",
      features: [
        "Up to 25 Active Employees",
        "Unlimited Face Attendance Kiosks",
        "Sub-200ms Biometric Edge Match",
        "Standard Leave Management",
        "CSV & Excel Reports",
        "Standard Email Support (24h turnaround)"
      ]
    },
    {
      name: "Growth & Business",
      tagline: "Complete automation with live attendance & dynamic payroll.",
      price: annual ? 4799 : 5999,
      period: "/month",
      badge: "Most Popular",
      highlight: true,
      buttonText: "Start 14-Day Free Trial",
      features: [
        "Up to 150 Active Employees",
        "Unlimited Face Attendance Kiosks",
        "Automated Dynamic Payroll Engine",
        "Multi-Tier Shift & Grace Window Rules",
        "Active Liveness Anti-Spoof Protection",
        "Batch PDF Payslip Generation",
        "Employee Self-Service Mobile Portal",
        "Priority 24/7 Slack & Email Support"
      ]
    },
    {
      name: "Enterprise",
      tagline: "Custom scale, dedicated database, API webhooks, and 99.99% SLA.",
      price: annual ? 11999 : 14999,
      period: "/month",
      badge: "Full Power",
      highlight: false,
      buttonText: "Contact Enterprise Sales",
      features: [
        "Unlimited Employees & Branches",
        "Dedicated Multi-Tenant Instance",
        "Custom ERP & Webhook Integrations",
        "Custom Facial AI Threshold Tuning",
        "Dedicated Implementation Architect",
        "99.99% Uptime Guarantee SLA",
        "Quarterly Compliance & Audit Review"
      ]
    }
  ];

  // Dynamic calculations for calculator in Indian Rupee
  const estimatedHoursSavedPerMonth = Math.round(employeeCount * 0.4);
  const estimatedCostPerMonth = annual
    ? (employeeCount <= 25 ? 1999 : employeeCount <= 150 ? 4799 : 11999)
    : (employeeCount <= 25 ? 2499 : employeeCount <= 150 ? 5999 : 14999);
  const estimatedAnnualSavings = Math.round(estimatedHoursSavedPerMonth * 750 * 12 - estimatedCostPerMonth * 12);

  const faqs = [
    {
      q: "Can I use our existing tablets or laptops as kiosks?",
      a: "Yes, absolutely! HRDuo runs entirely in the modern web browser (Chrome, Edge, Safari) and does not require proprietary scanners. Any device with a standard webcam can serve as a high-security attendance kiosk."
    },
    {
      q: "Is there a free trial?",
      a: "Yes, we offer a 14-day fully featured risk-free trial. No credit card is required to begin testing facial attendance and payroll automation."
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
      a: "Never. HRDuo extracts 128-dimensional irreversible mathematical floats and discards camera images instantly in memory. We are fully compliant with GDPR and global biometric regulations."
    }
  ];

  return (
    <div className="py-8 sm:py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-16 sm:space-y-24">
      
      {/* 1. Header & Billing Toggle */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <Badge variant="yellow">
          <Sparkles className="w-3.5 h-3.5 mr-1" />
          Transparent Pricing
        </Badge>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 leading-tight">
          Simple Plans for Teams of <br />
          <span className="text-[#008C75]">Any Shape & Scale.</span>
        </h1>
        <p className="text-base sm:text-lg text-slate-600 font-medium leading-relaxed">
          Zero hidden fees. Zero hardware lock-in. Start with our 14-day trial and experience the fastest biometric attendance platform.
        </p>

        {/* Toggle Switch */}
        <div className="pt-4 flex items-center justify-center gap-3">
          <span className={`text-sm font-bold ${!annual ? 'text-slate-950 font-black' : 'text-slate-500'}`}>
            Monthly Billing
          </span>
          <button
            onClick={() => setAnnual(!annual)}
            className="w-14 h-8 rounded-full bg-[#FFC933] p-1 transition-colors relative border border-slate-900 focus:outline-none"
            aria-label="Toggle annual billing"
          >
            <div
              className={`w-6 h-6 rounded-full bg-slate-950 transition-transform duration-200 ${
                annual ? 'translate-x-6' : 'translate-x-0'
              }`}
            />
          </button>
          <div className="flex items-center gap-2">
            <span className={`text-sm font-bold ${annual ? 'text-slate-950 font-black' : 'text-slate-500'}`}>
              Annual Billing
            </span>
            <span className="text-xs font-black px-2.5 py-0.5 rounded-full bg-[#E6F7F5] text-[#008C75] border border-[#BCECE5]">
              Save 20%
            </span>
          </div>
        </div>
      </div>

      {/* 2. Bento Pricing Tiers */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
        {tiers.map((tier) => (
          <div
            key={tier.name}
            className={`rounded-3xl sm:rounded-[2.5rem] p-8 sm:p-10 flex flex-col justify-between transition-all duration-300 relative ${
              tier.highlight
                ? 'bg-white border-2 border-slate-900 shadow-2xl ring-4 ring-[#FFC933]/30 lg:-translate-y-2'
                : 'bg-white/95 border border-[#F1E8D9] shadow-[0_4px_24px_rgba(0,0,0,0.04)] hover:shadow-xl'
            }`}
          >
            {tier.badge && (
              <div className="absolute -top-3.5 right-8 bg-[#FFC933] text-slate-950 font-black text-[11px] uppercase tracking-wider py-1 px-3.5 rounded-full border border-slate-900 shadow-sm">
                {tier.badge}
              </div>
            )}

            <div>
              <h3 className="text-2xl font-black text-slate-900 mb-1">{tier.name}</h3>
              <p className="text-xs sm:text-sm text-slate-600 font-medium mb-6 min-h-[36px]">
                {tier.tagline}
              </p>

              <div className="flex items-baseline gap-1 mb-6 pb-6 border-b border-slate-100">
                <span className="text-4xl sm:text-5xl font-black text-slate-900">
                  ₹{tier.price.toLocaleString('en-IN')}
                </span>
                <span className="text-sm font-semibold text-slate-500">{tier.period}</span>
              </div>

              <div className="space-y-3 mb-8">
                <div className="text-xs font-black uppercase tracking-wider text-slate-900">
                  Included Features:
                </div>
                {tier.features.map((feat, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm font-semibold text-slate-700">
                    <Check className="w-4 h-4 text-[#008C75] flex-shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            <Button
              variant={tier.highlight ? 'primary' : 'outline'}
              size="lg"
              onClick={() => {
                if (tier.name === 'Enterprise') {
                  navigate('/contact');
                } else {
                  navigate('/face-attendance');
                }
              }}
              className="w-full flex items-center justify-center gap-2"
            >
              <span>{tier.buttonText}</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        ))}
      </div>

      {/* 3. Interactive Pricing & ROI Calculator */}
      <div className="bg-white rounded-3xl sm:rounded-[2.5rem] border border-[#F1E8D9] p-8 sm:p-12 shadow-[0_4px_24px_rgba(0,0,0,0.04)]">
        <div className="max-w-3xl mb-8 space-y-2">
          <Badge variant="teal">
            <Calculator className="w-3.5 h-3.5 mr-1" />
            Interactive ROI Calculator
          </Badge>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
            Calculate Your Organization's Time & Cost Savings
          </h2>
          <p className="text-sm sm:text-base text-slate-600 font-medium">
            Slide to your team size to estimate monthly cost and hours saved on attendance and payroll administration.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="font-bold text-slate-800 text-sm">Active Employees:</span>
                <span className="font-black text-2xl text-[#008C75]">{employeeCount} People</span>
              </div>
              <input
                type="range"
                min="5"
                max="300"
                step="5"
                value={employeeCount}
                onChange={(e) => setEmployeeCount(Number(e.target.value))}
                className="w-full h-3 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#008C75]"
              />
              <div className="flex justify-between text-xs text-slate-400 mt-1 font-semibold">
                <span>5 employees</span>
                <span>150 employees</span>
                <span>300+ employees</span>
              </div>
            </div>

            <div className="p-4 bg-[#FDFBF7] rounded-2xl border border-[#F1E8D9] space-y-2 text-xs sm:text-sm text-slate-600 font-medium">
              <div className="flex items-center gap-2 text-slate-900 font-bold">
                <Zap className="w-4 h-4 text-[#FFC933]" />
                <span>Estimated Hours Saved: ~{estimatedHoursSavedPerMonth} hours / month</span>
              </div>
              <p>
                Eliminates manual punch entry, shift reconciliation, supervisor signature collection, and formula checks.
              </p>
            </div>
          </div>

          <div className="lg:col-span-5 bg-slate-900 text-white rounded-3xl p-6 sm:p-8 space-y-4">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Recommended Plan Estimate
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl sm:text-5xl font-black text-[#FFC933]">
                ₹{estimatedCostPerMonth.toLocaleString('en-IN')}
              </span>
              <span className="text-slate-400 text-sm font-semibold">/ month</span>
            </div>
            <div className="text-xs text-slate-300 font-medium">
              Plan:{' '}
              <strong className="text-white font-bold">
                {employeeCount <= 25 ? 'Starter' : employeeCount <= 150 ? 'Growth & Business' : 'Enterprise'}
              </strong>
            </div>

            <div className="pt-4 border-t border-slate-800">
              <div className="text-xs text-slate-400 mb-1">Estimated Annual Net Value Saved:</div>
              <div className="text-2xl font-black text-emerald-400">
                +₹{estimatedAnnualSavings.toLocaleString('en-IN')} / year
              </div>
            </div>

            <Button
              variant="primary"
              size="md"
              onClick={() => navigate('/contact')}
              className="w-full mt-2"
            >
              Get Custom Proposal
            </Button>
          </div>
        </div>
      </div>

      {/* 4. Pricing FAQs */}
      <div className="space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <Badge variant="yellow">Got Questions?</Badge>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900">
            Frequently Asked Pricing Questions
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
          {faqs.map((faq, idx) => (
            <div key={idx} className="bg-white rounded-3xl p-6 sm:p-8 border border-[#F1E8D9] shadow-sm space-y-2">
              <h3 className="font-black text-slate-900 text-base sm:text-lg">
                {faq.q}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                {faq.a}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* 5. Bottom CTA */}
      <div className="bg-slate-950 text-white rounded-3xl sm:rounded-[2.5rem] p-8 sm:p-12 text-center relative overflow-hidden">
        <div className="max-w-2xl mx-auto space-y-4 relative z-10">
          <h2 className="text-3xl sm:text-4xl font-black">
            Start Your 14-Day Free Trial Today
          </h2>
          <p className="text-slate-300 text-sm sm:text-base font-medium">
            No credit card required. Launch your first facial attendance kiosk in under 3 minutes.
          </p>
          <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
            <Button
              variant="primary"
              size="lg"
              onClick={() => navigate('/face-attendance')}
              className="flex items-center gap-2"
            >
              <span>Launch Live Kiosk Demo</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => navigate('/contact')}
              className="border-white/20 text-white hover:bg-white/10"
            >
              Talk to Sales Team
            </Button>
          </div>
        </div>
      </div>

    </div>
  );
}
