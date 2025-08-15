"use client";

import React, { useState } from "react";
import { AuthFormContainer } from "../../_components/AuthFormContainer";
import { Input } from "@/app/components/Input";
import Link from "next/link";
import { Controller, useForm } from "react-hook-form";
import { LoginDto } from "@/model/auth/login/LoginDto";
import { Client } from "@/tools/Client";
import { Button } from "@/app/components/Button";
import { useRouter } from "next/navigation";
import { Toast } from "@/tools/Toast";

export const LoginContent: React.FC = () => {
  const [loading, setLoading] = useState(false);

  const { control, handleSubmit, getValues } = useForm<LoginDto>({
    defaultValues: { email: "", password: "" },
  });

  const router = useRouter();

  const onSubmit = async () => {
    try {
      setLoading(true);

      const dto = getValues();

      await Client("/auth/login", {
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
      <Controller
        control={control}
        name="email"
        // rules={{
        //   required: { value: true, message: "البريد الإلكتروني مطلوب" },
        //   pattern: {
        //     value: regexes.EMAIL_REGEX,
        //     message: "البريد الإلكتروني غير صالح",
        //   },
        // }}
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

      <div>
        <Controller
          control={control}
          name="password"
          // rules={{
          //   required: { value: true, message: "كلمة المرور مطلوبة" },
          //   minLength: {
          //     value: 6,
          //     message: "كلمة المرور يجب ان تكون على الاقل 6 أحرف",
          //   },
          // }}
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

        <Link
          href="/auth/forgot-password"
          className="mt-1 ps-5 text-slate-300 hover:text-slate-100 transition-colors duration-300 ease-in-out text-xs"
        >
          نسيت كلمة المرور؟
        </Link>
      </div>

      <div className="flex flex-col gap-2 mt-4">
        <Button
          loading={loading}
          onClick={handleSubmit(onSubmit)}
          className="h-10"
        >
          تسجيل الدخول
        </Button>

        <Link
          href="/auth/signup"
          className="mt-1 ps-5 text-slate-300 hover:text-slate-100 transition-colors duration-300 ease-in-out block text-center py-2 px-5"
        >
          ليس لديك حساب؟
        </Link>
      </div>
    </AuthFormContainer>
  );
};
