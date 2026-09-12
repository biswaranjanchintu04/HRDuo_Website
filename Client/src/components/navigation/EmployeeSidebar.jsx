import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard,
  Users,
  CalendarCheck,
  Wallet,
  CalendarRange,
  ChartBar,
  Settings,
  LogOut,
  Clock
} from 'lucide-react';

const EmployeeSidebar = ({ isOpen, toggleSidebar }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate('/employee/login');
  };

  const menuItems = [
    { name: 'Home', icon: LayoutDashboard, path: '/employee/dashboard', comingSoon: false },
    { name: 'Attendance', icon: CalendarCheck, path: '/employee/attendance', comingSoon: false },
    { name: 'Leave', icon: CalendarRange, path: '/employee/leaves', comingSoon: false },
    { name: 'Salary', icon: Wallet, path: '/employee/salary', comingSoon: false },
    { name: 'Profile', icon: Users, path: '/employee/profile', comingSoon: false },
    { name: 'Settings', icon: Settings, path: '/employee/settings', comingSoon: false },
  ];

  return (
    <>
      {/* Backdrop for mobile - hidden as we are using bottom nav now */}
      <div
        className={`fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 lg:hidden ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
          } hidden`}
        onClick={toggleSidebar}
      />

      <aside
        className={`fixed z-50 bg-[#0061e0] transition-all duration-300 bottom-0 left-0 right-0 h-16 w-full flex flex-row items-center justify-between rounded-t-2xl shadow-[0_-4px_20px_rgba(0,0,0,0.15)] lg:top-0 lg:bottom-auto lg:right-auto lg:h-screen lg:flex-col lg:justify-start lg:rounded-none lg:shadow-2xl ${isOpen ? 'lg:w-64' : 'lg:w-20'
          }`}
      >
        <div className={`hidden lg:flex items-center ${isOpen ? 'p-6' : 'py-8 px-4'} mb-8 text-white transition-all duration-300 ${isOpen ? 'justify-start gap-3' : 'justify-center'}`}>
          <button
            onClick={toggleSidebar}
            className="flex items-center gap-3 hover:opacity-80 transition-opacity focus:outline-none group"
          >
            <div className={`${isOpen ? 'w-10 h-10' : 'w-12 h-12'} bg-white p-1.5 rounded-xl flex items-center justify-center shadow-lg transform transition-transform group-hover:scale-110 group-hover:rotate-3`}>
              <img
                src="/favicon.png"
                alt="HRDuo"
                className="w-full h-full object-contain"
              />
            </div>
            <AnimatePresence>
              {isOpen && (
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.2 }}
                  className="flex flex-col"
                >
                  <span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-white/60 -mb-1 text-left">
                    HRDuo
                  </span>
                  <h1 className="text-xl font-semibold tracking-tight whitespace-nowrap text-white">
                    EmployeeHub
                  </h1>
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </div>

        <nav className="flex flex-row lg:flex-col items-center justify-around lg:justify-start gap-1 lg:gap-2 overflow-x-auto lg:overflow-visible w-full lg:w-auto h-full lg:h-auto px-4 py-2 lg:px-0 no-scrollbar">
          {menuItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `${isActive
                  ? 'flex flex-col lg:flex-row items-center gap-1 lg:gap-4 px-3 py-1 lg:px-6 lg:py-4 text-white bg-white/20 font-semibold rounded-xl lg:rounded-l-none lg:rounded-r-full lg:mr-4 shrink-0 transition-all'
                  : 'flex flex-col lg:flex-row items-center gap-1 lg:gap-4 px-3 py-1 lg:px-6 lg:py-4 text-white/80 hover:text-white hover:bg-white/5 transition-all cursor-pointer rounded-xl lg:rounded-l-none lg:rounded-r-full lg:mr-4 shrink-0 group'
                } ${item.name === 'Profile' ? 'hidden lg:flex' : ''}`
              }
            >
              <item.icon size={20} className="min-w-[20px] lg:size-[22px] lg:min-w-[22px]" />
              <span className="text-[9px] font-medium tracking-tight lg:hidden">{item.name}</span>
              {isOpen && <span className="whitespace-nowrap hidden lg:block">{item.name}</span>}
            </NavLink>
          ))}
        </nav>

        <div className="mt-auto mb-6 hidden lg:block w-full">
          <button
            onClick={handleLogout}
            className="flex items-center gap-4 px-6 py-4 text-white/80 hover:text-white hover:bg-white/10 transition-all cursor-pointer rounded-r-full mr-4 w-full text-left"
          >
            <LogOut size={22} className="min-w-[22px]" />
            {isOpen && <span className="whitespace-nowrap">Logout</span>}
          </button>
        </div>
      </aside>
    </>
  );
};
export default EmployeeSidebar;
