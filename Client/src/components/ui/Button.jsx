import React from 'react';

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  icon: Icon,
  disabled = false,
  onClick,
  type = 'button',
  ...props
}) {
  const baseStyles = "inline-flex items-center justify-center font-bold transition-all duration-200 select-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed";

  const sizeStyles = {
    sm: "text-xs px-4 py-1.5 rounded-full gap-1.5",
    md: "text-sm px-6 py-2.5 rounded-full gap-2",
    lg: "text-base px-8 py-3.5 rounded-full gap-2.5",
  };

  const variantStyles = {
    primary: "bg-[#FFC933] hover:bg-[#F59E0B] text-slate-950 border border-slate-900 shadow-[0_3px_0_0_#0F172A] hover:shadow-[0_1px_0_0_#0F172A] hover:translate-y-0.5",
    secondary: "bg-white hover:bg-slate-50 text-slate-900 border border-[#F1E8D9] shadow-sm",
    outline: "border-2 border-slate-900 bg-transparent text-slate-900 hover:bg-slate-900/5",
    teal: "bg-[#008C75] hover:bg-[#0A6E5D] text-white shadow-md shadow-[#008C75]/20 hover:translate-y-0.5",
    ghost: "bg-transparent hover:bg-slate-100 text-slate-700",
    soft: "bg-[#FFC933]/15 text-slate-900 hover:bg-[#FFC933]/25",
    softTeal: "bg-[#E6F7F5] text-[#008C75] hover:bg-[#D1F2EE]",
  };

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`${baseStyles} ${sizeStyles[size] || sizeStyles.md} ${variantStyles[variant] || variantStyles.primary} ${className}`}
      {...props}
    >
      {Icon && <Icon className="w-4 h-4" />}
      {children}
    </button>
  );
}
