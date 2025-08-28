import { useState } from "react";
import { validateField } from "../utils/index";

export const useFormValidation = (initialValues) => {
  const [form, setForm] = useState(initialValues);
  const [errors, setErrors] = useState({});

  const handleChange = (name, value) => {
    setForm({ ...form, [name]: value });
  };

  const handleBlur = (name) => {
    const error = validateField(name, form[name], form);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const validateForm = () => {
    const newErrors = {};
    Object.keys(form).forEach((key) => {
      const error = validateField(key, form[key], form);
      if (error) newErrors[key] = error;
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return { form, errors, handleChange, handleBlur, validateForm, setForm };
};
