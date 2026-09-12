import React from 'react';

export function HrDuoLogo({ className = "h-9 w-auto", withText = true, textColor = "text-slate-900" }) {
  return (
    <div className={`flex items-center gap-2.5 select-none ${className}`}>
      {/* Exact Monogram HD Logo from Reference */}
      <svg 
        viewBox="0 0 48 48" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className="w-9 h-9 flex-shrink-0"
      >
        {/* Left Navy Column of H */}
        <rect x="6" y="8" width="6.5" height="32" rx="3.25" fill="#0D2538" />
        {/* Connecting Crossbar */}
        <rect x="6" y="21" width="16" height="6" rx="3" fill="#0D2538" />
        {/* Middle Navy Column */}
        <rect x="15.5" y="8" width="6.5" height="32" rx="3.25" fill="#0D2538" />
        
        {/* Interlocking Teal D Shape */}
        <path 
          d="M21 8C33 8 41 15 41 24C41 33 33 40 21 40V33.5C29 33.5 34.5 29.5 34.5 24C34.5 18.5 29 14.5 21 14.5V8Z" 
          fill="#00A88F" 
        />
        <circle cx="21.5" cy="24" r="3" fill="#00A88F" />
      </svg>

      {withText && (
        <span className={`text-xl font-extrabold tracking-tight ${textColor} font-sans`}>
          HRDuo
        </span>
      )}
    </div>
  );
}
