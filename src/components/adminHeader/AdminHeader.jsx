import React from 'react';
import { HiOutlineMenuAlt2 } from 'react-icons/hi';
import { FiLogOut } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

const AdminHeader = ({ toggleSidebar }) => {
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate('/folios', { replace: true });
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/signin');
  };

  return (
    <nav className="fixed top-0 z-50 w-full bg-white shadow-md">
      <div className="px-3 py-3 lg:px-5 lg:pl-3">
        <div className="flex items-center justify-between">
          
          <div className="flex items-center gap-4 ms-2 md:me-24">
            {/* Sidebar Toggle */}
            <button
              onClick={toggleSidebar}
              className="focus:outline-none"
            >
              <HiOutlineMenuAlt2 className="h-8 text-xl text-gray-500" />
            </button>

            {/* Logo */}
            <div
              className="flex items-center cursor-pointer"
              onClick={handleLogoClick}
            >
              <img
                src="/Simplifin.png"
                alt="Profile"
                className="w-8 h-8 rounded-full mr-2"
              />
              <h1 className="text-xl font-bold text-gray-700 tracking-wider font-poppins ">
                Simplifin
              </h1>
            </div>
          </div>

          {/* Right: Logout */}
          <div>
            <button
              onClick={handleLogout}
              title="Logout"
              className="flex items-center gap-2 text-red-600 hover:text-red-800 font-medium"
            >
              <FiLogOut className="text-xl" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default AdminHeader;
