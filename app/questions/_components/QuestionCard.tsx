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
import { useQuestionsReplies } from "../context/questions-replies-context";
import { Icon } from "@/app/components/Icon";
import { Textarea } from "@/app/components/Textarea";
import { Empty } from "@/app/components/Empty";
import { Toast } from "@/tools/Toast";
import { faCheck } from "@fortawesome/free-solid-svg-icons/faCheck";

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
      `${window.location.origin}/questions/${question._id}`,
    );
    Toast.success("تم نسخ الرابط بنجاح");
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
          data: { userId },
        },
      );

      setReplies(data);
      setReply("");
      setName("");
      setReplyAsAnonymous(true);
      Toast.success("تم إرسال الرد بنجاح");
    } catch (e: any) {
      console.log(e);
      Toast.apiError(e);
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
            data: { userId },
          },
        );

        setReplies(data);
      } catch (err) {
        console.error("Error fetching replies:", err);
      } finally {
        setRepliesLoading(false);
      }
    };
    fetchReplies();
  }, [question._id, setReplies, userId]);

  return (
    <div className="relative group/card">
      <div className="absolute top-0 right-0 -mr-1.5 mt-1.5 w-full h-full bg-primary/5 rounded-[2.5rem] transition-transform group-hover/card:translate-x-1"></div>

      <div className="relative bg-surface border border-border rounded-[2.5rem] overflow-hidden transition-all duration-300 hover:shadow-lg">
        <div className="p-6 md:p-8">
          <div className="flex items-start justify-between gap-4 mb-6">
            <div className="w-12 h-12 shrink-0 bg-accent/5 text-accent rounded-2xl flex items-center justify-center">
              <Icon icon={faQuoteRight} className="text-xl" />
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 bg-surface-muted rounded-full border border-border/50 text-text-muted text-[10px] font-black uppercase tracking-tight">
              <Icon icon={faClock} className="text-[9px]" />
              <span className="dir-ltr">
                {formattedDate(question.createdAt)}
              </span>
            </div>
          </div>

          <div className="mb-8">
            {isOnProfilePage ? (
              <Link
                href={`/questions/${question._id}`}
                className="group/title flex items-center justify-between gap-6"
              >
                <h2 className="text-xl md:text-2xl font-black text-text-primary leading-snug group-hover/title:text-accent transition-colors">
                  {question.question}
                </h2>
                <div className="shrink-0 w-10 h-10 rounded-xl bg-surface-muted flex items-center justify-center text-text-muted group-hover/title:bg-accent group-hover/title:text-white transition-all">
                  <Icon icon={faAngleLeft} />
                </div>
              </Link>
            ) : (
              <h2 className="text-2xl md:text-3xl font-black text-text-primary leading-tight">
                {question.question}
              </h2>
            )}
          </div>

          {!isOnProfilePage && (
            <div className="mb-8 space-y-4">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-px flex-1 bg-border/50"></div>
                <span className="text-[10px] font-black text-text-muted uppercase tracking-[0.2em]">
                  الردود
                </span>
                <div className="h-px flex-1 bg-border/50"></div>
              </div>

              {!repliesLoading ? (
                replies.length > 0 ? (
                  <div className="space-y-4 max-h-[400px] overflow-y-auto pl-2 custom-scrollbar">
                    {replies.map((reply) => (
                      <QuestionReply
                        key={reply._id}
                        reply={reply}
                        userId={userId}
                        openRegisterModal={openRegisterModal}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="py-6 grayscale opacity-60 scale-90">
                    <Empty
                      title="لا توجد ردود"
                      description="كن أول من يترك بصمته هنا."
                    />
                  </div>
                )
              ) : (
                <div className="flex justify-center py-12">
                  <div className="w-6 h-6 border-2 border-accent border-t-transparent rounded-full animate-spin"></div>
                </div>
              )}
            </div>
          )}

          {!isOnProfilePage && userId !== question.userId && (
            <div className="bg-surface-muted/30 rounded-[2rem] p-5 border border-border/50">
              <div className="flex items-center gap-2 mb-4 text-xs font-black text-text-primary uppercase tracking-wider">
                <Icon icon={faReply} className="text-accent" />
                <span>شارك برأيك</span>
              </div>

              <Textarea
                value={reply}
                onChange={(e) => setReply(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    onReply();
                  }
                }}
                placeholder="اكتب ردك الصريح هنا..."
                className="w-full !bg-white !p-4 !rounded-2xl !border-border focus:!border-accent !text-sm !min-h-[100px] !mb-4 transition-all"
              />

              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-6">
                  <label className="flex items-center gap-2.5 cursor-pointer group/check">
                    <div className="relative flex items-center">
                      <input
                        type="checkbox"
                        checked={replyAsAnnonymous}
                        onChange={(e) => onCheckAnonymous(e.target.checked)}
                        className="peer appearance-none w-5 h-5 border-2 border-border rounded-lg checked:bg-accent checked:border-accent transition-all cursor-pointer"
                      />
                      <Icon
                        icon={faCheck}
                        className="absolute left-1.5 text-[8px] text-white opacity-0 peer-checked:opacity-100"
                      />
                    </div>
                    <span className="text-xs font-bold text-text-muted group-hover/check:text-text-primary">
                      مجهول
                    </span>
                  </label>

                  {!replyAsAnnonymous && (
                    <input
                      placeholder="اسمك المستعار"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="bg-white border border-border rounded-lg px-3 py-1.5 text-xs focus:border-accent outline-none w-32 animate-in fade-in slide-in-from-right-1"
                    />
                  )}
                </div>

                <Button
                  loading={replyLoading}
                  onClick={onReply}
                  className="!h-10 !px-6 !rounded-xl !text-xs !font-black !bg-primary !text-secondary hover:!bg-accent transition-colors"
                  icon={faPaperPlane}
                >
                  إرسال
                </Button>
              </div>
            </div>
          )}

          <div className="flex items-center justify-between mt-8 pt-6 border-t border-border/40">
            <Button
              onClick={onShare}
              icon={faShareNodes}
              className="flex items-center gap-2 px-4 py-2 rounded-xl !bg-transparent !text-text-muted hover:!bg-primary/10 shadow-none"
            >
              مشاركة
            </Button>

            {isOnProfilePage && (
              <div className="scale-90 hover:scale-95 transition-transform">
                <DeleteQuestion question={question} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
