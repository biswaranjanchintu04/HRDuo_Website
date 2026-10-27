import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import EmployeeSidebar from '../components/navigation/EmployeeSidebar';
import Navbar from '../components/navigation/Navbar';

export default function EmployeeLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth > 1024);
  const [isMobileMoreOpen, setIsMobileMoreOpen] = useState(false);

  const toggleSidebar = () => {
    if (window.innerWidth <= 1024) {
      setIsMobileMoreOpen(prev => !prev);
    } else {
      setIsSidebarOpen(!isSidebarOpen);
    }
  };

  const closeSidebarOnMobile = () => {
    if (window.innerWidth <= 1024) {
      setIsSidebarOpen(false);
      setIsMobileMoreOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F4F7FE] flex overflow-hidden font-poppins relative">
      {/* Decorative background accents */}
      <div className="absolute top-[-10%] right-[-5%] w-[400px] h-[400px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[20%] w-[300px] h-[300px] bg-primary/10 rounded-full blur-[80px] pointer-events-none" />

      {/* Responsive Navigation: Desktop Sidebar (lg+) & Mobile App Bottom Navigation Bar (<lg) */}
      <EmployeeSidebar 
        isOpen={isSidebarOpen} 
        toggleSidebar={toggleSidebar}
        isMobileMoreOpen={isMobileMoreOpen}
        setIsMobileMoreOpen={setIsMobileMoreOpen}
      />

      <main 
        className={`flex-1 flex flex-col transition-all duration-300 min-w-0 ${
          isSidebarOpen ? 'lg:ml-64' : 'lg:ml-20 ml-0'
        }`}
      >
        <Navbar onMenuClick={toggleSidebar} />
        {/* pb-24 on mobile ensures bottom navigation bar never covers content */}
        <div 
          className="flex-1 overflow-y-auto p-3.5 sm:p-6 lg:p-8 pb-24 lg:pb-12 scroll-smooth" 
          onClick={closeSidebarOnMobile}
        >
          <div className="w-full max-w-7xl mx-auto">
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
}
