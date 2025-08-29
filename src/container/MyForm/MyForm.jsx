import React, { useEffect } from "react";
import { Textfield, SelectField, Button, Checkbox } from "../../components";
import { Formik, Form } from "formik";
import { formSchema } from "../../utils";
import { FiUser, FiMail, FiAlertCircle, FiPhone, FiCalendar } from "react-icons/fi";
import { FaGlobe, FaTools } from "react-icons/fa";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const MyForm = ({ skills, countries }) => {
    return (
        <Formik
            initialValues={{
                fullName: "",
                email: "",
                phone: "",
                dob: "",
                country: "", 
                skills: [], 
                skillsCheckbox: [],
            }}
            validationSchema={formSchema}
            onSubmit={(values, { resetForm }) => {
                console.log(values);
                toast.success("Form submitted successfully!");
                resetForm();
            }}
        >
            {({ values, errors, touched, setFieldValue, setFieldTouched, getFieldProps }) => {

                
                return (
                    <Form className="max-w-md mx-auto p-4 bg-white rounded shadow space-y-4">
                        {/* Full Name */}
                        <Textfield
                            label="Full Name"
                            name="fullName"
                            placeholder="Enter your full name"
                            icon={<FiUser />}
                            errorIcon={<FiAlertCircle />}
                            error={touched.fullName && errors.fullName}
                            {...getFieldProps("fullName")}
                        />

                        {/* Email */}
                        <Textfield
                            label="Email"
                            name="email"
                            type="email"
                            placeholder="Enter your email"
                            icon={<FiMail />}
                            errorIcon={<FiAlertCircle />}
                            error={touched.email && errors.email}
                            {...getFieldProps("email")}
                        />

                        {/* Phone */}
                        <Textfield
                            label="Phone"
                            name="phone"
                            type="tel"
                            placeholder="Enter your phone number"
                            icon={<FiPhone />}
                            errorIcon={<FiAlertCircle />}
                            error={touched.phone && errors.phone}
                            {...getFieldProps("phone")}
                        />

                        {/* Date of Birth */}
                        <Textfield
                            label="Date of Birth"
                            name="dob"
                            type="date"
                            placeholder="Select your DOB"
                            icon={<FiCalendar />}
                            errorIcon={<FiAlertCircle />}
                            error={touched.dob && errors.dob}
                            {...getFieldProps("dob")}
                        />

                        {/* Country */}
                        <SelectField
                            label="Country"
                            name="country"
                            value={countries.find((c) => c.value === values.country) || null}
                            onChange={(val) => setFieldValue("country", val?.value || "")}
                            onBlur={() => setFieldTouched("country", true)}
                            options={countries}
                            placeholder="Select a country"
                        />

                        {/* Skills Multi-Select */}
                        <SelectField
                            label="Skills"
                            name="skills"
                            value={skills.filter((s) => values.skills.includes(s.value))} // map values to objects
                            onChange={(vals) =>
                                setFieldValue(
                                    "skills",
                                    Array.isArray(vals) ? vals.map((v) => v.value) : []
                                )
                            }
                            onBlur={() => setFieldTouched("skills", true)}
                            options={skills}
                            isMulti
                            placeholder="Select skills"
                        />

                        {/* Skills Checkbox */}
                        <div className="grid grid-cols-3 gap-2">
                            {skills.map((skill) => (
                                <Checkbox
                                    key={skill.value}
                                    label={skill.label}
                                    value={skill.value}
                                    checked={values.skillsCheckbox.includes(skill.value)}
                                    onChange={() => {
                                        const updated = values.skillsCheckbox.includes(skill.value)
                                            ? values.skillsCheckbox.filter((s) => s !== skill.value)
                                            : [...values.skillsCheckbox, skill.value];

                                        setFieldValue("skillsCheckbox", updated);

                                        setFieldTouched("skillsCheckbox", true);
                                    }}
                                />
                            ))}
                        </div>

                        {/* Error message */}
                        {touched.skillsCheckbox &&
                            values.skillsCheckbox.length === 0 &&
                            errors.skillsCheckbox && (
                                <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                                    <FiAlertCircle /> {errors.skillsCheckbox}
                                </p>
                            )}

                        {/* Submit */}
                        <div className="pt-4">
                            <Button
                                type="submit"
                                className="w-full px-4 py-2 bg-emerald-500 text-white rounded hover:bg-emerald-600"
                            >
                                Submit
                            </Button>
                        </div>
                    </Form>
                );
            }}
        </Formik>
    );
};

export default MyForm;
