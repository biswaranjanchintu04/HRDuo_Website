import React from 'react';
import { Outlet } from 'react-router-dom';
import { MarketingHeader } from '../pages/marketing/MarketingHeader';
import { MarketingFooter } from '../pages/marketing/MarketingFooter';

export default function MarketingLayout() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#334E68] font-sans antialiased selection:bg-[#002D62] selection:text-white relative overflow-x-hidden">
      {/* Decorative Ambient Lighting in HRDuo Navy & Teal */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[650px] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#002D62]/8 via-[#00A8A8]/6 to-transparent blur-3xl" />
        <div className="absolute top-1/3 right-0 w-[450px] h-[450px] bg-[#00A8A8]/5 rounded-full blur-3xl" />
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
