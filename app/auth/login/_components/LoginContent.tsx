"use client";

import React, { useState } from "react";
import { AuthFormContainer } from "../../_components/AuthFormContainer";
import { Input } from "@/app/components/Input";
import Link from "next/link";
import { Controller, useForm } from "react-hook-form";
import { LoginDto } from "@/model/auth/login/LoginDto";
import { Button } from "@/app/components/Button";
import { useRouter } from "next/navigation";
import { Toast } from "@/tools/Toast";
import { faArrowRightToBracket } from "@fortawesome/free-solid-svg-icons/faArrowRightToBracket";
import { NextClient } from "@/tools/NextClient";
import { GoogleLoginButton } from "@/app/components/GoogleLoginButton";
import { Info } from "@/app/components/Info";

const disabledInputClass = `
    !bg-white/[0.03] !border-white/10 !rounded-2xl !h-14 
    !text-slate-400 placeholder:!text-slate-600 
    !shadow-none cursor-not-allowed opacity-60
  `;

export const LoginContent: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const { control, handleSubmit, getValues } = useForm<LoginDto>({
    defaultValues: { identifier: "", password: "" },
  });

  const onSubmit = async () => {
    try {
      setLoading(true);
      const dto = getValues();

      await NextClient("/auth/login", {
        method: "POST",
        data: dto,
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
    <AuthFormContainer title="تسجيل الدخول">
      <Info>
        تسجيل الدخول باستخدام البريد الإلكتروني وكلمة المرور غير متوفر بعد
        لأسباب تقنية، يرجى تسجيل الدخول باستخدام جوجل في الأسفل.
      </Info>

      <div className="space-y-4">
        <Controller
          control={control}
          name="identifier"
          render={({ field: { value, onChange }, fieldState: { error } }) => (
            <Input
              title="البريد الإلكتروني أو اسم المستخدم"
              placeholder="name@example.com / abc123"
              value={value}
              onChange={onChange}
              valid={!error}
              errorMessage={error?.message}
              className={disabledInputClass}
              labelClassName="!text-slate-300 !font-black !text-xs !uppercase !tracking-widest"
              required
              disabled
            />
          )}
        />

        <div className="space-y-1">
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
                className={disabledInputClass}
                labelClassName="!text-slate-300 !font-black !text-xs !uppercase !tracking-widest"
                required
                disabled
              />
            )}
          />
        </div>
      </div>

      <div className="flex flex-col gap-4 mt-6">
        <Button
          loading={loading}
          onClick={handleSubmit(onSubmit)}
          className="w-full h-14 rounded-2xl bg-accent text-white font-bold text-lg shadow-lg shadow-accent/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3"
          icon={faArrowRightToBracket}
          disabled
        >
          تسجيل الدخول
        </Button>

        <div className="relative flex items-center py-4">
          <div className="flex-grow border-t border-white/10"></div>
          <span className="flex-shrink mx-4 text-slate-500 text-[10px] font-black uppercase tracking-[0.3em]">
            أو المتابعة عبر
          </span>
          <div className="flex-grow border-t border-white/10"></div>
        </div>

        <GoogleLoginButton title="تسجيل دخول باستخدام جوجل" />

        <Link
          href="/auth/signup"
          className="group text-center py-5 px-5 rounded-[2rem] bg-white/[0.02] border border-white/5 hover:bg-white/10 hover:border-white/20 transition-all duration-500"
        >
          <span className="text-slate-400 font-medium">ليس لديك حساب؟ </span>
          <span className="text-accent font-black group-hover:underline decoration-accent decoration-2 underline-offset-4">
            أنشئ حساباً الآن
          </span>
        </Link>
      </div>
    </AuthFormContainer>
  );
};
