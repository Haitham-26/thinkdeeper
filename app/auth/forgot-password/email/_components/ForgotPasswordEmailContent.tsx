"use client";

import { Button } from "@/app/components/Button";
import { Input } from "@/app/components/Input";
import { ForgotPasswordEmailDto } from "@/model/auth/forgot-password/dto/ForgotPasswordEmailDto";
import { NextClient } from "@/tools/NextClient";
import { Toast } from "@/tools/Toast";
import { useRouter } from "next/navigation";
import React, { Fragment, useState } from "react";
import { Controller, useForm } from "react-hook-form";

const inputClass = `
    !bg-white/[0.03] !border-white/10 !!h-14 
    !text-secondary placeholder:!text-slate-600 
    !shadow-none
  `;

export const ForgotPasswordEmailContent: React.FC = () => {
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const { control, getValues, handleSubmit, watch } =
    useForm<ForgotPasswordEmailDto>({
      defaultValues: { email: "" },
    });

  const email = watch("email");

  const onSubmit = async () => {
    try {
      setLoading(true);

      const email = getValues("email");

      await NextClient("/auth/forgot-password/email", {
        method: "POST",
        data: {
          email,
        },
      });

      router.push(`/auth/forgot-password/token?email=${email}`);
    } catch (e) {
      console.log(e);
      Toast.apiError(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Fragment>
      <Controller
        control={control}
        name="email"
        rules={{ required: "البريد الإلكتروني مطلوب" }}
        render={({ field: { value, onChange }, fieldState: { error } }) => (
          <Input
            title="البريد الإلكتروني"
            value={value}
            onChange={onChange}
            valid={!error}
            errorMessage={error?.message}
            className={inputClass}
            labelClassName="!text-slate-300 !font-black !text-xs !tracking-widest"
            required
          />
        )}
      />

      <Button
        loading={loading}
        onClick={handleSubmit(onSubmit)}
        disabled={!email}
      >
        استمرار
      </Button>
    </Fragment>
  );
};
