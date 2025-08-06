import React, { useEffect } from "react";
import { Button } from "./Button";
import { faXmark } from "@fortawesome/free-solid-svg-icons/faXmark";

type ModalProps = {
  title: string;
  onClose?: VoidFunction;
  open: boolean;
  children?: React.ReactNode;
};

export const Modal: React.FC<ModalProps> = ({
  title,
  onClose,
  open,
  children,
}) => {
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [open]);

  if (!open) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 bg-black/70 flex items-center justify-center z-[100]"
      onClick={onClose}
    >
      <div
        className="bg-gray-700 rounded-xl shadow-lg w-full max-w-md p-6 mx-2"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between gap-2">
          <h2 className="text-xl font-bold text-white mb-2 text-ellipsis whitespace-nowrap overflow-hidden">
            {title}
          </h2>

          {typeof onClose === "function" ? (
            <Button
              onClick={onClose}
              icon={faXmark}
              className="!bg-transparent !p-0 text-white hover:text-gray-300"
            />
          ) : null}
        </div>

        {children}
      </div>
    </div>
  );
};
