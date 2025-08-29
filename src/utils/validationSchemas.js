import * as Yup from "yup";
export const formSchema = Yup.object({
    fullName: Yup.string()
        .required("Full Name is required")
        .min(2, "Full Name must be at least 2 characters"),

    email: Yup.string()
        .required("Email is required")
        .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Invalid email address"),

    phone: Yup.string()
        .required("Phone number is required")
        .matches(/^\d+$/, "Phone number must contain only digits")
        .min(10, "Phone number must be at least 10 digits")
        .max(15, "Phone number cannot exceed 15 digits"),

    dob: Yup.date()
        .required("Date of Birth is required")
        .max(new Date(), "DOB cannot be in the future"),

    country: Yup.string().required("Country is required"),

    skills: Yup.array().min(1, "Please select at least one skill"),

    skillsCheckbox: Yup.array().min(1, "Please select at least one skill"),
});
