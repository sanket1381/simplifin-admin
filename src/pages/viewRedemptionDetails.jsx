import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { get } from '../services/commonService';
import LoadingSpinner from '../components/loader/LoadingSpinner';


const RedemptionDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [redemptionData, setRedemptionData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchRedemptionDetails = async () => {
    try {
      const response = await get(`/mutualFund/redeem/${id}`);
      const result = response?.data?.result;

      if (result) {
        setRedemptionData(result);
      } else {
        setError('No redemption data found for this ID.');
      }
    } catch (err) {
      console.error(err);
      setError('Failed to fetch redemption details.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRedemptionDetails();
  }, [id]);

  if (loading)  return (
      <div>
        <LoadingSpinner />
      </div>);
  if (error) return <p className="text-red-500 text-center py-10">{error}</p>;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Redemption Details</h2>
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
            <TableRow label="ID" value={redemptionData?._id || 'N/A'} />
            <TableRow label="USER NAME" value={redemptionData?.username} />
            <TableRow
              label="STATUS"
              value={
                redemptionData?.state
                  ? (
                    <span
                      className={`px-2 py-1 text-xs rounded-full font-medium 
                        ${redemptionData.state.toLowerCase().trim() === 'successful'
                          ? 'bg-green-100 text-green-600'
                          : redemptionData.state.toLowerCase().trim() === 'pending'
                            ? 'bg-yellow-100 text-yellow-600'
                            : redemptionData.state.toLowerCase().trim() === 'submitted'
                              ? 'bg-blue-100 text-blue-600'
                              : redemptionData.state.toLowerCase().trim() === 'failed'
                                ? 'bg-red-100 text-red-600'
                                : redemptionData.state.toLowerCase().trim() === 'reversed'
                                  ? 'bg-purple-100 text-purple-600'
                                  : redemptionData.state.toLowerCase().trim() === 'cancelled'
                                    ? 'bg-gray-200 text-gray-700'
                                    : ''
                        }`}
                    >
                      {redemptionData.state.toLowerCase().trim() === 'successful'
                        ? 'Successful'
                        : redemptionData.state.toLowerCase().trim() === 'pending'
                          ? 'Pending'
                          : redemptionData.state.toLowerCase().trim() === 'submitted'
                            ? 'Submitted'
                            : redemptionData.state.toLowerCase().trim() === 'failed'
                              ? 'Failed'
                              : redemptionData.state.toLowerCase().trim() === 'reversed'
                                ? 'Reversed'
                                : redemptionData.state.toLowerCase().trim() === 'cancelled'
                                  ? 'Cancelled'
                                  : ''}
                    </span>
                  )
                  : ''
              }
            />
            <TableRow label="FOLIO NUMBER" value={redemptionData?.folio_number || 'N/A'} />
            <TableRow label="CAN" value={redemptionData?.can || 'N/A'} />
            <TableRow label="AMOUNT" value={redemptionData?.amount || 'N/A'} />
            <TableRow label="SCHEME" value={redemptionData?.plan_name || 'N/A'} />
            <TableRow label="GROUP ORDER NO" value={redemptionData?.groupOrderNo || 'N/A'} />
            <TableRow
              label="Created At"
              value={
                redemptionData?.created_at
                  ? new Date(redemptionData.created_at).toLocaleDateString('en-US', {
                    dateStyle: 'long',
                  })
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

export default RedemptionDetails;
