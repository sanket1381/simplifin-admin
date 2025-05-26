import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { get } from '../services/commonService';
import LoadingSpinner from '../components/loader/LoadingSpinner';

const ViewAddressDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [addressData, setAddressData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchAddressData = async () => {
      try {
        const response = await get(`/kyc/address/${id}`);
        const result = response?.data?.result;
        if (result) {
          setAddressData(result);
        } else {
          setError('No address data found for this ID.');
        }
      } catch (err) {
        console.error('Error fetching address data:', err);
        setError('Failed to fetch address details.');
      } finally {
        setLoading(false);
      }
    };

    fetchAddressData();
  }, [id]);

  if (loading) {
     return (
      <div>
        <LoadingSpinner />
      </div>);
  }
  if (error) {
    return <p className="px-6 py-4 text-red-500">{error}</p>;
  }
  if (!addressData) {
    return null;
  }

  const { address } = addressData;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Address Details</h2>
        <button
          onClick={() => navigate(-1)}
          className="text-sm text-blue-600 hover:underline"
        >
          &larr; Go back
        </button>
      </div>
      <div className="bg-white rounded-xl shadow-md overflow-hidden border">
        <table className="w-full text-sm text-left">
          <tbody>
            <TableRow label="KYC ID" value={addressData?._id} />
            <TableRow label="Name" value={addressData?.name} />
            <TableRow label="Line 1" value={address?.line_1} />
            <TableRow label="Line 2" value={address?.line_2 || 'N/A'} />
            <TableRow label="City" value={address?.city} />
            <TableRow label="Country" value={address?.country} />
            <TableRow label="Pincode" value={address?.pincode} />
            <TableRow
              label="Status"
              value={
                address.status === 'SUCCESS'
                  ? 'Successful'
                  : ''
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
    <td className="px-6 py-4 text-base font-semibold text-gray-700">{value}</td>
  </tr>
);

export default ViewAddressDetails;