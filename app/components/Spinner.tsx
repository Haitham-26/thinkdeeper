import React from "react";
import { Icon } from "./Icon";
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons/faCircleNotch";

type Props = {
  className?: string;
};

export const Spinner: React.FC<Props> = ({ className = "" }) => {
  return (
    <div
      className={`absolute inset-0 flex items-center justify-center bg-inherit ${className}`}
    >
      <Icon icon={faCircleNotch} className="animate-spin text-xl" />
    </div>
  );
};
