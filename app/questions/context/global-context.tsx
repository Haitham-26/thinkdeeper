"use client";

import { Message } from "@/model/message/types/Message";
import { Question } from "@/model/question/Question";
import { Reply } from "@/model/reply/Reply";
import { createContext, useContext, useState, ReactNode } from "react";

type GlobalContextType = {
  questions: Question[];
  setQuestions: (questions: Question[]) => void;
  replies: Reply[];
  setReplies: (replies: Reply[]) => void;
  messages: Message[];
  setMessages: (messages: Message[]) => void;
};

const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

export const GlobalProvider = ({ children }: { children: ReactNode }) => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [replies, setReplies] = useState<Reply[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);

  return (
    <GlobalContext.Provider
      value={{
        questions,
        setQuestions,
        replies,
        setReplies,
        messages,
        setMessages,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => {
  const context = useContext(GlobalContext);

  if (!context) {
    throw new Error("useGlobalContext must be used within a GlobalProvider");
  }

  return context;
};
