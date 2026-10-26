import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import ManagerSidebar from '../components/navigation/ManagerSidebar';
import Navbar from '../components/navigation/Navbar';

const ManagerLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth > 1024);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const closeSidebarOnMobile = () => {
    if (window.innerWidth <= 1024) {
      setIsSidebarOpen(false);
    }
  };

  return (
    <div className="h-screen h-[100dvh] bg-[#F4F7FE] flex overflow-hidden font-poppins relative overscroll-none">
      {/* Decorative background accents */}
      <div className="absolute top-[-10%] right-[-5%] w-[400px] h-[400px] bg-violet-500/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[20%] w-[300px] h-[300px] bg-violet-500/10 rounded-full blur-[80px] pointer-events-none" />

      <ManagerSidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      <main
        className={`flex-1 flex flex-col transition-all duration-300 min-w-0 ${
          isSidebarOpen ? 'lg:ml-64' : 'lg:ml-20 ml-0'
        }`}
      >
        <Navbar onMenuClick={toggleSidebar} />
        <div className="flex-1 overflow-y-auto p-3.5 sm:p-6 lg:p-8 pb-24 sm:pb-20 lg:pb-8 scroll-smooth" onClick={closeSidebarOnMobile}>
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default ManagerLayout;
