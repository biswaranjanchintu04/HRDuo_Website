import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Building2, 
  CreditCard, 
  Settings,
  Menu,
  ChevronLeft,
  LogOut,
  ShieldCheck
} from 'lucide-react';

const SuperAdminSidebar = ({ isOpen, toggleSidebar }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate('/superadmin/login');
  };

  const menuItems = [
    { name: 'Dashboard', icon: LayoutDashboard, path: '/superadmin/dashboard' },
    { name: 'Organizations', icon: Building2, path: '/superadmin/organizations' },
    { name: 'Payments', icon: CreditCard, path: '/superadmin/payments' },
    { name: 'Settings', icon: Settings, path: '/superadmin/settings' },
  ];

  return (
    <>
      {/* Backdrop for mobile - hidden as we are using bottom nav now */}
      <div 
        className={`fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 lg:hidden ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        } hidden`}
        onClick={toggleSidebar}
      />

      <aside 
        className={`fixed z-50 bg-white border-t border-gray-100 lg:border-t-0 lg:border-r transition-all duration-300 bottom-0 left-0 right-0 h-16 w-full flex flex-row items-center justify-between rounded-t-2xl shadow-[0_-4px_20px_rgba(0,0,0,0.05)] lg:top-0 lg:bottom-auto lg:right-auto lg:h-screen lg:flex-col lg:justify-start lg:rounded-none lg:shadow-none lg:w-20 ${
          isOpen ? 'lg:w-64' : 'lg:w-20'
        }`}
      >
        <div className="hidden lg:flex items-center justify-between p-6 mb-8 w-full">
          {isOpen && (
            <div className="flex items-center gap-2">
              <ShieldCheck className="text-[#3B82F6]" size={24} />
              <h1 className="text-xl font-semibold tracking-tight text-[#1E293B]">Super Admin</h1>
            </div>
          )}
          <button 
            onClick={toggleSidebar}
            className="p-2 rounded-lg hover:bg-gray-50 transition-colors text-gray-400"
          >
            {isOpen ? <ChevronLeft size={20} /> : <Menu size={20} />}
          </button>
        </div>

        <nav className="flex flex-row lg:flex-col items-center justify-around lg:justify-start gap-1 lg:gap-2 overflow-x-auto lg:overflow-visible w-full lg:w-auto h-full lg:h-auto px-4 py-2 lg:px-3 no-scrollbar">
          {menuItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) => 
                isActive 
                  ? 'flex flex-col lg:flex-row items-center gap-1 lg:gap-4 px-3 py-1 lg:px-4 lg:py-3 text-white bg-[#3B82F6] font-semibold rounded-xl lg:shadow-lg lg:shadow-blue-600/20 shrink-0 transition-all' 
                  : 'flex flex-col lg:flex-row items-center gap-1 lg:gap-4 px-3 py-1 lg:px-4 lg:py-3 text-gray-500 hover:text-[#3B82F6] hover:bg-blue-50 transition-all cursor-pointer rounded-xl shrink-0'
              }
            >
              <item.icon size={20} className="min-w-[20px] lg:size-[22px] lg:min-w-[22px]" />
              <span className="text-[9px] font-semibold tracking-tight lg:hidden">{item.name}</span>
              {isOpen && <span className="whitespace-nowrap font-semibold text-sm hidden lg:block">{item.name}</span>}
            </NavLink>
          ))}
          
          {/* Logout button at the end of bottom nav bar on mobile */}
          <button 
            onClick={handleLogout}
            className="flex flex-col lg:hidden items-center gap-1 px-3 py-1 text-gray-500 hover:text-red-600 hover:bg-red-50 transition-all cursor-pointer rounded-xl shrink-0"
          >
            <LogOut size={20} className="min-w-[20px]" />
            <span className="text-[9px] font-semibold tracking-tight">Logout</span>
          </button>
        </nav>

        <div className="mt-auto mb-6 hidden lg:block px-3 w-full">
          <button 
            onClick={handleLogout}
            className="flex items-center gap-4 px-4 py-3 text-gray-500 hover:text-red-600 hover:bg-red-50 transition-all cursor-pointer rounded-xl w-full text-left"
          >
            <LogOut size={22} className="min-w-[22px]" />
            {isOpen && <span className="whitespace-nowrap font-semibold text-sm">Logout</span>}
          </button>
        </div>
      </aside>
    </>
  );
};

export default SuperAdminSidebar;
