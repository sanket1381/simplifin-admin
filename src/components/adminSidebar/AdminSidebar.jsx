import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaChevronDown } from 'react-icons/fa';

const AdminSidebar = ({ isSidebarOpen }) => {
  const [openCustomerMenu, setOpenCustomerMenu] = useState(true);
  const [openTransactionMenu, setTransactionMenu] = useState(true); 
  const [openHelpMenu, setHelpMenu] = useState(true); 

  const toggleCustomerMenu = () => {
    setOpenCustomerMenu(!openCustomerMenu);
  };

  const toggleTransactionMenu = () => {
    setTransactionMenu(!openTransactionMenu);
  };
  const toggleHelpMenu = () => {
    setHelpMenu(!openHelpMenu);
  };

  return (
    <aside
      className={`fixed top-0 left-0 z-40 w-64 h-screen pt-20 pb-32  border-r border-gray-200 sm:translate-x-0 bg-gray-100
      transition-transform  overflow-y-auto ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}
    >
      {/* Customer Dropdown */}
      <div>
        <button
          onClick={toggleCustomerMenu}
          className="w-full flex items-center justify-between px-3 py-2 text-gray-700 hover:bg-gray-200 rounded-md"
        >
          <span className=" text-gray-600 font-bold tracking-wide uppercase text-sm">
            CUSTOMER
          </span>
          <FaChevronDown
            className={`transition-transform duration-200 ${openCustomerMenu ? 'rotate-180' : ''}`}
          />
        </button>

        {openCustomerMenu && (
          <div className="mt-1 space-y-1">
            <Link to="/folios" className="flex w-full text-base px-3 py-2 text-gray-900 hover:text-blue-600 hover:bg-blue-200 rounded-md transition">
              Folios
            </Link>
            <Link to="/investment-Accounts" className="flex w-full text-base px-3 py-2 text-gray-900 hover:text-blue-600 hover:bg-blue-200 rounded-md transition">
              Investment Accounts
            </Link>
            <Link to="/investors" className="flex w-full text-base px-3 py-2 text-gray-900 hover:text-blue-600 hover:bg-blue-200 rounded-md transition">
              Investors
            </Link>
            <Link to="/kyc-requests" className="flex w-full text-base px-3 py-2 text-gray-900 hover:text-blue-600 hover:bg-blue-200 rounded-md transition">
              KYC Requests
            </Link>
            <Link to="/bankAccount-verifications" className="flex w-full text-base px-3 py-2 text-gray-900 hover:text-blue-600 hover:bg-blue-200 rounded-md transition">
              Bank Account Verifications
            </Link>
          </div>
        )}
      </div>

      {/* TRANSACTION  Dropdown */}
      <div>
        <button
          onClick={toggleTransactionMenu}
          className="w-full flex items-center justify-between px-3 py-2 mt-3 text-gray-700 hover:bg-gray-200 rounded-md"
        >
          <span className=" text-gray-600 font-bold tracking-wide uppercase text-sm">
            MF TRANSACTION
          </span>
          <FaChevronDown
            className={`transition-transform duration-200 ${openTransactionMenu ? 'rotate-180' : ''}`}
          />
        </button>

        {openTransactionMenu && (
          <div className="mt-1 space-y-1">
            <Link to="/bank-mandates" className="flex w-full text-base px-3 py-2 text-gray-900 hover:text-blue-600 hover:bg-blue-200 rounded-md transition">
              Bank Mandates
            </Link>
            <Link to="/payments" className="flex w-full text-base px-3 py-2 text-gray-900 hover:text-blue-600 hover:bg-blue-200 rounded-md transition">
              Payments
            </Link>
            <Link to="/purchases" className="flex w-full text-base px-3 py-2 text-gray-900 hover:text-blue-600 hover:bg-blue-200 rounded-md transition">
              Purchases
            </Link>
            <Link to="/purchase-plans" className="flex w-full text-base px-3 py-2 text-gray-900 hover:text-blue-600 hover:bg-blue-200 rounded-md transition">
              Purchase plans
            </Link>
            <Link to="/redemptions" className="flex w-full text-base px-3 py-2 text-gray-900 hover:text-blue-600 hover:bg-blue-200 rounded-md transition">
              Redemptions
            </Link>
            <Link to="/redemption-plans" className="flex w-full text-base px-3 py-2 text-gray-900 hover:text-blue-600 hover:bg-blue-200 rounded-md transition">
              Redemption plans
            </Link>
            <Link to="/switches" className="flex w-full text-base px-3 py-2 text-gray-900 hover:text-blue-600 hover:bg-blue-200 rounded-md transition">
              Switches
            </Link>
            <Link to="/switch-plans" className="flex w-full text-base px-3 py-2 text-gray-900 hover:text-blue-600 hover:bg-blue-200 rounded-md transition">
              Switch plans
            </Link>
            <Link to="/mf-settlements" className="flex w-full text-base px-3 py-2 text-gray-900 hover:text-blue-600 hover:bg-blue-200 rounded-md transition">
              Mf settlements
            </Link>
          </div>
        )}
      </div>

          {/* Help  Dropdown */}
      <div>
        <button
          onClick={toggleHelpMenu}
          className="w-full flex items-center justify-between px-3 py-2 text-gray-700 hover:bg-gray-200 rounded-md"
        >
          <span className=" text-gray-600 font-bold tracking-wide uppercase text-sm">
            HElP
          </span>
          <FaChevronDown
            className={`transition-transform duration-200 ${openHelpMenu ? 'rotate-180' : ''}`}
          />
        </button>


        {openHelpMenu && (
          <div className="mt-1 space-y-1">
            <Link to="/api-refrence" className="flex w-full text-base px-3 py-2 text-gray-900 hover:text-blue-600 hover:bg-blue-200 rounded-md transition">
              API refrence
            </Link>
            <Link to="/product-guides" className="flex w-full text-base px-3 py-2 text-gray-900 hover:text-blue-600 hover:bg-blue-200 rounded-md transition">
              Product guides
            </Link>
            
          </div>
        )}
      </div>
    </aside>
  );
};

export default AdminSidebar;
