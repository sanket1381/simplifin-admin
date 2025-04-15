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
}) => {
  return (
    <div className="flex flex-col min-h-screen px-6 py-4">
      {/* Search and Filter Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
        {/* Search Bar */}
        <div className="flex items-center border border-gray-300 rounded-md px-3 py-2 bg-white shadow-sm" style={{ width: '300px' }}>
          <FiSearch className="text-gray-500 mr-2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by Name or PAN..."
            className="w-full outline-none text-sm"
          />
        </div>

        {/* Optional Filter Dropdown */}
        <div>
          <select className="border border-gray-300 rounded-md px-4 py-2 bg-white text-sm text-gray-700 shadow-sm">
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

      {/* Pagination at the bottom center */}
      <div className="flex justify-center items-center mt-6 space-x-4">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-blue-500 hover:bg-blue-700 text-white text-sm rounded disabled:opacity-50 cursor-pointer"
        >
          Previous
        </button>
        <span className="text-sm text-gray-700">
          Page {currentPage}
        </span>
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={!hasNextPage}
          className="px-4 py-2 bg-blue-500 hover:bg-blue-700 text-white text-sm rounded disabled:opacity-50 cursor-pointer"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Table;

