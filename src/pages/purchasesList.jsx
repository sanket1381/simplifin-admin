import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { get } from '../services/commonService';
import Table from '../components/table/Table';

const PurchasesList = () => {
  const [data, setData] = useState([]);
  const [sortOrder, setSortOrder] = useState('asc');
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [pageSize, setPageSize] = useState(5);
  const [totalPages, setTotalPages] = useState(1); 

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await get(
        `/mutualFund/purchase/list?page=${currentPage}&pageSize=${pageSize}&sortField=created_at&sortOrder=${sortOrder}&data=${searchTerm}`
      );
      const result = response?.data?.result || [];
      const metaData = response?.data?.metaData;

      setData(result);
      setHasNextPage(result.length === pageSize);
      setTotalPages(metaData?.totalPages || 1); 
    } catch (err) {
      console.error(err);
      setError('Failed to fetch data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [currentPage, sortOrder, pageSize]); // pageSize included

  useEffect(() => {
    if (searchTerm.length === 0) {
      setCurrentPage(1);
      fetchData();
      return;
    }

    if (searchTerm.length >= 3) {
      const delayDebounce = setTimeout(() => {
        setCurrentPage(1);
        fetchData();
      }, 500);

      return () => clearTimeout(delayDebounce);
    }
  }, [searchTerm]);

  const handleSortClick = () => {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  const handleResetFilters = () => {
    setSearchTerm('');
    setSortOrder('asc');
    setCurrentPage(1);
    setPageSize(10);
    fetchData();
  };

  const handlePageChange = (page) => {
    if (page > 0) {
      setCurrentPage(page);
    }
  };

  const handlePageSizeChange = (size) => {
    setPageSize(size);
    setCurrentPage(1); // Reset to first page on size change
  };

  const headers = ['ID', 'STATUS','PAYMENT STATUS', 'AMOUNT', 'SCHEME', 'GROUPORDERNO', 'CREATED AT'];

  const renderRow = (item) => (
    <>
      <td className="px-6 py-3 text-blue-600 underline">
        <Link to={`/purchase-details/${item._id}`}>{item._id}</Link>
      </td>
      <td className="px-6 py-3">
        <span
          className={`px-2 py-1 text-xs rounded-full font-medium 
            ${item.state === 'successful'
            ? 'bg-green-100 text-green-600'
            : item.state === 'processing'
              ? 'bg-yellow-100 text-yellow-600'
              : 'bg-red-100 text-red-600'
            }`}
        >
          {item.status === 'successfull' ? 'Successfull'
            : item.state === 'processing'? 'Processing'
              : 'Failed'}
        </span>
      </td>

      <td className="px-6 py-3">
        <span
          className={`px-2 py-1 text-xs rounded-full font-medium 
            ${item.paymentStatus === 'success'
            ? 'bg-green-100 text-green-600'
            : item.paymentStatus === 'processing'
              ? 'bg-yellow-100 text-yellow-600'
              : 'bg-red-100 text-red-600'
            }`}
        >
          {item.paymentStatus === 'success' ? 'Successful'
            : item.paymentStatus === 'processing'? 'Processing'
              : 'Failed'}
        </span>
      </td>
      <td className="px-6 py-3">{item?.amount}</td>
      <td className="px-6 py-3">{item?.scheme}</td>
      <td className="px-6 py-3">{item?.groupOrderNo}</td>
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
    <div className="w-full min-h-screen py-6 bg-white">
      <h1 className="text-2xl font-bold mb-4 px-6">Purchases</h1>
      <div className="px-6">
        <Table
          headers={headers}
          data={data}
          renderRow={renderRow}
          fetchData={fetchData}
          sortOrder={sortOrder}
          handleSortClick={handleSortClick}
          setSearchTerm={setSearchTerm}
          searchTerm={searchTerm}
          currentPage={currentPage}
          onPageChange={handlePageChange}
          hasNextPage={hasNextPage}
          handleResetFilters={handleResetFilters}
          pageSize={pageSize}
          onPageSizeChange={handlePageSizeChange}
          totalPages={totalPages} 
        />
      </div>
    </div>
  );
};

export default PurchasesList



