"use client";

import { Button } from "@/app/components/Button";
import { ReplyOnQuestionDto } from "@/model/question/dto/ReplyOnQuestionDto";
import { Question } from "@/model/question/Question";
import { NextClient } from "@/tools/NextClient";
import { faComment } from "@fortawesome/free-solid-svg-icons/faComment";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons/faPaperPlane";
import { faReply } from "@fortawesome/free-solid-svg-icons/faReply";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { QuestionReply } from "./QuestionReply";
import { faShare } from "@fortawesome/free-solid-svg-icons/faShare";

type QuestionCardProps = {
  question: Question;
};

export const QuestionCard: React.FC<QuestionCardProps> = ({
  question: question,
}) => {
  const [replySubmitLoading, setReplySubmitLoading] = useState(false);

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const replyContainerRef = useRef<HTMLDivElement>(null);

  const { control, getValues, handleSubmit, reset } =
    useForm<ReplyOnQuestionDto>({
      defaultValues: {
        reply: "",
      },
    });

  const pathname = usePathname();

  const formattedCreatedAt = new Date(question.createdAt).toLocaleString();

  const onShare = () => {
    navigator.clipboard.writeText(
      `${window.location.origin}/questions/${question._id}`
    );
  };

  const onStartReply = () => {
    const textarea = textareaRef.current;
    const replyContainer = replyContainerRef.current;

    if (!textarea || !replyContainer) {
      return;
    }

    window.dispatchEvent(
      new CustomEvent("reply-focus", {
        detail: { source: replyContainer },
      })
    );

    replyContainer.classList.remove("hidden");
    replyContainer.classList.add("flex");
    textarea.focus();
  };

  const onReplySubmit = async () => {
    try {
      setReplySubmitLoading(true);

      await NextClient(`/questions/${question._id}/reply`, {
        method: "POST",
        data: {
          reply: getValues("reply"),
        },
      });

      reset({
        reply: "",
      });
    } catch (e) {
      console.log(e);
      alert(e);
    } finally {
      setReplySubmitLoading(false);
    }
  };

  useEffect(() => {
    const handleFocus = (e: any) => {
      if (
        replyContainerRef.current &&
        e.detail.source !== replyContainerRef.current
      ) {
        replyContainerRef.current.classList.remove("flex");
        replyContainerRef.current.classList.add("hidden");
      }
    };

    window.addEventListener("reply-focus", handleFocus);
    return () => window.removeEventListener("reply-focus", handleFocus);
  }, []);

  return (
    <div className="p-6 bg-gray-800 rounded-2xl border-2 border-gray-700">
      <Link
        href={`/questions/${question._id}`}
        className="block text-white text-lg overflow-hidden whitespace-nowrap text-ellipsis"
      >
        {question.question}
      </Link>
      <span className="text-gray-400 text-sm">{formattedCreatedAt}</span>

      {pathname === "/questions" ? (
        <div className="flex justify-end gap-4 h-8">
          <Button
            onClick={onShare}
            icon={faShare}
            className="!bg-transparent text-white !p-1"
          >
            مشاركة
          </Button>
          <Button
            onClick={onStartReply}
            icon={faReply}
            className="!bg-transparent text-white !p-1"
          >
            رد
          </Button>
          <Link
            href={`/questions/${question._id}`}
            className="!bg-transparent text-white !p-1 flex items-center gap-2"
          >
            الردود ({question.replies.length || 0})
            <FontAwesomeIcon icon={faComment} />
          </Link>
        </div>
      ) : null}

      {pathname !== "/questions"
        ? question.replies.map((reply) => (
            <QuestionReply key={reply._id} reply={reply} />
          ))
        : null}

      <Controller
        control={control}
        name="reply"
        render={({ field: { value, onChange } }) => (
          <div
            ref={replyContainerRef}
            className="hidden relative flex-col gap-1 border-1 border-gray-200 rounded-lg overflow-hidden mt-3"
          >
            <div className="text-gray-200 bg-gray-800 text-sm pt-2 pe-2 rounded-[inherit] w-full text-end">
              {value?.length || 0} / 200
            </div>

            <textarea
              ref={textareaRef}
              value={value}
              onChange={onChange}
              maxLength={200}
              className="w-full border-0 text-white outline-0 p-3 pt-0 block h-60"
            ></textarea>

            <div className="absolute bottom-0 end-0 start-0 w-full bg-gray-800 flex justify-end z-10">
              <Button
                icon={faPaperPlane}
                onClick={handleSubmit(onReplySubmit)}
                loading={replySubmitLoading}
                className="!bg-transparent text-white !p-2 h-12 w-28"
              >
                إرسال الرد
              </Button>
            </div>
          </div>
        )}
      />
    </div>
  );
};
