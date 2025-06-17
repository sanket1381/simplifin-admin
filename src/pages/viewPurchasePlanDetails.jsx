import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { get } from '../services/commonService';
import LoadingSpinner from '../components/loader/LoadingSpinner';


const PurchasePlanDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [purchasePlanData, setPurchaseData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const fetchPurchasePlanDetails = async () => {
        try {
            const response = await get(`/sip/${id}`);
            const result = response?.data?.result;

            if (result) {
                setPurchaseData(result);
            } else {
                setError('No Purchase data found for this ID.');
            }
        } catch (err) {
            console.error(err);
            setError('Failed to fetch Purchase details.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
      fetchPurchasePlanDetails();
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
                <h2 className="text-2xl font-bold">Purchase Plan Details</h2>
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
                        <TableRow label="ID" value={purchasePlanData?._id || 'N/A'} />
                        <TableRow label="USER NAME" value={purchasePlanData?.username || 'N/A'} />
                        <TableRow
                            label="STATUS"
                            value={
                                purchasePlanData?.state
                                    ? (() => {
                                        const status = purchasePlanData.state.toLowerCase().trim();
                                        let colorClass = '';
                                        let label = '';
                                        switch (status) {
                                            case 'active':
                                                colorClass = 'bg-green-100 text-green-600';
                                                label = 'Active';
                                                break;
                                            case 'created':
                                                colorClass = 'bg-blue-100 text-blue-600';
                                                label = 'Created';
                                                break;
                                            case 'failed':
                                                colorClass = 'bg-red-100 text-red-600';
                                                label = 'Failed';
                                                break;
                                            case 'cancelled':
                                                colorClass = 'bg-gray-200 text-gray-700';
                                                label = 'Cancelled';
                                                break;
                                            case 'completed':
                                                colorClass = 'bg-green-200 text-green-700';
                                                label = 'Completed';
                                                break;
                                            default:
                                                colorClass = '';
                                                label = status;
                                        }
                                        return (
                                            <span className={`px-2 py-1 text-xs rounded-full font-medium ${colorClass}`}>
                                                {label}
                                            </span>
                                        );
                                    })()
                                    : ''
                            }
                        />
                        <TableRow
                            label="PAYMENT STATUS"
                            value={
                                purchasePlanData?.paymentStatus
                                    ? (() => {
                                        const status = purchasePlanData.paymentStatus.toLowerCase().trim();
                                        let colorClass = '';
                                        let label = '';
                                        switch (status) {
                                            case 'requested':
                                                colorClass = 'bg-gray-100 text-gray-600';
                                                label = 'Requested';
                                                break;
                                            case 'initiated':
                                                colorClass = 'bg-blue-100 text-blue-600';
                                                label = 'Initiated';
                                                break;
                                            case 'failed':
                                                colorClass = 'bg-red-100 text-red-600';
                                                label = 'Failed';
                                                break;
                                            case 'confirmed':
                                                colorClass = 'bg-yellow-100 text-yellow-600';
                                                label = 'Confirmed';
                                                break;
                                            case 'rejected':
                                                colorClass = 'bg-red-100 text-red-600';
                                                label = 'Rejected';
                                                break;
                                            case 'success':
                                                colorClass = 'bg-green-100 text-green-600';
                                                label = 'Successful';
                                                break;
                                            case 'received':
                                                colorClass = 'bg-purple-100 text-purple-600';
                                                label = 'Received';
                                                break;
                                            case 'processing':
                                                colorClass = 'bg-yellow-100 text-yellow-600';
                                                label = 'Processing';
                                                break;
                                            default:
                                                colorClass = '';
                                                label = status;
                                        }
                                        return (
                                            <span className={`px-2 py-1 text-xs rounded-full font-medium ${colorClass}`}>
                                                {label}
                                            </span>
                                        );
                                    })()
                                    : ''
                            }
                        />
                        <TableRow label="CAN" value={purchasePlanData?.can || 'N/A'} />
                        <TableRow label="AMOUNT" value={purchasePlanData?.amount || 'N/A'} />
                        <TableRow label="SCHEME" value={purchasePlanData?.plan_name || 'N/A'} />
                        <TableRow label="FREQUENCY" value={purchasePlanData?.frequency || 'N/A'} />
                        <TableRow label="INSTALLMENT DAY" value={purchasePlanData?.installment_day || 'N/A'} />
                        <TableRow
                            label="START DATE"
                            value={
                              purchasePlanData?.start_date
                                    ? new Date(purchasePlanData?.start_date).toLocaleDateString('en-US', {
                                        dateStyle: 'long',
                                    })
                                    : 'N/A'
                            }
                        />
                        <TableRow
                            label="END DATE"
                            value={
                              purchasePlanData?.end_date
                                    ? new Date(purchasePlanData?.end_date).toLocaleDateString('en-US', {
                                        dateStyle: 'long',
                                    })
                                    : 'N/A'
                            }
                        />
                        <TableRow label="GROUP ORDER NO" value={purchasePlanData?.groupOrderNo || 'N/A'} />
                        <TableRow
                            label="CREATED AT"
                            value={
                              purchasePlanData?.created_at
                                    ? new Date(purchasePlanData?.created_at).toLocaleDateString('en-US', {
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

export default PurchasePlanDetails