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
    <div className="flex flex-col gap-2">
      <label
        htmlFor="name"
        className={`text-white/90 ${
          !valid ? "!text-red-600" : ""
        } ${labelClassName}`}
      >
        {title}
      </label>

      <input
        type="text"
        id="name"
        placeholder=""
        autoComplete="off"
        className={`peer border-2 border-gray-200 py-2 px-5 rounded-full outline-none w-full text-white transition-all duration-300 ease-in-out ${className} ${
          !valid ? "border-red-700" : ""
        } ${forceLTR() ? "[direction:ltr]" : ""}`}
        {...props}
      />

      {!valid && errorMessage ? (
        <p className="text-red-600 text-xs mt-1 ps-5">{errorMessage}</p>
      ) : null}
    </div>
  );
};
