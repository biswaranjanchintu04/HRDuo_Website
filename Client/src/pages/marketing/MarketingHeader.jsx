import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { 
  ChevronDown, ArrowRight, Menu, X, Sparkles, ScanFace, 
  MapPin, Wallet, CalendarCheck, Clock, Building2, 
  Dumbbell, GraduationCap, Stethoscope, User, LogIn
} from 'lucide-react';

export function MarketingHeader() {
  const navigate = useNavigate();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [solutionsOpen, setSolutionsOpen] = useState(false);
  const [suitesOpen, setSuitesOpen] = useState(false);
  
  const solutionsRef = useRef(null);
  const suitesRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (solutionsRef.current && !solutionsRef.current.contains(event.target)) {
        setSolutionsOpen(false);
      }
      if (suitesRef.current && !suitesRef.current.contains(event.target)) {
        setSuitesOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close menus on path change
  useEffect(() => {
    setMobileMenuOpen(false);
    setSolutionsOpen(false);
    setSuitesOpen(false);
  }, [location.pathname]);

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  const solutionModules = [
    {
      title: "Touchless Face Kiosk",
      desc: "Sub-second AI recognition with anti-spoof liveness check",
      icon: ScanFace,
      path: "/solutions",
      badge: "< 1s Speed"
    },
    {
      title: "GPS Geofenced Punch",
      desc: "Perimeter validation with satellite anti-mock lock",
      icon: MapPin,
      path: "/solutions",
      badge: "Mobile GPS"
    },
    {
      title: "Attendance-Linked Payroll",
      desc: "1-click salary calculations and automated payslip batch",
      icon: Wallet,
      path: "/solutions",
      badge: "Automated"
    },
    {
      title: "2-Step Leave Approvals",
      desc: "Manager approval to HR verification with auto deductions",
      icon: CalendarCheck,
      path: "/solutions",
      badge: "2-Step Flow"
    },
    {
      title: "Shift Rosters & Rotations",
      desc: "Multi-branch rosters, night shifts, and grace windows",
      icon: Clock,
      path: "/solutions",
      badge: "Zero Conflict"
    }
  ];

  const industrySuites = [
    {
      title: "Corporate & Enterprise",
      desc: "Multi-branch rosters, geofenced mobile check-in & payroll",
      icon: Building2,
      path: "/solutions"
    },
    {
      title: "Gym & Fitness Suite",
      desc: "Member turnstile integrations, trainer check-ins & hourly logs",
      icon: Dumbbell,
      path: "/solutions"
    },
    {
      title: "Education & Campus",
      desc: "Faculty biometric kiosk, RFID support & student alerts",
      icon: GraduationCap,
      path: "/solutions"
    },
    {
      title: "Healthcare Organizations",
      desc: "24/7 rotational nurse shifts, on-call doctor logs & compliance",
      icon: Stethoscope,
      path: "/solutions"
    }
  ];

  return (
    <header className="fixed top-3 left-0 right-0 z-50 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pointer-events-none">
      <nav className={`pointer-events-auto bg-white/95 backdrop-blur-md border border-slate-200/90 rounded-2xl sm:rounded-full px-4 sm:px-6 py-2 sm:py-2.5 flex items-center justify-between transition-all duration-300 ${
        scrolled 
          ? 'shadow-[0_10px_30px_rgba(0,45,98,0.08)] border-slate-300' 
          : 'shadow-[0_4px_20px_rgba(0,45,98,0.04)]'
      }`}>

        {/* Left: Brand Logo & Tagline */}
        <Link to="/" className="flex items-center gap-2.5 group flex-shrink-0">
          <img
            src="/hrduo_logo.png"
            alt="HRDuo Logo"
            className="h-8 sm:h-9 w-auto object-contain hover:opacity-95 transition-opacity"
          />
          <span className="hidden xl:inline-block text-[11px] font-semibold tracking-wide text-[#627D98] border-l border-slate-200 pl-2.5">
            Smart HR. Stronger Together.
          </span>
        </Link>

        {/* Center: Desktop Navigation Links */}
        <div className="hidden lg:flex items-center gap-1 xl:gap-1.5 text-sm font-semibold text-[#334E68]">
          
          {/* Home Link */}
          <Link
            to="/"
            className={`px-3 py-1.5 rounded-full transition-all duration-150 ${
              isActive('/')
                ? 'bg-[#EBF3FA] text-[#002D62] font-bold'
                : 'hover:text-[#002D62] hover:bg-slate-50'
            }`}
          >
            Home
          </Link>

          {/* Solutions Dropdown */}
          <div className="relative" ref={solutionsRef}>
            <button
              onClick={() => {
                setSolutionsOpen(!solutionsOpen);
                setSuitesOpen(false);
              }}
              className={`px-3 py-1.5 rounded-full transition-all duration-150 flex items-center gap-1 cursor-pointer ${
                isActive('/solutions') || solutionsOpen
                  ? 'bg-[#EBF3FA] text-[#002D62] font-bold'
                  : 'hover:text-[#002D62] hover:bg-slate-50'
              }`}
            >
              <span>Solutions</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${solutionsOpen ? 'rotate-180 text-[#00A8A8]' : ''}`} />
            </button>

            {solutionsOpen && (
              <div className="absolute top-full left-0 mt-3 w-[360px] bg-white rounded-2xl border border-slate-200 shadow-xl p-3 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                <div className="text-[11px] font-bold uppercase tracking-wider text-[#627D98] px-3 py-1.5 border-b border-slate-100 flex items-center justify-between">
                  <span>Core HRMS Modules</span>
                  <span className="text-[#00A8A8] font-semibold">5 Modules</span>
                </div>
                <div className="space-y-1 mt-1.5">
                  {solutionModules.map((item, idx) => {
                    const Icon = item.icon;
                    return (
                      <Link
                        key={idx}
                        to={item.path}
                        onClick={() => setSolutionsOpen(false)}
                        className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-[#EBF3FA] transition-colors group"
                      >
                        <div className="w-8 h-8 rounded-lg bg-[#EBF3FA] text-[#002D62] group-hover:bg-[#002D62] group-hover:text-white flex items-center justify-center flex-shrink-0 transition-colors">
                          <Icon className="w-4 h-4" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-[#002D62] group-hover:text-[#002D62]">
                              {item.title}
                            </span>
                            <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded bg-emerald-50 text-[#00A8A8]">
                              {item.badge}
                            </span>
                          </div>
                          <p className="text-[11px] text-[#627D98] truncate mt-0.5">
                            {item.desc}
                          </p>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Industry Suites Dropdown */}
          <div className="relative" ref={suitesRef}>
            <button
              onClick={() => {
                setSuitesOpen(!suitesOpen);
                setSolutionsOpen(false);
              }}
              className={`px-3 py-1.5 rounded-full transition-all duration-150 flex items-center gap-1 cursor-pointer ${
                suitesOpen
                  ? 'bg-[#EBF3FA] text-[#002D62] font-bold'
                  : 'hover:text-[#002D62] hover:bg-slate-50'
              }`}
            >
              <span>Industry Suites</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${suitesOpen ? 'rotate-180 text-[#00A8A8]' : ''}`} />
            </button>

            {suitesOpen && (
              <div className="absolute top-full left-0 mt-3 w-[340px] bg-white rounded-2xl border border-slate-200 shadow-xl p-3 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                <div className="text-[11px] font-bold uppercase tracking-wider text-[#627D98] px-3 py-1.5 border-b border-slate-100">
                  Tailored Industry Solutions
                </div>
                <div className="space-y-1 mt-1.5">
                  {industrySuites.map((item, idx) => {
                    const Icon = item.icon;
                    return (
                      <Link
                        key={idx}
                        to={item.path}
                        onClick={() => setSuitesOpen(false)}
                        className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-[#EBF3FA] transition-colors group"
                      >
                        <div className="w-8 h-8 rounded-lg bg-[#E6F8F8] text-[#00A8A8] group-hover:bg-[#00A8A8] group-hover:text-white flex items-center justify-center flex-shrink-0 transition-colors">
                          <Icon className="w-4 h-4" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <span className="text-xs font-bold text-[#002D62] block">
                            {item.title}
                          </span>
                          <p className="text-[11px] text-[#627D98] truncate mt-0.5">
                            {item.desc}
                          </p>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Pricing Link */}
          <Link
            to="/pricing"
            className={`px-3 py-1.5 rounded-full transition-all duration-150 ${
              isActive('/pricing')
                ? 'bg-[#EBF3FA] text-[#002D62] font-bold'
                : 'hover:text-[#002D62] hover:bg-slate-50'
            }`}
          >
            Pricing
          </Link>

          {/* About Link */}
          <Link
            to="/about"
            className={`px-3 py-1.5 rounded-full transition-all duration-150 ${
              isActive('/about')
                ? 'bg-[#EBF3FA] text-[#002D62] font-bold'
                : 'hover:text-[#002D62] hover:bg-slate-50'
            }`}
          >
            About
          </Link>

          {/* Contact Link */}
          <Link
            to="/contact"
            className={`px-3 py-1.5 rounded-full transition-all duration-150 ${
              isActive('/contact')
                ? 'bg-[#EBF3FA] text-[#002D62] font-bold'
                : 'hover:text-[#002D62] hover:bg-slate-50'
            }`}
          >
            Contact
          </Link>

        </div>

        {/* Right: Actions */}
        <div className="hidden sm:flex items-center gap-3">
          
          {/* Employee Sign In */}
          <Link
            to="/employee/login"
            className="flex items-center gap-1.5 text-xs font-semibold text-[#002D62] hover:text-[#00A8A8] px-3 py-2 rounded-full hover:bg-slate-50 transition-colors"
          >
            <User className="w-3.5 h-3.5 text-[#00A8A8]" />
            <span>Employee Login</span>
          </Link>

          {/* Primary CTA: Schedule Demo in HRDuo Brand Colors */}
          <button
            onClick={() => navigate('/contact')}
            className="bg-gradient-to-r from-[#002D62] to-[#004B8D] hover:from-[#001E42] hover:to-[#003B73] text-white text-xs sm:text-sm font-semibold px-4 sm:px-5 py-2 sm:py-2.5 rounded-full flex items-center gap-2 shadow-md shadow-blue-900/15 hover:shadow-lg transition-all cursor-pointer"
          >
            <span>Schedule Demo</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#00C9CE]" />
          </button>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex sm:hidden items-center gap-2">
          <button
            onClick={() => navigate('/contact')}
            className="bg-[#002D62] text-white text-xs font-semibold px-3 py-1.5 rounded-full shadow-xs"
          >
            Demo
          </button>
          
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl text-[#002D62] hover:bg-slate-100 transition-colors"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

      </nav>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="pointer-events-auto sm:hidden mt-2 bg-white rounded-3xl border border-slate-200/90 shadow-2xl p-5 space-y-4 animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="space-y-1 pb-3 border-b border-slate-100 font-semibold text-sm">
            <Link
              to="/"
              className={`block px-3 py-2 rounded-xl ${isActive('/') ? 'bg-[#EBF3FA] text-[#002D62] font-bold' : 'text-[#334E68]'}`}
            >
              Home
            </Link>
            <Link
              to="/solutions"
              className={`block px-3 py-2 rounded-xl ${isActive('/solutions') ? 'bg-[#EBF3FA] text-[#002D62] font-bold' : 'text-[#334E68]'}`}
            >
              Solutions & Modules
            </Link>
            <Link
              to="/pricing"
              className={`block px-3 py-2 rounded-xl ${isActive('/pricing') ? 'bg-[#EBF3FA] text-[#002D62] font-bold' : 'text-[#334E68]'}`}
            >
              Pricing
            </Link>
            <Link
              to="/about"
              className={`block px-3 py-2 rounded-xl ${isActive('/about') ? 'bg-[#EBF3FA] text-[#002D62] font-bold' : 'text-[#334E68]'}`}
            >
              About Us
            </Link>
            <Link
              to="/contact"
              className={`block px-3 py-2 rounded-xl ${isActive('/contact') ? 'bg-[#EBF3FA] text-[#002D62] font-bold' : 'text-[#334E68]'}`}
            >
              Contact Sales
            </Link>
          </div>

          <div className="space-y-2 pt-1">
            <Link
              to="/employee/login"
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-[#002D62] hover:bg-slate-50 transition-colors"
            >
              <User className="w-4 h-4 text-[#00A8A8]" />
              <span>Employee Portal</span>
            </Link>
            <Link
              to="/admin/login"
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-[#334E68] hover:bg-slate-50 transition-colors"
            >
              <LogIn className="w-4 h-4 text-[#002D62]" />
              <span>Admin Portal</span>
            </Link>
            <button
              onClick={() => navigate('/contact')}
              className="w-full bg-gradient-to-r from-[#002D62] to-[#004B8D] text-white text-xs font-bold py-3 rounded-xl shadow-md flex items-center justify-center gap-2"
            >
              <span>Schedule a Demo</span>
              <ArrowRight className="w-4 h-4 text-[#00C9CE]" />
            </button>
          </div>
        </div>
      )}

    </header>
  );
}
