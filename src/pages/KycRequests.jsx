import React from 'react'
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { get } from '../services/commonService';
import Table from '../components/table/Table';


const KycRequests = () => {
  const [data, setData] = useState([]);
  const [sortOrder, setSortOrder] = useState('asc');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');



  const fetchData = async (order = sortOrder) => {

    try {
      const response = await get('/kyc', {
        page: 1,
        pageSize: 10,
        sortField: 'created_at',
        sortOrder: order,

      });
      setData(response.data.result);
    } catch (err) {
      console.error(err);
      setError('Failed to fetch data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [sortOrder]);

  const handleSortClick = () => {
    const newOrder = sortOrder === 'asc' ? 'desc' : 'asc';
    setSortOrder(newOrder);
    fetchData(newOrder);
  };


  const headers = ['ID', 'Status', 'Name', 'PAN', 'Email', 'Mobile', 'Created At'];
  const searchFunction = (item, searchTerm) => {
    const search = searchTerm.toLowerCase();
    return item.name?.toLowerCase().includes(search);
  };

  const renderRow = (item) => (
    <>
      <td className="px-6 py-3 text-blue-600 underline">
        <Link to={`/details/${item._id}`}>{item._id}</Link>
      </td>

      <td className="px-6 py-3">
        <span
          className={`px-2 py-1 text-xs rounded-full font-medium ${item.status === 'successful'
            ? 'bg-green-100 text-green-600'
            : 'bg-red-100 text-red-600'
            }`}
        >
          {item.status === 'successful' ? 'Succesfull' : 'Failed'}
        </span>
      </td>
      <td className="px-6 py-3">{item?.name}</td>
      <td className="px-6 py-3">{item.pan}</td>
      <td className="px-6 py-3">{item.email}</td>
      <td className="px-6 py-3">{item.mobile?.number || 'N/A'}</td>
      <td className="px-6 py-3">
        {item.created_at
          ? new Date(item.created_at).toLocaleDateString('en-US', {
            dateStyle: 'long',
          })
          : 'N/A'}
      </td>
    </>
  );

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="w-full min-h-screen py-6 bg-gray-100">
      <h1 className="text-2xl font-bold mb-4 px-6">KYC Requests</h1>
      <div className="px-6">

        <Table
          headers={headers}
          data={data}
          renderRow={renderRow}
          fetchData={handleSortClick}
          sortOrder={sortOrder}
          searchFunction={searchFunction}
        />
      </div>
    </div>
  );
};
export default KycRequests;