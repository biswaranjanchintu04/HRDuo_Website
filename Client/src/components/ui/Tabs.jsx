import React from 'react';
import { motion } from 'framer-motion';

export function Tabs({ tabs, activeTab, onChange, className = '' }) {
  return (
    <div className={`inline-flex p-1.5 rounded-full bg-white border border-[#F1E8D9] shadow-sm ${className}`}>
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            className={`relative px-5 py-2 rounded-full text-xs sm:text-sm font-bold transition-all duration-200 cursor-pointer ${
              isActive ? 'text-slate-950' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {isActive && (
              <motion.div
                layoutId="activePillTab"
                className="absolute inset-0 rounded-full bg-[#FFC933] shadow-sm"
                transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
              />
            )}
            <span className="relative z-10 flex items-center gap-2">
              {tab.icon && <tab.icon className="w-4 h-4" />}
              {tab.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}
