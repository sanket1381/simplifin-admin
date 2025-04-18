import React, { useState } from 'react';
import AdminHeader from '../components/adminHeader/AdminHeader';
import AdminSidebar from '../components/adminSidebar/AdminSidebar';
import { Outlet } from 'react-router-dom';

const AdminLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="min-h-screen bg-gray-100 overflow-y-auto overflow-x-hidden">
      {/* Header */}
      <div className="fixed top-0 left-0 right-0 z-50">
        <AdminHeader toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
      </div>

      {/* Sidebar + Main */}
      <div className="flex pt-16">
        {/* Sidebar */}
        <div
          className={`fixed top-16 left-0 h-[calc(100vh-4rem)] bg-white shadow-md z-40 transition-all duration-300 
            ${isSidebarOpen ? 'w-64' : 'w-16'}`}
        >
          <AdminSidebar isSidebarOpen={isSidebarOpen} />
        </div>

        {/* Main content */}
        <main
          className={`transition-all duration-300 flex-1 px-4 py-6 ml-16 ${
            isSidebarOpen ? 'ml-64' : 'ml-16'
          }`}
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
