import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard,
  Users,
  CalendarCheck,
  CalendarRange,
  Wallet,
  UserPlus,
  Megaphone,
  BarChart3,
  Settings,
  LogOut,
  Building2,
  ScanFace
} from 'lucide-react';

const HRSidebar = ({ isOpen, toggleSidebar }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate('/hr/login');
  };

  const menuItems = [
    { name: 'HR Dashboard', icon: LayoutDashboard, path: '/hr/dashboard' },
    { name: 'All Employees', icon: Users, path: '/hr/employees' },
    { name: 'Attendance', icon: CalendarCheck, path: '/hr/attendance' },
    { name: 'Leave Approvals', icon: CalendarRange, path: '/hr/leaves' },
    { name: 'Payroll & Slips', icon: Wallet, path: '/hr/payroll' },
    { name: 'Recruitment & Jobs', icon: UserPlus, path: '/hr/recruitment' },
    { name: 'Notices & Policies', icon: Megaphone, path: '/hr/notices' },
    { name: 'HR Settings', icon: Settings, path: '/hr/settings' },
  ];

  return (
    <>
      {/* Backdrop for mobile */}
      <div
        className={`fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 lg:hidden ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        } hidden`}
        onClick={toggleSidebar}
      />

      <aside
        className={`fixed z-50 bg-gradient-to-b from-rose-700 via-rose-800 to-rose-950 transition-all duration-300 bottom-0 left-0 right-0 h-16 w-full flex flex-row items-center justify-between rounded-t-2xl shadow-[0_-4px_20px_rgba(225,29,72,0.3)] lg:top-0 lg:bottom-auto lg:right-auto lg:h-screen lg:flex-col lg:justify-start lg:rounded-none lg:shadow-2xl ${
          isOpen ? 'lg:w-64' : 'lg:w-20'
        }`}
      >
        {/* Logo */}
        <div
          className={`hidden lg:flex items-center ${
            isOpen ? 'p-6' : 'py-8 px-4'
          } mb-4 text-white transition-all duration-300 ${isOpen ? 'justify-start gap-3' : 'justify-center'}`}
        >
          <button
            onClick={toggleSidebar}
            className="flex items-center gap-3 hover:opacity-90 transition-opacity focus:outline-none group"
          >
            <div
              className={`${
                isOpen ? 'w-10 h-10' : 'w-12 h-12'
              } bg-white p-1.5 rounded-xl flex items-center justify-center shadow-lg transform transition-transform group-hover:scale-105`}
            >
              <img
                src="/hrduo_logo.png"
                alt="HRDuo"
                className="w-full h-full object-contain"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.parentNode.innerHTML = '<span class="text-rose-700 font-black text-xs">HR</span>';
                }}
              />
            </div>
            <AnimatePresence>
              {isOpen && (
                <motion.div
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: 'auto' }}
                  exit={{ opacity: 0, width: 0 }}
                  className="flex flex-col text-left overflow-hidden whitespace-nowrap"
                >
                  <span className="font-extrabold text-base tracking-tight leading-none text-white">HRDuo</span>
                  <span className="text-[10px] font-bold text-rose-200 uppercase tracking-widest mt-1">HR Portal</span>
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 w-full px-2 lg:px-4 flex flex-row lg:flex-col justify-around lg:justify-start gap-1 lg:space-y-1.5 overflow-x-auto lg:overflow-y-auto no-scrollbar">
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
                      : 'text-rose-100/80 hover:bg-white/10 hover:text-white'
                  } ${!isOpen ? 'lg:justify-center' : ''}`
                }
              >
                <Icon className="w-5 h-5 flex-shrink-0 group-hover:scale-110 transition-transform" />
                <AnimatePresence>
                  {isOpen && (
                    <motion.span
                      initial={{ opacity: 0, width: 0 }}
                      animate={{ opacity: 1, width: 'auto' }}
                      exit={{ opacity: 0, width: 0 }}
                      className="hidden lg:inline-block overflow-hidden whitespace-nowrap"
                    >
                      {item.name}
                    </motion.span>
                  )}
                </AnimatePresence>
              </NavLink>
            );
          })}
        </nav>

        {/* Bottom Logout */}
        <div className="hidden lg:block w-full p-4 border-t border-rose-600/40 mt-auto">
          <button
            onClick={handleLogout}
            className={`w-full flex items-center gap-3.5 px-3.5 py-3 rounded-xl text-rose-200 hover:bg-white/10 hover:text-white transition-all duration-200 text-sm font-semibold ${
              !isOpen ? 'justify-center' : ''
            }`}
          >
            <LogOut className="w-5 h-5 flex-shrink-0" />
            {isOpen && <span>Sign Out</span>}
          </button>
        </div>
      </aside>
    </>
  );
};

export default HRSidebar;
