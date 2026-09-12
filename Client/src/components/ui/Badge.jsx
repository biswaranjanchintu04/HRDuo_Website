import React from 'react';

export function Badge({
  children,
  variant = 'yellow',
  dot = false,
  className = '',
  ...props
}) {
  const variantStyles = {
    yellow: "bg-[#FEF3C7] text-slate-900 border border-[#FDE68A]",
    teal: "bg-[#E6F7F5] text-[#008C75] border border-[#BCECE5]",
    white: "bg-white text-slate-800 border border-[#F1E8D9] shadow-sm",
    dark: "bg-slate-900 text-white border border-slate-800",
    success: "bg-emerald-50 text-emerald-700 border border-emerald-200",
    blue: "bg-blue-50 text-blue-700 border border-blue-200",
  };

  const dotColors = {
    yellow: "bg-[#FFC933]",
    teal: "bg-[#008C75]",
    white: "bg-emerald-500",
    dark: "bg-[#FFC933]",
    success: "bg-emerald-500",
    blue: "bg-blue-500",
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-bold tracking-wide select-none ${variantStyles[variant] || variantStyles.yellow} ${className}`}
      {...props}
    >
      {dot && (
        <span className={`w-2 h-2 rounded-full ${dotColors[variant] || dotColors.yellow} animate-pulse`} />
      )}
      {children}
    </span>
  );
}
