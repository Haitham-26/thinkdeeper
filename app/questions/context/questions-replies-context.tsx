"use client";

import { Question } from "@/model/question/Question";
import { Reply } from "@/model/reply/Reply";
import { createContext, useContext, useState, ReactNode } from "react";

type QuestionsRepliesContextType = {
  questions: Question[];
  setQuestions: (questions: Question[]) => void;
  replies: Reply[];
  setReplies: (replies: Reply[]) => void;
};

const QuestionsRepliesContext = createContext<
  QuestionsRepliesContextType | undefined
>(undefined);

export const QuestionsRepliesProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [replies, setReplies] = useState<Reply[]>([]);

  return (
    <QuestionsRepliesContext.Provider
      value={{ questions, setQuestions, replies, setReplies }}
    >
      {children}
    </QuestionsRepliesContext.Provider>
  );
};

export const useQuestionsReplies = () => {
  const context = useContext(QuestionsRepliesContext);

  if (!context) {
    throw new Error(
      "useQuestionsReplies must be used within a QuestionsRepliesProvider"
    );
  }

  return context;
};
