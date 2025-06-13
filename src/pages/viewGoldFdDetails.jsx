import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { get } from '../services/commonService';
import LoadingSpinner from '../components/loader/LoadingSpinner';

const ViewGoldFdDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [fdData, setFdData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchFdDetails = async () => {
    try {
      const response = await get(`/gold/fd/orders/${id}`);
      const result = response?.data?.result;
      if (result) {
        setFdData(result);
      } else {
        setError('No Gold FD data found for this ID.');
      }
    } catch (err) {
      console.error(err);
      setError('Failed to fetch Gold FD details.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFdDetails();
  }, [id]);

  if (loading) return (
    <div>
      <LoadingSpinner />
    </div>
  );
  if (error) return <p className="text-red-500 text-center py-10">{error}</p>;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Gold FD Details</h2>
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
            <TableRow label="ID" value={fdData?._id || 'N/A'} />
            <TableRow label="USER NAME" value={fdData?.username || 'N/A'} />
            <TableRow label="GOLD LEASE" value={fdData?.goldLease ? `${fdData.goldLease} gms` : 'N/A'} />
            <TableRow label="TENURE" value={fdData?.noOfDays ? `${fdData.noOfDays} days` : 'N/A'} />
            <TableRow label="INTEREST RATE" value={fdData?.interestRate ? `${fdData.interestRate} %` : 'N/A'} />
            <TableRow label="STATUS" value={
              fdData?.status
                ? (
                  <span className={`px-2 py-1 text-xs rounded-full font-medium 
                    ${fdData.status.toLowerCase().trim() === 'active'
                      ? 'bg-green-100 text-green-600'
                      : fdData.status.toLowerCase().trim() === 'pending'
                        ? 'bg-yellow-100 text-yellow-600'
                        : fdData.status.toLowerCase().trim() === 'close'
                          ? 'bg-red-100 text-red-600'
                          : fdData.status.toLowerCase().trim() === 'completed'
                            ? 'bg-green-200 text-green-700'
                            : ''
                  }`}>
                    {fdData.status.toLowerCase().trim() === 'active'
                      ? 'Active'
                      : fdData.status.toLowerCase().trim() === 'pending'
                        ? 'Pending'
                        : fdData.status.toLowerCase().trim() === 'close'
                          ? 'Closed'
                          : fdData.status.toLowerCase().trim() === 'completed'
                            ? 'Completed'
                            : ''}
                  </span>
                )
                : ''
            } />
            <TableRow label="CREATED AT" value={
              fdData?.createdAt
                ? new Date(fdData.createdAt).toLocaleDateString('en-US', { dateStyle: 'long' })
                : 'N/A'
            } />
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

export default ViewGoldFdDetails;
