import React from "react";
import { Button } from "./Button";
import { Modal } from "./Modal";

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
  return (
    <Modal open={open} onClose={onClose} title={title}>
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
    </Modal>
  );
};
