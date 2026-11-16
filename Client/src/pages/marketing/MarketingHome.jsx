import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { HeroBento } from './HeroBento';
import { TrustBento } from './TrustBento';
import { FeaturesBento } from './FeaturesBento';
import { ServicesJourney } from './ServicesJourney';
import { ShowcaseBento } from './ShowcaseBento';
import { HowItWorksBento } from './HowItWorksBento';
import { PricingBento } from './PricingBento';
import { SecurityBento } from './SecurityBento';
import { TestimonialsBento } from './TestimonialsBento';
import { FaqBento } from './FaqBento';
import { CtaBento } from './CtaBento';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function MarketingHome() {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "HRDuo — Smart HR. Stronger Together.";
  }, []);

  return (
    <div className="space-y-4">
      {/* 1. Hero Section with HRDuo brand design */}
      <HeroBento />

      {/* 2. Metric Strip & Trust Badges */}
      <TrustBento />

      {/* 3. Core Features Grid */}
      <FeaturesBento />

      {/* Section Jump to Solutions Page */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 text-center">
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
          <div className="text-left space-y-1">
            <h3 className="text-lg sm:text-xl font-bold text-[#002D62] flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-[#00A8A8]" />
              Want to see all workforce modules in detail?
            </h3>
            <p className="text-xs sm:text-sm text-[#486581] font-normal">
              Explore deep dives into Facial Recognition, Shift Rosters, Geofencing, and Attendance-Linked Payroll.
            </p>
          </div>
          <button
            onClick={() => navigate('/solutions')}
            className="bg-gradient-to-r from-[#002D62] to-[#004B8D] hover:from-[#001E42] hover:to-[#003B73] text-white px-5 py-2.5 rounded-xl font-semibold text-xs sm:text-sm whitespace-nowrap flex items-center gap-1.5 flex-shrink-0 cursor-pointer shadow-sm"
          >
            <span>Explore All Solutions</span>
            <ArrowRight className="w-4 h-4 text-[#00C9CE]" />
          </button>
        </div>
      </div>

      {/* 4. Services Section */}
      <ServicesJourney />

      {/* 5. Deep-Dive Interactive Showcase (Attendance, Payroll, Leaves) */}
      <ShowcaseBento />

      {/* 6. How It Works Pipeline */}
      <HowItWorksBento />

      {/* 7. Security & Mathematical Vector Encryption */}
      <SecurityBento />

      {/* 8. Bento Pricing Tiers */}
      <PricingBento />

      {/* 9. Social Proof & Customer Reviews */}
      <TestimonialsBento />

      {/* 10. Interactive Bento FAQ Accordion */}
      <FaqBento />

      {/* 11. High-Impact Conversion CTA */}
      <CtaBento />
    </div>
  );
}
