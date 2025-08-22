import React from "react";

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  title: string;
  valid?: boolean;
  errorMessage?: string;
  labelClassName?: string;
};

export const Input: React.FC<InputProps> = ({
  title,
  valid = true,
  errorMessage,
  className,
  labelClassName,
  ...props
}) => {
  const forceLTR = () => {
    switch (props?.type) {
      case "email":
      case "password":
      case "tel":
        return true;
      default:
        return false;
    }
  };

  return (
    <div className="flex flex-col gap-2 w-full">
      {/* Label */}
      <label
        htmlFor={props.id || "input-field"}
        className={`text-sm font-medium ${
          valid ? "text-primary" : "text-danger"
        } ${labelClassName || ""}`}
      >
        {title}
      </label>

      {/* Input Field */}
      <input
        id={props.id || "input-field"}
        autoComplete="off"
        className={`peer border border-gray-300 bg-surface text-primary placeholder-text-muted py-2 px-4 rounded-lg outline-none w-full transition-all duration-200
          focus:border-accent focus:ring-2 focus:ring-accent/30
          ${!valid ? "border-danger focus:ring-danger/30" : ""}
          ${forceLTR() ? "[direction:ltr]" : ""}
          ${className || ""}
        `}
        {...props}
      />

      {/* Error Message */}
      {!valid && errorMessage && (
        <p className="text-danger text-xs mt-1">{errorMessage}</p>
      )}
    </div>
  );
};
