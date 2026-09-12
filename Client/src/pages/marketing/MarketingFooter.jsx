import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Shield, Lock, Globe, ArrowRight } from 'lucide-react';
import { Badge } from '../../components/ui/Badge';

export function MarketingFooter() {
  const navigate = useNavigate();

  return (
    <footer className="border-t border-[#F1E8D9] bg-white text-slate-700 pt-16 pb-12 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-100">
          
          {/* Col 1 & 2: Brand & Mission */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/">
              <img src="/hrduo_logo.png" alt="HRDuo Logo" className="h-9 w-auto object-contain hover:opacity-90 transition-opacity" />
            </Link>

            <p className="text-sm text-slate-600 max-w-sm leading-relaxed font-medium">
              We help businesses build stronger teams, streamline HR processes, and eliminate attendance fraud — all in one simple, powerful platform.
            </p>

            <div className="pt-2 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs font-bold text-slate-700">All Biometric Nodes Operational</span>
            </div>

            <div className="pt-2">
              <button
                onClick={() => navigate('/face-attendance')}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-900 bg-[#FFC933] hover:bg-[#F59E0B] px-4 py-2 rounded-full border border-slate-900 shadow-sm transition-all"
              >
                <span>Launch Face Kiosk Demo</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Col 3: Product Capabilities */}
          <div>
            <h4 className="text-xs font-black uppercase tracking-wider text-slate-900 mb-4">
              Solutions
            </h4>
            <ul className="space-y-2.5 text-sm font-semibold text-slate-600">
              <li>
                <Link to="/solutions" className="hover:text-[#008C75] transition-colors">
                  AI Facial Attendance Kiosk
                </Link>
              </li>
              <li>
                <Link to="/solutions" className="hover:text-[#008C75] transition-colors">
                  Dynamic Automated Payroll
                </Link>
              </li>
              <li>
                <Link to="/solutions" className="hover:text-[#008C75] transition-colors">
                  Shift Rosters & Grace Rules
                </Link>
              </li>
              <li>
                <Link to="/solutions" className="hover:text-[#008C75] transition-colors">
                  Leave & Absence Workflows
                </Link>
              </li>
              <li>
                <Link to="/security" className="hover:text-[#008C75] transition-colors">
                  Anti-Spoofing & Liveness
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Portals & Company */}
          <div>
            <h4 className="text-xs font-black uppercase tracking-wider text-slate-900 mb-4">
              Company & Portals
            </h4>
            <ul className="space-y-2.5 text-sm font-semibold text-slate-600">
              <li>
                <Link to="/about" className="hover:text-[#008C75] transition-colors">
                  About Our Story
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-[#008C75] transition-colors">
                  Implementation Services
                </Link>
              </li>
              <li>
                <Link to="/pricing" className="hover:text-[#008C75] transition-colors">
                  Pricing Plans & ROI
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-[#008C75] transition-colors">
                  Contact & Support
                </Link>
              </li>
              <li className="pt-1">
                <Link to="/employee/login" className="hover:text-[#008C75] transition-colors font-bold text-slate-800">
                  Employee Portal →
                </Link>
              </li>
              <li>
                <Link to="/admin/login" className="hover:text-[#008C75] transition-colors font-bold text-slate-800">
                  Admin Portal →
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 5: Security & Compliance */}
          <div>
            <h4 className="text-xs font-black uppercase tracking-wider text-slate-900 mb-4">
              Trust & Privacy
            </h4>
            <ul className="space-y-2.5 text-sm font-semibold text-slate-600">
              <li>
                <Link to="/security" className="flex items-center gap-2 hover:text-[#008C75] transition-colors">
                  <Shield className="w-4 h-4 text-[#008C75]" />
                  <span>SOC 2 Type II Certified</span>
                </Link>
              </li>
              <li>
                <Link to="/security" className="flex items-center gap-2 hover:text-[#008C75] transition-colors">
                  <Lock className="w-4 h-4 text-[#008C75]" />
                  <span>256-Bit Vector Storage</span>
                </Link>
              </li>
              <li>
                <Link to="/security" className="flex items-center gap-2 hover:text-[#008C75] transition-colors">
                  <Globe className="w-4 h-4 text-[#008C75]" />
                  <span>GDPR & DPDP Ready</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-medium text-slate-500">
          <p>© {new Date().getFullYear()} HRDuo Technologies Inc. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link to="/security" className="hover:text-slate-900 transition-colors">
              Privacy Policy
            </Link>
            <Link to="/security" className="hover:text-slate-900 transition-colors">
              Terms of Service
            </Link>
            <Link to="/security" className="hover:text-slate-900 transition-colors">
              Security Whitepaper
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
