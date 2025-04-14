import React, { useState, useEffect } from 'react';
import { FiSearch } from 'react-icons/fi';

const Table = ({ headers, data, renderRow, fetchData, sortOrder, searchFunction }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredData, setFilteredData] = useState(data);

    // Filter data based on name when searchTerm changes
    useEffect(() => {
        if (searchTerm.length >= 3 && typeof searchFunction === 'function') {
            const filtered = data.filter((item) => searchFunction(item, searchTerm));
            setFilteredData(filtered);
        } else {
            setFilteredData(data);
        }
    }, [searchTerm, data, searchFunction])



    return (
        <div className="w-full">
            {/* Search and Filter Bar */}
            <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                {/* Search Bar - Fixed width */}
                <div className="flex items-center border border-gray-300 rounded-md px-3 py-2 bg-white shadow-sm" style={{ width: '300px' }}>
                    <FiSearch className="text-gray-500 mr-2" />
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Search by name..."
                        className="w-full outline-none text-sm"
                    />
                </div>

                {/* Filter Dropdown – kept as it was before */}
                <div>
                    <select className="border border-gray-300 rounded-md px-4 py-2 bg-white text-sm text-gray-700 shadow-sm">
                        <option value="">Filter</option>
                    </select>
                </div>
            </div>

            {/* Table */}
            <div className="w-full overflow-x-auto rounded-lg shadow bg-white">
                <table className="w-full text-sm table-auto">
                    <thead className="bg-blue-50 text-gray-700 sticky top-0 z-10">
                        <tr>
                            {headers.map((header, idx) => (
                                <th key={idx} className="px-6 py-3 text-left font-semibold">
                                    {header === 'Created At' ? (
                                        <button
                                            onClick={fetchData}
                                            className="text-blue-600 "
                                        >
                                            {header}  {sortOrder === 'asc' ? '▲' : '▼'}
                                        </button>
                                    ) : (
                                        header
                                    )}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {filteredData.length > 0 ? (
                            filteredData.map((item, idx) => (
                                <tr
                                    key={idx}
                                    className="border-t hover:bg-gray-100 transition-colors even:bg-gray-50"
                                >
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
        </div>
    );
};

export default Table;
