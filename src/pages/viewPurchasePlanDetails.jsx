import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { get } from '../services/commonService'; 


const PurchasePlanDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [mandateData, setMandateData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
  
    const fetchMandateDetails = async () => {
      try {
        const response = await get(`/sip${id}`);
        const result = response?.data?.result;
  
        if (result) {
          setMandateData(result);
        } else {
          setError('No mandate data found for this ID.');
        }
      } catch (err) {
        console.error(err);
        setError('Failed to fetch mandate details.');
      } finally {
        setLoading(false);
      }
    };
  
    useEffect(() => {
      fetchMandateDetails();
    }, [id]);
  
    if (loading) return <p className="text-center py-10">Loading...</p>;
    if (error) return <p className="text-red-500 text-center py-10">{error}</p>;
  
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Mandate Details</h2>
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
              <TableRow label="Mandate ID" value={mandateData?._id || 'N/A'} />
              <TableRow label="Investor" value={mandateData?.investor} />
              <TableRow label="MMRN" value={mandateData?.mmrn || 'N/A'} />
              <TableRow label="Reference Number" value={mandateData?.uniqueRefNo || 'N/A'} />
              <TableRow
                label="Status"
                value={
                  ""
                }
              />
              <TableRow
                label=" Last Updated "
                value={
                  ""
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
  
export default PurchasePlanDetails