import React, { useState, useRef, useEffect } from 'react';
import { 
  Menu,
  Search, 
  Bell, 
  User, 
  Settings, 
  LogOut, 
  ShieldCheck, 
  Building2, 
  Users2, 
  Briefcase, 
  UserCheck,
  X
} from 'lucide-react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useHRMS } from '../../context/HRMSContext';
import { useAlert } from '../../context/AlertContext';

const PORTALS = [
  {
    id: 'superadmin',
    name: 'Super Admin',
    badge: 'Platform Root',
    badgeColor: 'bg-indigo-100 text-indigo-700',
    icon: ShieldCheck,
    path: '/superadmin/dashboard',
    user: 'Alexander Vance',
    roleTitle: 'Platform Director'
  },
  {
    id: 'admin',
    name: 'Company Admin',
    badge: 'Org Control',
    badgeColor: 'bg-blue-100 text-blue-700',
    icon: Building2,
    path: '/admin/dashboard',
    user: 'Elena Rostova',
    roleTitle: 'VP Operations'
  },
  {
    id: 'hr',
    name: 'HR Portal',
    badge: 'Talent & People',
    badgeColor: 'bg-rose-100 text-rose-700',
    icon: Users2,
    path: '/hr/dashboard',
    user: 'Claire Bennett',
    roleTitle: 'Head of People'
  },
  {
    id: 'manager',
    name: 'Manager Portal',
    badge: 'Team Lead',
    badgeColor: 'bg-purple-100 text-purple-700',
    icon: Briefcase,
    path: '/manager/dashboard',
    user: 'Marcus Sterling',
    roleTitle: 'Engineering Lead'
  },
  {
    id: 'employee',
    name: 'Employee Portal',
    badge: 'Self-Service',
    badgeColor: 'bg-emerald-100 text-emerald-700',
    icon: UserCheck,
    path: '/employee/dashboard',
    user: 'Sophia Chen',
    roleTitle: 'Senior Full Stack Engineer'
  }
];

export default function Navbar({ onMenuClick }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { notices, tickets, leaves } = useHRMS();
  const { showToast } = useAlert();

  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const [readNotifs, setReadNotifs] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('hrduo_read_notifs') || '[]');
    } catch {
      return [];
    }
  });

  const notifMenuRef = useRef(null);
  const profileMenuRef = useRef(null);

  // Close dropdowns on click outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (notifMenuRef.current && !notifMenuRef.current.contains(e.target)) {
        setShowNotifications(false);
      }
      if (profileMenuRef.current && !profileMenuRef.current.contains(e.target)) {
        setShowProfileMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Determine active portal based on current route
  const currentPath = location.pathname;
  let activePortal = PORTALS.find(p => currentPath.startsWith(`/${p.id}`)) || PORTALS[1];
  if (currentPath.startsWith('/superadmin')) activePortal = PORTALS[0];
  else if (currentPath.startsWith('/admin')) activePortal = PORTALS[1];
  else if (currentPath.startsWith('/hr')) activePortal = PORTALS[2];
  else if (currentPath.startsWith('/manager')) activePortal = PORTALS[3];
  else if (currentPath.startsWith('/employee')) activePortal = PORTALS[4];

  // Breadcrumbs calculation
  const pathParts = currentPath.split('/').filter(Boolean);
  const pageTitle = pathParts[1]
    ? pathParts[1].replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
    : 'Dashboard';

  // Sample notifications list
  const notificationItems = [
    {
      id: 'notif-1',
      title: 'New Leave Request Submitted',
      desc: 'Liam Gallagher requested 2 days of Sick Leave.',
      time: '10m ago',
      type: 'leave',
      unread: !readNotifs.includes('notif-1')
    },
    {
      id: 'notif-2',
      title: 'Subscription Renewed',
      desc: 'Nexus BioHealth Labs renewed Enterprise Annual Plan ($3,800).',
      time: '1h ago',
      type: 'billing',
      unread: !readNotifs.includes('notif-2')
    },
    {
      id: 'notif-3',
      title: 'Company Announcement',
      desc: 'Q4 Global All-Hands meeting scheduled for Thursday.',
      time: '3h ago',
      type: 'notice',
      unread: !readNotifs.includes('notif-3')
    },
    {
      id: 'notif-4',
      title: 'Support Ticket Escalated',
      desc: 'Ticket #TICK-8920 marked Critical by Nexus BioHealth.',
      time: '5h ago',
      type: 'ticket',
      unread: !readNotifs.includes('notif-4')
    }
  ];

  const unreadCount = notificationItems.filter(n => n.unread).length;

  const markAllRead = () => {
    const allIds = notificationItems.map(n => n.id);
    setReadNotifs(allIds);
    localStorage.setItem('hrduo_read_notifs', JSON.stringify(allIds));
    showToast('All notifications marked as read', 'success');
  };


  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    const logoutPath = activePortal.id === 'superadmin' ? '/superadmin/login' : '/login';
    navigate(logoutPath);
    showToast('Signed out of HRMS demonstration', 'info');
  };

  return (
    <header className="h-16 lg:h-20 bg-white/85 backdrop-blur-xl border-b border-slate-200/80 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.04)] flex items-center justify-between px-3.5 sm:px-6 lg:px-8 sticky top-0 z-40 shrink-0 transition-all font-poppins">
      {/* Left: Mobile hamburger (opens More drawer) + Mobile logo + Breadcrumbs */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Mobile: hamburger opens the More/sidebar drawer */}
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 active:bg-slate-200 transition-colors focus:outline-none touch-manipulation"
          title="Open Menu"
          aria-label="Open navigation menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Mobile branding */}
        <div className="lg:hidden flex items-center gap-1.5">
          <div className="w-7 h-7 rounded-lg bg-white p-1 shadow-sm flex items-center justify-center border border-slate-200/80">
            <img
              src="/favicon.png"
              alt="HRDuo"
              className="w-full h-full object-contain"
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.parentNode.innerHTML = '<span class="text-[#0061E0] font-black text-[10px]">HR</span>';
              }}
            />
          </div>
          <span className="font-black text-sm tracking-tight text-slate-900">HRDuo</span>
        </div>

        <div className="hidden sm:flex items-center gap-2 text-sm ml-1">
          <span className="font-semibold text-slate-400">{activePortal.name}</span>
          <span className="text-slate-300">/</span>
          <span className="font-bold text-slate-800 tracking-tight">{pageTitle}</span>
        </div>
      </div>

      {/* Middle: Global Quick Search */}
      <div className="flex-1 max-w-md mx-4 hidden md:block">
        <div 
          onClick={() => setShowSearchModal(true)}
          className="relative flex items-center w-full px-4 py-2 text-sm bg-white/80 hover:bg-white text-slate-500 rounded-2xl border border-slate-200/80 hover:border-[#0061E0]/50 shadow-xs hover:shadow-sm cursor-pointer transition-all group backdrop-blur-sm"
        >
          <Search className="w-4 h-4 mr-2.5 text-slate-400 group-hover:text-[#0061E0] transition-colors" />
          <span className="text-slate-400 text-xs font-medium">Quick search employees, leaves, modules...</span>
          <kbd className="ml-auto text-[10px] font-mono uppercase bg-slate-100 px-2 py-0.5 rounded-md border border-slate-200 text-slate-500">
            Ctrl+K
          </kbd>
        </div>
      </div>

      {/* Right Controls: Communications Bell, User Profile */}
      <div className="flex items-center gap-2 sm:gap-4">

        {/* Notifications / Communications Bell */}
        <div className="relative" ref={notifMenuRef}>
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className={`relative p-2.5 transition-all duration-300 rounded-2xl cursor-pointer ${
              showNotifications 
                ? 'bg-[#0061E0] text-white shadow-lg shadow-[#0061E0]/30' 
                : 'text-gray-500 hover:bg-slate-100'
            }`}
            title="Communications"
          >
            <Bell size={20} />
            {unreadCount > 0 && (
              <span className="absolute top-2 right-2 w-4 h-4 bg-red-500 text-white rounded-full flex items-center justify-center text-[8px] font-black border-2 border-white">
                {unreadCount}
              </span>
            )}
          </button>

          <AnimatePresence>
            {showNotifications && (
              <motion.div
                initial={{ opacity: 0, y: 15, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 15, scale: 0.95 }}
                className="absolute right-0 mt-3 w-[310px] sm:w-[350px] bg-white/95 backdrop-blur-2xl border border-white/50 rounded-[32px] shadow-[0_20px_50px_rgba(0,0,0,0.15)] overflow-hidden z-[100] p-2"
              >
                <div className="p-4 border-b border-gray-100 flex items-center justify-between">
                  <div>
                    <h3 className="text-xs font-black text-gray-900 uppercase tracking-widest">Communications</h3>
                    <p className="text-[10px] text-gray-400 font-medium">{unreadCount} unread alerts</p>
                  </div>
                  {unreadCount > 0 && (
                    <button
                      onClick={markAllRead}
                      className="text-[10px] font-bold text-[#0061E0] hover:underline cursor-pointer"
                    >
                      Mark all read
                    </button>
                  )}
                </div>

                <div className="max-h-80 overflow-y-auto p-2 space-y-1.5 divide-y divide-gray-50">
                  {notificationItems.map((item) => (
                    <div
                      key={item.id}
                      className={`p-3 rounded-2xl transition-all flex items-start gap-3 hover:bg-slate-50 cursor-pointer ${
                        item.unread ? 'bg-blue-50/40 border-l-3 border-[#0061E0]' : ''
                      }`}
                    >
                      <div className="w-8 h-8 rounded-xl bg-blue-100 text-[#0061E0] flex items-center justify-center shrink-0 mt-0.5">
                        <Bell className="w-4 h-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <p className="text-xs font-bold text-slate-900 truncate">{item.title}</p>
                          <span className="text-[9px] font-medium text-slate-400">{item.time}</span>
                        </div>
                        <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="bg-gray-50/70 p-3 flex justify-center border-t border-gray-100">
                  <span className="text-[10px] font-bold text-slate-500">
                    Live Demo Updates Active
                  </span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* User Profile Section with ID & Status Badges */}
        <div className="relative" ref={profileMenuRef}>
          <div
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            className="flex items-center gap-3 pl-3 lg:pl-5 border-l border-gray-100 cursor-pointer hover:opacity-90 transition-all"
          >
            <div className="text-right hidden sm:block">
              <h3 className="text-sm font-bold text-gray-900 leading-tight">{activePortal.user}</h3>
              <p className="text-xs text-gray-400 font-semibold leading-tight mt-0.5">{activePortal.roleTitle}</p>
              <div className="flex items-center justify-end gap-1.5 mt-1">
                <span className="px-1.5 py-0.5 bg-gray-100 text-gray-600 rounded text-[9px] font-black uppercase tracking-wider">
                  ID: {activePortal.id === 'employee' ? 'EMP001' : activePortal.id === 'manager' ? 'MGR007' : activePortal.id === 'hr' ? 'HR010' : 'ADM001'}
                </span>
                <span className="px-1.5 py-0.5 rounded text-[9px] font-black uppercase tracking-wider bg-emerald-50 text-emerald-700 border border-emerald-200">
                  FULL TIME
                </span>
              </div>
            </div>

            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#0061E0] to-blue-400 text-white font-extrabold text-sm flex items-center justify-center shadow-lg shadow-[#0061E0]/20 shrink-0">
              {activePortal.user.charAt(0)}
            </div>
          </div>

          <AnimatePresence>
            {showProfileMenu && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.96 }}
                transition={{ duration: 0.15 }}
                className="absolute right-0 mt-3 w-64 bg-white rounded-3xl shadow-2xl border border-slate-100 p-2 z-50"
              >
                <div className="p-3.5 border-b border-slate-100">
                  <div className="font-bold text-sm text-slate-900">{activePortal.user}</div>
                  <div className="text-xs text-slate-400 font-medium">{activePortal.roleTitle}</div>
                  <div className="mt-2 inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                    Simulated Active Session
                  </div>
                </div>

                <div className="py-1">
                  <Link
                    to={activePortal.id === 'employee' ? '/employee/profile' : `/${activePortal.id}/settings`}
                    onClick={() => setShowProfileMenu(false)}
                    className="flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 rounded-xl transition-colors"
                  >
                    <User className="w-4 h-4 text-slate-400" />
                    <span>My Account & Profile</span>
                  </Link>

                  <Link
                    to={`/${activePortal.id}/settings`}
                    onClick={() => setShowProfileMenu(false)}
                    className="flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 rounded-xl transition-colors"
                  >
                    <Settings className="w-4 h-4 text-slate-400" />
                    <span>Portal Settings</span>
                  </Link>

                  <div className="my-1 border-t border-slate-100" />

                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-bold text-rose-600 hover:bg-rose-50 rounded-xl transition-colors cursor-pointer"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Sign Out</span>
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Quick Search Modal */}
      <AnimatePresence>
        {showSearchModal && (
          <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-slate-950/40 backdrop-blur-xs"
              onClick={() => setShowSearchModal(false)}
            />
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: -20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: -20 }}
              className="relative bg-white rounded-3xl shadow-2xl border border-slate-200 max-w-lg w-full overflow-hidden z-10"
            >
              <div className="p-4 border-b border-slate-100 flex items-center gap-3">
                <Search className="w-5 h-5 text-blue-600 shrink-0" />
                <input
                  type="text"
                  placeholder="Search pages, employees, companies..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  autoFocus
                  className="w-full text-sm font-medium outline-hidden text-slate-900 placeholder:text-slate-400"
                />
                <button
                  onClick={() => setShowSearchModal(false)}
                  className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="p-4 max-h-80 overflow-y-auto space-y-2">
                <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 px-2">Quick Navigation</div>
                <p className="text-xs text-slate-400 px-2 py-2">Use the sidebar to navigate between modules.</p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </header>
  );
}
