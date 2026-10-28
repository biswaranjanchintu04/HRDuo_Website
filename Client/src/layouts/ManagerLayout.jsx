import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import ManagerSidebar from '../components/navigation/ManagerSidebar';
import Navbar from '../components/navigation/Navbar';

export default function ManagerLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobileMoreOpen, setIsMobileMoreOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 1024) {
        setIsSidebarOpen(true);
      } else {
        setIsSidebarOpen(false);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleSidebar = () => {
    if (window.innerWidth <= 1024) {
      setIsMobileMoreOpen(prev => !prev);
    } else {
      setIsSidebarOpen(prev => !prev);
    }
  };

  const closeSidebarOnMobile = () => {
    if (window.innerWidth <= 1024) {
      setIsMobileMoreOpen(false);
    }
  };

  return (
    <div className="h-screen h-[100dvh] bg-[#F4F7FE] flex overflow-hidden font-poppins relative">
      {/* Decorative background accents */}
      <div className="absolute top-[-10%] right-[-5%] w-[400px] h-[400px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[20%] w-[300px] h-[300px] bg-primary/10 rounded-full blur-[80px] pointer-events-none" />

      {/* Responsive Navigation */}
      <ManagerSidebar
        isOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
        isMobileMoreOpen={isMobileMoreOpen}
        setIsMobileMoreOpen={setIsMobileMoreOpen}
      />

      <main
        className={`flex-1 flex flex-col h-screen h-[100dvh] overflow-hidden transition-all duration-300 min-w-0 ${
          isSidebarOpen ? 'lg:ml-64' : 'lg:ml-20 ml-0'
        }`}
      >
        <div className="shrink-0 z-40 sticky top-0">
          <Navbar onMenuClick={toggleSidebar} />
        </div>
        {/* pb-24 on mobile ensures bottom navigation bar never covers content */}
        <div
          className="flex-1 overflow-y-auto p-3.5 sm:p-5 lg:p-7 pb-28 lg:pb-8 scroll-smooth overscroll-contain"
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
