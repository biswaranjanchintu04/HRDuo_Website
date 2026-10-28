import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/navigation/Sidebar';
import Navbar from '../components/navigation/Navbar';

const MainLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className="h-screen h-[100dvh] bg-[#F4F7FE] flex overflow-hidden font-poppins relative">
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      
      <main 
        className={`flex-1 flex flex-col h-screen h-[100dvh] overflow-hidden transition-all duration-300 min-w-0 ${
          isSidebarOpen ? 'lg:ml-64' : 'lg:ml-20 ml-0'
        }`}
      >
        <div className="shrink-0 z-40 sticky top-0">
          <Navbar onMenuClick={toggleSidebar} />
        </div>
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 pb-16 scroll-smooth">
          <div className="w-full max-w-7xl mx-auto">
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
};

export default MainLayout;
