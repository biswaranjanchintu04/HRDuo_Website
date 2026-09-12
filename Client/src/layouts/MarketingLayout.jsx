import React from 'react';
import { Outlet } from 'react-router-dom';
import { MarketingHeader } from '../pages/marketing/MarketingHeader';
import { MarketingFooter } from '../pages/marketing/MarketingFooter';

export default function MarketingLayout() {
  return (
    <div className="min-h-screen bg-grid-warm text-slate-900 font-sans antialiased selection:bg-[#FFC933] selection:text-slate-950 relative overflow-x-hidden">
      {/* Decorative Warm Ambient Lighting */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[600px] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#FFC933]/15 via-[#008C75]/5 to-transparent blur-3xl" />
      </div>

      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Persistent Marketing Header */}
        <MarketingHeader />

        {/* Dynamic Page Content */}
        <main className="flex-grow pt-24 sm:pt-28">
          <Outlet />
        </main>

        {/* Global Marketing Footer */}
        <MarketingFooter />
      </div>
    </div>
  );
}
