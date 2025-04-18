import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { get } from '../services/commonService';
import Table from '../components/table/Table';

const BankVerifications = () => {
  const [data, setData] = useState([]);
  const [sortOrder, setSortOrder] = useState('asc');
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
        `/kyc/bankaccount/list?page=${currentPage}&pageSize=${pageSize}&sortField=created_at&sortOrder=${sortOrder}&data=${searchTerm}`
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

  const headers = ['ID', 'INVESTOR NAME', 'BANK NAME', 'ACCOUNT TYPE', 'VERIFICATION STATUS', 'CREATED AT'];

  const searchFunction = (item, searchTerm) => {
    const search = searchTerm.toLowerCase();
    return item.name?.toLowerCase().includes(search);
  };

  const renderRow = (item) => (
    <>
      <td className="px-6 py-3 text-blue-600 underline">
        <Link to={`/bank-details/${item._id}`}>{item._id}</Link>
      </td>
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
          {item.bank_account_verified?.[0]?.account_status === 'VALID' ? 'Completed' : 'Failed'}
        </span>
      </td>
      <td className="px-6 py-3">
        {item.bank_account_verified?.[0]?.created_at
          ? new Date(item.bank_account_verified[0].created_at).toLocaleDateString('en-US', {
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
      <h1 className="text-2xl font-bold mb-4 px-6">Bank account verifications</h1>
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
        />
      </div>
    </div>
  );

}

export default BankVerifications