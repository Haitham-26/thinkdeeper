"use client";

import React from "react";
import { Button } from "./Button";
import { Modal } from "./Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons/faTriangleExclamation";

type WarningModalProps = {
  title?: string;
  description?: string;
  onConfirm: VoidFunction;
  onClose: VoidFunction;
  open: boolean;
  loading?: boolean;
  confirmText?: string;
  cancelText?: string;
};

export const WarningModal: React.FC<WarningModalProps> = ({
  title = "هل أنت متأكد؟",
  description = "بمجرد التأكيد، لن تتمكن من التراجع عن هذا الإجراء لاحقًا.",
  onConfirm,
  onClose,
  open,
  loading = false,
  confirmText = "تأكيد",
  cancelText = "إلغاء",
}) => {
  return (
    <Modal open={open} onClose={onClose} title={title}>
      <div className="flex flex-col items-center text-center">
        <div className="w-20 h-20 bg-danger/10 text-danger rounded-[2rem] flex items-center justify-center mb-6 animate-pulse">
          <FontAwesomeIcon icon={faTriangleExclamation} className="text-4xl" />
        </div>

        <p className="text-text-muted leading-relaxed mb-10 text-lg font-medium">
          {description}
        </p>

        <div className="flex gap-3 w-full">
          <Button
            onClick={onConfirm}
            loading={loading}
            variant="primary"
            className="flex-1 !bg-danger hover:!bg-danger/90 shadow-danger/20 h-14 rounded-2xl"
          >
            {confirmText}
          </Button>

          <Button
            onClick={onClose}
            variant="outline"
            className="flex-1 h-14 rounded-2xl border-border text-text-muted hover:bg-surface-muted"
          >
            {cancelText}
          </Button>
        </div>
      </div>
    </Modal>
  );
};
