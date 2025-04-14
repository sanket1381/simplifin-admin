import React, { useState } from 'react';
import AdminHeader from '../components/adminHeader/AdminHeader';
import AdminSidebar from '../components/adminSidebar/AdminSidebar';
import { Outlet } from 'react-router-dom';

const AdminLayout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <AdminHeader toggleSidebar={toggleSidebar} />

      {/* Content area with Sidebar */}
      <div className="flex pt-16">
        <AdminSidebar isSidebarOpen={isSidebarOpen} />

        {/* Main content */}
        <div className={`flex-1 transition-all bg-gray-50 duration-300 ${isSidebarOpen ? 'ml-64' : 'ml-16'}`}>
          <div className="w-full p-6">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
