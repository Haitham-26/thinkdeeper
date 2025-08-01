import { Button } from "@/app/components/Button";
import { faShare } from "@fortawesome/free-solid-svg-icons/faShare";
import React from "react";

type ShareQuestionProps = {
  questionId: string;
};

export const ShareQuestion: React.FC<ShareQuestionProps> = ({ questionId }) => {
  const onShare = () => {
    navigator.clipboard.writeText(
      `${window.location.origin}/questions/${questionId}`
    );
  };

  return (
    <Button
      onClick={onShare}
      icon={faShare}
      className="!bg-transparent text-white !p-1"
    >
      مشاركة
    </Button>
  );
};
