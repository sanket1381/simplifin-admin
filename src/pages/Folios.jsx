import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { get } from '../services/commonService';
import LoadingSpinner from '../components/loader/LoadingSpinner';

const Folios = () => {
  const [data, setData] = useState({
    folios: [],
    purchases: [],
    purchasePlans: [],
    redemptions: [],
    redemptionPlans: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Extract query parameters from the URL
  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);
  const folioNumber = queryParams.get('folioNumber');
  const userId = queryParams.get('userId');
  const isin = queryParams.get('isin');

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await get(
        `/mutualFund/folios?folioNumber=${folioNumber}&userId=${userId}&isin=${isin}`
      );
      const result = response.data.result;

      setData({
        folios: result.mfHoldingReport || [],
        purchases: result.mfPurchase || [],
        purchasePlans: result.mfSip || [],
        redemptions: result.mfRedeem || [],
        redemptionPlans: result.mfSwp || [],
      });
    } catch (err) {
      console.error('Error fetching data:', err);
      setError('Failed to fetch data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [folioNumber, userId, isin]);

  if (loading) return (
      <div>
        <LoadingSpinner />
      </div>);
  if (error) return <p className="text-red-500">{error}</p>;

  const renderTable = (headers, data, renderRow) => (
    <table className="w-full text-sm text-left border mb-8">
      <thead>
        <tr className="bg-gray-100">
          {headers.map((header, index) => (
            <th key={index} className="px-6 py-3 text-gray-600 font-medium">
              {header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.length > 0 ? (
          data.map((item, index) => (
            <tr key={index} className="border-b">
              {renderRow(item)}
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan={headers.length} className="px-6 py-3 text-center">
              No data available
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Transactions</h1>

      {/* Folios Section */}
      <h2 className="text-xl font-semibold mb-4">Folios</h2>
      {renderTable(
        ['Folio Number', 'Username', 'PAN', 'Scheme Name', 'Market Value'],
        data.folios,
        (item) => (
          <>
            <td className="px-6 py-3">{item.folioNumber}</td>
            <td className="px-6 py-3">{item.username}</td>
            <td className="px-6 py-3">{item.pan}</td>
            <td className="px-6 py-3">{item.schemeName}</td>
            <td className="px-6 py-3">{item.marketValue.amount}</td>
          </>
        )
      )}

      {/* Purchases Section */}
      <h2 className="text-xl font-semibold mb-4">Purchases</h2>
      {renderTable(
        ['ID', 'Amount', 'Scheme','Status', 'Created At'],
        data.purchases,
        (item) => (
          <>
            <td className="px-6 py-3">{item._id}</td>
            <td className="px-6 py-3">{item.amount}</td>
            <td className="px-6 py-3">{data.folios[0].schemeName}</td>
            <td className="px-6 py-3">{item.state}</td>
            <td className="px-6 py-3">
              {new Date(item.created_at).toLocaleDateString('en-US')}
            </td>
          </>
        )
      )}

      {/* Purchase Plans Section */}
      <h2 className="text-xl font-semibold mb-4">Purchase Plans</h2>
      {renderTable(
        ['ID', 'Amount', 'Scheme','Status', 'Created At'],
        data.purchasePlans,
        (item) => (
          <>
            <td className="px-6 py-3">{item._id}</td>
            <td className="px-6 py-3">{item.amount}</td>
            <td className="px-6 py-3">{data.folios[0].schemeName}</td>
            <td className="px-6 py-3">{item.state}</td>
            <td className="px-6 py-3">
              {new Date(item.created_at).toLocaleDateString('en-US')}
            </td>
          </>
        )
      )}

      {/* Redemptions Section */}
      <h2 className="text-xl font-semibold mb-4">Redemptions</h2>
      {renderTable(
        ['ID', 'Amount', 'Scheme', 'Status','Created At'],
        data.redemptions,
        (item) => (
          <>
            <td className="px-6 py-3">{item._id}</td>
            <td className="px-6 py-3">{item.amount}</td>
            <td className="px-6 py-3">{data.folios[0].schemeName}</td>
            <td className="px-6 py-3">{item.state}</td>
            <td className="px-6 py-3">
              {new Date(item.created_at).toLocaleDateString('en-US')}
            </td>
          </>
        )
      )}

      {/* Redemption Plans Section */}
      <h2 className="text-xl font-semibold mb-4">Redemption Plans</h2>
      {renderTable(
        ['ID', 'Amount', 'Scheme','Status', 'Created At'],
        data.redemptionPlans,
        (item) => (
          <>
            <td className="px-6 py-3">{item._id}</td>
            <td className="px-6 py-3">{item.amount}</td>
            <td className="px-6 py-3">{data.folios[0].schemeName}</td>
            <td className="px-6 py-3">{item.state}</td>
            <td className="px-6 py-3">
              {new Date(item.created_at).toLocaleDateString('en-US')}
            </td>
          </>
        )
      )}
    </div>
  );
};

export default Folios;