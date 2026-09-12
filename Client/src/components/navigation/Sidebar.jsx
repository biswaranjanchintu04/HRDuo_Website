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
  Megaphone,
  ScanFace,
  Camera
} from 'lucide-react';

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate('/admin/login');
  };

  const menuItems = [
    { name: 'Dashboard', icon: LayoutDashboard, path: '/admin/dashboard' },
    { name: 'Employees', icon: Users, path: '/admin/employees' },
    { name: 'Attendance', icon: CalendarCheck, path: '/admin/attendance' },
    { name: 'Face Enrollment', icon: ScanFace, path: '/admin/face-registration' },
    { name: 'Payroll', icon: Wallet, path: '/admin/payroll' },
    { name: 'Leave Request', icon: CalendarRange, path: '/admin/leaves' },
    { name: 'Notice Board', icon: Megaphone, path: '/admin/notices' },
    { name: 'Reports', icon: ChartBar, path: '/admin/reports' },
    { name: 'Settings', icon: Settings, path: '/admin/settings' },
  ];

  return (
    <aside 
      className={`fixed top-0 left-0 bottom-0 z-50 bg-[#0061e0] transition-all duration-300 h-screen flex flex-col justify-start shadow-2xl overflow-x-hidden overflow-y-auto no-scrollbar [ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden ${
        isOpen ? 'w-64' : 'w-20'
      }`}
    >
      {/* Header & Logo */}
      <div className={`flex items-center ${isOpen ? 'p-6' : 'py-8 px-4'} mb-4 text-white transition-all duration-300 ${isOpen ? 'justify-start gap-3' : 'justify-center'}`}>
        <button 
          onClick={toggleSidebar}
          className="flex items-center gap-3 hover:opacity-90 transition-opacity focus:outline-none group text-left"
        >
          <div className={`${isOpen ? 'w-10 h-10' : 'w-12 h-12'} bg-white p-1.5 rounded-xl flex items-center justify-center shadow-lg transform transition-transform group-hover:scale-110 group-hover:rotate-3 shrink-0`}>
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
                <span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-white/60 -mb-1">
                  HRDuo
                </span>
                <h1 className="text-xl font-semibold tracking-tight whitespace-nowrap text-white">
                  AdminPanel
                </h1>
              </motion.div>
            )}
          </AnimatePresence>
        </button>
      </div>

      {/* Nav Menu */}
      <nav className="flex flex-col items-start gap-1.5 w-full overflow-x-hidden overflow-y-auto flex-1 no-scrollbar [ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden pr-2">
        {menuItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) => 
              isActive 
                ? 'flex flex-row items-center gap-3.5 px-6 py-3.5 text-white bg-white/20 font-bold rounded-r-full w-[calc(100%-0.75rem)] transition-all shadow-sm backdrop-blur-md' 
                : 'flex flex-row items-center gap-3.5 px-6 py-3.5 text-white/80 hover:text-white hover:bg-white/10 font-semibold rounded-r-full w-[calc(100%-0.75rem)] transition-all cursor-pointer group'
            }
          >
            <item.icon size={22} className="min-w-[22px] shrink-0 group-hover:scale-105 transition-transform" />
            {isOpen && <span className="whitespace-nowrap text-sm font-semibold tracking-wide">{item.name}</span>}
          </NavLink>
        ))}
      </nav>

      {/* Logout button at bottom */}
      <div className="mt-auto mb-6 w-full pr-2">
        <button 
          onClick={handleLogout}
          className="flex items-center gap-3.5 px-6 py-3.5 text-white/80 hover:text-white hover:bg-white/15 transition-all cursor-pointer rounded-r-full w-[calc(100%-0.75rem)] text-left font-semibold text-sm group"
        >
          <LogOut size={22} className="min-w-[22px] shrink-0 group-hover:scale-110 transition-transform" />
          {isOpen && <span className="whitespace-nowrap font-bold">Logout</span>}
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
