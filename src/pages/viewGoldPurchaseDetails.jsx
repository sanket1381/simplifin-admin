import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { get } from '../services/commonService';
import LoadingSpinner from '../components/loader/LoadingSpinner';

const ViewGoldPurchaseDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [purchaseData, setPurchaseData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchPurchaseDetails = async () => {
    try {
      const response = await get(`/gold/buy/${id}`);
      const result = response?.data?.result;
      if (result) {
        setPurchaseData(result);
      } else {
        setError('No Gold Purchase data found for this ID.');
      }
    } catch (err) {
      console.error(err);
      setError('Failed to fetch Gold Purchase details.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPurchaseDetails();
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
        <h2 className="text-2xl font-bold">Gold Purchase Details</h2>
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
            <TableRow label="ID" value={purchaseData?._id || 'N/A'} />
            <TableRow label="USER NAME" value={purchaseData?.username || 'N/A'} />
            <TableRow label="QUANTITY" value={purchaseData?.quantity || 'N/A'} />
            <TableRow label="AMOUNT" value={purchaseData?.totalAmount || 'N/A'} />
            <TableRow label="ORDER ID" value={purchaseData?.transactionId || 'N/A'} />
            <TableRow label="CREATED AT" value={
              purchaseData?.createdAt
                ? new Date(purchaseData.createdAt).toLocaleDateString('en-US', { dateStyle: 'long' })
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

export default ViewGoldPurchaseDetails;
