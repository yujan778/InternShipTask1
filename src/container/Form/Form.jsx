import React, { useState } from "react";
import { Textfield, SelectField, Button, Checkbox } from "../../components";
import { validateField } from "../../utils/validation";

import { FiUser, FiMail, FiAlertCircle } from "react-icons/fi";
import { FaGlobe, FaTools } from "react-icons/fa";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Form = ({ skills, countries }) => {
    const [form, setForm] = useState({
        fullName: "",
        email: "",
        country: null,
        skills: [], // for multi-select
        skillsCheckbox: [], // for checkboxes
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSelectChange = (name, value) => {
        setForm({ ...form, [name]: value });
    };

    // Checkbox change handler
    const handleCheckboxChange = (skillValue) => {
        setForm((prev) => {
            const skillsCheckbox = prev.skillsCheckbox.includes(skillValue)
                ? prev.skillsCheckbox.filter((s) => s !== skillValue)
                : [...prev.skillsCheckbox, skillValue];
            return { ...prev, skillsCheckbox };
        });
    };

    const handleBlur = (name) => {
        const error = validateField(name, form[name]);
        setErrors((prev) => ({ ...prev, [name]: error }));
    };

    const handleFocus = (name) => {
        setErrors((prev) => {
            const newErrors = { ...prev };
            delete newErrors[name];
            return newErrors;
        });
    };

    const validateForm = () => {
        const newErrors = {};
        Object.keys(form).forEach((key) => {
            const error = validateField(key, form[key]);
            if (error) newErrors[key] = error;
        });
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            console.log("Form Submitted:", form);
            toast.success("Form Submitted Successfully!");
            setForm({
                fullName: "",
                email: "",
                country: null,
                skills: [],
                skillsCheckbox: [],
            });
            setErrors({});
        } else {
            toast.error("Please fix the errors before submitting.");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 bg-white rounded shadow">
            <Textfield
                label="Full Name"
                name="fullName"
                value={form.fullName}
                onChange={handleChange}
                onBlur={() => handleBlur("fullName")}
                onFocus={() => handleFocus("fullName")}
                placeholder="Enter your full name"
                icon={<FiUser />}
                errorIcon={<FiAlertCircle />}
                error={errors.fullName}
            />

            <Textfield
                label="Email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                onBlur={() => handleBlur("email")}
                onFocus={() => handleFocus("email")}
                placeholder="Enter your email"
                icon={<FiMail />}
                errorIcon={<FiAlertCircle />}
                error={errors.email}
            />

            <SelectField
                label="Country"
                name="country"
                value={form.country}
                onChange={handleSelectChange}
                onBlur={() => handleBlur("country")}
                onFocus={() => handleFocus("country")}
                options={countries}
                placeholder="Select a country"
                icon={<FaGlobe />}
                errorIcon={<FiAlertCircle />}
                error={errors.country}
            />

            <SelectField
                label="Skills"
                name="skills"
                value={form.skills}
                onChange={handleSelectChange}
                onBlur={() => handleBlur("skills")}
                onFocus={() => handleFocus("skills")}
                options={skills}
                isMulti
                isSearchable
                placeholder="Select skills"
                icon={<FaTools />}
                errorIcon={<FiAlertCircle />}
                error={errors.skills}
            />

            <div className="mt-4">
                <label className="block font-medium mb-2">Skills (Checkbox)</label>
                <div className="grid grid-cols-3 gap-2">
                    {skills.map((skill) => (
                        <Checkbox
                            key={skill.value}
                            label={skill.label}
                            value={skill.value}
                            checked={form.skillsCheckbox.includes(skill.value)}
                            onChange={() => handleCheckboxChange(skill.value)}
                        />
                    ))}
                </div>
            </div>

            <div className="pt-6">
                <Button
                    type="submit"
                    className="w-full mt-4 px-4 py-2 bg-emerald-500 text-white rounded hover:bg-emerald-600"
                >
                    Submit
                </Button>
            </div>
        </form>
    );
};

export default Form;
