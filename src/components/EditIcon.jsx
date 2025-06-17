import React from 'react';


// Red edit (pencil) icon, filled style
const EditIcon = ({ className = '', ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="red"
    className={`w-5 h-5 ${className}`}
    {...props}
  >
    <path d="M16.862 3.487a2.25 2.25 0 1 1 3.182 3.182l-1.06 1.06-3.182-3.182 1.06-1.06zM15.802 4.547l3.182 3.182-10.484 10.484-3.182-3.182L15.802 4.547zm-11.13 12.545l3.182 3.182-4.182.455a.75.75 0 0 1-.826-.826l.455-4.182z" />
  </svg>
);

export default EditIcon;
