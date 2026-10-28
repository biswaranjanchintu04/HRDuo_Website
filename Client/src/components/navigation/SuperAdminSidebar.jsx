import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard,
  Building2,
  CreditCard,
  Receipt,
  LineChart,
  LifeBuoy,
  Bell,
  FileText,
  Settings,
  LogOut,
  ShieldCheck,
  ChevronLeft,
  ChevronRight,
  ExternalLink
} from 'lucide-react';

export default function SuperAdminSidebar({ isOpen, toggleSidebar }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    navigate('/superadmin/login');
  };

  const navItems = [
    { name: 'Dashboard', icon: LayoutDashboard, path: '/superadmin/dashboard' },
    { name: 'Company Management', icon: Building2, path: '/superadmin/companies' },
    { name: 'Subscription Plans', icon: CreditCard, path: '/superadmin/plans' },
    { name: 'Billing & Payments', icon: Receipt, path: '/superadmin/payments' },
    { name: 'Platform Analytics', icon: LineChart, path: '/superadmin/analytics' },
    { name: 'Support Tickets', icon: LifeBuoy, path: '/superadmin/tickets' },
    { name: 'Notifications', icon: Bell, path: '/superadmin/notifications' },
    { name: 'Audit Logs', icon: FileText, path: '/superadmin/audit-logs' },
    { name: 'Profile & Settings', icon: Settings, path: '/superadmin/settings' },
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
              <ShieldCheck className="w-6 h-6 text-[#0061E0]" />
            </div>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex flex-col min-w-0"
              >
                <span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-white/70 -mb-0.5">
                  HRDuo Cloud
                </span>
                <h1 className="text-lg font-bold tracking-tight whitespace-nowrap text-white">
                  Super Admin
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
                <div className="text-[11px] font-bold">Platform v2.4</div>
                <div className="text-[10px] text-white/80 font-semibold flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  All Systems Normal
                </div>
              </div>
              <NavLink to="/superadmin/login" className="text-white/70 hover:text-white" title="Switch Role">
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
