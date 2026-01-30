"use client";

import { Button } from "@/app/components/Button";
import { CreateQuestionDto } from "@/model/question/dto/CreateQuestionDto";
import { Question } from "@/model/question/Question";
import { NextClient } from "@/tools/NextClient";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useGlobalContext } from "../context/global-context";
import { Modal } from "@/app/components/Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleQuestion } from "@fortawesome/free-solid-svg-icons/faCircleQuestion";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons/faPaperPlane";
import { Toast } from "@/tools/Toast";

type QuestionCreateModalProps = {
  userId: string | null;
  open: boolean;
  onClose: VoidFunction;
};

export const QuestionCreateModal: React.FC<QuestionCreateModalProps> = ({
  userId,
  onClose,
  open = false,
}) => {
  const [loading, setLoading] = useState(false);

  const { control, handleSubmit, getValues, reset } =
    useForm<CreateQuestionDto>({
      defaultValues: { question: "", userId: userId || "" },
    });

  const { setQuestions } = useGlobalContext();

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

      reset({ question: "", userId: userId || "" });
      setQuestions(questions);
      Toast.success("تم نشر سؤالك بنجاح");
      onClose();
    } catch (e: any) {
      console.log(e);
      Toast.apiError(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal open={open} onClose={onClose} title="إضافة سؤال جديد">
      <div className="flex flex-col gap-6">
        <div className="flex items-center gap-4 bg-accent/5 p-4 rounded-2xl border border-accent/10">
          <div className="w-12 h-12 bg-accent rounded-xl flex items-center justify-center text-white shadow-lg shadow-accent/20">
            <FontAwesomeIcon icon={faCircleQuestion} className="text-xl" />
          </div>
          <div>
            <h4 className="text-sm font-black text-text-primary">
              ماذا يدور في ذهنك؟
            </h4>
            <p className="text-xs text-text-muted font-medium">
              سيظهر هذا السؤال للجميع وسيتمكن الجميع من الرد عليه كذلك.
            </p>
          </div>
        </div>

        <Controller
          control={control}
          name="question"
          rules={{
            required: "يرجى كتابة السؤال أولاً",
            minLength: { value: 5, message: "السؤال قصير جداً" },
          }}
          render={({ field: { value, onChange }, fieldState: { error } }) => (
            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold text-text-primary px-1">
                نص السؤال
              </label>
              <textarea
                value={value}
                onChange={onChange}
                placeholder="مثال: ما هو أفضل كتاب قرأته هذا العام؟"
                className={`
                  w-full min-h-[140px] p-5 rounded-2xl border-2 outline-none transition-all duration-300 resize-none
                  bg-surface text-text-primary placeholder:text-text-muted/50
                  ${
                    error
                      ? "border-danger focus:ring-4 focus:ring-danger/10"
                      : "border-border focus:border-accent focus:ring-4 focus:ring-accent/10"
                  }
                `}
              />
              {error && (
                <p className="text-danger text-xs font-bold px-1 animate-in fade-in slide-in-from-top-1">
                  {error.message}
                </p>
              )}
            </div>
          )}
        />

        <div className="flex flex-col gap-3 pt-2">
          <Button
            onClick={handleSubmit(onSubmit)}
            loading={loading}
            variant="primary"
            className="h-14 w-full shadow-xl shadow-accent/20 text-lg"
            icon={faPaperPlane}
          >
            نشر السؤال الآن
          </Button>

          <Button
            onClick={onClose}
            className="!bg-transparent shadow-none h-12 w-full !text-text-muted font-bold hover:!text-text-primary transition-colors text-sm"
          >
            إلغاء وتجاهل
          </Button>
        </div>
      </div>
    </Modal>
  );
};
