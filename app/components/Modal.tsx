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
    document.body.style.overflow = open ? "hidden" : "unset";
  }, [open]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[100] px-4"
      onClick={onClose}
    >
      <div
        className="bg-surface rounded-2xl shadow-lg w-full max-w-md p-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between gap-2 mb-6">
          <h2 className="text-xl font-bold text-primary truncate">{title}</h2>

          {onClose && (
            <Button
              onClick={onClose}
              icon={faXmark}
              className="!bg-transparent !p-0 text-text-muted hover:text-accent transition-colors"
            />
          )}
        </div>

        {/* Body */}
        <div className="text-primary">{children}</div>
      </div>
    </div>
  );
};
