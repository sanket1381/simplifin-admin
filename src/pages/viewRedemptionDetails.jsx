import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { get } from '../services/commonService'; 


const RedemptionDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [redemptionData, setRedemptionData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchRedemptionDetails = async () => {
    try {
      const response = await get(`/mutualFund/redeem/${id}`); // Update this endpoint if needed
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

  if (loading) return <p className="text-center py-10">Loading...</p>;
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
            <TableRow label="REDEMPTION ID" value={redemptionData?._id || 'N/A'} />
            <TableRow label="INVESTMENT ACCOUNT" value={redemptionData?.username } />
            <TableRow
                            label="Status"
                            value={
                                <span
                                    className={`px-2 py-1 text-xs rounded-full font-medium 
                                      ${redemptionData?.state === 'successful'
                                            ? 'bg-green-100 text-green-600'
                                            : redemptionData?.state === 'processing'
                                                ? 'bg-yellow-100 text-yellow-600'
                                                : 'bg-red-100 text-red-600'
                                        }`}
                                >
                                    {redemptionData?.state === 'successful'
                                        ? 'Successful'
                                        : redemptionData?.state === 'processing'
                                            ? 'Processing'
                                            : 'Failed'}
                                </span>
                            }
                        />
            <TableRow label="AMOUNT" value={redemptionData?.amount || 'N/A'} />
            <TableRow label="SCHEME" value={redemptionData?.scheme || 'N/A'} />
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
