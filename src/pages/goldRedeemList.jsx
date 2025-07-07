import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { get } from '../services/commonService';
import Table from '../components/table/Table';
import LoadingSpinner from '../components/loader/LoadingSpinner';

const GoldRedeemList = () => {
  const [data, setData] = useState([]);
  const [sortOrder, setSortOrder] = useState('dec');
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [pageSize, setPageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await get(
        `/gold/sell/list?page=${currentPage}&pageSize=${pageSize}&sortField=createdAt&sortOrder=${sortOrder}&data=${searchTerm}`
      );
      const result = response?.data?.result || [];
      const metaData = response?.data?.metaData;

      setData(result);
      setHasNextPage(result.length === pageSize);
      setTotalPages(metaData?.totalPages || 1);
    }
    catch (err) {
      console.error(err);

      if (err?.response?.data?.message === "Unauthorized access") {
        navigate('/signin');
      } else {
        setError('Failed to fetch data');
      }
    } finally {
      setLoading(false);
    }
  };

  // Only let useEffect handle API calls, never call fetchData directly after state updates
  useEffect(() => {
    if (searchTerm.length === 0 || searchTerm.length >= 3) {
      fetchData();
    }
    // For 1 or 2 characters, do nothing (no API call)
  }, [currentPage, sortOrder, pageSize]);

  // Debounce searchTerm changes and only update state
  useEffect(() => {
    if (searchTerm.length === 0) {
      setCurrentPage(1);
      // fetchData will be called by the above effect
      return;
    }
    if (searchTerm.length >= 3) {
      const delayDebounce = setTimeout(() => {
        setCurrentPage(1);
        fetchData();
      }, 500);
      return () => clearTimeout(delayDebounce);
    }
    // For 1 or 2 characters, do nothing (no API call)
  }, [searchTerm]);

  const handleSortClick = () => {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  const handleResetFilters = () => {
    setSearchTerm('');
    setSortOrder('asc');
    setCurrentPage(1);
    setPageSize(10);
    // fetchData will be called by useEffect
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

  const headers = ['ID', 'USER NAME', 'QUANTITY', 'AMOUNT', 'ORDER ID', 'CREATED AT'];

  const renderRow = (item) => [
    <span className="text-blue-600 underline" key="id">
      <Link to={`/gold-redeem-details/${item._id}`}>{item._id}</Link>
    </span>,
    <span key="username">{item?.username}</span>,
    <span key="quantity">{item?.quantity}</span>,
    <span key="totalAmount">{item?.totalAmount}</span>,
    <span key="transactionId">{item?.transactionId}</span>,
    <span key="createdAt">{item.createdAt
      ? new Date(item.createdAt).toLocaleDateString('en-US', {
        dateStyle: 'long',
      })
      : 'N/A'}</span>
  ];

  if (loading) return (
    <div>
      <LoadingSpinner />
    </div>);
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="w-full min-h-screen py-6 bg-white">
      <h1 className="text-2xl font-bold mb-4 px-6">Gold Redeems</h1>
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
          searchPlaceholder="Search by Name ..."
          columnWidths={["22%","22%","10%","11%","25%","10%"]}
          onSearchBlur={() => {
            if (searchTerm === '') {
              setCurrentPage(1);
              fetchData();
            }
          }}
        />
      </div>
    </div>
  );
};

export default GoldRedeemList;