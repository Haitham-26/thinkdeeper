import { Question } from "@/model/question/Question";
import React from "react";

type QuestionCardProps = {
  question: Question;
};

export const QuestionCard: React.FC<QuestionCardProps> = ({ question }) => {
  const formattedCreatedAt = new Date(question.createdAt).toLocaleString();

  return (
    <div className="p-6 bg-gray-800 rounded-2xl border-2 border-gray-700">
      <p className="text-white text-lg">{question.question}</p>
      <span className="text-gray-400 text-sm">{formattedCreatedAt}</span>
    </div>
  );
};
