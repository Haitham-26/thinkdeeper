import React from "react";
import { QuestionsRepliesProvider } from "../../context/questions-replies-context";
import { QuestionCard } from "../../_components/QuestionCard";
import { Question } from "@/model/question/Question";

type QuestionCardWithContextProps = {
  question: Question;
};

export const QuestionCardWithContext: React.FC<
  QuestionCardWithContextProps
> = ({ question }) => {
  return (
    <QuestionsRepliesProvider>
      <QuestionCard question={question} />
    </QuestionsRepliesProvider>
  );
};
