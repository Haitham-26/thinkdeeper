import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children?: React.ReactNode;
  loading?: boolean;
  icon?: IconProp;
};

export const Button: React.FC<ButtonProps> = ({
  children,
  loading = false,
  className,
  icon,
  ...props
}) => {
  return (
    <button
      className={`bg-white text-black py-2 px-5 rounded-full hover:bg-gray-200 transition-colors duration-300 ease-in-out cursor-pointer ${
        loading || props.disabled ? "pointer-events- cursor-not-allowed" : ""
      } ${className}`}
      {...props}
      disabled={loading || props.disabled}
    >
      {loading ? (
        <div className="animate-spin border-2 border-gray-500 border-t-transparent rounded-full h-full aspect-square pointer-events-none mx-auto"></div>
      ) : (
        <div className="flex items-center justify-center gap-2">
          {children}
          {icon ? <FontAwesomeIcon icon={icon} /> : null}
        </div>
      )}
    </button>
  );
};
