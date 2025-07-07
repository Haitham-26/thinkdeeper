import React from "react";

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  title: string;
  valid?: boolean;
  errorMessage?: string;
};

export const Input: React.FC<InputProps> = ({
  title,
  valid = true,
  errorMessage,
  ...props
}) => {
  return (
    <div>
      <div className="relative">
        <input
          type="text"
          id="name"
          placeholder=""
          autoComplete="off"
          className={`peer border-2 border-gray-200 py-2 px-5 rounded-full outline-none w-full text-white transition-all duration-300 ease-in-out ${
            !valid ? "border-red-700" : ""
          }`}
          {...props}
        />
        <label
          htmlFor="name"
          className={`absolute start-5 top-1/2 -translate-y-1/2 text-white peer-focus:top-0 peer-focus:text-sm peer-focus:bg-gray-700 peer-focus:px-1 ${
            props.value ? "!top-0 !text-sm !bg-gray-700 !px-1" : ""
          } pointer-events-none transition-all duration-300 ease-in-out ${
            !valid ? "!text-red-600" : ""
          }`}
        >
          {title}
        </label>
      </div>

      {!valid && errorMessage ? (
        <p className="text-red-600 text-xs mt-1 ps-5">{errorMessage}</p>
      ) : null}
    </div>
  );
};
