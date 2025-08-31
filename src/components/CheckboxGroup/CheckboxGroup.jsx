import React from "react";
import { useField } from "formik";
import {Checkbox} from "../index"; 

const CheckboxGroup = ({ name, label, options }) => {
  const [field, , helpers] = useField(name);

  const handleChange = (value) => {
    const updated = field.value.includes(value)
      ? field.value.filter((v) => v !== value)
      : [...field.value, value];
    helpers.setValue(updated);
  };

  return (
    <div>
      {label && <label className="block text-sm font-medium mb-1">{label}</label>}
      <div className="grid grid-cols-3 gap-2">
        {options.map((option) => (
          <Checkbox
            key={option.value}
            label={option.label}
            checked={field.value.includes(option.value)}
            onChange={() => handleChange(option.value)}
          />
        ))}
      </div>
    </div>
  );
};

export default CheckboxGroup;