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
import { ArrowRight, Sparkles, Layers, ShieldCheck } from 'lucide-react';
import { Button } from '../../components/ui/Button';

export default function MarketingHome() {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "HRDuo — Your People. Our Priority.";
  }, []);

  return (
    <div className="space-y-4">
      {/* 1. Hero Section replicating the reference image exactly */}
      <HeroBento />

      {/* 2. Metric Strip & Trust Badges */}
      <TrustBento />

      {/* 3. Asymmetrical Bento Features Grid */}
      <FeaturesBento />

      {/* Section Jump to Solutions Page */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 text-center">
        <div className="bg-white/80 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-[#F1E8D9] flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
          <div className="text-left space-y-1">
            <h3 className="text-lg sm:text-xl font-black text-slate-900 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-[#FFC933]" />
              Want to see all workforce modules in detail?
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 font-medium">
              Explore deep dives into Facial Recognition, Shift Rosters, and Automated Dynamic Payroll.
            </p>
          </div>
          <Button
            variant="primary"
            size="md"
            onClick={() => navigate('/solutions')}
            className="whitespace-nowrap flex items-center gap-1.5 flex-shrink-0"
          >
            <span>Explore All Solutions</span>
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* 4. Services Section replicating User's Reference Pipeline & Quote Card */}
      <ServicesJourney />

      {/* Section Jump to Services Page */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 text-center">
        <div className="bg-[#E6F7F5] rounded-3xl p-6 sm:p-8 border border-[#BCECE5] flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
          <div className="text-left space-y-1">
            <h3 className="text-lg sm:text-xl font-black text-slate-900 flex items-center gap-2">
              <Layers className="w-5 h-5 text-[#008C75]" />
              Looking for Enterprise Deployment & White-Glove Setup?
            </h3>
            <p className="text-xs sm:text-sm text-slate-700 font-medium">
              Discover our hardware provisioning, custom ERP integrations, and 24/7 SLA guarantees.
            </p>
          </div>
          <Button
            variant="primary"
            size="md"
            onClick={() => navigate('/services')}
            className="whitespace-nowrap flex items-center gap-1.5 flex-shrink-0 bg-slate-900 text-white hover:bg-slate-800"
          >
            <span>View All Services & SLA</span>
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </div>

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
