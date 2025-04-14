import React from 'react'
import { HiOutlineMenuAlt2 } from 'react-icons/hi';
import { MdSpaceDashboard } from 'react-icons/md';
const AdminHeader = ({toggleSidebar}) => {
  return (

    <nav className='fixed top-0 z-50 w-full bg-white shadow-md  '>
        <div className='px-3 py-3 lg:px-5 lg:pl-3'>
         <div className='flex items-center justify-between'>
           <div className='flex items-center justify-center justify-start rtl:justify-end'>
            <button 
            className='inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 
            focus:outline-none focus:ring-2 focus:ring-gray-200'
            onClick={toggleSidebar}
            >
              <HiOutlineMenuAlt2 className='text-2xl'/>
            </button>
            <a href="#"className='flex ms-2 md:me-24'>
                 <MdSpaceDashboard className='h-8 me-3 textxl text-gray-500 '/> 
              <div className="flex items-center">
               <img
                src="/letter-f.png"
               alt="Profile"
              className="w-8 h-8 rounded-full"
              />
               </div>
         </a>
            <img
            src="/letter-f.png"
            alt="Logo Side"
            className="w-8 h-8  ms-3"
        />
           </div>
         </div>

        </div>
      </nav>
  );
}

export default AdminHeader