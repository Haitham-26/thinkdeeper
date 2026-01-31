"use client";

import { Button } from "@/app/components/Button";
import { Input } from "@/app/components/Input";
import { ForgotPasswordNewDto } from "@/model/auth/forgot-password/dto/ForgotPasswordNewDto";
import { NextClient } from "@/tools/NextClient";
import { Toast } from "@/tools/Toast";
import { useRouter, useSearchParams } from "next/navigation";
import React, { Fragment, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";

const inputClass = `
    !bg-white/[0.03] !border-white/10 !!h-14 
    !text-secondary placeholder:!text-slate-600 
    !shadow-none
  `;

export const ForgotPasswordNewContent: React.FC = () => {
  const [loading, setLoading] = useState(false);

  const searchParams = useSearchParams();
  const router = useRouter();
  const { control, handleSubmit, watch, reset } = useForm<
    ForgotPasswordNewDto & { passwordConfirm: string }
  >({
    defaultValues: {
      email: "",
      token: "",
      password: "",
      passwordConfirm: "",
    },
  });

  const [password, passwordConfirm] = watch(["password", "passwordConfirm"]);

  const onSubmit = async (
    data: ForgotPasswordNewDto & { passwordConfirm: string },
  ) => {
    try {
      setLoading(true);

      await NextClient("/auth/forgot-password/new", {
        method: "POST",
        data: data,
      });

      router.replace("/auth/login");
    } catch (e) {
      console.log(e);
      Toast.apiError(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const email = searchParams.get("email");
    const token = searchParams.get("token");

    if (!email || !token) {
      router.replace("/auth/forgot-password/email");
    } else {
      reset({
        email,
        token,
        password: "",
        passwordConfirm: "",
      });
    }
  }, [reset, router, searchParams]);

  return (
    <Fragment>
      <Controller
        control={control}
        name="password"
        rules={{
          required: "كلمة السر مطلوبة",
          minLength: {
            value: 8,
            message: "كلمة السر يجب أن تكون 8 رموز على الأقل",
          },
        }}
        render={({ field: { value, onChange }, fieldState: { error } }) => (
          <Input
            title="كلمة السر الجديدة"
            value={value}
            onChange={onChange}
            valid={!error}
            errorMessage={error?.message}
            className={inputClass}
            type="password"
            labelClassName="!text-slate-300 !font-black !text-xs !tracking-widest"
            required
          />
        )}
      />

      <Controller
        control={control}
        name="passwordConfirm"
        rules={{
          required: "تأكيد كلمة السر مطلوب",
          validate: (value) => value === password || "كلمات السر غير متطابقة",
        }}
        render={({ field: { value, onChange }, fieldState: { error } }) => (
          <Input
            title="تأكيد كلمة السر الجديدة"
            value={value}
            onChange={onChange}
            valid={!error}
            errorMessage={error?.message}
            className={inputClass}
            type="password"
            labelClassName="!text-slate-300 !font-black !text-xs !tracking-widest"
            required
          />
        )}
      />

      <Button
        loading={loading}
        onClick={handleSubmit(onSubmit)}
        disabled={!password || !passwordConfirm}
      >
        استمرار
      </Button>
    </Fragment>
  );
};
