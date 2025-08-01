"use client";

import { Button } from "@/app/components/Button";
import { Input } from "@/app/components/Input";
import { CreateQuestionDto } from "@/model/question/dto/CreateQuestionDto";
import { Question } from "@/model/question/Question";
import { NextClient } from "@/tools/NextClient";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";

type QuestionCreateSectionProps = {
  userId: string;
  onCreate: (questions: Question[]) => void;
};

export const QuestionCreateSection: React.FC<QuestionCreateSectionProps> = ({
  userId,
  onCreate,
}) => {
  const [loading, setLoading] = useState(false);

  const { control, handleSubmit, getValues } = useForm<CreateQuestionDto>({
    defaultValues: { question: "", userId },
  });

  const onSubmit = async () => {
    try {
      setLoading(true);

      await NextClient<Question>("/questions/create", {
        method: "POST",
        data: { userId, question: getValues("question") },
      });

      const { data: questions } = await NextClient<Question[]>("/questions", {
        method: "POST",
        data: { userId },
      });

      onCreate(questions);
    } catch (e) {
      console.log(e);
      alert(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <Controller
        control={control}
        name="question"
        rules={{ required: true }}
        render={({ field: { value, onChange }, fieldState: { error } }) => (
          <Input
            title="السؤال الجديد"
            value={value}
            onChange={onChange}
            valid={!error}
            errorMessage={error?.message}
          />
        )}
      />
      <Button
        onClick={handleSubmit(onSubmit)}
        loading={loading}
        className="h-10"
      >
        أرسل سؤال
      </Button>
    </div>
  );
};
