import React from "react";
import { ErrorMessage } from "../index";

const defaultInputClasses = `w-full border border-gray-400 p-2 rounded-md focus:outline-none focus:border-emerald-500`;

const Textfield = ({
    label,
    value,
    onChange,
    placeholder = "",
    type = "text",
    error = "",
    required = false,
    disabled = false,
    className = "",
    inputClassName = "",
    textarea = false,
    rows = 3,
    icon,
    errorIcon,
    name,
    ...props
}) => {
    const iconPadding = icon ? "pl-10" : "";
    const errorPadding = errorIcon ? "pr-10" : "";
    const finalInputClass =
        inputClassName ||
        `w-full border border-gray-400 p-2 rounded-md focus:outline-none focus:border-emerald-500 ${iconPadding} ${errorPadding}`;
    const errorClass = error ? "border-red-500" : "";

    return (
        <div className={`flex flex-col mb-4 ${className}`}>
            {label && (
                <label htmlFor={name} className="mb-1 font-medium">
                    {label} {required && <span className="text-red-500">*</span>}
                </label>
            )}

            <div className="relative">
                {icon && (
                    <div className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500">
                        {icon}
                    </div>
                )}

                {textarea ? (
                    <textarea
                        id={name}
                        name={name}
                        value={value}
                        onChange={onChange}
                        placeholder={placeholder}
                        rows={rows}
                        disabled={disabled}
                        className={`${finalInputClass} ${errorClass}`}
                        {...props}
                    />
                ) : (
                    <input
                        id={name}
                        name={name}
                        type={type}
                        value={value}
                        onChange={onChange}
                        placeholder={placeholder}
                        disabled={disabled}
                        className={`${finalInputClass} ${errorClass}`}
                        {...props}
                    />
                )}

                {errorIcon && error && (
                    <div className="absolute right-2 top-1/2 transform -translate-y-1/2 text-red-500">
                        {errorIcon}
                    </div>
                )}
            </div>

            {error && <ErrorMessage message={error} />}
        </div>
    );
};

export default Textfield;
