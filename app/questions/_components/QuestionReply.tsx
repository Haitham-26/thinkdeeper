"use client";

import { Button } from "@/app/components/Button";
import { Reply } from "@/model/reply/Reply";
import { formattedDate } from "@/tools/Date";
import { NextClient } from "@/tools/NextClient";
import { faHeart } from "@fortawesome/free-solid-svg-icons/faHeart";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons/faUserCircle";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";

type QuestionReplyProps = {
  reply: Reply;
  userId: string | null;
};

export const QuestionReply: React.FC<QuestionReplyProps> = ({
  reply: _reply,
  userId,
}) => {
  const [reply, setReply] = useState<Reply>(_reply);

  const onLike = async () => {
    try {
      if (!userId) {
        return;
      }

      await NextClient(`/replies/${reply._id}/toggle-like`, {
        method: "POST",
      });

      const { data: updatedReply } = await NextClient<Reply>(
        `/replies/${reply._id}`,
        {
          method: "POST",
        }
      );

      const { data } = await NextClient<{ hasLiked: boolean }>(
        `/replies/${reply._id}/has-liked`,
        {
          method: "POST",
        }
      );

      setReply({ ...updatedReply, hasLiked: data.hasLiked });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="flex flex-col gap-2 p-2 border-b-1 border-b-gray-600">
      <div className="flex items-center gap-2">
        <FontAwesomeIcon icon={faUserCircle} className="text-white !w-6 !h-6" />

        <p className="text-white font-semibold">{reply.name}</p>
      </div>

      <p className="text-sm text-gray-100 ms-8">{reply.reply}</p>

      <Button
        onClick={onLike}
        icon={faHeart}
        className={`!bg-transparent !p-0 text-white ${
          reply.hasLiked ? "!text-red-500" : ""
        } hover:!text-red-500 w-fit block ms-auto transition-none`}
      >
        <span className="!text-white">{reply.likesCount || 0}</span>
      </Button>

      <p className="text-xs text-gray-400 ms-auto">
        {formattedDate(reply.createdAt)}
      </p>
    </div>
  );
};
