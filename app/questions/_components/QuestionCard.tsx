"use client";

import React, { useEffect, useState } from "react";
import { Question } from "@/model/question/Question";
import { Reply } from "@/model/reply/Reply";
import { AuthClient } from "@/tools/AuthClient";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment } from "@fortawesome/free-solid-svg-icons/faComment";
import { ShareQuestion } from "./ShareQuestion";

type QuestionCardProps = {
  question: Question;
};

export const QuestionCard: React.FC<QuestionCardProps> = ({ question }) => {
  const [replies, setReplies] = useState<Reply[]>([]);

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
      <Link
        href={`/questions/${question._id}`}
        className="block text-white text-lg overflow-hidden whitespace-nowrap text-ellipsis"
      >
        {question.question}
      </Link>

      <div className="flex justify-end gap-4 h-8">
        <ShareQuestion questionId={question._id} />
        <Link
          href={`/questions/${question._id}`}
          className="!bg-transparent text-white !p-1 flex items-center gap-2"
        >
          الردود ({replies?.length || 0})
          <FontAwesomeIcon icon={faComment} />
        </Link>
      </div>
    </div>
  );
};
