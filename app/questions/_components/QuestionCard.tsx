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
    <div className="p-6 bg-gray-800 rounded-2xl border-2 border-gray-700">
      <div className="flex flex-col gap-2 mb-4">
        {isOnProfilePage ? (
          <Link
            href={`/questions/${question._id}`}
            className="flex items-center justify-between gap-2 text-white font-bold text-xl overflow-hidden whitespace-nowrap text-ellipsis group"
          >
            {question.question}

            <FontAwesomeIcon
              icon={faAngleLeft}
              className="transition-transform duration-300 group-hover:-translate-x-1"
            />
          </Link>
        ) : (
          <h2 className="block text-white text-xl font-black">
            {question.question}
          </h2>
        )}

        <span className="text-gray-400 text-sm block ms-auto">
          {formattedDate(question.createdAt)}
        </span>
      </div>

      {!repliesLoading ? (
        replies.length > 0 ? (
          <div
            className="mb-6 max-h-60 overflow-y-auto relative pb-24 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            style={{
              WebkitMaskImage:
                "linear-gradient(to bottom, rgba(0,0,0,1), rgba(0,0,0,0.8), rgba(0,0,0,0))",
              maskImage:
                "linear-gradient(to bottom, rgba(0,0,0,1), rgba(0,0,0,0.8), rgba(0,0,0,0))",
              WebkitMaskSize: "100% 100%",
              maskSize: "100% 100%",
              WebkitMaskRepeat: "no-repeat",
              maskRepeat: "no-repeat",
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
        ) : null
      ) : (
        <div className="h-8 w-8 border-3 border-gray-200 border-t-transparent animate-spin rounded-full my-12 mx-auto"></div>
      )}

      <div className="flex flex-col gap-6">
        {!isOnProfilePage ? (
          <div className="flex flex-col gap-4 w-full">
            <p className="text-white">اكتب رد</p>
            <textarea
              value={reply}
              onChange={(e) => setReply(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  onReply();
                }
              }}
              className="w-full bg-gray-700 text-white p-2 rounded-2xl outline-0 max-h-60"
            />

            <label className="inline-flex items-center space-x-2 cursor-pointer w-fit">
              <input
                type="checkbox"
                checked={replyAsAnnonymous}
                onChange={(e) => onCheckAnonymous(e.target.checked)}
                className="form-checkbox h-5 w-5 text-blue-600 rounded-md border-gray-300 focus:ring-blue-500"
              />
              <span className="text-white">الرد كمجهول</span>
            </label>

            {!replyAsAnnonymous ? (
              <Input
                title="الاسم"
                value={!replyAsAnnonymous ? name : ""}
                onChange={(e) => setName(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    onReply();
                  }
                }}
              />
            ) : null}

            <Button
              icon={faPaperPlane}
              className="[&_svg]:rotate-225 block ms-auto h-10 w-28"
              loading={replyLoading}
              onClick={onReply}
            >
              إرسال
            </Button>
          </div>
        ) : null}

        <div className="flex items-center justify-end gap-4">
          <Button onClick={onShare} icon={faShare} className={buttonClassName}>
            مشاركة
          </Button>

          {isOnProfilePage ? <DeleteQuestion question={question} /> : null}
        </div>
      </div>
    </div>
  );
};
