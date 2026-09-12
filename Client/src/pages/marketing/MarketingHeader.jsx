import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { ChevronDown, ArrowRight, Menu, X, Sparkles, ScanFace, Shield, IndianRupee } from 'lucide-react';

export function MarketingHeader() {
  const navigate = useNavigate();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [solutionsOpen, setSolutionsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setSolutionsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close menus on path change
  useEffect(() => {
    setMobileMenuOpen(false);
    setSolutionsOpen(false);
  }, [location.pathname]);

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Solutions', path: '/solutions', hasDropdown: true },
    { name: 'About', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Pricing', path: '/pricing' },
    { name: 'Contact', path: '/contact' }
  ];

  return (
    <header className="fixed top-4 left-0 right-0 z-50 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pointer-events-none">
      <nav className={`pointer-events-auto bg-white/95 backdrop-blur-md border border-[#F1E8D9] rounded-full px-4 sm:px-6 py-2 sm:py-2.5 flex items-center justify-between transition-all duration-300 ${
        scrolled ? 'shadow-[0_12px_36px_rgba(0,0,0,0.1)]' : 'shadow-[0_8px_30px_rgba(0,0,0,0.06)]'
      }`}>

        {/* Left: Official HRDuo Brand Logo */}
        <Link to="/" className="flex items-center gap-2 group flex-shrink-0">
          <img
            src="/hrduo_logo.png"
            alt="HRDuo Logo"
            className="h-8 sm:h-9 w-auto object-contain hover:opacity-90 transition-opacity"
          />
        </Link>

        {/* Center: Desktop Navigation Links */}
        <div className="hidden md:flex items-center gap-1 lg:gap-1.5 text-sm font-semibold text-slate-700">
          
          {/* Home Link */}
          <Link
            to="/"
            className={`px-4 py-1.5 rounded-full transition-all duration-200 ${
              isActive('/')
                ? 'bg-[#FFC933] text-slate-950 font-bold shadow-sm'
                : 'hover:text-slate-950 text-slate-700 hover:bg-slate-50'
            }`}
          >
            Home
          </Link>

          {/* Solutions with Submenu */}
          <div className="relative" ref={dropdownRef}>
            <div className="flex items-center">
              <Link
                to="/solutions"
                className={`pl-3.5 pr-1 py-1.5 rounded-l-full transition-all duration-200 ${
                  isActive('/solutions')
                    ? 'bg-[#FFC933] text-slate-950 font-bold shadow-sm'
                    : 'hover:text-slate-950 text-slate-700 hover:bg-slate-50'
                }`}
              >
                Solutions
              </Link>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setSolutionsOpen(!solutionsOpen);
                }}
                aria-label="Toggle solutions submenu"
                className={`pr-2.5 pl-1 py-2 rounded-r-full transition-all duration-200 ${
                  isActive('/solutions')
                    ? 'bg-[#FFC933] text-slate-950 font-bold'
                    : 'hover:text-slate-950 text-slate-500 hover:bg-slate-50'
                }`}
              >
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${solutionsOpen ? 'rotate-180' : ''}`} />
              </button>
            </div>

            {solutionsOpen && (
              <div className="absolute top-full mt-2 left-0 w-72 bg-white rounded-2xl shadow-xl border border-slate-100 p-2 z-50 animate-in fade-in zoom-in-95 duration-150">
                <Link
                  to="/solutions"
                  onClick={() => setSolutionsOpen(false)}
                  className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-bold hover:bg-slate-50 text-slate-800"
                >
                  <ScanFace className="w-4 h-4 text-[#008C75]" />
                  <div>
                    <div>AI Face Attendance Kiosk</div>
                    <div className="text-[10px] text-slate-500 font-normal">Sub-200ms edge matching</div>
                  </div>
                </Link>

                <Link
                  to="/solutions"
                  onClick={() => setSolutionsOpen(false)}
                  className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-bold hover:bg-slate-50 text-slate-800"
                >
                  <IndianRupee className="w-4 h-4 text-[#FF5A36]" />
                  <div>
                    <div>Automated Dynamic Payroll</div>
                    <div className="text-[10px] text-slate-500 font-normal">1-click salary calculations</div>
                  </div>
                </Link>

                <Link
                  to="/security"
                  onClick={() => setSolutionsOpen(false)}
                  className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-bold hover:bg-slate-50 text-slate-800"
                >
                  <Shield className="w-4 h-4 text-indigo-600" />
                  <div>
                    <div>Vector Security & Privacy</div>
                    <div className="text-[10px] text-slate-500 font-normal">Zero raw photo storage</div>
                  </div>
                </Link>
              </div>
            )}
          </div>

          {/* About Link */}
          <Link
            to="/about"
            className={`px-3.5 py-1.5 rounded-full transition-all duration-200 ${
              isActive('/about')
                ? 'bg-[#FFC933] text-slate-950 font-bold shadow-sm'
                : 'hover:text-slate-950 text-slate-700 hover:bg-slate-50'
            }`}
          >
            About
          </Link>

          {/* Services Link */}
          <Link
            to="/services"
            className={`px-3.5 py-1.5 rounded-full transition-all duration-200 ${
              isActive('/services')
                ? 'bg-[#FFC933] text-slate-950 font-bold shadow-sm'
                : 'hover:text-slate-950 text-slate-700 hover:bg-slate-50'
            }`}
          >
            Services
          </Link>

          {/* Pricing Link */}
          <Link
            to="/pricing"
            className={`px-3.5 py-1.5 rounded-full transition-all duration-200 ${
              isActive('/pricing')
                ? 'bg-[#FFC933] text-slate-950 font-bold shadow-sm'
                : 'hover:text-slate-950 text-slate-700 hover:bg-slate-50'
            }`}
          >
            Pricing
          </Link>

          {/* Contact Link */}
          <Link
            to="/contact"
            className={`px-3.5 py-1.5 rounded-full transition-all duration-200 ${
              isActive('/contact')
                ? 'bg-[#FFC933] text-slate-950 font-bold shadow-sm'
                : 'hover:text-slate-950 text-slate-700 hover:bg-slate-50'
            }`}
          >
            Contact
          </Link>
        </div>

        {/* Right: Login Link & Get Started Pill Button */}
        <div className="hidden sm:flex items-center gap-3 md:gap-4">
          <Link
            to="/login"
            className="text-sm font-bold text-slate-800 hover:text-[#008C75] px-3 py-1.5 transition-colors"
          >
            Login
          </Link>

          <button
            onClick={() => navigate('/contact')}
            className="bg-[#FFD027] hover:bg-[#F5C21B] text-slate-950 px-5 py-2 rounded-full font-black text-sm flex items-center gap-1.5 border-2 border-slate-950 shadow-[2.5px_2.5px_0px_#000] hover:shadow-[1px_1px_0px_#000] hover:translate-x-[1px] hover:translate-y-[1px] transition-all cursor-pointer"
          >
            <span>Book a Consultation</span>
            <ArrowRight className="w-4 h-4 stroke-[2.5]" />
          </button>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-full hover:bg-slate-100 text-slate-700"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </nav>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="pointer-events-auto md:hidden mt-2 bg-white rounded-3xl border border-[#F1E8D9] shadow-2xl p-5 space-y-3 animate-in fade-in slide-in-from-top-4 duration-200">
          <div className="flex flex-col gap-1 text-sm font-semibold text-slate-700">
            <Link
              to="/"
              onClick={() => setMobileMenuOpen(false)}
              className={`px-4 py-2.5 rounded-2xl transition-colors ${
                isActive('/') ? 'bg-[#FFC933] text-slate-950 font-bold' : 'hover:bg-slate-50'
              }`}
            >
              Home
            </Link>
            <Link
              to="/solutions"
              onClick={() => setMobileMenuOpen(false)}
              className={`px-4 py-2.5 rounded-2xl transition-colors ${
                isActive('/solutions') ? 'bg-[#FFC933] text-slate-950 font-bold' : 'hover:bg-slate-50'
              }`}
            >
              Solutions
            </Link>
            <Link
              to="/about"
              onClick={() => setMobileMenuOpen(false)}
              className={`px-4 py-2.5 rounded-2xl transition-colors ${
                isActive('/about') ? 'bg-[#FFC933] text-slate-950 font-bold' : 'hover:bg-slate-50'
              }`}
            >
              About
            </Link>
            <Link
              to="/services"
              onClick={() => setMobileMenuOpen(false)}
              className={`px-4 py-2.5 rounded-2xl transition-colors ${
                isActive('/services') ? 'bg-[#FFC933] text-slate-950 font-bold' : 'hover:bg-slate-50'
              }`}
            >
              Services
            </Link>
            <Link
              to="/pricing"
              onClick={() => setMobileMenuOpen(false)}
              className={`px-4 py-2.5 rounded-2xl transition-colors ${
                isActive('/pricing') ? 'bg-[#FFC933] text-slate-950 font-bold' : 'hover:bg-slate-50'
              }`}
            >
              Pricing
            </Link>
            <Link
              to="/security"
              onClick={() => setMobileMenuOpen(false)}
              className={`px-4 py-2.5 rounded-2xl transition-colors ${
                isActive('/security') ? 'bg-[#FFC933] text-slate-950 font-bold' : 'hover:bg-slate-50'
              }`}
            >
              Security & Privacy
            </Link>
            <Link
              to="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className={`px-4 py-2.5 rounded-2xl transition-colors ${
                isActive('/contact') ? 'bg-[#FFC933] text-slate-950 font-bold' : 'hover:bg-slate-50'
              }`}
            >
              Contact
            </Link>
          </div>

          <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
            <Link
              to="/login"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center py-2.5 rounded-full font-bold text-sm text-slate-800 border border-slate-200 hover:bg-slate-50"
            >
              Login to Portal
            </Link>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                navigate('/contact');
              }}
              className="w-full py-2.5 rounded-full font-black text-sm bg-[#FFD027] text-slate-950 flex items-center justify-center gap-1.5 border-2 border-slate-950 shadow-[2.5px_2.5px_0px_#000]"
            >
              <span>Book a Consultation</span>
              <ArrowRight className="w-4 h-4 stroke-[2.5]" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
