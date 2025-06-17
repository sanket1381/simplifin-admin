import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { get } from '../services/commonService';
import Table from '../components/table/Table';
import LoadingSpinner from '../components/loader/LoadingSpinner';

const BankMandatesList = () => {
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

  const regStatusMapping = {
    RQ: 'Pending',
    CL: 'Cancelled',
    PA: 'Confirmed',
    PR: 'Rejected',
  };

  const aggrStatusMapping = {
    RQ: 'Requested',
    RA: 'Aggregator Rejected',
    PA: 'Confirmed',
    PR: 'Rejected',
    SE: 'Send to Aggregator',
    PS: 'Request Acknowledged by Aggregator',
    PF: 'Request Rejected By Aggregator',
    PE: 'Pending',
    AC: 'Request Cancelled by Aggregator',
    AK: 'Aggregator Accepted',
  };

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await get(
        `/sip/mandate/list?page=${currentPage}&pageSize=${pageSize}&sortField=created_at&sortOrder=${sortOrder}&data=${searchTerm}`

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

  const headers = ['INVESTORS', 'MANDATE ID', 'ID', 'REFERENCE', 'REG STATUS', 'AGGR STATUS', 'CREATED AT',];

  const renderRow = (item) => [
    <span key="username">{item?.username}</span>,
    <span key="mmrn">{item?.mmrn}</span>,
    <span className="text-blue-600 underline" key="id">
      <Link to={`/mandateDetails/${item._id}`}>{item._id}</Link>
    </span>,
    <span key="uniqueRefNo">{item?.uniqueRefNo}</span>,
    <span key="regStatus">
      <span
        className={`px-2 py-1 text-xs rounded-full font-medium
          ${item?.mmrnRegStatus === 'CL' || item?.mmrnRegStatus === 'PR'
            ? 'bg-red-100 text-red-600'
            : item?.mmrnRegStatus === 'RQ'
              ? 'bg-yellow-100 text-yellow-600'
              : item?.mmrnRegStatus === 'PA'
                ? 'bg-green-100 text-green-600'
                : 'bg-gray-100 text-gray-600'
          }`}
      >
        {regStatusMapping[item?.mmrnRegStatus] || item?.mmrnRegStatus || ''}
      </span>
    </span>,
    <span key="aggrStatus">{aggrStatusMapping[item?.mmrnAggrStatus] || item?.mmrnAggrStatus || ''}</span>,
    <span key="createdAt">{item.created_at
      ? new Date(item.created_at).toLocaleDateString('en-US', {
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
          totalPages={totalPages}
          searchPlaceholder="Search by Name ..."
          columnWidths={["15%","18%","20%","18%","10%","10%","10%"]}
        />
      </div>
    </div>
  );
};

export default BankMandatesList;



