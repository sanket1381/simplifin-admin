import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { get, put } from '../services/commonService';
import Table from '../components/table/Table';
import LoadingSpinner from '../components/loader/LoadingSpinner';
import EditIcon from '../components/EditIcon';
import StatusEditModal from '../components/StatusEditModal';

const UserDetailsList = () => {
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
        `/users/list?page=${currentPage}&pageSize=${pageSize}&sortField=createdAt&sortOrder=${sortOrder}&data=${searchTerm}`
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
    if (page > 0) {
      setCurrentPage(page);
    }
  };

  const handlePageSizeChange = (size) => {
    setPageSize(size);
    setCurrentPage(1);
  };

  const headers = ['ID', 'NAME', 'EMAIL', 'MOBILE NUMBER', 'STATUS', 'REFER CODE','REFERRER CODE', 'CREATED AT', 'EDIT'];

  // Modal state
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [editStatus, setEditStatus] = useState('active');
  const [saving, setSaving] = useState(false);

  const openEditModal = (user) => {
    setSelectedUser(user);
    setEditStatus(user.status);
    setModalOpen(true);
  };

  const closeEditModal = () => {
    setModalOpen(false);
    setSelectedUser(null);
  };

  const handleSaveStatus = async () => {
    if (!selectedUser) return;
    setSaving(true);
    try {
      await put(`/users/${selectedUser._id}`, {
        status: editStatus,
      });
      closeEditModal();
      fetchData();
    } catch (err) {
      alert('Failed to update status');
    } finally {
      setSaving(false);
    }
  };

  const renderRow = (item) => [
    <span className="text-blue-600 underline" key="id">
      <Link to={`/user-details/${item._id}`}>{item._id}</Link>
    </span>,
    <span key="name">{item.name}</span>,
    <span key="email">{item.email}</span>,
    <span key="mobile">{item.mobileNumber}</span>,
    <span key="status" className={`px-2 py-1 text-xs rounded-full font-medium ${item.status === 'active' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
      {item.status === 'active' ? 'Active' : 'Inactive'}
    </span>,
    <span key="referCode">{item.referCode || ''}</span>,
    <span key="referrerCode">{item.referrerCode || ''}</span>,
    <span key="createdAt">{item.createdAt ? new Date(item.createdAt).toLocaleDateString('en-US', { dateStyle: 'long' }) : 'N/A'}</span>,
    <span key="edit">
      <button
        className="hover:text-blue-600 p-0 m-0"
        title="Edit Status"
        onClick={() => openEditModal(item)}
        style={{ minWidth: 0 }}
      >
        <EditIcon className="w-5 h-5" />
      </button>
    </span>
  ];

  if (loading)return (
      <div>
        <LoadingSpinner />
      </div>);
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="w-full min-h-screen py-6 bg-white">
      <h1 className="text-2xl font-bold mb-4 px-6">User Details</h1>
      <div className="">
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
          columnWidths={["16%","15%","25%","10%","8%","8%","8%","13%","3%"]}
        />
      </div>
      <StatusEditModal
        isOpen={modalOpen}
        onClose={closeEditModal}
        onSave={handleSaveStatus}
        status={editStatus}
        setStatus={setEditStatus}
      />
      {saving && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-20">
          <div className="bg-white px-6 py-4 rounded shadow">Saving...</div>
        </div>
      )}
    </div>
  );
};

export default UserDetailsList;