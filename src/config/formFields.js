import { FiUser, FiMail, FiPhone, FiCalendar } from "react-icons/fi";

export const textFields = [
    {
        name: "fullName",
        label: "Full Name",
        placeholder: "Enter your full name",
        type: "text",
        icon: FiUser,
    },
    {
        name: "email",
        label: "Email",
        placeholder: "Enter your email",
        type: "email",
        icon: FiMail,
    },
    {
        name: "phone",
        label: "Phone",
        placeholder: "Enter your phone number",
        type: "tel",
        icon: FiPhone,
    },
    {
        name: "dob",
        label: "Date of Birth",
        placeholder: "Select your DOB",
        type: "date",
        icon: FiCalendar,
    },
];

export const selectFields = [
  {
    name: "country",
    label: "Country",
    placeholder: "Select a country",
    isMulti: false,
    optionsKey: "countries",
  },
  {
    name: "skills",
    label: "Skills",
    placeholder: "Select skills",
    isMulti: true,
    optionsKey: "skills",
  },
];


export const checkboxFields = [
  {
    name: "skillsCheckbox",
    label: "Skills",
    optionsKey: "skills",
  },
];
