import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { get } from '../services/commonService';
import Table from '../components/table/Table';

const BankMandatesList = () => {
  const [data, setData] = useState([]);
  const [sortOrder, setSortOrder] = useState('asc');
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [pageSize, setPageSize] = useState(5); 

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await get(
        `/sip/mandate/list?page=${currentPage}&pageSize=${pageSize}&sortField=created_at&sortOrder=${sortOrder}&data=${searchTerm}`

      );
      const result = response?.data?.result || [];
      setData(result);
      setHasNextPage(result.length === pageSize);
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

  const headers = ['INVESTORS', 'MANDATE ID', 'ID', 'REFRENCE', 'STATUS', 'LAST UPDATED', ];

  const renderRow = (item) => (
    <>
     <td className="px-6 py-3">{item?.investor}</td>
     <td className="px-6 py-3">{item?.mmrn}</td>
     {/* <td className="px-6 py-3">{item?._id}</td> */}
     <td className="px-6 py-3 text-blue-600 underline">
        <Link to={`/mandateDetails/${item._id}`}>{item._id}</Link>
      </td>
     <td className="px-6 py-3">{item?.uniqueRefNo}</td>
     <td className="px-6 py-3">{item?.status}</td>
     <td className="px-6 py-3">{item?.update}</td>
     
    </>
  );

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="w-full min-h-screen py-6 bg-white">
      <h1 className="text-2xl font-bold mb-4 px-6">Bank Mandates</h1>
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
        />
      </div>
    </div>
  );
};

export default BankMandatesList;



