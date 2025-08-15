"use client";

import React, { useState } from "react";
import { AuthFormContainer } from "../../_components/AuthFormContainer";
import { Input } from "@/app/components/Input";
import Link from "next/link";
import { Controller, useForm } from "react-hook-form";
import { Client } from "@/tools/Client";
import { Button } from "@/app/components/Button";
import { SignUpDto } from "@/model/auth/signup/SignUpDto";
import { Toast } from "@/tools/Toast";
import { SignUpTokenModal } from "./SignUpTokenModal";

export const SignUpContent: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [verificationModalVisible, setVerificationModalVisible] =
    useState(false);
  const [email, setEmail] = useState("");

  const { control, handleSubmit, getValues } = useForm<SignUpDto>({
    defaultValues: { name: "", email: "", password: "" },
  });

  const onSubmit = async () => {
    try {
      setLoading(true);

      const dto = getValues();

      await Client("/auth/signup/email", {
        method: "POST",
        data: dto,
        withCredentials: true,
      });

      setEmail(dto.email);

      setVerificationModalVisible(true);

      Toast.success("تم ارسال رمز التحقق إلى بريدك الإلكتروني");
    } catch (e: any) {
      console.log(e);
      Toast.apiError(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthFormContainer title="إنشاء حساب">
      <Controller
        control={control}
        name="name"
        render={({ field: { value, onChange }, fieldState: { error } }) => (
          <Input
            title="الاسم"
            value={value}
            onChange={onChange}
            valid={!error}
            errorMessage={error?.message}
          />
        )}
      />

      <Controller
        control={control}
        name="email"
        render={({ field: { value, onChange }, fieldState: { error } }) => (
          <Input
            title="البريد الإلكتروني"
            value={value}
            onChange={onChange}
            valid={!error}
            errorMessage={error?.message}
            type="email"
          />
        )}
      />

      <Controller
        control={control}
        name="password"
        render={({ field: { value, onChange }, fieldState: { error } }) => (
          <Input
            title="كلمة المرور"
            value={value}
            onChange={onChange}
            valid={!error}
            errorMessage={error?.message}
            type="password"
          />
        )}
      />

      <div className="flex flex-col gap-2 mt-4">
        <Button
          loading={loading}
          onClick={handleSubmit(onSubmit)}
          className="h-10"
        >
          إنشاء حساب
        </Button>

        <Link
          href="/auth/login"
          className="mt-1 ps-5 text-slate-300 hover:text-slate-100 transition-colors duration-300 ease-in-out block text-center py-2 px-5"
        >
          لديك حساب بالفعل؟
        </Link>
      </div>

      <SignUpTokenModal open={verificationModalVisible} email={email} />
    </AuthFormContainer>
  );
};
