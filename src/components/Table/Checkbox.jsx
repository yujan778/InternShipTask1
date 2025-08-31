import React, { forwardRef } from "react";
import PropTypes from "prop-types";

const Checkbox = forwardRef(
    ({ checked, onChange, label, disabled = false, className = "", ...props }, ref) => {
        return (
            <label
                className={`flex items-center gap-2 cursor-pointer select-none ${
                    disabled ? "opacity-50 cursor-not-allowed" : ""
                } ${className}`}
            >
                <input
                    type="checkbox"
                    checked={checked}
                    onChange={onChange}
                    disabled={disabled}
                    className="h-4 w-4 rounded border-gray-400 text-blue-600"
                    ref={ref}
                    {...props}
                />
                {label && <span className="text-sm text-gray-700">{label}</span>}
            </label>
        );
    }
);

Checkbox.propTypes = {
    checked: PropTypes.bool.isRequired,
    onChange: PropTypes.func.isRequired,
    label: PropTypes.string,
    disabled: PropTypes.bool,
    className: PropTypes.string,
};

export default Checkbox;
