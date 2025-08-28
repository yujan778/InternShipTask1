import React, { useState } from "react";
import { FiTrash2, FiPrinter } from "react-icons/fi";
import { Button } from "../index";

const Table = ({ columns, data, pageSize = 5, onDelete, onPrint }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedRows, setSelectedRows] = useState([]);

    const totalPages = Math.ceil(data.length / pageSize);
    const startIndex = (currentPage - 1) * pageSize;
    const paginatedData = data.slice(startIndex, startIndex + pageSize);

    const toggleRow = (id) => {
        setSelectedRows((prev) =>
            prev.includes(id) ? prev.filter((row) => row !== id) : [...prev, id]
        );
    };

    const toggleAll = () => {
        if (selectedRows.length === paginatedData.length) {
            setSelectedRows([]);
        } else {
            setSelectedRows(paginatedData.map((row) => row.id));
        }
    };

    return (
        <div className="p-4 bg-white shadow-md rounded-2xl">
            {/* Action Buttons aligned to right */}
            {selectedRows.length > 0 && (
                <div className="flex justify-end gap-2 mb-3">
                    <Button
                        variant="destructive"
                        count={selectedRows.length}
                        onClick={() => onDelete && onDelete(selectedRows)}
                    >
                        <FiTrash2 /> Delete
                    </Button>

                    <Button
                        variant="outline"
                        count={selectedRows.length}
                        onClick={() => onPrint && onPrint(selectedRows)}
                    >
                        <FiPrinter /> Print
                    </Button>
                </div>
            )}

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="min-w-full border border-gray-200 rounded-lg">
                    <thead className="bg-gray-100 text-gray-700">
                        <tr>
                            <th className="p-2 border text-center">
                                <input
                                    type="checkbox"
                                    checked={
                                        selectedRows.length === paginatedData.length &&
                                        paginatedData.length > 0
                                    }
                                    onChange={toggleAll}
                                />
                            </th>
                            {columns.map((col) => (
                                <th key={col.accessor} className="p-2 text-left border">
                                    {col.Header}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {paginatedData.map((row) => (
                            <tr key={row.id} className="hover:bg-gray-50">
                                <td className="p-2 border text-center">
                                    <input
                                        type="checkbox"
                                        checked={selectedRows.includes(row.id)}
                                        onChange={() => toggleRow(row.id)}
                                    />
                                </td>
                                {columns.map((col) => (
                                    <td key={col.accessor} className="p-2 border">
                                        {row[col.accessor]}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            <div className="flex justify-between items-center mt-3">
                <span className="text-sm text-gray-600">
                    Page {currentPage} of {totalPages}
                </span>
                <div className="flex gap-2">
                    <Button
                        variant="outline"
                        disabled={currentPage === 1}
                        onClick={() => setCurrentPage((p) => p - 1)}
                    >
                        Prev
                    </Button>
                    <Button
                        variant="outline"
                        disabled={currentPage === totalPages}
                        onClick={() => setCurrentPage((p) => p + 1)}
                    >
                        Next
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default Table;
