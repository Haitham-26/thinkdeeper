import React from "react";
import { QuestionsRepliesProvider } from "../context/questions-replies-context";
import { QuestionsContainer } from "./QuestionsContainer";

type QuestionContainerWithContextProps = {
  userId: string | null;
  isLoggedIn: boolean;
};

export const QuestionContainerWithContext: React.FC<
  QuestionContainerWithContextProps
> = ({ userId, isLoggedIn = false }) => {
  return (
    <QuestionsRepliesProvider>
      <QuestionsContainer userId={userId} isLoggedIn={isLoggedIn} />
    </QuestionsRepliesProvider>
  );
};
