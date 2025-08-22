"use client";

import React, { useEffect, useState } from "react";
import { Question } from "@/model/question/Question";
import { Reply } from "@/model/reply/Reply";
import { Button } from "@/app/components/Button";
import { faShare } from "@fortawesome/free-solid-svg-icons/faShare";
import { usePathname } from "next/navigation";
import { formattedDate } from "@/tools/Date";
import { QuestionReply } from "./QuestionReply";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons/faPaperPlane";
import { NextClient } from "@/tools/NextClient";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons/faAngleLeft";
import { DeleteQuestion } from "./DeleteQuestion";
import { Input } from "@/app/components/Input";
import toast from "react-hot-toast";
import { useQuestionsReplies } from "../context/questions-replies-context";

const buttonClassName = "!bg-transparent text-white !p-1";

type QuestionCardProps = {
  question: Question;
  userId: string | null;
  openRegisterModal?: VoidFunction;
};

export const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  userId,
  openRegisterModal,
}) => {
  const [replyLoading, setReplyLoading] = useState(false);
  const [reply, setReply] = useState("");
  const [replyAsAnnonymous, setReplyAsAnonymous] = useState(true);
  const [name, setName] = useState("");
  const [repliesLoading, setRepliesLoading] = useState(false);

  const { replies, setReplies } = useQuestionsReplies();

  const pathname = usePathname();

  const isOnProfilePage = !Boolean(pathname.replace("/questions", "").length);

  const onShare = () => {
    navigator.clipboard.writeText(
      `${window.location.origin}/questions/${question._id}`
    );

    toast.success("تم نسخ الرابط بنجاح");
  };

  const onCheckAnonymous = (checked: boolean) => {
    setReplyAsAnonymous(checked);
    setName("");
  };

  const onReply = async () => {
    try {
      setReplyLoading(true);

      await NextClient(`/replies/${question._id}/reply`, {
        method: "POST",
        data: { reply, name },
      });

      const { data } = await NextClient<Reply[]>(
        `/replies/${question._id}/all`,
        {
          method: "POST",
        }
      );

      setReplies(data);
      setReply("");
      setName("");
      setReplyAsAnonymous(true);
    } catch (e) {
      console.log(e);
      alert(e);
    } finally {
      setReplyLoading(false);
    }
  };

  useEffect(() => {
    const fetchReplies = async () => {
      try {
        setRepliesLoading(true);

        const { data } = await NextClient<Reply[]>(
          `/replies/${question._id}/all`,
          {
            method: "POST",
          }
        );
        setReplies(data);
      } catch (err) {
        console.error("Error fetching replies:", err);
      } finally {
        setRepliesLoading(false);
      }
    };

    fetchReplies();
  }, [question._id, setReplies]);

  return (
    <div className="p-6 bg-surface rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-300">
      {/* Header */}
      <div className="flex flex-col gap-2 mb-4">
        {isOnProfilePage ? (
          <Link
            href={`/questions/${question._id}`}
            className="flex items-center justify-between gap-2 text-primary font-bold text-lg overflow-hidden whitespace-nowrap text-ellipsis group"
          >
            {question.question}
            <FontAwesomeIcon
              icon={faAngleLeft}
              className="text-accent transition-transform duration-300 group-hover:-translate-x-1"
            />
          </Link>
        ) : (
          <h2 className="block text-primary text-lg font-semibold">
            {question.question}
          </h2>
        )}
        <span className="text-textMuted text-sm ms-auto">
          {formattedDate(question.createdAt)}
        </span>
      </div>

      {/* Replies */}
      {!repliesLoading ? (
        replies.length > 0 && (
          <div
            className="mb-6 max-h-60 overflow-y-auto pr-2 pb-20 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            style={{
              WebkitMaskImage:
                "linear-gradient(to bottom, rgba(0,0,0,1), rgba(0,0,0,0))",
              maskImage:
                "linear-gradient(to bottom, rgba(0,0,0,1), rgba(0,0,0,0))",
            }}
          >
            {replies.map((reply) => (
              <QuestionReply
                key={reply._id}
                reply={reply}
                userId={userId}
                openRegisterModal={openRegisterModal}
              />
            ))}
          </div>
        )
      ) : (
        <div className="h-8 w-8 border-3 border-accent border-t-transparent animate-spin rounded-full my-12 mx-auto"></div>
      )}

      {/* Reply Input */}
      {!isOnProfilePage && (
        <div className="flex flex-col gap-4 w-full">
          <p className="text-primary font-medium">اكتب رد</p>
          <textarea
            value={reply}
            onChange={(e) => setReply(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                onReply();
              }
            }}
            placeholder="شارك ردك هنا..."
            className="w-full bg-background text-primary p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-accent/50 outline-none transition-all resize-none"
          />

          {/* Checkbox */}
          <label className="inline-flex items-center gap-2 cursor-pointer text-primary">
            <input
              type="checkbox"
              checked={replyAsAnnonymous}
              onChange={(e) => onCheckAnonymous(e.target.checked)}
              className="form-checkbox h-5 w-5 text-accent rounded-md border-gray-300 focus:ring-accent"
            />
            <span>الرد كمجهول</span>
          </label>

          {/* Name Input */}
          {!replyAsAnnonymous && (
            <Input
              title="الاسم"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          )}

          {/* Send Button */}
          <Button
            icon={faPaperPlane}
            className="!bg-accent !hover:bg-accent/90 text-white font-medium px-5 py-2 rounded-lg ms-auto flex items-center gap-2 shadow transition"
            loading={replyLoading}
            onClick={onReply}
          >
            إرسال
          </Button>
        </div>
      )}

      {/* Footer Actions */}
      <div className="flex items-center justify-end gap-4 mt-6">
        <Button
          onClick={onShare}
          icon={faShare}
          className="!text-accent !hover:text-accent/80"
        >
          مشاركة
        </Button>
        {isOnProfilePage && <DeleteQuestion question={question} />}
      </div>
    </div>
  );
};
