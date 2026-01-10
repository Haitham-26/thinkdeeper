"use client";

import { Button } from "@/app/components/Button";
import { Input } from "@/app/components/Input";
import { Modal } from "@/app/components/Modal";
import { Client } from "@/tools/Client";
import { Toast } from "@/tools/Toast";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelopeOpenText } from "@fortawesome/free-solid-svg-icons/faEnvelopeOpenText";
import { faShield } from "@fortawesome/free-solid-svg-icons/faShield";

type SignUpTokenModalProps = {
  open: boolean;
  email: string;
};

export const SignUpTokenModal: React.FC<SignUpTokenModalProps> = ({
  open = false,
  email,
}) => {
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState("");

  const router = useRouter();

  const onSubmit = async () => {
    if (token.length < 4) {
      Toast.error("يرجى إدخال رمز التحقق بشكل صحيح");
      return;
    }

    try {
      setLoading(true);

      await Client("/auth/signup/token", {
        method: "POST",
        data: { email, token },
        withCredentials: true,
      });

      Toast.success("تم تفعيل حسابك بنجاح");
      router.push("/questions");
      router.refresh();
    } catch (e) {
      console.log(e);
      Toast.apiError(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal title="خطوة التفعيل الأخيرة" open={open}>
      <div className="flex flex-col items-center">
        <div className="w-20 h-20 bg-accent/10 text-accent rounded-3xl flex items-center justify-center mb-6">
          <FontAwesomeIcon icon={faEnvelopeOpenText} className="text-3xl" />
        </div>

        <div className="text-center mb-8">
          <p className="text-text-muted font-medium mb-1">
            لقد أرسلنا رمز التحقق إلى بريدك:
          </p>
          <p className="text-text-primary font-black dir-ltr">{email}</p>
        </div>

        <div className="w-full space-y-6">
          <Input
            title="رمز التحقق"
            placeholder="abc123"
            value={token}
            onChange={(e) => setToken(e.target.value)}
            maxLength={6}
            className="text-center text-2xl tracking-[0.5em] font-mono"
          />

          <Button
            onClick={onSubmit}
            loading={loading}
            variant="primary"
            className="w-full h-14 rounded-2xl shadow-xl shadow-accent/20"
            icon={faShield}
          >
            تفعيل الحساب
          </Button>
        </div>
      </div>
    </Modal>
  );
};
