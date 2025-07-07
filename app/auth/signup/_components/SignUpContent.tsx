"use client";

import React, { useState } from "react";
import { AuthFormContainer } from "../../_components/AuthFormContainer";
import { Input } from "@/app/components/Input";
import Link from "next/link";
import { Controller, useForm } from "react-hook-form";
import { Client } from "@/tools/Client";
import { Button } from "@/app/components/Button";
import { regexes } from "@/tools/Regex";
import { SignUpDto } from "@/model/auth/signup/SignUpDto";
import { useRouter } from "next/navigation";

export const SignUpContent: React.FC = () => {
  const [loading, setLoading] = useState(false);

  const { control, handleSubmit, getValues } = useForm<SignUpDto>({
    defaultValues: { name: "", email: "", password: "" },
  });

  const router = useRouter();

  const onSubmit = async () => {
    try {
      setLoading(true);

      const dto = getValues();

      await Client("/auth/signup", {
        method: "POST",
        data: dto,
        withCredentials: true,
      });

      router.push("/");
    } catch (e) {
      console.log(e);
      alert(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthFormContainer title="إنشاء حساب">
      <Controller
        control={control}
        name="name"
        rules={{
          required: { value: true, message: "كلمة المرور مطلوبة" },
          minLength: {
            value: 3,
            message: "الاسم يجب ان يكون على الاقل 6 أحرف",
          },
          maxLength: {
            value: 26,
            message: "الاسم يجب ان يكون 26 حرفا كحد أقصى",
          },
        }}
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
        rules={{
          required: { value: true, message: "البريد الإلكتروني مطلوب" },
          pattern: {
            value: regexes.EMAIL_REGEX,
            message: "البريد الإلكتروني غير صالح",
          },
        }}
        render={({ field: { value, onChange }, fieldState: { error } }) => (
          <Input
            title="البريد الإلكتروني"
            value={value}
            onChange={onChange}
            valid={!error}
            errorMessage={error?.message}
          />
        )}
      />

      <Controller
        control={control}
        name="password"
        rules={{
          required: { value: true, message: "كلمة المرور مطلوبة" },
          minLength: {
            value: 6,
            message: "كلمة المرور يجب ان تكون على الاقل 6 أحرف",
          },
        }}
        render={({ field: { value, onChange }, fieldState: { error } }) => (
          <Input
            title="كلمة المرور"
            value={value}
            onChange={onChange}
            valid={!error}
            errorMessage={error?.message}
          />
        )}
      />

      <div className="flex flex-col gap-2">
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
    </AuthFormContainer>
  );
};
