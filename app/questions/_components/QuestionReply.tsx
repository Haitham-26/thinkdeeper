import { Reply } from "@/model/reply/Reply";
import React from "react";

type QuestionReplyProps = {
  reply: Reply;
};

export const QuestionReply: React.FC<QuestionReplyProps> = ({ reply }) => {
  const formattedCreatedAt = new Date(reply.createdAt).toLocaleString();

  return (
    <div className="flex flex-col gap-2 p-2 border-b-1 border-b-gray-600">
      <p className="text-sm text-white">{reply.reply}</p>

      <span className="text-xs text-gray-400">{formattedCreatedAt}</span>
    </div>
  );
};
