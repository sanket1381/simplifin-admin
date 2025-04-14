
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { get } from '../services/commonService';

const UserBankDetails = () => {
  const { id } = useParams();
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await get('/kyc');
        const allUsers = response.data.result;
        const matchedUser = allUsers.find(user => user._id === id);
        if (matchedUser) {
          setUserData(matchedUser);
        } else {
          setError('User not found');
        }
      } catch (err) {
        console.error(err);
        setError('Failed to fetch user data');
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4">Bank Details of {userData.name}</h2>
      <div className="bg-white p-4 rounded shadow">
        <p><strong>Account Holder:</strong> {userData.bank_account_verified?.[0]?.account_holder_name || 'N/A'}</p>
        <p><strong>Account Number:</strong> {userData.bank_account_verified?.[0]?.account_number || 'N/A'}</p>
        <p><strong>IFSC Code:</strong> {userData.bank_account_verified?.[0]?.ifsc_code || 'N/A'}</p>
        <p><strong>Bank Name:</strong> {userData.bank_account_verified?.[0]?.bank_name || 'N/A'}</p>
        <p><strong>Branch:</strong> {userData.bank_account_verified?.[0]?.branch_name || 'N/A'}</p>
      </div>
    </div>
  );
};

export default UserBankDetails;
