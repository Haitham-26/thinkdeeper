import React from "react";
import { Icon } from "./Icon";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons/faInfoCircle";

type Props = {
  children: React.ReactNode;
};

export const Info: React.FC<Props> = ({ children }) => {
  return (
    <div className="flex items-center gap-3 bg-warning/5 border border-warning text-warning rounded-2xl px-4 py-2 ">
      <Icon icon={faInfoCircle} className="text-warning" size="lg" />

      {children}
    </div>
  );
};
