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
    <AuthFormContainer
      title="مرحباً بعودتك"
      subtitle="سجل دخولك لمتابعة المصارحات والرسائل الجديدة"
    >
      <Info>
        تسجيل الدخول باستخدام البريد الإلكتروني وكلمة المرور غير متوفر بعد
        لأسباب تقنية، يرجى تسجيل الدخول باستخدام جوجل.
      </Info>

      <div className="space-y-4 opacity-50">
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
                required
                disabled
              />
            )}
          />
          {/* <div className="flex justify-end px-1">
            <Link
              href="/auth/forgot-password"
              className="text-sm font-medium text-accent hover:text-accent/80 transition-colors"
            >
              نسيت كلمة المرور؟
            </Link>
          </div> */}
        </div>
      </div>

      <div className="flex flex-col gap-4 mt-6">
        <Button
          loading={loading}
          onClick={handleSubmit(onSubmit)}
          className="w-full h-14 rounded-2xl bg-accent text-white font-bold text-lg shadow-lg shadow-accent/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
          icon={faArrowRightToBracket}
          disabled
        >
          تسجيل الدخول
        </Button>

        <div className="relative flex items-center py-2">
          <div className="flex-grow border-t border-border"></div>
          <span className="flex-shrink mx-4 text-text-muted text-sm">أو</span>
          <div className="flex-grow border-t border-border"></div>
        </div>

        <GoogleLoginButton title="تسجيل دخول باستخدام جوجل" />

        <Link
          href="/auth/signup"
          className="group text-center py-4 px-5 rounded-2xl border-2 border-transparent hover:border-border hover:bg-surface-muted transition-all duration-300"
        >
          <span className="text-text-muted font-medium">ليس لديك حساب؟ </span>
          <span className="text-accent font-bold group-hover:underline">
            أنشئ حساباً الآن
          </span>
        </Link>
      </div>
    </AuthFormContainer>
  );
};
