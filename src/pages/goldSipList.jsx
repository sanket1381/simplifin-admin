import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { get } from '../services/commonService';
import Table from '../components/table/Table';
import LoadingSpinner from '../components/loader/LoadingSpinner';

const GoldSipList = () => {
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
        `/gold/sip/list?page=${currentPage}&pageSize=${pageSize}&sortField=createdAt&sortOrder=${sortOrder}&data=${searchTerm}`
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

  const headers = ['ID', 'USER NAME', 'AMOUNT', 'FREQUENCY', 'NEXT INSTALLMENT', 'STATUS', 'CREATED AT'];

  const renderRow = (item) => (
    <>
      <td className="px-6 py-3 text-blue-600 underline">
        <Link to={`/gold-sip-details/${item._id}`}>{item._id}</Link>
      </td>
      <td className="px-6 py-3">{item?.username}</td>
      <td className="px-6 py-3">{item?.amount}</td>
      <td className="px-6 py-3">{item?.frequency}</td>
      <td className="px-6 py-3">
        {item?.next_installment_date
          ? new Date(item.next_installment_date).toLocaleDateString('en-US', {
              dateStyle: 'long',
            })
          : 'N/A'}
      </td>
      <td className="px-6 py-3">
        <span
          className={`px-2 py-1 text-xs rounded-full font-medium 
            ${item.status
              ? item.status.toLowerCase().trim() === 'active'
                ? 'bg-green-100 text-green-600'
                : item.status.toLowerCase().trim() === 'authenticated'
                  ? 'bg-yellow-100 text-yellow-600'
                : item.status.toLowerCase().trim() === 'pending'
                  ? 'bg-yellow-100 text-yellow-600'
                  : item.status.toLowerCase().trim() === 'failed'
                    ? 'bg-red-100 text-red-600'
                  : item.status.toLowerCase().trim() === 'cancelled'
                    ? 'bg-red-100 text-red-600'
                    : item.status.toLowerCase().trim() === 'completed'
                      ? 'bg-green-200 text-green-700'
                      : ''
              : ''
            }`}
        >
          {item.status
            ? item.status.toLowerCase().trim() === 'active'
              ? 'Active'
              : item.status.toLowerCase().trim() === 'authenticated'
                ? 'Authenticated'
              : item.status.toLowerCase().trim() === 'pending'
                ? 'Pending'
                : item.status.toLowerCase().trim() === 'failed'
                  ? 'Failed'
                : item.status.toLowerCase().trim() === 'cancelled'
                  ? 'Cancelled'
                  : item.status.toLowerCase().trim() === 'completed'
                    ? 'Completed'
                    : ''
            : ''}
        </span>
      </td>
      <td className="px-6 py-3">
        {item.createdAt
          ? new Date(item.createdAt).toLocaleDateString('en-US', {
              dateStyle: 'long',
            })
          : 'N/A'}
      </td>
    </>
  );

  if (loading) return (
    <div>
      <LoadingSpinner />
    </div>
  );
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="w-full min-h-screen py-6 bg-white">
      <h1 className="text-2xl font-bold mb-4 px-6">Gold SIPs</h1>
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
};

export default GoldSipList;