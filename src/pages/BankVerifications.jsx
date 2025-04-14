import React from 'react'
import { useState, useEffect } from 'react';
import { get } from '../services/commonService';
import Table from '../components/table/Table';

const BankVerifications = () => {

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchData();
  }, []);


  const fetchData = async () => {

    try {
      const response = await get('/kyc/bankaccount/list');
      setData(response.data.result);
    } catch (err) {
      console.error(err);
      setError('Failed to fetch data');
    } finally {
      setLoading(false);
    }
  };

  const headers = ['ID', 'INVESTOR NAME', 'BANk NAME', 'ACCOUNT TYPE', 'VERIFICATION STATUS'];
  
  const searchFunction = (item, searchTerm) => {
    const search = searchTerm.toLowerCase();
    return item.name?.toLowerCase().includes(search);
  };

  const renderRow = (item) => (
    <>
      <td className="px-6 py-3 text-blue-600">{item._id}</td>
      <td className="px-6 py-3">{item.bank_account_verified?.[0]?.account_holder_name || 'N/A'}</td>
      <td className="px-6 py-3">{item.bank_account_verified?.[0]?.bank_name || 'N/A'}</td>
      <td className="px-6 py-3 capitalize">{item.bank_account_verified?.[0]?.type || 'N/A'}</td>
      <td className="px-6 py-3">
        <span
          className={`px-2 py-1 text-xs rounded-full font-medium ${item.bank_account_verified?.[0]?.account_status === 'VALID'
            ? 'bg-green-100 text-green-600'
              : 'bg-red-100 text-red-600'
            }`}
        >
          {item.bank_account_verified?.[0]?.account_status ==='VALID'?'Completed':'Failed'}
        </span>
      </td>
     
    </>
  );

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="w-full min-h-screen py-6 bg-gray-100">
      <h1 className="text-2xl font-bold mb-4 px-6">Bank account verifications</h1>
      <div className="px-6">
        
        <Table headers={headers} data={data} renderRow={renderRow} fetchData={fetchData} searchFunction={searchFunction} />
      </div>
    </div>
  );

}

export default BankVerifications