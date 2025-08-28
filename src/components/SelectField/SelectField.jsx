import React from "react";
import Select from "react-select";
import { ErrorMessage } from "../index";

const SelectField = ({
  label,
  name,
  value,
  onChange,
  options = [],
  placeholder = "Select...",
  error = "",
  required = false,
  isMulti = false,
  isSearchable = true,
  disabled = false,
  className = "",
  customStyles = {},
}) => {
  const handleChange = (selectedOption) => {
    if (isMulti) {
      onChange(name, selectedOption || []);
    } else {
      onChange(name, selectedOption);
    }
  };

  // Default styles to match input field outline
  const defaultStyles = {
    control: (provided, state) => ({
      ...provided,
      border: state.isFocused
        ? "2px solid #10B981" // emerald-500 for focus
        : "1px solid #D1D5DB", // gray-300 normal
      boxShadow: "none",
      "&:hover": {
        borderColor: "#10B981", // hover same as focus
      },
      borderRadius: "0.375rem", // rounded-md
      minHeight: "2.5rem",
    }),
    placeholder: (provided) => ({
      ...provided,
      color: "#6B7280", // text-gray-500
    }),
    singleValue: (provided) => ({
      ...provided,
      color: "#111827", // text-gray-900
    }),
    multiValue: (provided) => ({
      ...provided,
      backgroundColor: "#D1FAE5", // emerald-100 for tags
    }),
    multiValueLabel: (provided) => ({
      ...provided,
      color: "#065F46", // emerald-800
    }),
    multiValueRemove: (provided) => ({
      ...provided,
      color: "#065F46",
      ":hover": {
        backgroundColor: "#10B981",
        color: "white",
      },
    }),
  };

  return (
    <div className={`flex flex-col mb-4 ${className}`}>
      {label && (
        <label className="mb-1 font-medium">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}

      <Select
        name={name}
        value={value}
        onChange={handleChange}
        options={options}
        placeholder={placeholder}
        isMulti={isMulti}
        isSearchable={isSearchable}
        isDisabled={disabled}
        styles={{ ...defaultStyles, ...customStyles }} 
      />

      {error && <ErrorMessage message={error} />}
    </div>
  );
};

export default SelectField;
