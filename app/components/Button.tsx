import React from "react";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: string;
  loading?: boolean;
};

export const Button: React.FC<ButtonProps> = ({
  children,
  loading = false,
  className,
  ...props
}) => {
  return (
    <button
      className={`bg-white text-black py-2 px-5 mt-6 rounded-full hover:bg-gray-200 transition-colors duration-300 ease-in-out cursor-pointer ${
        loading || props.disabled ? "pointer-events- cursor-not-allowed" : ""
      } ${className}`}
      {...props}
      disabled={loading || props.disabled}
    >
      {loading ? (
        <div className="animate-spin border-2 border-gray-500 border-t-transparent rounded-full h-full aspect-square pointer-events-none mx-auto"></div>
      ) : (
        children
      )}
    </button>
  );
};
