"use client";

import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { faXmark } from "@fortawesome/free-solid-svg-icons/faXmark";
import { Button } from "./Button";

type Props = {
  open: boolean;
  onClose: VoidFunction;
  title?: string | React.ReactNode;
  children?: React.ReactNode;
};

export const Drawer: React.FC<Props> = ({
  open = false,
  onClose,
  title,
  children,
}) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  if (!mounted) {
    return null;
  }

  return createPortal(
    <div
      className={`fixed inset-0 z-[100] transition-visibility duration-300 ${
        open ? "visible" : "invisible"
      }`}
    >
      <div
        className={`absolute inset-0 bg-primary/40 backdrop-blur-sm transition-opacity duration-300 ${
          open ? "opacity-100" : "opacity-0"
        }`}
        onClick={onClose}
      />

      <div
        className={`absolute right-0 top-0 h-full w-[350px] bg-primary shadow-2xl transition-transform duration-300 ease-out flex flex-col ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between gap-2 p-4 border-b border-border/50">
          <span className="text-xl font-black text-text-primary">
            {title || "القائمة"}
          </span>
          <Button
            onClick={onClose}
            icon={faXmark}
            className="w-6 h-6 !p-5 !bg-transparent !text-white shadow-none"
          />
        </div>

        <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
          {children}
        </div>

        <div className="p-4 border-t border-border/50">
          <p className="text-[10px] text-center font-bold text-text-muted uppercase tracking-widest">
            جميع الحقوق محفوظة © بصراحة
          </p>
        </div>
      </div>
    </div>,
    document.body,
  );
};
