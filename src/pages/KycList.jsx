import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { get } from '../services/commonService';
import Table from '../components/table/Table';

const KycRequests = () => {
  const [data, setData] = useState([]);
  const [sortOrder, setSortOrder] = useState('asc');
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [pageSize, setPageSize] = useState(10); 
  const [totalPages, setTotalPages] = useState(1);// ✅ added

  const fetchData = async () => { 
    try {
      setLoading(true);
      const response = await get(
        `/kyc?page=${currentPage}&pageSize=${pageSize}&sortField=created_at&sortOrder=${sortOrder}&data=${searchTerm}`
      );
      const result = response?.data?.result || [];
      const metaData = response?.data?.metaData; //aded

      setData(result);
      setHasNextPage(result.length === pageSize);
      setTotalPages(metaData?.totalPages || 1); // ✅ set totalPages from API
    } catch (err) {
      console.error(err);
      setError('Failed to fetch data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [currentPage, sortOrder, pageSize]);

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
    setCurrentPage(1);
  };

  const headers = ['ID', 'Status', 'Name', 'PAN', 'Email', 'Mobile', 'Created At'];

  const renderRow = (item) => (
    <>
      <td className="px-6 py-3 text-blue-600 underline">
        <Link to={`/kyc-details/${item._id}`}>{item._id}</Link>
      </td>
      <td className="px-6 py-3">
        <span
          className={`px-2 py-1 text-xs rounded-full font-medium ${
            item.status === 'successful'
              ? 'bg-green-100 text-green-600'
              : 'bg-red-100 text-red-600'
          }`}
        >
          {item.status === 'successful' ? 'Successful' : 'Failed'}
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
    <div className="w-full min-h-screen py-6 bg-white">
      <h1 className="text-2xl font-bold mb-4 px-6">KYC Requests</h1>
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
          totalPages={totalPages} // ✅ pass to Table
        />
      </div>
    </div>
  );
};

export default KycRequests;
