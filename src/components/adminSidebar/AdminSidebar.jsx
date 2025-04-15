import React from 'react'
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaChevronDown } from 'react-icons/fa';

const AdminSidebar = ({isSidebarOpen}) => {

    const [openSubmenu, setOpenSubmenu] = useState(true);
    const toggleSubmenu = () => {
        setOpenSubmenu(!openSubmenu);
      };
      

  return (
    <aside className={`fixed top-0 left-0 z-40 w-64 h-screen pt-20  border-r border-gray-200 sm:translate-x-0 bg-gray-100
     transition-transform ${isSidebarOpen ? "translate-x-0":"-translate-x-full"}`}>
    <div>
        <button
          onClick={toggleSubmenu}
          className="w-full flex items-center justify-between px-3 py-2 text-gray-700 hover:bg-gray-200 rounded-md"
        >
          <span>Customer</span>
          <FaChevronDown
            className={`transition-transform duration-200 ${
              openSubmenu ? 'rotate-180' : ''
            }`}
          />
        </button>

        {/* Submenu */}
        {openSubmenu && (
          <div className=" mt-1 space-y-1">
            <Link  to="/folios" className="flex w-full text-base px-3 py-2 text-gray-900 hover:text-blue-600 hover:bg-blue-200 rounded-md transition">
              Folios
            </Link>
            <Link to="/investment-Accounts"className="flex w-full text-base px-3 py-2 text-gray-900 hover:text-blue-600 hover:bg-blue-200 rounded-md transition">
              Investment Accounts
            </Link>
            <Link to="/investors" className="flex w-full text-base px-3 py-2 text-gray-900 hover:text-blue-600 hover:bg-blue-200 rounded-md transition">
              Investors
            </Link>
            <Link to="/kyc-requests" className="flex w-full text-base px-3 py-2 text-gray-900 hover:text-blue-600 hover:bg-blue-200 rounded-md transition">
              Kyc requests
            </Link>
            <Link to="/bankAccount-verifications" className="flex w-full text-base px-3 py-2 text-gray-900 hover:text-blue-600 hover:bg-blue-200 rounded-md transition">
              Bank account Verifications
            </Link>
          </div>
        )}
      </div> 
        
    </aside>
  );
}

export default AdminSidebar