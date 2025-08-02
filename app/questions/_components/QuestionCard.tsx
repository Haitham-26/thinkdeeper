"use client";

import React, { useEffect, useState } from "react";
import { Question } from "@/model/question/Question";
import { Reply } from "@/model/reply/Reply";
import { AuthClient } from "@/tools/AuthClient";
import { Button } from "@/app/components/Button";
import { faShare } from "@fortawesome/free-solid-svg-icons/faShare";
import { usePathname } from "next/navigation";
import { formattedDate } from "@/tools/Date";
import { QuestionReply } from "./QuestionReply";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons/faPaperPlane";
import { NextClient } from "@/tools/NextClient";
import Link from "next/link";

const buttonClassName = "!bg-transparent text-white !p-1";

type QuestionCardProps = {
  question: Question;
};

export const QuestionCard: React.FC<QuestionCardProps> = ({ question }) => {
  const [replies, setReplies] = useState<Reply[]>([]);
  const [replyLoading, setReplyLoading] = useState(false);
  const [reply, setReply] = useState("");

  const pathname = usePathname();

  const isOnProfilePage = !Boolean(pathname.replace("/questions", "").length);

  const onShare = () => {
    navigator.clipboard.writeText(
      `${window.location.origin}/questions/${question._id}`
    );
  };

  const onReply = async () => {
    try {
      setReplyLoading(true);

      await NextClient(`/replies/${question._id}/reply`, {
        method: "POST",
        data: { reply },
      });

      const { data } = await AuthClient<Reply[]>(`/replies/${question._id}`, {
        method: "POST",
      });

      setReplies(data);
      setReply("");
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
        const { data } = await AuthClient<Reply[]>(`/replies/${question._id}`, {
          method: "POST",
        });
        setReplies(data);
      } catch (err) {
        console.error("Error fetching replies:", err);
      }
    };

    fetchReplies();
  }, [question._id]);

  return (
    <div className="p-6 bg-gray-800 rounded-2xl border-2 border-gray-700">
      <div className="flex flex-col gap-2 mb-4">
        {isOnProfilePage ? (
          <Link
            href={`/questions/${question._id}`}
            className="block text-white text-lg overflow-hidden whitespace-nowrap text-ellipsis"
          >
            {question.question}
          </Link>
        ) : (
          <h2 className="block text-white text-lg overflow-hidden whitespace-nowrap text-ellipsis">
            {question.question}
          </h2>
        )}

        <span className="text-gray-400 text-sm">
          {formattedDate(question.createdAt)}
        </span>
      </div>

      {replies.length ? (
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
            <QuestionReply key={reply._id} reply={reply} />
          ))}
        </div>
      ) : null}

      {!isOnProfilePage ? (
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2 w-full lg:w-2xl">
            <p className="text-white">اكتب رد</p>
            <textarea
              value={reply}
              onChange={(e) => setReply(e.target.value)}
              className="w-full bg-gray-700 text-white p-2 rounded-2xl outline-0 max-h-60"
            />
            <Button
              icon={faPaperPlane}
              className="[&_svg]:rotate-225 block ms-auto h-10 w-28"
              loading={replyLoading}
              onClick={onReply}
            >
              إرسال
            </Button>
          </div>

          <Button
            onClick={onShare}
            icon={faShare}
            className={`${buttonClassName} me-auto block`}
          >
            مشاركة
          </Button>
        </div>
      ) : null}
    </div>
  );
};
