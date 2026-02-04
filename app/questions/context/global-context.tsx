"use client";

import { Message } from "@/model/message/types/Message";
import { Question } from "@/model/question/Question";
import { Reply } from "@/model/reply/Reply";
import { PageMeta } from "@/model/shared/types/PageMeta";
import { createContext, useContext, useState, ReactNode } from "react";

interface DataWithMeta<T> {
  data: T[];
  meta: PageMeta;
}

const defaultDataWithMeta = {
  data: [],
  meta: {
    currentPage: 1,
    hasNext: false,
    totalPages: 1,
    total: 0,
  },
};

type GlobalContextType = {
  questions: DataWithMeta<Question>;
  setQuestions: (questions: DataWithMeta<Question>) => void;
  replies: Reply[];
  setReplies: (replies: Reply[]) => void;
  messages: DataWithMeta<Message>;
  setMessages: (messages: DataWithMeta<Message>) => void;
  messagesLoading: boolean;
  setMessagesLoading: (loading: boolean) => void;
  globalMeta: PageMeta;
  setGlobalMeta: React.Dispatch<React.SetStateAction<PageMeta>>;
};

const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

export const GlobalProvider = ({ children }: { children: ReactNode }) => {
  const [questions, setQuestions] =
    useState<DataWithMeta<Question>>(defaultDataWithMeta);
  const [replies, setReplies] = useState<Reply[]>([]);
  const [messages, setMessages] =
    useState<DataWithMeta<Message>>(defaultDataWithMeta);

  const [messagesLoading, setMessagesLoading] = useState(false);

  const [globalMeta, setGlobalMeta] = useState<PageMeta>({
    currentPage: 1,
    hasNext: false,
    totalPages: 1,
    total: 0,
  });

  return (
    <GlobalContext.Provider
      value={{
        questions,
        setQuestions,
        replies,
        setReplies,
        messages,
        setMessages,
        messagesLoading,
        setMessagesLoading,
        globalMeta,
        setGlobalMeta,
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
