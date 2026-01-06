"use client";

import React, { useEffect, useState } from "react";
import { Question } from "@/model/question/Question";
import { Reply } from "@/model/reply/Reply";
import { Button } from "@/app/components/Button";
import { faShareNodes } from "@fortawesome/free-solid-svg-icons/faShareNodes";
import { usePathname } from "next/navigation";
import { formattedDate } from "@/tools/Date";
import { QuestionReply } from "./QuestionReply";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons/faPaperPlane";
import { NextClient } from "@/tools/NextClient";
import Link from "next/link";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons/faAngleLeft";
import { faQuoteRight } from "@fortawesome/free-solid-svg-icons/faQuoteRight";
import { faClock } from "@fortawesome/free-solid-svg-icons/faClock";
import { faReply } from "@fortawesome/free-solid-svg-icons/faReply";
import { DeleteQuestion } from "./DeleteQuestion";
import toast from "react-hot-toast";
import { useQuestionsReplies } from "../context/questions-replies-context";
import { Icon } from "@/app/components/Icon";

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
    if (!reply.trim()) return;
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
      toast.success("تم إرسال الرد بنجاح");
    } catch (e) {
      toast.error("حدث خطأ أثناء إرسال الرد");
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
    <div className="bg-surface rounded-[2.5rem] border-2 border-border p-6 md:p-8 transition-all duration-300 hover:shadow-xl hover:shadow-primary/5">
      <div className="flex flex-col gap-4 mb-8">
        <div className="flex items-center justify-between gap-4">
          <div className="w-12 h-12 bg-accent/10 rounded-2xl flex items-center justify-center text-accent">
            <Icon icon={faQuoteRight} className="text-xl" />
          </div>
          <div className="flex items-center gap-2 text-text-muted text-xs font-bold bg-surface-muted px-4 py-2 rounded-xl">
            <Icon icon={faClock} className="text-[10px]" />
            <span className="dir-ltr">{formattedDate(question.createdAt)}</span>
          </div>
        </div>

        {isOnProfilePage ? (
          <Link
            href={`/questions/${question._id}`}
            className="group flex items-center justify-between gap-4"
          >
            <h2 className="text-xl md:text-2xl font-black text-text-primary leading-tight group-hover:text-accent transition-colors">
              {question.question}
            </h2>
            <div className="w-10 h-10 rounded-xl bg-surface-muted flex items-center justify-center group-hover:bg-accent group-hover:text-white transition-all">
              <Icon icon={faAngleLeft} />
            </div>
          </Link>
        ) : (
          <h2 className="text-2xl md:text-3xl font-black text-text-primary leading-tight">
            {question.question}
          </h2>
        )}
      </div>

      {!repliesLoading ? (
        replies.length > 0 && (
          <div className="space-y-4 mb-8 overflow-y-auto max-h-[400px] pr-2 custom-scrollbar">
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
        <div className="flex justify-center py-10">
          <div className="w-8 h-8 border-4 border-accent border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}

      {!isOnProfilePage && (
        <div className="bg-surface-muted/50 rounded-[2rem] p-6 border border-border/50">
          <div className="flex items-center gap-3 mb-4 text-text-primary font-bold">
            <Icon icon={faReply} className="text-accent" />
            <span>إضافة ردك</span>
          </div>

          <textarea
            value={reply}
            onChange={(e) => setReply(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                onReply();
              }
            }}
            placeholder="اكتب شيئاً صريحاً هنا..."
            className="w-full bg-surface text-text-primary p-4 rounded-2xl border-2 border-border focus:border-accent focus:ring-4 focus:ring-accent/5 outline-none transition-all resize-none min-h-[120px] mb-4"
          />

          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <label className="flex items-center gap-3 cursor-pointer group">
                <div className="relative flex items-center">
                  <input
                    type="checkbox"
                    checked={replyAsAnnonymous}
                    onChange={(e) => onCheckAnonymous(e.target.checked)}
                    className="peer appearance-none w-6 h-6 border-2 border-border rounded-lg checked:bg-accent checked:border-accent transition-all cursor-pointer"
                  />
                  <Icon
                    icon={faPaperPlane}
                    className="absolute left-1.5 text-[10px] text-white opacity-0 peer-checked:opacity-100 transition-opacity"
                  />
                </div>
                <span className="text-sm font-bold text-text-muted group-hover:text-text-primary transition-colors">
                  الرد كمجهول
                </span>
              </label>

              {!replyAsAnnonymous && (
                <div className="animate-in fade-in slide-in-from-right-2 duration-300">
                  <input
                    placeholder="اسمك"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="bg-surface border-2 border-border rounded-xl px-4 py-1.5 text-sm focus:border-accent outline-none"
                  />
                </div>
              )}
            </div>

            <Button
              loading={replyLoading}
              onClick={onReply}
              variant="primary"
              icon={faPaperPlane}
              className="h-12 px-8 rounded-xl"
            >
              إرسال الرد
            </Button>
          </div>
        </div>
      )}

      <div className="flex items-center justify-between mt-8 pt-6 border-t border-border/50">
        <button
          onClick={onShare}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-text-muted font-bold hover:bg-accent/10 hover:text-accent transition-all"
        >
          <Icon icon={faShareNodes} className="text-sm" />
          <span>مشاركة السؤال</span>
        </button>

        {isOnProfilePage && (
          <div className="scale-90 origin-left">
            <DeleteQuestion question={question} />
          </div>
        )}
      </div>
    </div>
  );
};
