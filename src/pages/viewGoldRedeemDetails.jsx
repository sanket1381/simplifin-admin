import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { get } from '../services/commonService';
import LoadingSpinner from '../components/loader/LoadingSpinner';

const ViewGoldRedeemDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [redeemData, setRedeemData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchRedeemDetails = async () => {
    try {
      const response = await get(`/gold/sell/${id}`);
      const result = response?.data?.result;
      if (result) {
        setRedeemData(result);
      } else {
        setError('No Gold Redeem data found for this ID.');
      }
    } catch (err) {
      console.error(err);
      setError('Failed to fetch Gold Redeem details.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRedeemDetails();
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
        <h2 className="text-2xl font-bold">Gold Redeem Details</h2>
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
            <TableRow label="ID" value={redeemData?._id || 'N/A'} />
            <TableRow label="USER NAME" value={redeemData?.username || 'N/A'} />
            <TableRow label="QUANTITY" value={redeemData?.quantity || 'N/A'} />
            <TableRow label="AMOUNT" value={redeemData?.totalAmount || 'N/A'} />
            <TableRow label="ORDER ID" value={redeemData?.transactionId || 'N/A'} />
            <TableRow label="CREATED AT" value={
              redeemData?.createdAt
                ? new Date(redeemData.createdAt).toLocaleDateString('en-US', { dateStyle: 'long' })
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

export default ViewGoldRedeemDetails;
