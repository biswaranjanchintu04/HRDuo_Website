import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Building2, 
  ArrowLeft, 
  ArrowRight, 
  Lock, 
  Mail, 
  CheckCircle2, 
  Briefcase, 
  ShieldCheck, 
  User, 
  Eye, 
  EyeOff, 
  Sparkles,
  Info,
  Users2,
  Check
} from 'lucide-react';
import { useAlert } from '../../context/AlertContext';

const DEMO_ACCOUNTS = [
  {
    role: 'SUPER_ADMIN',
    name: 'Alexander Vance',
    title: 'Platform Director',
    email: 'root@hrduo.internal',
    password: 'password123',
    icon: ShieldCheck,
    color: 'bg-indigo-600',
    border: 'border-indigo-200',
    badge: 'Super Admin',
    path: '/superadmin/dashboard'
  },
  {
    role: 'ADMIN',
    name: 'Elena Rostova',
    title: 'VP Operations & Admin',
    email: 'admin@hrduo.com',
    password: 'password123',
    icon: Building2,
    color: 'bg-blue-600',
    border: 'border-blue-200',
    badge: 'Company Admin',
    path: '/admin/dashboard'
  },
  {
    role: 'HR',
    name: 'Claire Bennett',
    title: 'Head of People Ops',
    email: 'hr@hrduo.com',
    password: 'password123',
    icon: Users2,
    color: 'bg-rose-600',
    border: 'border-rose-200',
    badge: 'HR Portal',
    path: '/hr/dashboard'
  },
  {
    role: 'MANAGER',
    name: 'Marcus Sterling',
    title: 'Engineering Lead',
    email: 'manager@hrduo.com',
    password: 'password123',
    icon: Briefcase,
    color: 'bg-purple-600',
    border: 'border-purple-200',
    badge: 'Manager',
    path: '/manager/dashboard'
  },
  {
    role: 'EMPLOYEE',
    name: 'Sophia Chen',
    title: 'Senior Full Stack Engineer',
    email: 'employee@hrduo.com',
    password: 'password123',
    icon: User,
    color: 'bg-emerald-600',
    border: 'border-emerald-200',
    badge: 'Employee',
    path: '/employee/dashboard'
  }
];

export default function Login({ role: initialRole = 'ADMIN', roleTitle }) {
  const navigate = useNavigate();
  const { showToast } = useAlert();

  const selectedInitialAccount = DEMO_ACCOUNTS.find(a => a.role === initialRole) || DEMO_ACCOUNTS[1];

  const [selectedRole, setSelectedRole] = useState(selectedInitialAccount.role);
  const [email, setEmail] = useState(selectedInitialAccount.email);
  const [password, setPassword] = useState(selectedInitialAccount.password);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [loading, setLoading] = useState(false);
  const [showForgotModal, setShowForgotModal] = useState(false);

  const activeAccount = DEMO_ACCOUNTS.find(a => a.role === selectedRole) || DEMO_ACCOUNTS[1];

  const handleSelectRole = (acc) => {
    setSelectedRole(acc.role);
    setEmail(acc.email);
    setPassword(acc.password);
    showToast(`Loaded ${acc.badge} credentials`, 'info');
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('role', activeAccount.role);
      localStorage.setItem('name', activeAccount.name);
      localStorage.setItem('userEmail', email);
      setLoading(false);
      showToast(`Welcome back, ${activeAccount.name}!`, 'success');
      navigate(activeAccount.path);
    }, 450);
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-slate-900 flex flex-col justify-between selection:bg-[#FFC933] selection:text-slate-950 relative overflow-hidden font-poppins">
      {/* Warm Ambient Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-6xl h-[450px] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#FFC933]/20 via-[#0061E0]/10 to-transparent blur-3xl pointer-events-none" />

      {/* Top Navbar */}
      <header className="relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-6 py-5 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-white p-1.5 shadow-md border border-[#F1E8D9] flex items-center justify-center">
            <img 
              src="/favicon.png" 
              alt="HRDuo" 
              className="w-full h-full object-contain"
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.parentNode.innerHTML = '<span class="text-[#0061E0] font-black text-xs">HR</span>';
              }}
            />
          </div>
          <div>
            <div className="font-extrabold text-slate-900 text-lg leading-tight">HRDuo</div>
            <div className="text-[10px] font-bold uppercase tracking-wider text-[#0061E0]">Enterprise Cloud</div>
          </div>
        </Link>

        <Link
          to="/"
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-700 hover:text-slate-950 bg-white px-3.5 py-2 rounded-full border border-[#F1E8D9] shadow-sm hover:shadow transition-all"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Landing Page</span>
        </Link>
      </header>

      {/* Main Container */}
      <main className="max-w-5xl mx-auto w-full px-4 sm:px-6 py-6 md:py-10">
        {/* Demonstration Disclaimer Banner */}
        <div className="mb-6 p-4 rounded-2xl bg-blue-50/80 border border-blue-200/80 flex items-start gap-3 shadow-2xs">
          <Info className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
          <div className="text-xs text-blue-900 leading-relaxed">
            <span className="font-bold">Interactive Frontend Demonstration:</span> No real backend or database is used. Select any of the 5 predefined demo roles below or click "Sign In" to immediately explore all features with full mock data and live local state persistence.
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Predefined Demo Roles Selector */}
          <div className="lg:col-span-5 space-y-4">
            <div>
              <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">Select Demo Role</h2>
              <p className="text-xs text-slate-500 mt-1 font-medium">
                Choose a portal persona to auto-populate credentials:
              </p>
            </div>

            <div className="space-y-2.5">
              {DEMO_ACCOUNTS.map((acc) => {
                const Icon = acc.icon;
                const isSelected = selectedRole === acc.role;
                return (
                  <button
                    key={acc.role}
                    type="button"
                    onClick={() => handleSelectRole(acc)}
                    className={`w-full text-left p-3.5 rounded-2xl border transition-all flex items-center justify-between cursor-pointer ${
                      isSelected
                        ? 'bg-white border-blue-500 shadow-md ring-2 ring-blue-500/10'
                        : 'bg-white/80 hover:bg-white border-slate-200/80 hover:border-slate-300 shadow-2xs'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-xl ${acc.color} text-white flex items-center justify-center shrink-0 shadow-2xs`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-slate-900">{acc.name}</span>
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-slate-100 text-slate-700">
                            {acc.badge}
                          </span>
                        </div>
                        <div className="text-[11px] text-slate-500 mt-0.5">{acc.title}</div>
                      </div>
                    </div>

                    {isSelected && (
                      <div className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center shrink-0">
                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Column: Premium Login Card */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-3xl border-2 border-[#F1E8D9] p-6 sm:p-8 shadow-xl">
              <div className="flex items-center justify-between pb-6 mb-6 border-b border-slate-100">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#0061E0]">
                    Portal Authentication
                  </span>
                  <h1 className="text-2xl font-black text-slate-900 tracking-tight mt-0.5">
                    Sign in to {activeAccount.badge}
                  </h1>
                </div>
                <div className={`w-12 h-12 rounded-2xl ${activeAccount.color} text-white flex items-center justify-center shadow-md`}>
                  <activeAccount.icon className="w-6 h-6" />
                </div>
              </div>

              <form onSubmit={handleLogin} className="space-y-4">
                {/* Email Address */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold text-slate-900 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition-all bg-slate-50/50"
                      placeholder="name@company.com"
                    />
                  </div>
                </div>

                {/* Password with Show/Hide */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="block text-xs font-bold text-slate-700">
                      Password
                    </label>
                    <button
                      type="button"
                      onClick={() => setShowForgotModal(true)}
                      className="text-xs font-semibold text-blue-600 hover:text-blue-800 transition-colors"
                    >
                      Forgot password?
                    </button>
                  </div>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold text-slate-900 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition-all bg-slate-50/50"
                      placeholder="••••••••••••"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Remember Me */}
                <div className="flex items-center justify-between pt-1">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="w-4 h-4 rounded text-[#0061E0] focus:ring-[#0061E0] border-slate-300"
                    />
                    <span className="text-xs font-medium text-slate-600">Remember credentials for 30 days</span>
                  </label>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#0061E0] hover:bg-[#004BB5] text-white font-bold py-3.5 px-4 rounded-xl shadow-lg shadow-[#0061E0]/25 hover:shadow-xl transition-all flex items-center justify-center gap-2 text-sm mt-3 cursor-pointer"
                >
                  {loading ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      <span>Enter {activeAccount.badge}</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>

              {/* Fast Direct Switch Buttons */}
              <div className="mt-6 pt-5 border-t border-slate-100">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2.5">
                  Instant Portal Jump
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {DEMO_ACCOUNTS.map(acc => (
                    <button
                      key={acc.role}
                      type="button"
                      onClick={() => {
                        localStorage.setItem('isAuthenticated', 'true');
                        localStorage.setItem('role', acc.role);
                        localStorage.setItem('name', acc.name);
                        showToast(`Entering ${acc.badge} as ${acc.name}`, 'success');
                        navigate(acc.path);
                      }}
                      className="text-[11px] font-bold px-3 py-1.5 rounded-lg border border-slate-200 hover:border-blue-500 bg-slate-50 hover:bg-blue-50 text-slate-700 hover:text-blue-700 transition-all flex items-center gap-1.5 cursor-pointer"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                      {acc.badge}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="max-w-7xl mx-auto w-full px-4 sm:px-6 py-6 border-t border-slate-200/80 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-3">
        <div className="flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>Interactive Frontend Demonstration • Built with React & Tailwind CSS</span>
        </div>
        <div>
          © {new Date().getFullYear()} HRDuo SaaS Platform. All Rights Reserved.
        </div>
      </footer>

      {/* Forgot Password Modal */}
      {showForgotModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs">
          <div className="bg-white rounded-3xl p-6 max-w-sm w-full shadow-2xl border border-slate-100">
            <h3 className="text-base font-bold text-slate-900 mb-1">Reset Password</h3>
            <p className="text-xs text-slate-500 mb-4">
              In this frontend demo, your password for all roles is standard: <code className="bg-slate-100 text-blue-600 px-1.5 py-0.5 rounded font-mono font-bold">password123</code>
            </p>
            <button
              onClick={() => setShowForgotModal(false)}
              className="w-full bg-blue-600 text-white font-bold py-2 rounded-xl text-xs"
            >
              Close & Continue
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
