"use client";

import React from "react";
import { Button } from "./Button";
import { Toast } from "@/tools/Toast";

type Props = {
  text: string;
  className?: string;
};

export const CopyButton: React.FC<Props> = ({ text, className = "" }) => {
  const copy = () => {
    navigator.clipboard.writeText(text);
    Toast.success("تم النسخ بنجاح");
  };

  return (
    <Button className={`shadow-none shrink-0 ${className}`} onClick={copy}>
      نسخ
    </Button>
  );
};
