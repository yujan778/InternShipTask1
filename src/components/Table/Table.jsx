import React, { useState, useMemo, useEffect } from "react";
import PropTypes from "prop-types";


import{TableHead, TableBody, TablePagination} from "./index";

import { FiTrash2, FiPrinter } from "react-icons/fi";
import { Button } from "../index";

const Table = ({ columns, data, pageSize, selectable, actions, onDelete, onPrint }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedRows, setSelectedRows] = useState([]);

    const totalPages = useMemo(() => Math.ceil(data.length / pageSize), [data.length, pageSize]);

    const paginatedData = useMemo(() => {
        const start = (currentPage - 1) * pageSize;
        return data.slice(start, start + pageSize);
    }, [currentPage, data, pageSize]);

    const handleSelectRow = (id) => {
        setSelectedRows((prev) =>
            prev.includes(id) ? prev.filter((r) => r !== id) : [...prev, id]
        );
    };

    const handleSelectAll = () => {
        if (selectedRows.length === data.length) {
            setSelectedRows([]);
        } else {
            setSelectedRows(data.map((row) => row.id));
        }
    };

    const handleAction = (action, row) => {
        if (action.label === "Edit") {
            alert(`Edit row ${row.id} - ${row.name}`);
        }
        if (action.label === "Delete") {
            onDelete([row.id]);
            setSelectedRows((prev) => prev.filter((id) => id !== row.id));
        }
    };

    // const handleBulkDelete = () => {
    //     if (selectedRows.length) {
    //         onDelete(selectedRows);
    //         setSelectedRows([]);
    //     }
    // };

    // const handleBulkPrint = () => {
    //     if (selectedRows.length) {
    //         onPrint(selectedRows);
    //         setSelectedRows([]);
    //     }
    // };

    // Map actions to include click handlers
    const mappedActions =
        actions?.map((action) => ({
            ...action,
            onClick: handleAction.bind(null, action),
        })) || [];

    return (
        <div className="overflow-x-auto">
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

            <table className="min-w-full border border-gray-200">
                <TableHead
                    columns={columns}
                    selectable={selectable}
                    selectAllChecked={selectedRows.length === data.length && data.length > 0}
                    onSelectAll={handleSelectAll}
                />
                <TableBody
                    columns={columns}
                    data={paginatedData}
                    selectedRows={selectedRows}
                    onSelectRow={handleSelectRow}
                    selectable={selectable}
                    actions={mappedActions}
                />
            </table>

            <TablePagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
            />
        </div>
    );
};

Table.propTypes = {
    columns: PropTypes.array.isRequired,
    data: PropTypes.array.isRequired,
    pageSize: PropTypes.number,
    selectable: PropTypes.bool,
    actions: PropTypes.array,
    onDelete: PropTypes.func,
    onPrint: PropTypes.func,
};

Table.defaultProps = {
    pageSize: 5,
    selectable: true,
};

export default Table;
