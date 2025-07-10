import React, { useEffect, useState } from 'react';
import Table from '../components/table/Table';
import LoadingSpinner from '../components/loader/LoadingSpinner';
import { get } from '../services/commonService';

const MFHoldings = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('desc');

  const headers = ['USER NAME', 'INVESTED VALUE', 'CURRENT VALUE', 'PROFIT & LOSS', 'CREATED AT'];

  const fetchData = async () => {
    try {
      setLoading(true);
      setError('');
      // Replace with your actual API endpoint for holdings
      const response = await get(`/mutualFund/portfolio/list?page=${currentPage}&pageSize=${pageSize}&sortOrder=${sortOrder}&data=${searchTerm}`);
      const result = response?.data?.result || [];
      const metaData = response?.data?.metaData;
      setData(result);
      setHasNextPage(result.length === pageSize);
      setTotalPages(metaData?.totalPages || 1);
    } catch (err) {
      setError('Failed to fetch holdings');
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

  const renderRow = (item) => [
    <span key="username">{item?.username}</span>,
    <span key="investedValue">{!isNaN(Number(item?.investedValue)) ? Number(item.investedValue).toFixed(2) : item?.investedValue}</span>,
    <span key="currentValue">{!isNaN(Number(item?.currentValue)) ? Number(item.currentValue).toFixed(2) : item?.currentValue}</span>,
    <span key="profitLoss">{!isNaN(Number(item?.profitLoss)) ? Number(item.profitLoss).toFixed(2) : item?.profitLoss}</span>,
    <span key="tillDate">{item?.updatedAt ? new Date(item?.updatedAt).toLocaleDateString('en-US', {dateStyle: 'long'}) : 'N/A'}</span>
  ];

  if (loading) return <div><LoadingSpinner /></div>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="w-full min-h-screen py-6 bg-white">
      <h1 className="text-2xl font-bold mb-4 px-6">MF Holdings</h1>
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
          columnWidths={["20%","15%","15%","15%","15%","15%"]}
        />
      </div>
    </div>
  );
};

export default MFHoldings;
