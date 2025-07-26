"use client";

import { Button } from "@/app/components/Button";
import { Input } from "@/app/components/Input";
import { CreateQuestionDto } from "@/model/question/dto/CreateQuestionDto";
import { NextClient } from "@/tools/NextClient";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";

type QuestionCreateSectionProps = {
  userId: string;
};

export const QuestionCreateSection: React.FC<QuestionCreateSectionProps> = ({
  userId,
}) => {
  const [loading, setLoading] = useState(false);

  const { control, handleSubmit, getValues, reset } =
    useForm<CreateQuestionDto>({
      defaultValues: {
        question: "",
        userId,
      },
    });

  const onSubmit = async () => {
    try {
      setLoading(true);

      const dto = getValues();

      await NextClient("/questions/create", {
        method: "POST",
        data: dto,
      });

      await NextClient("/questions", {
        method: "POST",
        data: {
          userId,
        },
      });

      reset({
        question: "",
        userId,
      });
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-1 sticky top-20 h-fit">
      <p className="text-white text-center text-2xl font-bold mx-auto">
        شارك سؤالًا
      </p>

      <div className="px-6 py-8 mx-auto flex flex-col gap-6 mt-6 rounded-2xl border-2 border-gray-100 before:absolute before:w-full before:h-full before:bg-gray-700 before:rounded-[inherit] before:top-0 before:left-0 before:right-0 before:bottom-0 before:-z-[1] relative z-1">
        <Controller
          control={control}
          name="question"
          rules={{
            required: { value: true, message: "هذا الحقل مطلوب" },
          }}
          render={({ field: { value, onChange }, fieldState: { error } }) => (
            <Input
              title="سؤالك"
              value={value}
              onChange={onChange}
              valid={!error}
              errorMessage={error?.message}
            />
          )}
        />

        <Button
          loading={loading}
          onClick={handleSubmit(onSubmit)}
          className="h-10"
        >
          إضافة السؤال
        </Button>
      </div>
    </div>
  );
};
