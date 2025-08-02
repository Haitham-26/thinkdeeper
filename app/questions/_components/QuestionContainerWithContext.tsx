import React from "react";
import { QuestionsRepliesProvider } from "../context/questions-replies-context";
import { QuestionsContainer } from "./QuestionsContainer";

type QuestionContainerWithContextProps = {
  userId: string;
};

export const QuestionContainerWithContext: React.FC<
  QuestionContainerWithContextProps
> = ({ userId }) => {
  return (
    <QuestionsRepliesProvider>
      <QuestionsContainer userId={userId} />
    </QuestionsRepliesProvider>
  );
};
