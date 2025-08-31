import React from "react";
import PropTypes from "prop-types";

import { Checkbox, TableActions } from "./index";

const TableBody = ({
    columns,
    data,
    actions = [],
    selectedRows = [],
    onSelectRow = () => {},
    selectable = false,
}) => (
    <tbody>
        {data.map((row) => (
            <tr
                key={row.id}
                className={`border-t border-gray-200 ${
                    selectedRows.includes(row.id) ? "bg-gray-50" : ""
                }`}
            >
                {selectable && (
                    <td className="p-2">
                        <Checkbox
                            checked={selectedRows.includes(row.id)}
                            onChange={() => onSelectRow(row.id)}
                        />
                    </td>
                )}

                {columns.map((col) => (
                    <td key={col.key} className="p-2">
                        {col.isAction ? (
                            <TableActions row={row} actions={col.actions || actions} />
                        ) : (
                            row[col.key]
                        )}
                    </td>
                ))}
            </tr>
        ))}
    </tbody>
);

TableBody.propTypes = {
    columns: PropTypes.array.isRequired,
    data: PropTypes.array.isRequired,
    actions: PropTypes.arrayOf(
        PropTypes.shape({
            label: PropTypes.string.isRequired,
            onClick: PropTypes.func.isRequired,
        })
    ),
    selectedRows: PropTypes.array,
    onSelectRow: PropTypes.func,
    selectable: PropTypes.bool,
};

TableBody.defaultProps = {
    actions: [],
    selectedRows: [],
    onSelectRow: () => {},
    selectable: false,
};

export default TableBody;
