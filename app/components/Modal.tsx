"use client";

import React, { useEffect } from "react";
import { faXmark } from "@fortawesome/free-solid-svg-icons/faXmark";
import { Button } from "./Button";
import { createPortal } from "react-dom";

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
    const originalStyle = window.getComputedStyle(document.body).overflow;

    if (open) {
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = originalStyle;
    };
  }, [open]);

  if (!open) {
    return null;
  }

  const content = (
    <div
      className="fixed inset-0 flex items-center justify-center z-[100] px-4 animate-in fade-in duration-300"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-primary/40 backdrop-blur-md" />

      <div
        className="relative bg-surface w-full max-w-md rounded-[2.5rem] shadow-2xl border border-border overflow-hidden animate-in zoom-in-95 slide-in-from-bottom-4 duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bg-surface-muted/30 px-8 py-6 border-b border-border flex items-center justify-between">
          <h2 className="text-xl font-black text-text-primary truncate">
            {title}
          </h2>

          {onClose && (
            <Button
              onClick={onClose}
              icon={faXmark}
              className="w-10 h-10 flex items-center justify-center rounded-xl !bg-surface border !border-border !text-text-muted hover:!text-danger hover:!border-danger/20 hover:!bg-danger/5 transition-all duration-200 shadow-none"
            />
          )}
        </div>

        <div className="p-8 text-text-primary overflow-y-auto max-h-[80vh] custom-scrollbar">
          {children}
        </div>
      </div>
    </div>
  );

  return createPortal(content, document.body);
};
