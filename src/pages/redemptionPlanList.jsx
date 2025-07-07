import React, { useState, useEffect } from 'react';
import { Link ,useNavigate} from 'react-router-dom';
import { get } from '../services/commonService';
import Table from '../components/table/Table';
import LoadingSpinner from '../components/loader/LoadingSpinner';

const RedemptionPlanList = () => {
  const [data, setData] = useState([]);
  const [sortOrder, setSortOrder] = useState('dec');
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [pageSize, setPageSize] = useState(5); 
  const [totalPages, setTotalPages] = useState(1);
  const navigate = useNavigate(); 

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await get(
        `/swp/list?page=${currentPage}&pageSize=${pageSize}&sortField=created_at&sortOrder=${sortOrder}&data=${searchTerm}`
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

  const headers = ['ID', 'USER NAME', 'STATUS','FOLIO NUMBER', 'AMOUNT', 'SCHEME', 'GROUP ORDER N0', 'CREATED AT'];

  const renderRow = (item) => [
    <span className="text-blue-600 underline" key="id">
      <Link to={`/redemptionplan-details/${item._id}`}>{item._id}</Link>
    </span>,
    <span key="username">{item?.username}</span>,
    <span key="status">
      <span
        className={`px-2 py-1 text-xs rounded-full font-medium 
          ${item.state
            ? item.state.toLowerCase().trim() === 'active'
              ? 'bg-green-100 text-green-600'
              : item.state.toLowerCase().trim() === 'created'
                ? 'bg-blue-100 text-blue-600'
                : item.state.toLowerCase().trim() === 'failed'
                  ? 'bg-red-100 text-red-600'
                  : item.state.toLowerCase().trim() === 'completed'
                    ? 'bg-green-200 text-green-700'
                    : item.state.toLowerCase().trim() === 'cancelled'
                      ? 'bg-gray-200 text-gray-700'
                      : ''
            : ''
          }`}
      >
        {item.state
          ? item.state.toLowerCase().trim() === 'active'
            ? 'Active'
            : item.state.toLowerCase().trim() === 'created'
              ? 'Created'
              : item.state.toLowerCase().trim() === 'failed'
                ? 'Failed'
                : item.state.toLowerCase().trim() === 'completed'
                  ? 'Completed'
                  : item.state.toLowerCase().trim() === 'cancelled'
                    ? 'Cancelled'
                    : ''
          : ''}
      </span>
    </span>,
    <span key="folio_number">{item?.folio_number || 'N/A'}</span>,
    <span key="amount">{item?.amount || 'N/A'}</span>,
    <span key="plan_name">{item?.plan_name || 'N/A'}</span>,
    <span key="groupOrderNo">{item?.groupOrderNo || 'N/A'}</span>,
    <span key="created_at">{item.created_at
      ? new Date(item?.created_at).toLocaleDateString('en-US', {
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
      <h1 className="text-2xl font-bold mb-4 px-6">Redemption Plans</h1>
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
          columnWidths={["16%","16%","10%","10%","10%","16%","16%","9%"]}
          onSearchBlur={() => {
            if (searchTerm.length === 0) {
              setCurrentPage(1);
              fetchData();
            }
          }}
        />
      </div>
    </div>
  );
};

export default RedemptionPlanList;



