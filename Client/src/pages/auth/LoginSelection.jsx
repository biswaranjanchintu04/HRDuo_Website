import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  User,
  Building2,
  ShieldCheck,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  Lock,
  ScanFace,
  CheckCircle2,
  Briefcase,
  Users2
} from 'lucide-react';

export default function LoginSelection() {
  const navigate = useNavigate();

  const portals = [
    {
      id: 'superadmin',
      title: 'Super Admin',
      subtitle: 'Platform & Multi-Tenant',
      description: 'Global infrastructure management, enterprise organization provisioning, subscription metrics, and tenant governance.',
      icon: ShieldCheck,
      badge: 'Platform Root',
      badgeColor: 'bg-indigo-100 text-indigo-800 border-indigo-200',
      actionText: 'Super Admin Console',
      borderColor: 'border-indigo-200/80',
      hoverBorder: 'hover:border-indigo-400',
      iconBg: 'bg-indigo-600 text-white',
      demoCred: 'root@hrduo.internal',
      route: '/superadmin/login',
      role: 'SUPER_ADMIN',
      name: 'Super Admin',
    },
    {
      id: 'admin',
      title: 'Company Admin',
      subtitle: 'Workforce & Org Control',
      description: 'Centralized admin hub for real-time biometric logs, department rostering, automated one-click payroll, and compliance.',
      icon: Building2,
      badge: 'Org Management',
      badgeColor: 'bg-amber-100 text-amber-900 border-amber-200',
      actionText: 'Enter Admin Dashboard',
      borderColor: 'border-amber-200/80',
      hoverBorder: 'hover:border-[#FFC933]',
      iconBg: 'bg-[#FFC933] text-slate-950',
      demoCred: 'admin@hrduo.com',
      route: '/admin/login',
      role: 'ADMIN',
      name: 'Company Administrator',
    },
    {
      id: 'hr',
      title: 'HR Portal',
      subtitle: 'Talent, Payroll & People',
      description: 'Comprehensive HR suite for employee onboarding, recruitment pipelines, leave compliance, and payroll dispatch.',
      icon: Users2,
      badge: 'Human Resources',
      badgeColor: 'bg-rose-100 text-rose-800 border-rose-200',
      actionText: 'Enter HR Portal',
      borderColor: 'border-rose-200/80',
      hoverBorder: 'hover:border-rose-400',
      iconBg: 'bg-rose-600 text-white',
      demoCred: 'hr@hrduo.com',
      popular: true,
      route: '/hr/login',
      role: 'HR',
      name: 'HR Operations Lead',
    },
    {
      id: 'manager',
      title: 'Manager Portal',
      subtitle: 'Team & Department Lead',
      description: "Oversee your team's attendance, approve leave requests, assign tasks, and track department performance metrics.",
      icon: Briefcase,
      badge: 'Team Lead',
      badgeColor: 'bg-violet-100 text-violet-800 border-violet-200',
      actionText: 'Enter Manager Portal',
      borderColor: 'border-violet-200/80',
      hoverBorder: 'hover:border-violet-400',
      iconBg: 'bg-violet-600 text-white',
      demoCred: 'manager@hrduo.com',
      route: '/manager/login',
      role: 'MANAGER',
      name: 'Alex Thompson',
    },
    {
      id: 'employee',
      title: 'Employee Portal',
      subtitle: 'Self-Service & Attendance',
      description: 'Clock in with facial recognition, track attendance streaks, request time off, and download itemized monthly payslips.',
      icon: User,
      badge: 'Staff & Team',
      badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-200',
      actionText: 'Enter Employee Portal',
      borderColor: 'border-emerald-200/80',
      hoverBorder: 'hover:border-emerald-400',
      iconBg: 'bg-emerald-500 text-white',
      demoCred: 'emp@hrduo.com',
      route: '/employee/login',
      role: 'EMPLOYEE',
      name: 'Sarah Jenkins',
    },
  ];

  const handlePortalClick = (portal) => {
    navigate(portal.route);
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-slate-900 flex flex-col justify-between selection:bg-[#FFC933] selection:text-slate-950 relative overflow-hidden">
      {/* Decorative ambient background glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[500px] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#FFC933]/20 via-[#008C75]/10 to-transparent blur-3xl pointer-events-none" />

      {/* Navigation Header */}
      <header className="relative z-10 max-w-7xl mx-auto w-full px-6 py-6 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <img
            src="/hrduo_logo.png"
            alt="HRDuo Logo"
            className="h-9 w-auto object-contain hover:opacity-90 transition-opacity"
          />
        </Link>

        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm font-bold text-slate-700 hover:text-slate-950 bg-white px-4 py-2 rounded-full border border-[#F1E8D9] shadow-sm hover:shadow transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </Link>
      </header>

      {/* Main Selection Area */}
      <main className="relative z-10 max-w-7xl mx-auto w-full px-6 py-8 md:py-12">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFC933]/20 border border-[#FFC933]/40 text-slate-900 text-xs font-black uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-[#008C75]" />
            Unified Portal Access
          </div>

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-slate-950 tracking-tight">
            Choose Your Workspace
          </h1>

          <p className="text-base text-slate-600 font-medium">
            Select the destination portal tailored to your operational role in HRDuo.
          </p>
        </div>

        {/* Portals Grid — 5 columns on extra-large screens */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
          {portals.map((portal) => {
            const Icon = portal.icon;
            return (
              <div
                key={portal.id}
                className={`relative flex flex-col justify-between rounded-3xl bg-white border-2 ${portal.borderColor} ${portal.hoverBorder} p-7 shadow-[0_8px_30px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] transition-all duration-300 hover:-translate-y-1.5 group cursor-pointer`}
                onClick={() => handlePortalClick(portal)}
              >
                {portal.popular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#FFD027] text-slate-950 border-2 border-slate-950 text-[11px] font-black uppercase tracking-wider px-3.5 py-0.5 rounded-full shadow-sm whitespace-nowrap">
                    Most Popular
                  </div>
                )}

                <div>
                  {/* Card Header */}
                  <div className="flex items-center justify-between mb-6">
                    <div className={`w-14 h-14 rounded-2xl ${portal.iconBg} flex items-center justify-center shadow-md`}>
                      <Icon className="w-7 h-7 stroke-[2.2]" />
                    </div>
                    <span className={`text-[11px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full border ${portal.badgeColor}`}>
                      {portal.badge}
                    </span>
                  </div>

                  <h3 className="text-xl font-black text-slate-950 mb-1 group-hover:text-[#008C75] transition-colors">
                    {portal.title}
                  </h3>
                  <div className="text-xs font-bold text-slate-500 mb-3">
                    {portal.subtitle}
                  </div>

                  <p className="text-sm text-slate-600 font-medium leading-relaxed mb-6">
                    {portal.description}
                  </p>
                </div>

                <div>
                  {/* Security / Credentials hint */}
                  <div className="bg-slate-50 rounded-2xl p-3 mb-5 border border-slate-100 flex items-center justify-between text-xs">
                    <span className="text-slate-500 font-medium flex items-center gap-1.5">
                      <Lock className="w-3.5 h-3.5 text-slate-400" />
                      Demo Login:
                    </span>
                    <span className="font-mono font-bold text-slate-800 text-[11px]">
                      {portal.demoCred}
                    </span>
                  </div>

                  {/* Enter Button */}
                  <button
                    onClick={(e) => { e.stopPropagation(); handlePortalClick(portal); }}
                    className="w-full bg-slate-950 hover:bg-[#008C75] text-white py-3.5 px-5 rounded-2xl font-black text-sm flex items-center justify-center gap-2 transition-colors duration-200 group-hover:shadow-lg cursor-pointer"
                  >
                    <span>{portal.actionText}</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Face Attendance Kiosk Quick Link Bar */}
        <div className="mt-12 bg-white rounded-3xl border border-[#F1E8D9] p-6 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#FFC933]/20 border border-[#FFC933]/40 flex items-center justify-center text-slate-950 flex-shrink-0">
              <ScanFace className="w-6 h-6 text-[#008C75]" />
            </div>
            <div>
              <h4 className="text-base font-black text-slate-950">
                Looking for the Live Face Attendance Kiosk Demo?
              </h4>
              <p className="text-xs text-slate-600 font-medium">
                Test hands-free, touchless biometric check-ins directly in your browser.
              </p>
            </div>
          </div>

          <Link
            to="/face-attendance"
            className="w-full md:w-auto flex-shrink-0 inline-flex items-center justify-center gap-2 bg-[#FFD027] hover:bg-[#F5C21B] text-slate-950 px-5 py-2.5 rounded-full font-black text-sm border-2 border-slate-950 shadow-[2px_2px_0px_#000] transition-all"
          >
            <span>Launch Face Kiosk Demo</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 max-w-7xl mx-auto w-full px-6 py-6 border-t border-[#F1E8D9] flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-3">
        <div className="flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>Enterprise End-to-End Encryption & Biometric Liveness Guard</span>
        </div>
        <div>
          © {new Date().getFullYear()} HRDuo Inc. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
