import React from 'react';
import { FiSearch } from 'react-icons/fi';

const Table = ({
  headers,
  data,
  renderRow,
  sortOrder,
  handleSortClick,
  searchTerm,
  setSearchTerm,
  currentPage,
  onPageChange,
  hasNextPage,
  handleResetFilters,
  pageSize,
  onPageSizeChange,
}) => {
  return (
    <div className="flex flex-col min-h-screen px-6 py-4">
      {/* Search and Filter Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
        {/* Search and Reset */}
        <div className="flex items-center gap-3">
          <div className="relative">
            <FiSearch className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400 text-sm" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by Name or PAN..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm focus:ring-2 focus:ring-blue-400 focus:outline-none w-72"
            />
          </div>

          <button
            onClick={handleResetFilters}
            className="text-sm border border-gray-300 rounded-md px-3 py-2 shadow-sm bg-blue-200 hover:bg-blue-400 text-gray-700 focus:outline-none"
          >
            Reset Filters
          </button>
        </div>

        {/* Page size and Filter dropdowns */}
        <div className="flex items-center gap-4">
          {/* Page size dropdown */}
          <div className="flex items-center gap-2">
            <label htmlFor="pageSize" className="text-sm font-medium text-gray-700">
              Records per page:
            </label>
            <select
              id="pageSize"
              value={pageSize}
              onChange={(e) => onPageSizeChange(Number(e.target.value))}
              className="text-sm border border-gray-300 rounded-md px-3 py-2 shadow-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value={1}>1</option>
              <option value={3}>3</option>
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={15}>15</option>
            </select>
          </div>

          {/* Optional Filter Dropdown */}
          <select className="text-sm border border-gray-300 rounded-md px-3 py-2 shadow-sm bg-blue-200 hover:bg-blue-400 text-gray-700 focus:outline-none ">
            <option value="">Filter</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="w-full overflow-x-auto rounded-lg shadow bg-white flex-1">
        <table className="w-full text-sm table-auto">
          <thead className="bg-blue-50 text-gray-700 sticky top-0 z-10">
            <tr>
              {headers.map((header, idx) => (
                <th key={idx} className="px-6 py-3 text-left font-semibold">
                  {header === 'Created At' ? (
                    <button onClick={handleSortClick} className="text-blue-600">
                      {header} {sortOrder === 'asc' ? '▲' : '▼'}
                    </button>
                  ) : (
                    header
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.length > 0 ? (
              data.map((item, idx) => (
                <tr key={idx} className="border-t hover:bg-gray-100 transition-colors even:bg-gray-50">
                  {renderRow(item)}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={headers.length} className="text-center py-4 text-gray-500">
                  No results found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center mt-6 space-x-4">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-blue-500 hover:bg-blue-700 text-white text-sm rounded disabled:opacity-50 transition"
        >
          Previous
        </button>
        <span className="text-sm text-gray-700">
          Page {currentPage}
        </span>
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={!hasNextPage}
          className="px-4 py-2 bg-blue-500 hover:bg-blue-700 text-white text-sm rounded disabled:opacity-50 transition"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Table;
