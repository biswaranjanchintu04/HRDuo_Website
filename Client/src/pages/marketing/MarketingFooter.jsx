import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Shield, Lock, Globe, ArrowRight, CheckCircle2 } from 'lucide-react';

export function MarketingFooter() {
  const navigate = useNavigate();

  return (
    <footer className="border-t border-slate-200/80 bg-white text-[#334E68] pt-16 pb-12 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-100">
          
          {/* Col 1: Brand & Tagline */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="inline-block">
              <img src="/hrduo_logo.png" alt="HRDuo Logo" className="h-8 w-auto object-contain hover:opacity-95 transition-opacity" />
            </Link>

            <p className="text-sm text-[#486581] max-w-sm leading-relaxed font-normal">
              Smart HR. Stronger Together. One unified platform to manage attendance, geofencing, shift scheduling, and automated payroll with zero hardware lock-in.
            </p>

            <div className="pt-1 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#00A8A8] animate-pulse" />
              <span className="text-xs font-semibold text-[#002D62]">All Cloud & Biometric Services Operational</span>
            </div>

            <div className="pt-2">
              <button
                onClick={() => navigate('/contact')}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-white bg-gradient-to-r from-[#002D62] to-[#004B8D] hover:from-[#001E42] hover:to-[#003B73] px-4 py-2 rounded-full shadow-xs transition-all cursor-pointer"
              >
                <span>Schedule a Demo</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#00C9CE]" />
              </button>
            </div>
          </div>

          {/* Col 2: Core Modules */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#002D62] mb-4">
              Core Modules
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm font-medium text-[#486581]">
              <li>
                <Link to="/solutions" className="hover:text-[#002D62] transition-colors">
                  Touchless Face Kiosk
                </Link>
              </li>
              <li>
                <Link to="/solutions" className="hover:text-[#002D62] transition-colors">
                  GPS Geofenced Punch
                </Link>
              </li>
              <li>
                <Link to="/solutions" className="hover:text-[#002D62] transition-colors">
                  Attendance-Linked Payroll
                </Link>
              </li>
              <li>
                <Link to="/solutions" className="hover:text-[#002D62] transition-colors">
                  2-Step Leave Approvals
                </Link>
              </li>
              <li>
                <Link to="/solutions" className="hover:text-[#002D62] transition-colors">
                  Multi-Branch Shift Rosters
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Industry Suites */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#002D62] mb-4">
              Industry Suites
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm font-medium text-[#486581]">
              <li>
                <Link to="/solutions" className="hover:text-[#002D62] transition-colors">
                  Corporate & Enterprises
                </Link>
              </li>
              <li>
                <Link to="/solutions" className="hover:text-[#002D62] transition-colors">
                  Gym & Fitness Suite
                </Link>
              </li>
              <li>
                <Link to="/solutions" className="hover:text-[#002D62] transition-colors">
                  Education & Campuses
                </Link>
              </li>
              <li>
                <Link to="/solutions" className="hover:text-[#002D62] transition-colors">
                  Healthcare Organizations
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Company & Portals */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#002D62] mb-4">
              Company & Access
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm font-medium text-[#486581]">
              <li>
                <Link to="/about" className="hover:text-[#002D62] transition-colors">
                  About Our Platform
                </Link>
              </li>
              <li>
                <Link to="/pricing" className="hover:text-[#002D62] transition-colors">
                  Pricing Plans & ROI
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-[#002D62] transition-colors">
                  Contact & Sales
                </Link>
              </li>
              <li className="pt-2">
                <Link to="/employee/login" className="hover:text-[#00A8A8] transition-colors font-semibold text-[#002D62] flex items-center gap-1">
                  <span>Employee Login</span>
                  <ArrowRight className="w-3 h-3 text-[#00A8A8]" />
                </Link>
              </li>
              <li>
                <Link to="/admin/login" className="hover:text-[#00A8A8] transition-colors font-semibold text-[#334E68] flex items-center gap-1">
                  <span>Admin Portal</span>
                  <ArrowRight className="w-3 h-3 text-[#002D62]" />
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Strip */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-normal text-[#627D98]">
          <p>© {new Date().getFullYear()} HRDuo Technologies. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link to="/security" className="hover:text-[#002D62] transition-colors">
              Privacy Policy
            </Link>
            <Link to="/security" className="hover:text-[#002D62] transition-colors">
              Terms of Service
            </Link>
            <Link to="/security" className="hover:text-[#002D62] transition-colors">
              Security & Compliance
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
