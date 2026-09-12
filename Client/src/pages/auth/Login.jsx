import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Building2, ArrowLeft, ArrowRight, Lock, Mail, Sparkles, CheckCircle2, Shield } from 'lucide-react';

export default function Login({ roleTitle = 'HR & Organization Admin', role = 'ADMIN', defaultEmail = 'admin@hrduo.com' }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState(defaultEmail);
  const [password, setPassword] = useState('password123');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('role', role);
      localStorage.setItem('name', role === 'ADMIN' ? 'HR Administrator' : role === 'EMPLOYEE' ? 'Sarah Jenkins' : 'Super Admin');
      setLoading(false);
      navigate('/');
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
            <div className="w-14 h-14 mx-auto rounded-2xl bg-[#FFC933] flex items-center justify-center text-slate-950 shadow-md mb-4">
              <Building2 className="w-7 h-7 stroke-[2.2]" />
            </div>
            <h1 className="text-2xl font-black text-slate-950 mb-1">{roleTitle}</h1>
            <p className="text-xs text-slate-500 font-medium">Enter your credentials to manage your organization</p>
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
                  placeholder="admin@company.com"
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
        © {new Date().getFullYear()} HRDuo Inc. All rights reserved.
      </footer>
    </div>
  );
}
