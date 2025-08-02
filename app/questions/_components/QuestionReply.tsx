import { Reply } from "@/model/reply/Reply";
import { formattedDate } from "@/tools/Date";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons/faUserCircle";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

type QuestionReplyProps = {
  reply: Reply;
};

export const QuestionReply: React.FC<QuestionReplyProps> = ({ reply }) => {
  return (
    <div className="flex flex-col gap-2 p-2 border-b-1 border-b-gray-600">
      <div className="flex items-center gap-2">
        <FontAwesomeIcon icon={faUserCircle} className="text-white !w-6 !h-6" />

        <p className="text-white font-semibold">{reply.name}</p>
      </div>

      <p className="text-sm text-gray-100 ms-8">{reply.reply}</p>

      <p className="text-xs text-gray-400 ms-auto">
        {formattedDate(reply.createdAt)}
      </p>
    </div>
  );
};
