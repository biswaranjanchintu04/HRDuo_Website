import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  LayoutDashboard,
  Users,
  UserPlus,
  UserCheck,
  Compass,
  CalendarCheck,
  CalendarRange,
  Wallet,
  Briefcase,
  Award,
  FolderArchive,
  BarChart3,
  Settings,
  LogOut,
  Users2,
  ChevronLeft,
  ChevronRight,
  ExternalLink
} from 'lucide-react';

export default function HRSidebar({ isOpen, toggleSidebar }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    navigate('/login');
  };

  const navItems = [
    { name: 'Dashboard', icon: LayoutDashboard, path: '/hr/dashboard' },
    { name: 'Employee Directory', icon: Users, path: '/hr/employees' },
    { name: 'Add Employee', icon: UserPlus, path: '/hr/add-employee' },
    { name: 'Employee Details', icon: UserCheck, path: '/hr/employee-details' },
    { name: 'Onboarding', icon: Compass, path: '/hr/onboarding' },
    { name: 'Attendance Management', icon: CalendarCheck, path: '/hr/attendance' },
    { name: 'Leave Requests', icon: CalendarRange, path: '/hr/leaves' },
    { name: 'Payroll Overview', icon: Wallet, path: '/hr/payroll' },
    { name: 'Recruitment', icon: Briefcase, path: '/hr/recruitment' },
    { name: 'Performance Reviews', icon: Award, path: '/hr/performance' },
    { name: 'Employee Documents', icon: FolderArchive, path: '/hr/documents' },
    { name: 'Reports', icon: BarChart3, path: '/hr/reports' },
    { name: 'HR Settings', icon: Settings, path: '/hr/settings' },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      <div
        className={`fixed inset-0 bg-slate-950/60 z-40 transition-opacity duration-300 lg:hidden ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={toggleSidebar}
      />

      <aside
        className={`fixed top-0 left-0 bottom-0 z-50 bg-[#0061E0] text-white transition-all duration-300 flex flex-col justify-between shadow-2xl overflow-x-hidden overflow-y-auto no-scrollbar ${
          isOpen ? 'w-64' : 'w-20'
        } ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}
      >
        {/* Header / Brand */}
        <div className={`h-20 flex items-center ${isOpen ? 'px-6' : 'px-4 justify-center'} transition-all justify-between border-b border-white/10`}>
          <button 
            onClick={toggleSidebar}
            className="flex items-center gap-3 hover:opacity-90 transition-opacity focus:outline-none group text-left"
          >
            <div className="w-10 h-10 bg-white p-1.5 rounded-xl flex items-center justify-center shadow-lg transform transition-transform group-hover:scale-105 shrink-0">
              <Users2 className="w-6 h-6 text-[#0061E0]" />
            </div>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex flex-col min-w-0"
              >
                <span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-white/70 -mb-0.5">
                  HRDuo People
                </span>
                <h1 className="text-lg font-bold tracking-tight whitespace-nowrap text-white">
                  HR Portal
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
                <div className="text-[11px] font-bold">Claire Bennett</div>
                <div className="text-[10px] text-white/80 font-medium">Head of People Ops</div>
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
