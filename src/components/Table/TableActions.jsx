import React from "react";
import PropTypes from "prop-types";

const TableActions = ({ row, actions = [] }) => (
    <div className="flex gap-3">
        {actions.map((action, index) => {
            const Icon = action.icon;
            return (
                <span
                    key={index}
                    onClick={() => action.onClick(row)}
                    title={action.label}
                    className="cursor-pointer hover:opacity-75 text-lg flex items-center"
                >
                    <Icon className={action.className || ""} />
                </span>
            );
        })}
    </div>
);

TableActions.propTypes = {
    row: PropTypes.object.isRequired,
    actions: PropTypes.arrayOf(
        PropTypes.shape({
            label: PropTypes.string.isRequired,
            icon: PropTypes.node.isRequired,
            onClick: PropTypes.func.isRequired,
        })
    ),
};

TableActions.defaultProps = {
    actions: [],
};

export default TableActions;
