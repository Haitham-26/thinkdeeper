import React from "react";
import { QuestionsRepliesProvider } from "../../context/questions-replies-context";
import { QuestionCard } from "../../_components/QuestionCard";
import { Question } from "@/model/question/Question";

type QuestionCardWithContextProps = {
  question: Question;
  isLoggedIn: boolean;
  userId: string | null;
};

export const QuestionCardWithContext: React.FC<
  QuestionCardWithContextProps
> = ({ question, isLoggedIn = false, userId }) => {
  return (
    <QuestionsRepliesProvider>
      <QuestionCard
        question={question}
        isLoggedIn={isLoggedIn}
        userId={userId}
      />
    </QuestionsRepliesProvider>
  );
};
