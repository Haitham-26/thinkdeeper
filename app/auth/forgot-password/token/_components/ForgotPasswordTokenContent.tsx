"use client";

import { Button } from "@/app/components/Button";
import { Input } from "@/app/components/Input";
import { Spinner } from "@/app/components/Spinner";
import { ForgotPasswordTokenDto } from "@/model/auth/forgot-password/dto/ForgotPasswordTokenDto";
import { NextClient } from "@/tools/NextClient";
import { Toast } from "@/tools/Toast";
import { useRouter, useSearchParams } from "next/navigation";
import React, { Fragment, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";

const inputClass = `
    !bg-white/[0.03] !border-white/10 !!h-14 
    !text-secondary text-lg
    !shadow-none
  `;

const RESEND_COOLDOWN = 60;

export const ForgotPasswordTokenContent: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);

  const searchParams = useSearchParams();
  const router = useRouter();
  const { control, getValues, handleSubmit, reset, watch } =
    useForm<ForgotPasswordTokenDto>({
      defaultValues: {
        email: "",
        token: "",
      },
    });

  const token = watch("token");

  useEffect(() => {
    const lastResend = localStorage.getItem(
      "forgotPasswordTokenLastResendTime",
    );
    const now = Date.now();

    if (lastResend) {
      const diff = Math.floor((now - Number(lastResend)) / 1000);
      const remaining = RESEND_COOLDOWN - diff;

      if (remaining > 0) {
        setTimeLeft(remaining);
      } else {
        setTimeLeft(0);
      }
    } else {
      // First time ever: Start timer and save timestamp
      localStorage.setItem("forgotPasswordTokenLastResendTime", now.toString());
      setTimeLeft(RESEND_COOLDOWN);
    }
  }, []);

  useEffect(() => {
    if (timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const onSubmit = async () => {
    try {
      setLoading(true);
      const dto = getValues();

      await NextClient("/auth/forgot-password/token", {
        method: "POST",
        data: dto,
      });

      router.push(
        `/auth/forgot-password/new?email=${dto.email}&token=${dto.token}`,
      );
    } catch (e) {
      Toast.apiError(e);
    } finally {
      setLoading(false);
    }
  };

  const onResendToken = async () => {
    try {
      setResendLoading(true);
      const email = getValues("email");

      await NextClient("/auth/forgot-password/token-resend", {
        method: "POST",
        data: { email },
      });

      const now = Date.now();
      localStorage.setItem("forgotPasswordTokenLastResendTime", now.toString());
      setTimeLeft(RESEND_COOLDOWN);

      Toast.success("تم ارسال رمز التحقق إلى بريدك الإلكتروني");
    } catch (e) {
      Toast.apiError(e);
    } finally {
      setResendLoading(false);
    }
  };

  useEffect(() => {
    const email = searchParams.get("email");
    if (!email) {
      router.replace("/auth/forgot-password/email");
    } else {
      reset({ email, token: "" });
    }
  }, [searchParams, router, reset]);

  return (
    <Fragment>
      <div className="space-y-4">
        <Controller
          control={control}
          name="token"
          rules={{
            required: "رمز التحقق مطلوب",
            minLength: { value: 6, message: "رمز التحقق يجب ان يكون 6 خانات" },
            maxLength: { value: 6, message: "رمز التحقق يجب ان يكون 6 خانات" },
          }}
          render={({ field: { value, onChange }, fieldState: { error } }) => (
            <Input
              title="رمز التحقق"
              value={value}
              onChange={onChange}
              valid={!error}
              errorMessage={error?.message}
              className={inputClass}
              labelClassName="!text-slate-300 !font-black !tracking-widest"
              required
              maxLength={6}
              autoComplete="off"
            />
          )}
        />

        <div className="flex items-center min-h-[20px]">
          {timeLeft > 0 ? (
            <p className="text-slate-400 text-xs font-bold">
              يمكنك طلب رمز جديد خلال{" "}
              <span className="text-accent">{timeLeft} ثانية</span>
            </p>
          ) : (
            <Button
              onClick={onResendToken}
              disabled={resendLoading}
              className="!h-auto !bg-transparent shadow-none !text-accent text-xs font-black hover:opacity-80 transition-opacity flex items-center gap-2"
            >
              <span>إرسال رمز تحقق جديد</span>
              {resendLoading ? <Spinner className="!static" /> : null}
            </Button>
          )}
        </div>
      </div>

      <Button
        loading={loading}
        onClick={handleSubmit(onSubmit)}
        disabled={token?.length !== 6}
        className="mt-6"
      >
        تحقق واستمرار
      </Button>
    </Fragment>
  );
};
