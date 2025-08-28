import React from "react";

const ErrorMessage = ({ message }) => {
    if (!message) return null;

    return <span className="text-red-500 mt-1 text-sm">{message}</span>;
};

export default ErrorMessage;
