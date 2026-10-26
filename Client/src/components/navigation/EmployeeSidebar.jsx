import React, { useState } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard,
  CalendarCheck,
  CalendarRange,
  Wallet,
  Users,
  Settings,
  LogOut,
  ScanFace,
  MoreHorizontal,
  X,
  ChevronRight
} from 'lucide-react';

const EmployeeSidebar = ({ isOpen, toggleSidebar }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showMobileMore, setShowMobileMore] = useState(false);

  const handleLogout = () => {
    localStorage.clear();
    navigate('/employee/login');
  };

  const menuItems = [
    { name: 'Home', icon: LayoutDashboard, path: '/employee/dashboard' },
    { name: 'Attendance', icon: CalendarCheck, path: '/employee/attendance' },
    { name: 'Leave', icon: CalendarRange, path: '/employee/leaves' },
    { name: 'Salary', icon: Wallet, path: '/employee/salary' },
    { name: 'Profile', icon: Users, path: '/employee/profile' },
    { name: 'Settings', icon: Settings, path: '/employee/settings' },
  ];

  // Primary 4 tabs for mobile bottom navigation
  const mobilePrimaryTabs = [
    { name: 'Home', icon: LayoutDashboard, path: '/employee/dashboard' },
    { name: 'Attendance', icon: CalendarCheck, path: '/employee/attendance' },
    { name: 'Leave', icon: CalendarRange, path: '/employee/leaves' },
    { name: 'Salary', icon: Wallet, path: '/employee/salary' },
  ];

  // Secondary items in the "More" slide-up drawer on mobile
  const mobileMoreTabs = [
    { name: 'My Profile & ID', icon: Users, path: '/employee/profile', desc: 'Personal details & biometrics' },
    { name: 'Face Kiosk Check-In', icon: ScanFace, path: '/face-kiosk', desc: 'Launch facial punch camera' },
    { name: 'Settings & Security', icon: Settings, path: '/employee/settings', desc: 'Alert preferences & password' },
  ];

  const isMoreTabActive = mobileMoreTabs.some((t) => location.pathname.startsWith(t.path));

  return (
    <>
      {/* ----------------- MOBILE SLIDE-UP DRAWER ----------------- */}
      <AnimatePresence>
        {showMobileMore && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowMobileMore(false)}
              className="fixed inset-0 bg-black/60 z-50 backdrop-blur-sm lg:hidden"
            />

            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 26, stiffness: 300 }}
              className="fixed bottom-0 left-0 right-0 z-50 bg-white rounded-t-3xl p-6 shadow-2xl lg:hidden max-h-[85vh] overflow-y-auto"
            >
              <div className="w-12 h-1.5 bg-slate-200 rounded-full mx-auto mb-4" />

              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div>
                  <h3 className="font-black text-slate-900 text-lg">Employee Menu</h3>
                  <p className="text-xs text-slate-500">Sarah Jenkins • Senior Developer</p>
                </div>
                <button
                  onClick={() => setShowMobileMore(false)}
                  className="p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="py-3 space-y-1">
                {mobileMoreTabs.map((item) => {
                  const Icon = item.icon;
                  const active = location.pathname.startsWith(item.path);
                  return (
                    <button
                      key={item.path}
                      onClick={() => {
                        navigate(item.path);
                        setShowMobileMore(false);
                      }}
                      className={`w-full flex items-center justify-between p-3.5 rounded-2xl transition-all text-left ${
                        active
                          ? 'bg-emerald-50 text-emerald-700 font-bold'
                          : 'hover:bg-slate-50 text-slate-700 font-medium'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`p-2.5 rounded-xl ${active ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-600'}`}>
                          <Icon size={18} />
                        </div>
                        <div>
                          <div className="text-sm font-bold">{item.name}</div>
                          <div className="text-xs text-slate-400">{item.desc}</div>
                        </div>
                      </div>
                      <ChevronRight size={16} className="text-slate-400" />
                    </button>
                  );
                })}
              </div>

              <div className="pt-3 border-t border-slate-100">
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-rose-600 bg-rose-50 hover:bg-rose-100 font-bold text-sm transition-colors"
                >
                  <LogOut size={18} />
                  Sign Out from Employee Portal
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ----------------- MOBILE BOTTOM NAVIGATION BAR ----------------- */}
      <nav className="fixed z-40 bottom-0 left-0 right-0 h-16 bg-white/95 backdrop-blur-xl border-t border-slate-200/70 flex items-center justify-around px-2 pb-[env(safe-area-inset-bottom)] shadow-[0_-4px_25px_rgba(0,0,0,0.06)] lg:hidden select-none touch-manipulation">
        {mobilePrimaryTabs.map((tab) => {
          const Icon = tab.icon;
          const active = location.pathname.startsWith(tab.path);
          return (
            <NavLink
              key={tab.path}
              to={tab.path}
              className={`flex flex-col items-center justify-center flex-1 py-1 transition-all active:scale-95 ${
                active ? 'text-emerald-600 font-black' : 'text-slate-400 hover:text-slate-600 font-medium'
              }`}
            >
              <div className={`p-1 rounded-xl transition-transform ${active ? 'scale-110' : ''}`}>
                <Icon size={20} strokeWidth={active ? 2.5 : 2} />
              </div>
              <span className="text-[10px] tracking-tight">{tab.name}</span>
              {active && <span className="w-1 h-1 rounded-full bg-emerald-600 mt-0.5" />}
            </NavLink>
          );
        })}

        {/* More Button */}
        <button
          onClick={() => setShowMobileMore(true)}
          className={`flex flex-col items-center justify-center flex-1 py-1 transition-all active:scale-95 ${
            isMoreTabActive || showMobileMore ? 'text-emerald-600 font-black' : 'text-slate-400 hover:text-slate-600 font-medium'
          }`}
        >
          <div className={`p-1 rounded-xl transition-transform ${isMoreTabActive ? 'scale-110' : ''}`}>
            <MoreHorizontal size={20} />
          </div>
          <span className="text-[10px] tracking-tight">More</span>
          {isMoreTabActive && <span className="w-1 h-1 rounded-full bg-emerald-600 mt-0.5" />}
        </button>
      </nav>

      {/* ----------------- DESKTOP SIDEBAR (lg+) ----------------- */}
      <aside
        className={`hidden lg:flex fixed top-0 bottom-0 left-0 z-50 bg-gradient-to-b from-[#0061e0] via-[#0052be] to-[#003882] transition-all duration-300 h-screen flex-col justify-start shadow-2xl ${
          isOpen ? 'w-64' : 'w-20'
        }`}
      >
        {/* Brand Header */}
        <div className={`flex items-center ${isOpen ? 'p-6' : 'py-8 px-4'} mb-4 text-white transition-all duration-300 ${isOpen ? 'justify-start gap-3' : 'justify-center'}`}>
          <button
            onClick={toggleSidebar}
            className="flex items-center gap-3 hover:opacity-90 transition-opacity focus:outline-none group text-left"
          >
            <div className={`${isOpen ? 'w-10 h-10' : 'w-12 h-12'} bg-white p-1.5 rounded-xl flex items-center justify-center shadow-lg transform transition-transform group-hover:scale-105 shrink-0`}>
              <img src="/hrduo_logo.png" alt="HRDuo" className="w-full h-full object-contain" onError={(e) => { e.target.style.display = 'none'; e.target.parentNode.innerHTML = '<span class="text-blue-700 font-black text-xs">HR</span>'; }} />
            </div>
            <AnimatePresence>
              {isOpen && (
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  className="flex flex-col overflow-hidden whitespace-nowrap"
                >
                  <span className="font-black text-base tracking-tight leading-none text-white">HRDuo</span>
                  <span className="text-[10px] font-bold text-blue-200 uppercase tracking-widest mt-1">EmployeeHub</span>
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 w-full px-3 space-y-1 overflow-y-auto no-scrollbar">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-3.5 px-3.5 py-3 rounded-xl transition-all duration-200 group text-sm font-semibold ${
                    isActive
                      ? 'bg-white/20 text-white font-bold shadow-sm backdrop-blur-md'
                      : 'text-blue-100/80 hover:bg-white/10 hover:text-white'
                  } ${!isOpen ? 'justify-center' : ''}`
                }
              >
                <Icon size={20} className="shrink-0 group-hover:scale-110 transition-transform" />
                <AnimatePresence>
                  {isOpen && (
                    <motion.span
                      initial={{ opacity: 0, width: 0 }}
                      animate={{ opacity: 1, width: 'auto' }}
                      exit={{ opacity: 0, width: 0 }}
                      className="overflow-hidden whitespace-nowrap"
                    >
                      {item.name}
                    </motion.span>
                  )}
                </AnimatePresence>
              </NavLink>
            );
          })}
        </nav>

        {/* Logout */}
        <div className="w-full p-4 border-t border-blue-400/30 mt-auto">
          <button
            onClick={handleLogout}
            className={`w-full flex items-center gap-3.5 px-3.5 py-3 rounded-xl text-blue-100 hover:bg-white/10 hover:text-white transition-all text-sm font-semibold ${
              !isOpen ? 'justify-center' : ''
            }`}
          >
            <LogOut size={20} className="shrink-0" />
            {isOpen && <span className="whitespace-nowrap font-bold">Sign Out</span>}
          </button>
        </div>
      </aside>
    </>
  );
};

export default EmployeeSidebar;
