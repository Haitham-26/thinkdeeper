"use client";

import { Button } from "@/app/components/Button";
import { Icon } from "@/app/components/Icon";
import { SendMessageDto } from "@/model/message/SendMessageDto";
import { NextClient } from "@/tools/NextClient";
import { Toast } from "@/tools/Toast";
import { faCheck } from "@fortawesome/free-solid-svg-icons/faCheck";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons/faPaperPlane";
import { faUserSecret } from "@fortawesome/free-solid-svg-icons/faUserSecret";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Textarea } from "@/app/components/Textarea";
import { Input } from "@/app/components/Input";

type Props = {
  username: string;
};

export const SendMessageForm: React.FC<Props> = ({ username }) => {
  const [loading, setLoading] = useState(false);

  const {
    control,
    getValues,
    handleSubmit,
    reset,
    watch,
    setValue,
    resetField,
  } = useForm<SendMessageDto & { asAnnonymous: boolean }>({
    defaultValues: {
      message: "",
      name: "",
      recipientUsername: username,
      asAnnonymous: true,
    },
  });

  const asAnnonymous = watch("asAnnonymous");

  const onCheckAnonymous = (checked: boolean) => {
    setValue("asAnnonymous", checked);
    resetField("name");
  };

  const onSubmit = async () => {
    try {
      setLoading(true);
      const dto = getValues();
      await NextClient(`/message/${username}/send-message`, {
        method: "POST",
        data: dto,
      });
      reset();
      Toast.success("تم إرسال رسالتك الصريحة بنجاح");
    } catch (e) {
      Toast.apiError(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-8">
      <div className="relative">
        <div className="flex items-center gap-3 mb-4 text-text-primary font-black text-lg">
          <Icon icon={faPaperPlane} className="text-accent" />
          <span>رسالتك</span>
        </div>

        <Controller
          control={control}
          name="message"
          rules={{
            required: "لا يمكنك إرسال رسالة فارغة",
            maxLength: { value: 1024, message: "الرسالة طويلة جداً" },
          }}
          render={({ field: { value, onChange }, fieldState: { error } }) => (
            <Textarea
              value={value}
              onChange={onChange}
              placeholder="اكتب شيئاً لا تستطيع قوله في العلن..."
              className={`
                  w-full min-h-[220px] p-6 rounded-[2rem] border-2 outline-none transition-all duration-300 resize-none text-lg font-medium
                  bg-surface-muted/30 text-text-primary placeholder:text-text-muted/40
                  ${
                    error
                      ? "border-danger focus:ring-4 focus:ring-danger/10"
                      : "border-border focus:border-accent focus:ring-4 focus:ring-accent/10"
                  }
                `}
              valid={!error}
              errorMessage={error?.message}
              maxLength={1024}
            />
          )}
        />
      </div>

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 p-6 bg-surface-muted/50 rounded-3xl border-2 border-border/50">
        <div className="flex flex-wrap items-center gap-6">
          <label className="flex items-center gap-3 cursor-pointer group">
            <div className="relative flex items-center">
              <input
                type="checkbox"
                checked={asAnnonymous}
                onChange={(e) => onCheckAnonymous(e.target.checked)}
                className="peer appearance-none w-6 h-6 border-2 border-border rounded-lg checked:bg-accent checked:border-accent transition-all cursor-pointer"
              />
              <Icon
                icon={faCheck}
                className="absolute left-1.5 text-[10px] text-white opacity-0 peer-checked:opacity-100 transition-opacity"
              />
            </div>
            <div className="flex items-center gap-2">
              <Icon
                icon={faUserSecret}
                className={`text-sm ${
                  asAnnonymous ? "text-accent" : "text-text-muted"
                }`}
              />
              <span className="text-sm font-black text-text-primary">
                إرسال بهوية مجهولة
              </span>
            </div>
          </label>

          {!asAnnonymous ? (
            <div className="w-full md:w-fit animate-in fade-in zoom-in-95 duration-300">
              <Controller
                control={control}
                name="name"
                rules={{ maxLength: 32 }}
                render={({ field: { value, onChange } }) => (
                  <Input
                    placeholder="اسمك المستعار"
                    value={value}
                    onChange={onChange}
                    className="px-4 py-2 h-10 text-sm w-full md:w-48"
                  />
                )}
              />
            </div>
          ) : null}
        </div>

        <Button
          onClick={handleSubmit(onSubmit)}
          loading={loading}
          variant="primary"
          className="h-14 px-10 rounded-2xl text-lg shadow-xl shadow-accent/20"
          icon={faPaperPlane}
        >
          إرسال الآن
        </Button>
      </div>
    </div>
  );
};
