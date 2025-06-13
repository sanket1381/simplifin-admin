import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { get } from '../services/commonService';
import LoadingSpinner from '../components/loader/LoadingSpinner';

const ViewGoldSipDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [sipData, setSipData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchSipDetails = async () => {
    try {
      const response = await get(`/gold/sip/${id}`);
      const result = response?.data?.result;
      if (result) {
        setSipData(result);
      } else {
        setError('No Gold SIP data found for this ID.');
      }
    } catch (err) {
      console.error(err);
      setError('Failed to fetch Gold SIP details.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSipDetails();
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
        <h2 className="text-2xl font-bold">Gold SIP Details</h2>
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
            <TableRow label="ID" value={sipData?._id || 'N/A'} />
            <TableRow label="USER NAME" value={sipData?.username || 'N/A'} />
            <TableRow label="AMOUNT" value={sipData?.amount || 'N/A'} />
            <TableRow label="FREQUENCY" value={sipData?.frequency || 'N/A'} />
            <TableRow label="START DATE" value={sipData?.startDate ? new Date(sipData.startDate).toLocaleDateString('en-US', { dateStyle: 'long' }) : 'N/A'} />
            <TableRow label="STATUS" value={
              sipData?.status
                ? (
                  <span className={`px-2 py-1 text-xs rounded-full font-medium 
                    ${sipData.status.toLowerCase().trim() === 'active'
                      ? 'bg-green-100 text-green-600'
                      : sipData.status.toLowerCase().trim() === 'pending'
                        ? 'bg-yellow-100 text-yellow-600'
                      : sipData.status.toLowerCase().trim() === 'authenticated'
                        ? 'bg-yellow-100 text-yellow-600'
                        : sipData.status.toLowerCase().trim() === 'failed'
                          ? 'bg-red-100 text-red-600'
                        : sipData.status.toLowerCase().trim() === 'cancelled'
                          ? 'bg-red-100 text-red-600'
                          : sipData.status.toLowerCase().trim() === 'completed'
                            ? 'bg-green-200 text-green-700'
                            : ''
                  }`}>
                    {sipData.status.toLowerCase().trim() === 'active'
                      ? 'Active'
                      : sipData.status.toLowerCase().trim() === 'pending'
                        ? 'Pending'
                      : sipData.status.toLowerCase().trim() === 'authenticated'
                        ? 'Authenticated'
                        : sipData.status.toLowerCase().trim() === 'failed'
                          ? 'Failed'
                        : sipData.status.toLowerCase().trim() === 'cancelled'
                          ? 'Cancelled'
                          : sipData.status.toLowerCase().trim() === 'completed'
                            ? 'Completed'
                            : ''}
                  </span>
                )
                : ''
            } />
            <TableRow label="CREATED AT" value={
              sipData?.createdAt
                ? new Date(sipData.createdAt).toLocaleDateString('en-US', { dateStyle: 'long' })
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

export default ViewGoldSipDetails;
