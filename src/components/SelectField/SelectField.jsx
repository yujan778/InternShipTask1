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
      onChange(Array.isArray(selectedOption) ? selectedOption : []);
    } else {
      onChange(selectedOption || null);
    }
  };

  const defaultStyles = {
    control: (provided, state) => ({
      ...provided,
      border: state.isFocused ? "2px solid #10B981" : "1px solid #D1D5DB",
      boxShadow: "none",
      "&:hover": { borderColor: "#10B981" },
      borderRadius: "0.375rem",
      minHeight: "2.5rem",
    }),
    placeholder: (provided) => ({ ...provided, color: "#6B7280" }),
    singleValue: (provided) => ({ ...provided, color: "#111827" }),
    multiValue: (provided) => ({ ...provided, backgroundColor: "#D1FAE5" }),
    multiValueLabel: (provided) => ({ ...provided, color: "#065F46" }),
    multiValueRemove: (provided) => ({
      ...provided,
      color: "#065F46",
      ":hover": { backgroundColor: "#10B981", color: "white" },
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
