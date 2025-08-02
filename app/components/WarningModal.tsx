import React, { useEffect } from "react";
import { Button } from "./Button";

type WarningModalProps = {
  title?: string;
  description?: string;
  onConfirm: VoidFunction;
  onClose: VoidFunction;
  open: boolean;
  loading?: boolean;
};

export const WarningModal: React.FC<WarningModalProps> = ({
  title = "هل أنت متأكد؟",
  description = "بمجرد التأكيد، لن تتمكن من التراجع عن هذا الإجراء لاحقًا",
  onConfirm,
  onClose,
  open,
  loading = false,
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
        <p className="text-gray-300 mb-8">{description}</p>
        <div className="flex justify-end gap-3">
          <Button
            onClick={onClose}
            className="rounded-md !bg-transparent border border-white hover:filter hover:brightness-90 text-white h-10 w-20"
          >
            إلغاء
          </Button>
          <Button
            onClick={onConfirm}
            loading={loading}
            className="rounded-md bg-white hover:bg-gray-200 text-gray-800 h-10 w-20"
          >
            تأكيد
          </Button>
        </div>
      </div>
    </div>
  );
};
