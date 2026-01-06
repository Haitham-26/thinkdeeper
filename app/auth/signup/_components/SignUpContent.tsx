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
import {
  faArrowRightToBracket,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";
import { Icon } from "@/app/components/Icon";

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
    <AuthFormContainer
      title="انضم إلينا"
      subtitle="أنشئ حسابك وابدأ في استقبال المصارحات من أصدقائك"
    >
      <div className="space-y-1">
        <Controller
          control={control}
          name="name"
          render={({ field: { value, onChange }, fieldState: { error } }) => (
            <Input
              title="الاسم الكامل"
              placeholder="مثال: أحمد محمد"
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
              placeholder="name@example.com"
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
              placeholder="••••••••"
              value={value}
              onChange={onChange}
              valid={!error}
              errorMessage={error?.message}
              type="password"
            />
          )}
        />
      </div>

      <div className="flex flex-col gap-4 mt-6">
        <Button
          loading={loading}
          onClick={handleSubmit(onSubmit)}
          className="w-full h-14 rounded-2xl bg-accent text-white font-bold text-lg shadow-lg shadow-accent/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3"
        >
          <span>إنشاء حساب جديد</span>
          <Icon icon={faUserPlus} className="text-sm" />
        </Button>

        <div className="relative flex items-center py-2">
          <div className="flex-grow border-t border-border"></div>
          <span className="flex-shrink mx-4 text-text-muted text-sm">أو</span>
          <div className="flex-grow border-t border-border"></div>
        </div>

        <Link
          href="/auth/login"
          className="group text-center py-4 px-5 rounded-2xl border-2 border-transparent hover:border-border hover:bg-surface-muted transition-all duration-300"
        >
          <span className="text-text-muted font-medium">
            لديك حساب بالفعل؟{" "}
          </span>
          <span className="text-accent font-bold group-hover:underline inline-flex items-center gap-2">
            تسجيل الدخول
            <Icon icon={faArrowRightToBracket} className="text-xs rotate-180" />
          </span>
        </Link>
      </div>

      <SignUpTokenModal open={verificationModalVisible} email={email} />
    </AuthFormContainer>
  );
};
