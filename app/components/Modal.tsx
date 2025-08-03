import React, { useEffect } from "react";

type ModalProps = {
  title: string;
  onClose: VoidFunction;
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
      className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-gray-700 rounded-xl shadow-lg w-full max-w-md p-6 mx-2"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl font-bold text-white mb-2 text-ellipsis whitespace-nowrap overflow-hidden">
          {title}
        </h2>

        {children}
      </div>
    </div>
  );
};
