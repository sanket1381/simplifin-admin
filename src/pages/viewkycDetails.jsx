import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { get } from '../services/commonService';

const UserKycDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await get('/kyc');
        const user = response.data.result.find(item => item._id === id);
        setUserData(user);
      } catch (err) {
        console.error('Error fetching user data:', err);
      }
    };

    fetchUserData();
  }, [id]);

  if (!userData) {
    return <p className="px-6 py-4">Loading...</p>;
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">KYC DETAILS</h2>
        <button
          onClick={() => navigate(-1)}
          className="text-sm text-blue-600 hover:underline"
        >
          &larr; Go back
        </button>
      </div>

      {/* Info Table */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden border">
        <table className="w-full text-sm text-left">
          <tbody>
            <TableRow label="ID" value={userData._id} />
            <TableRow
              label="Status"
              value={
                <span
                  className={`inline-block px-3 py-1 text-xs font-medium rounded-full ${userData.status === 'successful'
                      ? 'bg-green-100 text-green-600'
                      : 'bg-red-100 text-red-600'
                    }`}
                >
                  {userData.status === 'successful' ? 'Successful' : 'Failed'}
                </span>
              }
            />
            <TableRow label="CAN" value={userData?.mfCAN?.can || 'N/A'} />
            <TableRow label="PAN" value={userData?.pan || 'N/A'} />
            <TableRow label="EMAIL" value={userData?.email || 'N/A'} />
            <TableRow label="MOBILE NUMBER" value={userData.mobile?.number || 'N/A'} />
            <TableRow label="GENDER" value={userData?.gender || 'N/A'} />
            <TableRow label="DATE OF BIRTH" value={userData?.date_of_birth || 'N/A'} />
            <TableRow label="AADHAAR NUMBER" value={userData?.aadhaar_number || 'N/A'} />
            <TableRow label="NOMINEE NAME" value={userData?.nominee?.nomineeName || 'N/A'} />
            <TableRow label="NOMINEE RELATION" value={userData?.nominee?.nomineeRelation || 'N/A'} />
            <TableRow
              label="NOMINEE DATE OF BIRTH"
              value={
                userData?.nominee?.nomineeDateOfBirth
                  ? new Date(userData.nominee.nomineeDateOfBirth).toLocaleDateString('en-US', { dateStyle: 'long' })
                  : 'N/A'
              }
            />
               <TableRow label="AADHAAR CARD" value={"" || 'N/A'} />
               <TableRow label="PAN CARD" value={"" || 'N/A'} />
               <TableRow label="PHOTO" value={""|| 'N/A'} />
               <TableRow label="SIGNATURE" value={"" || 'N/A'} />
               <TableRow label="CANCELLED CHEQUE" value={"" || 'N/A'} />
            <TableRow
              label="Created At"
              value={
                userData?.created_at
                  ? new Date(userData.created_at).toLocaleDateString('en-US', { dateStyle: 'long' })
                  : 'N/A'
              }
            />
          </tbody>
        </table>
      </div>
    </div>
  );
};

const TableRow = ({ label, value }) => (
  <tr className="border-b">
    <td className="px-6 py-4 bg-gray-100 text-sm font-medium text-gray-600 w-1/3">
      {label}
    </td>
    <td className="px-6 py-4 text-base font-semibold text-gray-700">
      {value}
    </td>
  </tr>
);


export default UserKycDetails;

