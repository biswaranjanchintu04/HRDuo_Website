import React from 'react';

export function Card({
  children,
  className = '',
  highlight = false,
  onClick,
  ...props
}) {
  return (
    <div
      onClick={onClick}
      className={`bg-white/95 backdrop-blur-sm rounded-3xl sm:rounded-[2rem] border ${
        highlight 
          ? 'border-[#008C75] ring-2 ring-[#008C75]/15 shadow-xl' 
          : 'border-[#F1E8D9] shadow-[0_4px_24px_rgba(0,0,0,0.04)] hover:shadow-lg'
      } transition-all duration-300 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardHeader({ children, className = '' }) {
  return <div className={`p-6 sm:p-8 pb-4 ${className}`}>{children}</div>;
}

export function CardTitle({ children, className = '' }) {
  return <h3 className={`text-xl sm:text-2xl font-black text-slate-900 tracking-tight ${className}`}>{children}</h3>;
}

export function CardDescription({ children, className = '' }) {
  return <p className={`text-sm text-slate-600 mt-1.5 leading-relaxed ${className}`}>{children}</p>;
}

export function CardContent({ children, className = '' }) {
  return <div className={`p-6 sm:p-8 pt-0 ${className}`}>{children}</div>;
}

export function CardFooter({ children, className = '' }) {
  return <div className={`p-6 sm:p-8 pt-4 border-t border-slate-100 flex items-center justify-between ${className}`}>{children}</div>;
}
