import React from "react";
import PropTypes from "prop-types";
import {Checkbox} from "./index";

const TableHead = ({ columns, selectable, selectAllChecked, onSelectAll }) => {
  return (
    <thead className="bg-gray-100">
      <tr>
        {/* Master Select Checkbox */}
        {selectable && (
          <th className="p-2">
            <Checkbox
              checked={selectAllChecked}
              onChange={onSelectAll}
              aria-label="Select all rows"
            />
          </th>
        )}
        {columns.map((col) => (
          <th key={col.key} className="p-2 text-left">
            {col.label}
          </th>
        ))}
      </tr>
    </thead>
  );
};

TableHead.propTypes = {
  columns: PropTypes.array.isRequired,
  selectable: PropTypes.bool,
  selectAllChecked: PropTypes.bool,
  onSelectAll: PropTypes.func,
};

export default TableHead;
