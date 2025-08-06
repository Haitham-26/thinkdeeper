"use client";

import { Button } from "@/app/components/Button";
import { Input } from "@/app/components/Input";
import { Modal } from "@/app/components/Modal";
import { Client } from "@/tools/Client";
import { Toast } from "@/tools/Toast";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

type SignUpTokenModal = {
  open: boolean;
  email: string;
};

export const SignUpTokenModal: React.FC<SignUpTokenModal> = ({
  open = false,
  email,
}) => {
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState("");

  const router = useRouter();

  const onSubmit = async () => {
    try {
      setLoading(true);

      await Client("/auth/signup/token", {
        method: "POST",
        data: { email, token },
        withCredentials: true,
      });

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
    <Modal title="التحقق من البريد الإلكتروني" open={open}>
      <div className="flex flex-col gap-4">
        <div className="mt-3 mb-6">
          <p className="text-gray-100 text-sm mb-2">
            تم ارسال رابط التحقق الى {email}
          </p>
          <p className="text-gray-100 text-sm">
            يرجى التحقق من بريدك الإلكتروني
          </p>
        </div>

        <Input
          title="رمز التحقق"
          value={token}
          onChange={(e) => setToken(e.target.value)}
          maxLength={6}
        />

        <Button onClick={onSubmit} loading={loading} className="h-10">
          تحقق واستمرار
        </Button>
      </div>
    </Modal>
  );
};
