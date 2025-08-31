import React, { useEffect } from "react";
import { Formik, Form } from "formik";
import { FiUser, FiMail, FiAlertCircle, FiPhone, FiCalendar } from "react-icons/fi";
import { FaGlobe, FaTools } from "react-icons/fa";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { formSchema } from "../../utils";
import { Textfield, SelectField, Button, CheckboxGroup } from "../../components";
import { selectFields, textFields, checkboxFields } from "../../config/formFields";

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
                        {textFields.map((field) => (
                            <Textfield
                                key={field.name}
                                {...field}
                                errorIcon={FiAlertCircle}
                                error={touched[field.name] && errors[field.name]}
                                {...getFieldProps(field.name)}
                            />
                        ))}

                        {selectFields.map((field) => {
                            const options = field.optionsKey === "countries" ? countries : skills;

                            return (
                                <SelectField
                                    key={field.name}
                                    name={field.name}
                                    label={field.label}
                                    placeholder={field.placeholder}
                                    options={options}
                                    isMulti={field.isMulti}
                                    value={
                                        field.isMulti
                                            ? options.filter((o) =>
                                                  values[field.name].includes(o.value)
                                              )
                                            : options.find((o) => o.value === values[field.name]) ||
                                              null
                                    }
                                    onChange={(val) =>
                                        setFieldValue(
                                            field.name,
                                            field.isMulti
                                                ? (val || []).map((v) => v.value)
                                                : val?.value || ""
                                        )
                                    }
                                    onBlur={() => setFieldTouched(field.name, true)}
                                />
                            );
                        })}

                        {checkboxFields.map((field) => {
                            const options = field.optionsKey === "skills" ? skills : countries;
                            return (
                                <CheckboxGroup
                                    key={field.name}
                                    name={field.name}
                                    label={field.label}
                                    options={options}
                                />
                            );
                        })}

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
