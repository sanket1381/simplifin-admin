import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { get } from '../services/commonService';
import Table from '../components/table/Table';
import LoadingSpinner from '../components/loader/LoadingSpinner';

const AddressDetailsList = () => {
  const [data, setData] = useState([]);
  const [sortOrder, setSortOrder] = useState('dec');
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
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
        `/kyc/address/list?page=${currentPage}&pageSize=${pageSize}&sortField=created_at&sortOrder=${sortOrder}&data=${searchTerm}`
      );
      const result = response?.data?.result || [];
      const metaData = response?.data?.metaData;

      setData(result);
      setHasNextPage(result.length === pageSize);
      setTotalPages(metaData?.totalPages || 1);
    } catch (err) {
      console.error(err);

      if (err?.response?.data?.message === 'Unauthorized access') {
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
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handlePageSizeChange = (size) => {
    setPageSize(size);
    setCurrentPage(1);
  };

  const headers = ['KYC ID', 'NAME', 'LINE 1', 'CITY', 'COUNTRY', 'STATUS', 'PINCODE'];

  const renderRow = (item) => [
    <span className="text-blue-600 underline" key="id">
      <Link to={`/address-details/${item._id}`}>{item._id}</Link>
    </span>,
    <span key="name">{item?.name}</span>,
    <span key="line1">{item?.address?.line_1 || 'N/A'}</span>,
    <span key="city">{item?.address?.city || 'N/A'}</span>,
    <span key="country">{item?.address?.country || 'N/A'}</span>,
    <span key="status">
      <span className={`px-2 py-1 text-xs rounded-full font-medium ${item?.address?.status === 'SUCCESS' ? 'bg-green-100 text-green-600' : ''}`}>
        {item?.address?.status === 'SUCCESS' ? 'Successful' : ''}
      </span>
    </span>,
    <span key="pincode">{item?.address?.pincode || 'N/A'}</span>
  ];

  if (loading)
    return (
      <div>
        <LoadingSpinner />
      </div>);

  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="w-full min-h-screen py-6 bg-white">
      <h1 className="text-2xl font-bold mb-4 px-6">Address Details</h1>
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
          columnWidths={["15%","15%","25%","15%","10%","10%","10%"]}
        />
      </div>
    </div>
  );
};

export default AddressDetailsList;