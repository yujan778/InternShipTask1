import React from "react";

const Button = ({
    children,
    onClick,
    type = "button",
    className = "",
    variant = "default",
    count,
    ...props
}) => {
    const baseClasses =
        " py-2 px-4 rounded font-medium transition duration-200 flex items-center justify-center gap-2";

    const variants = {
        default: "bg-blue-600 text-white hover:bg-blue-700",
        outline: "border border-gray-400 text-gray-700 bg-white hover:bg-gray-100",
        destructive: "bg-red-600 text-white hover:bg-red-700",
    };

    return (
        <button
            type={type}
            onClick={onClick}
            className={`${baseClasses} ${variants[variant]} ${className}`}
            {...props}
        >
            {children}
            {typeof count === "number" && count > 0 && (
                <span
                    className={`
      text-xs font-semibold px-2 py-0.5 rounded-full
      ${variant === "destructive" ? "bg-white text-red-600" : ""}
      ${variant === "default" ? "bg-white text-blue-600" : ""}
      ${variant === "outline" ? "bg-gray-200 text-gray-700" : ""}
    `}
                >
                    {count}
                </span>
            )}
        </button>
    );
};

export default Button;
