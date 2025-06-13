import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FaChevronDown } from 'react-icons/fa';

const AdminSidebar = ({ isSidebarOpen }) => {
  const [openCustomerMenu, setOpenCustomerMenu] = useState(true);
  const [openTransactionMenu, setTransactionMenu] = useState(true);
  const [openGoldMenu, setOpenGoldMenu] = useState(true);


  const toggleCustomerMenu = () => setOpenCustomerMenu(!openCustomerMenu);
  const toggleTransactionMenu = () => setTransactionMenu(!openTransactionMenu);


  const linkClass = ({ isActive }) =>
    `block text-sm px-3 py-2 rounded-md ${isActive
      ? 'bg-blue-200 text-blue-700 font-medium'
      : 'text-gray-900  hover:bg-gray-200'
    }`;

  return (
    <aside
      className={`fixed top-0 left-0 z-40 w-64 h-screen pt-20 pb-32 px-3 border-r border-gray-200 bg-gray-100 transition-transform transform overflow-y-auto ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
    >

      {/* CUSTOMER */}
      <div className="mt-2">
        <button
          onClick={toggleCustomerMenu}
          className="w-full flex items-center justify-between px-2 py-2 text-gray-900 hover:text-gray-700 hover:bg-gray-200 rounded-md"
        >
          <span className="text-gray-600 font-bold tracking-wide uppercase text-sm">
            CUSTOMER
          </span>
          <FaChevronDown
            className={`transition-transform duration-200 ${openCustomerMenu ? 'rotate-180' : ''
              }`}
          />
        </button>

        {openCustomerMenu && (
          <div className="mt-1 space-y-1">
            <NavLink to="/user-details" className={linkClass}>
              User Details
            </NavLink>
            <NavLink to="/folios" className={linkClass}>
              Folios
            </NavLink>
            <NavLink to="/kyc-requests" className={linkClass}>
              KYC Requests
            </NavLink>
            <NavLink to="/bankAccount-verifications" className={linkClass}>
              Bank Account Verifications
            </NavLink>
            <NavLink to="/address-details" className={linkClass}>
              Address Details
            </NavLink>
          </div>
        )}
      </div>


      {/* MF TRANSACTIONS */}
      <div className="mt-4">
        <button
          onClick={toggleTransactionMenu}
          className="w-full flex items-center justify-between px-2 py-2 text-gray-900 hover:text-gray-700 hover:bg-gray-200 rounded-md"
        >
          <span className="text-gray-600 font-bold tracking-wide uppercase text-sm">
            MF TRANSACTIONS
          </span>
          <FaChevronDown
            className={`transition-transform duration-200 ${openTransactionMenu ? 'rotate-180' : ''
              }`}
          />
        </button>

        {openTransactionMenu && (
          <div className="mt-1 space-y-1">
            <NavLink to="/bank-mandates" className={linkClass}>
              Bank Mandates
            </NavLink>
            <NavLink to="/purchases" className={linkClass}>
              Purchases
            </NavLink>
            <NavLink to="/purchase-plans" className={linkClass}>
              Purchase Plans
            </NavLink>
            <NavLink to="/redemptions" className={linkClass}>
              Redemptions
            </NavLink>
            <NavLink to="/redemption-plans" className={linkClass}>
              Redemption Plans
            </NavLink>
            <NavLink to="/mf-holdings" className={linkClass}>
              MF Holdings
            </NavLink>
          </div>
        )}
      </div>

      {/* GOLD TRANSACTIONS */}
      <div className="mt-4">
        <button
          onClick={() => setOpenGoldMenu((prev) => !prev)}
          className="w-full flex items-center justify-between px-2 py-2 text-gray-900 hover:text-gray-700 hover:bg-gray-200 rounded-md"
        >
          <span className="text-gray-600 font-bold tracking-wide uppercase text-sm">
            GOLD TRANSACTIONS
          </span>
          <FaChevronDown
            className={`transition-transform duration-200 ${openGoldMenu ? 'rotate-180' : ''}`}
          />
        </button>
        {openGoldMenu && (
          <div className="mt-1 space-y-1">
            <NavLink to="/gold-purchase" className={linkClass}>
              Gold Purchase
            </NavLink>
            <NavLink to="/gold-redeem" className={linkClass}>
              Gold Redeem
            </NavLink>
            <NavLink to="/gold-sip" className={linkClass}>
              Gold SIP
            </NavLink>
            <NavLink to="/gold-fd" className={linkClass}>
              Gold FD
            </NavLink>
          </div>
        )}
      </div>


    </aside>
  );
};

export default AdminSidebar;

