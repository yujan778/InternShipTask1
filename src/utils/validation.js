// validation.js
export const validateField = (name, value) => {
  switch (name) {
    case "fullName":
      if (!value.trim()) return "Full Name is required";
      return "";

    case "email":
      if (!value.trim()) return "Email is required";
      if (!/\S+@\S+\.\S+/.test(value)) return "Email is invalid";
      return "";

    case "country":
      if (!value) return "Country is required";
      return "";

    case "skills":
      if (!value || !value.length) return "At least one skill is required";
      return "";

    default:
      return "";
  }
};
