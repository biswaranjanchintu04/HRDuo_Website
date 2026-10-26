import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Building2, ArrowLeft, ArrowRight, Lock, Mail, CheckCircle2, Briefcase, ShieldCheck, User } from 'lucide-react';

const ROLE_CONFIGS = {
  ADMIN: {
    icon: Building2,
    iconBg: 'bg-[#FFC933]',
    iconColor: 'text-slate-950',
    accent: '#008C75',
    label: 'HR & Organization Admin',
    redirectPath: '/admin/dashboard',
  },
  MANAGER: {
    icon: Briefcase,
    iconBg: 'bg-violet-600',
    iconColor: 'text-white',
    accent: '#7C3AED',
    label: 'Manager Portal',
    redirectPath: '/manager/dashboard',
  },
  EMPLOYEE: {
    icon: User,
    iconBg: 'bg-emerald-500',
    iconColor: 'text-white',
    accent: '#059669',
    label: 'Employee Portal',
    redirectPath: '/employee/dashboard',
  },
  HR: {
    icon: Building2,
    iconBg: 'bg-rose-600',
    iconColor: 'text-white',
    accent: '#E11D48',
    label: 'HR Portal',
    redirectPath: '/hr/dashboard',
  },
  SUPER_ADMIN: {
    icon: ShieldCheck,
    iconBg: 'bg-indigo-600',
    iconColor: 'text-white',
    accent: '#4F46E5',
    label: 'Super Admin Console',
    redirectPath: '/superadmin/dashboard',
  },
};

const ROLE_NAMES = {
  ADMIN: 'Company Administrator',
  HR: 'HR Operations Lead',
  MANAGER: 'Alex Thompson',
  EMPLOYEE: 'Sarah Jenkins',
  SUPER_ADMIN: 'Super Admin',
};

export default function Login({ roleTitle, role = 'ADMIN', defaultEmail = 'admin@hrduo.com' }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState(defaultEmail);
  const [password, setPassword] = useState('password123');
  const [loading, setLoading] = useState(false);

  const config = ROLE_CONFIGS[role] || ROLE_CONFIGS.ADMIN;
  const Icon = config.icon;
  const displayTitle = roleTitle || config.label;

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('role', role);
      localStorage.setItem('name', ROLE_NAMES[role] || 'User');
      setLoading(false);
      navigate(config.redirectPath);
    }, 600);
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-slate-900 flex flex-col justify-between selection:bg-[#FFC933] selection:text-slate-950 relative overflow-hidden">
      {/* Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-6xl h-[450px] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#FFC933]/20 via-[#008C75]/10 to-transparent blur-3xl pointer-events-none" />

      {/* Header */}
      <header className="relative z-10 max-w-7xl mx-auto w-full px-6 py-6 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <img src="/hrduo_logo.png" alt="HRDuo Logo" className="h-9 w-auto object-contain" />
        </Link>
        <Link
          to="/login"
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-700 hover:text-slate-950 bg-white px-3.5 py-2 rounded-full border border-[#F1E8D9] shadow-sm"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Switch Portal</span>
        </Link>
      </header>

      {/* Main Form */}
      <main className="relative z-10 max-w-md mx-auto w-full px-6 py-8">
        <div className="bg-white rounded-3xl border-2 border-[#F1E8D9] p-8 shadow-xl">
          <div className="text-center mb-8">
            <div className={`w-14 h-14 mx-auto rounded-2xl ${config.iconBg} flex items-center justify-center shadow-md mb-4`}>
              <Icon className={`w-7 h-7 stroke-[2.2] ${config.iconColor}`} />
            </div>
            <h1 className="text-2xl font-black text-slate-950 mb-1">{displayTitle}</h1>
            <p className="text-xs text-slate-500 font-medium">Enter your credentials to access your portal</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Work Email
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#008C75] focus:border-transparent transition-all"
                  placeholder="you@company.com"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Password
                </label>
                <span className="text-[11px] font-bold text-[#008C75] hover:underline cursor-pointer">
                  Forgot?
                </span>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#008C75] focus:border-transparent transition-all"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 bg-slate-950 hover:bg-[#008C75] text-white py-3.5 rounded-xl font-black text-sm flex items-center justify-center gap-2 transition-colors duration-200 shadow-md cursor-pointer"
            >
              {loading ? (
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <span>Sign In</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-slate-100 text-center">
            <p className="text-xs text-slate-500">
              Need access?{' '}
              <Link to="/contact" className="font-bold text-[#008C75] hover:underline">
                Request an enterprise demo
              </Link>
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 max-w-7xl mx-auto w-full px-6 py-6 text-center text-xs text-slate-500">
        <div className="flex items-center justify-center gap-2 mb-1">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
          <span>End-to-end encrypted · SOC 2 Compliant</span>
        </div>
        © {new Date().getFullYear()} HRDuo Inc. All rights reserved.
      </footer>
    </div>
  );
}
