"use client";

import React, { useState } from "react";
import { AuthFormContainer } from "../../_components/AuthFormContainer";
import { Input } from "@/app/components/Input";
import Link from "next/link";
import { Controller, useForm } from "react-hook-form";
import { Button } from "@/app/components/Button";
import { SignUpDto } from "@/model/auth/signup/SignUpDto";
import { Toast } from "@/tools/Toast";
import { SignUpTokenModal } from "./SignUpTokenModal";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons/faUserPlus";

import { Icon } from "@/app/components/Icon";
import { NextClient } from "@/tools/NextClient";
import { GoogleLoginButton } from "@/app/components/GoogleLoginButton";
import { Info } from "@/app/components/Info";

const disabledInputClass = `
    !bg-white/[0.03] !border-white/10 !rounded-2xl !h-14 
    !text-slate-400 placeholder:!text-slate-600 
    !shadow-none cursor-not-allowed opacity-60
  `;

export const SignUpContent: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [verificationModalVisible, setVerificationModalVisible] =
    useState(false);
  const [email, setEmail] = useState("");

  const { control, handleSubmit, getValues } = useForm<SignUpDto>({
    defaultValues: { username: "", name: "", email: "", password: "" },
  });

  const onSubmit = async () => {
    try {
      setLoading(true);
      const dto = getValues();

      await NextClient("/auth/signup/email", {
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
      <Info>
        التسجيل باستخدام البريد الإلكتروني وكلمة المرور غير متوفر بعد لأسباب
        تقنية، يرجى التسجيل باستخدام جوجل في الأسفل.
      </Info>

      <div className="flex flex-col gap-4 opacity-50">
        <Controller
          control={control}
          name="username"
          rules={{ required: "اسم المستخدم مطلوب" }}
          render={({ field: { value, onChange }, fieldState: { error } }) => (
            <Input
              title="اسم المستخدم"
              placeholder="مثال: ahmad_mohamad"
              value={value}
              onChange={onChange}
              valid={!error}
              errorMessage={error?.message}
              required
              disabled
              className={disabledInputClass}
              labelClassName="!text-slate-300 !font-black !text-xs !uppercase !tracking-widest"
            />
          )}
        />

        <Controller
          control={control}
          name="name"
          rules={{ required: "الاسم الكامل مطلوب" }}
          render={({ field: { value, onChange }, fieldState: { error } }) => (
            <Input
              title="الاسم الكامل"
              placeholder="مثال: أحمد محمد"
              value={value}
              onChange={onChange}
              valid={!error}
              errorMessage={error?.message}
              required
              disabled
              className={disabledInputClass}
              labelClassName="!text-slate-300 !font-black !text-xs !uppercase !tracking-widest"
            />
          )}
        />

        <Controller
          control={control}
          name="email"
          rules={{ required: "البريد الإلكتروني مطلوب" }}
          render={({ field: { value, onChange }, fieldState: { error } }) => (
            <Input
              title="البريد الإلكتروني"
              placeholder="name@example.com"
              value={value}
              onChange={onChange}
              valid={!error}
              errorMessage={error?.message}
              type="email"
              required
              disabled
              className={disabledInputClass}
              labelClassName="!text-slate-300 !font-black !text-xs !uppercase !tracking-widest"
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
              required
              type="password"
              disabled
              className={disabledInputClass}
              labelClassName="!text-slate-300 !font-black !text-xs !uppercase !tracking-widest"
            />
          )}
        />
      </div>

      <div className="flex flex-col gap-4 mt-6">
        <Button
          loading={loading}
          onClick={handleSubmit(onSubmit)}
          className="w-full h-14 rounded-2xl bg-accent text-white font-bold text-lg shadow-lg shadow-accent/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3"
          disabled
        >
          <span>إنشاء حساب جديد</span>
          <Icon icon={faUserPlus} className="text-sm" />
        </Button>

        <div className="relative flex items-center py-4">
          <div className="flex-grow border-t border-white/10"></div>
          <span className="flex-shrink mx-4 text-slate-500 text-[10px] font-black uppercase tracking-[0.3em]">
            أو المتابعة عبر
          </span>
          <div className="flex-grow border-t border-white/10"></div>
        </div>

        <GoogleLoginButton title="تسجيل باستخدام جوجل" />

        <Link
          href="/auth/login"
          className="group text-center py-5 px-5 rounded-[2rem] bg-white/[0.02] border border-white/5 hover:bg-white/10 hover:border-white/20 transition-all duration-500"
        >
          <span className="text-slate-400 font-medium">لديك حساب بالفعل؟ </span>
          <span className="text-accent font-black group-hover:underline decoration-accent decoration-2 underline-offset-4">
            تسجيل الدخول
          </span>
        </Link>
      </div>

      <SignUpTokenModal open={verificationModalVisible} email={email} />
    </AuthFormContainer>
  );
};
