import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/navigation/Sidebar';
import Navbar from '../components/navigation/Navbar';

const AdminLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className="h-screen bg-[#F4F7FE] flex overflow-hidden relative">
      {/* Decorative background accents */}
      <div className="absolute top-[-10%] right-[-5%] w-[400px] h-[400px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[20%] w-[300px] h-[300px] bg-primary/10 rounded-full blur-[80px] pointer-events-none" />
      
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      
      <main 
        className={`flex-1 flex flex-col transition-all duration-300 min-w-0 ${
          isSidebarOpen ? 'ml-64' : 'ml-20'
        }`}
      >
        <Navbar onMenuClick={toggleSidebar} />
        <div className="flex-1 overflow-y-auto p-6 lg:p-8 pb-12 scroll-smooth">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
