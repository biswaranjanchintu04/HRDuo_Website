import React, { useState } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard,
  Users,
  CalendarCheck,
  CalendarRange,
  Clock,
  TrendingUp,
  BarChart3,
  Bell,
  Settings,
  LogOut,
  Briefcase,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  MoreHorizontal,
  X,
  Sparkles
} from 'lucide-react';
import { useHRMS } from '../../context/HRMSContext';

export default function ManagerSidebar({ 
  isOpen, 
  toggleSidebar, 
  isMobileMoreOpen, 
  setIsMobileMoreOpen 
}) {
  const navigate = useNavigate();
  const location = useLocation();
  const { leaves } = useHRMS();
  const [internalMobileMore, setInternalMobileMore] = useState(false);

  const showMobileMore = isMobileMoreOpen !== undefined ? isMobileMoreOpen : internalMobileMore;
  const setShowMobileMore = setIsMobileMoreOpen || setInternalMobileMore;

  const pendingApprovalsCount = leaves.filter(l => l.status === 'Pending').length || 3;

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    navigate('/login');
  };

  const navItems = [
    { name: 'Dashboard', icon: LayoutDashboard, path: '/manager/dashboard' },
    { name: 'My Team', icon: Users, path: '/manager/team' },
    { name: 'Team Attendance', icon: CalendarCheck, path: '/manager/attendance' },
    { name: 'Leave Approvals', icon: CalendarRange, path: '/manager/leaves' },
    { name: 'Attendance Corrections', icon: Clock, path: '/manager/corrections' },
    { name: 'Performance & Goals', icon: TrendingUp, path: '/manager/performance' },
    { name: 'Team Reports', icon: BarChart3, path: '/manager/reports' },
    { name: 'Notifications', icon: Bell, path: '/manager/notifications' },
    { name: 'Profile & Settings', icon: Settings, path: '/manager/settings' },
  ];

  // 4 Primary tabs for Mobile App Bottom Navigation Bar
  const mobilePrimaryTabs = [
    { name: 'Home', icon: LayoutDashboard, path: '/manager/dashboard' },
    { name: 'Team', icon: Users, path: '/manager/team' },
    { name: 'Attendance', icon: CalendarCheck, path: '/manager/attendance' },
    { name: 'Approvals', icon: CalendarRange, path: '/manager/leaves', badge: pendingApprovalsCount },
  ];

  // Secondary items in the "More" slide-up drawer on mobile
  const mobileMoreTabs = [
    { name: 'Attendance Corrections', icon: Clock, path: '/manager/corrections', desc: 'Punch dispute adjustments' },
    { name: 'Performance & OKRs', icon: TrendingUp, path: '/manager/performance', desc: 'Sprint targets & appraisals' },
    { name: 'Team Reports', icon: BarChart3, path: '/manager/reports', desc: 'Headcount & productivity' },
    { name: 'Notifications', icon: Bell, path: '/manager/notifications', desc: 'Alerts & pending requests' },
    { name: 'Profile & Settings', icon: Settings, path: '/manager/settings', desc: 'Manager preferences & security' },
  ];

  const isMoreTabActive = mobileMoreTabs.some(item => location.pathname.startsWith(item.path));

  return (
    <>
      {/* ----------------- MOBILE APP BOTTOM NAVIGATION BAR (< lg) ----------------- */}
      <nav className="fixed z-40 bottom-0 left-0 right-0 h-16 bg-white/95 backdrop-blur-xl border-t border-slate-200/80 flex items-center justify-around px-2 pb-[env(safe-area-inset-bottom)] shadow-[0_-4px_25px_rgba(0,0,0,0.06)] lg:hidden select-none touch-manipulation">
        {mobilePrimaryTabs.map((tab) => {
          const Icon = tab.icon;
          const active = location.pathname.startsWith(tab.path);
          return (
            <NavLink
              key={tab.path}
              to={tab.path}
              className={`flex flex-col items-center justify-center flex-1 py-1 transition-all active:scale-95 relative ${
                active ? 'text-[#0061E0] font-black' : 'text-slate-400 hover:text-slate-600 font-medium'
              }`}
            >
              <div className={`p-1 rounded-xl transition-transform relative ${active ? 'scale-110' : ''}`}>
                <Icon size={20} strokeWidth={active ? 2.5 : 2} />
                {tab.badge > 0 && (
                  <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-rose-500 text-white rounded-full flex items-center justify-center text-[8px] font-black">
                    {tab.badge}
                  </span>
                )}
              </div>
              <span className="text-[10px] tracking-tight">{tab.name}</span>
              {active && <span className="w-1.5 h-1.5 rounded-full bg-[#0061E0] mt-0.5" />}
            </NavLink>
          );
        })}

        {/* More Button */}
        <button
          onClick={() => setShowMobileMore(true)}
          className={`flex flex-col items-center justify-center flex-1 py-1 transition-all active:scale-95 cursor-pointer ${
            isMoreTabActive || showMobileMore ? 'text-[#0061E0] font-black' : 'text-slate-400 hover:text-slate-600 font-medium'
          }`}
        >
          <div className={`p-1 rounded-xl transition-transform ${isMoreTabActive ? 'scale-110' : ''}`}>
            <MoreHorizontal size={20} />
          </div>
          <span className="text-[10px] tracking-tight">More</span>
          {isMoreTabActive && <span className="w-1.5 h-1.5 rounded-full bg-[#0061E0] mt-0.5" />}
        </button>
      </nav>

      {/* ----------------- MOBILE SLIDE-UP "MORE" DRAWER (< lg) ----------------- */}
      <AnimatePresence>
        {showMobileMore && (
          <div className="fixed inset-0 z-50 flex flex-col justify-end lg:hidden">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowMobileMore(false)}
              className="absolute inset-0 bg-slate-950/60 backdrop-blur-xs"
            />

            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 300 }}
              className="relative bg-white rounded-t-[2.5rem] p-6 shadow-2xl z-10 max-h-[85vh] overflow-y-auto"
            >
              <div className="w-12 h-1.5 bg-slate-200 rounded-full mx-auto mb-4" />

              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-purple-600 text-white font-black text-sm flex items-center justify-center shadow-md">
                    MS
                  </div>
                  <div>
                    <h3 className="font-extrabold text-slate-900 text-sm">Marcus Sterling</h3>
                    <p className="text-[11px] text-slate-500">Manager Operations Menu</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowMobileMore(false)}
                  className="p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 transition-colors"
                >
                  <X size={18} />
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
                      className={`w-full flex items-center justify-between p-3 rounded-2xl transition-all text-left cursor-pointer ${
                        active
                          ? 'bg-purple-50 text-purple-700 font-bold'
                          : 'hover:bg-slate-50 text-slate-700 font-medium'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`p-2.5 rounded-xl ${active ? 'bg-purple-600 text-white' : 'bg-slate-100 text-slate-600'}`}>
                          <Icon size={18} />
                        </div>
                        <div>
                          <div className="text-xs font-bold text-slate-900">{item.name}</div>
                          <div className="text-[10px] text-slate-400">{item.desc}</div>
                        </div>
                      </div>
                      <ChevronRight size={14} className="text-slate-300" />
                    </button>
                  );
                })}
              </div>

              <div className="pt-3 border-t border-slate-100 space-y-2">
                <button
                  onClick={() => {
                    setShowMobileMore(false);
                    navigate('/login');
                  }}
                  className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-slate-700 bg-slate-100 hover:bg-slate-200 font-bold text-xs transition-colors cursor-pointer"
                >
                  <Sparkles size={15} className="text-amber-500" />
                  <span>Switch Role Portal</span>
                </button>

                <button
                  onClick={handleLogout}
                  className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-rose-600 bg-rose-50 hover:bg-rose-100 font-bold text-xs transition-colors cursor-pointer"
                >
                  <LogOut size={16} />
                  <span>Sign Out from Manager Portal</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ----------------- DESKTOP SIDEBAR (lg+) ----------------- */}
      <aside
        className={`hidden lg:flex fixed top-0 left-0 bottom-0 z-50 bg-[#0061E0] text-white transition-all duration-300 flex-col justify-between shadow-2xl overflow-x-hidden overflow-y-auto no-scrollbar ${
          isOpen ? 'w-64' : 'w-20'
        }`}
      >
        {/* Header / Brand */}
        <div className={`h-20 flex items-center ${isOpen ? 'px-6' : 'px-4 justify-center'} transition-all justify-between border-b border-white/10`}>
          <button 
            onClick={toggleSidebar}
            className="flex items-center gap-3 hover:opacity-90 transition-opacity focus:outline-none group text-left"
          >
            <div className="w-10 h-10 bg-white p-1.5 rounded-xl flex items-center justify-center shadow-lg transform transition-transform group-hover:scale-105 shrink-0">
              <Briefcase className="w-6 h-6 text-[#0061E0]" />
            </div>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex flex-col min-w-0"
              >
                <span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-white/70 -mb-0.5">
                  HRDuo Team
                </span>
                <h1 className="text-lg font-bold tracking-tight whitespace-nowrap text-white">
                  Manager Portal
                </h1>
              </motion.div>
            )}
          </button>

          {isOpen && (
            <button
              onClick={toggleSidebar}
              className="hidden lg:flex w-7 h-7 rounded-lg bg-white/10 hover:bg-white/20 text-white items-center justify-center transition-colors focus:outline-none"
              title="Collapse Sidebar"
            >
              <ChevronLeft size={16} />
            </button>
          )}
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 py-4 pr-2 space-y-1 overflow-x-hidden overflow-y-auto no-scrollbar">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  isOpen
                    ? isActive
                      ? 'flex flex-row items-center gap-3.5 px-6 py-3 text-white bg-white/20 font-bold rounded-r-full w-[calc(100%-0.5rem)] transition-all shadow-sm backdrop-blur-md text-sm'
                      : 'flex flex-row items-center gap-3.5 px-6 py-3 text-white/80 hover:text-white hover:bg-white/10 font-semibold rounded-r-full w-[calc(100%-0.5rem)] transition-all cursor-pointer group text-sm'
                    : isActive
                      ? 'flex items-center justify-center py-3 px-2 mx-2 text-white bg-white/20 rounded-xl shadow-sm backdrop-blur-md'
                      : 'flex items-center justify-center py-3 px-2 mx-2 text-white/80 hover:text-white hover:bg-white/10 rounded-xl transition-all'
                }
                title={!isOpen ? item.name : undefined}
              >
                <Icon size={20} className="shrink-0 group-hover:scale-105 transition-transform" />
                {isOpen && <span className="truncate whitespace-nowrap">{item.name}</span>}
              </NavLink>
            );
          })}
        </nav>

        {/* Footer info & Logout */}
        <div className="p-3 border-t border-white/10 space-y-2 pr-2">
          {isOpen && (
            <div className="p-2.5 rounded-xl bg-white/10 border border-white/15 flex items-center justify-between text-white">
              <div>
                <div className="text-[11px] font-bold">Marcus Sterling</div>
                <div className="text-[10px] text-white/80 font-medium">12 Direct Reports</div>
              </div>
              <NavLink to="/login" className="text-white/70 hover:text-white" title="Switch Portal">
                <ExternalLink size={14} />
              </NavLink>
            </div>
          )}

          <button
            onClick={handleLogout}
            className={`flex items-center gap-3.5 px-6 py-3 text-white/80 hover:text-white hover:bg-white/15 transition-all cursor-pointer rounded-r-full w-[calc(100%-0.5rem)] text-left font-semibold text-sm group ${
              !isOpen ? 'justify-center px-0 mx-2 !w-[calc(100%-1rem)] rounded-xl' : ''
            }`}
            title={!isOpen ? 'Sign Out' : undefined}
          >
            <LogOut size={20} className="shrink-0 group-hover:scale-110 transition-transform" />
            {isOpen && <span className="font-bold">Sign Out</span>}
          </button>
        </div>
      </aside>
    </>
  );
}
