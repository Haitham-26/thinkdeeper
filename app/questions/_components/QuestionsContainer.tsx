"use client";

import { useEffect } from "react";
import { Question } from "@/model/question/Question";
import { QuestionCreateSection } from "./QuestionCreateSection";
import { QuestionCard } from "./QuestionCard";
import { NextClient } from "@/tools/NextClient";
import { useQuestionsReplies } from "../context/questions-replies-context";

type QuestionsContainerProps = {
  userId: string | null;
};

export const QuestionsContainer: React.FC<QuestionsContainerProps> = ({
  userId,
}) => {
  const { questions, setQuestions } = useQuestionsReplies();

  useEffect(() => {
    const fetchQuestions = async () => {
      const { data } = await NextClient<Array<Question>>("/questions", {
        method: "POST",
        data: { userId },
      });

      setQuestions(data);
    };

    fetchQuestions();
  }, [userId, setQuestions]);

  return (
    <div className="flex flex-col gap-6 order-3 lg:order-2">
      <p className="text-white text-2xl text-center font-bold">أسئلتي</p>

      <QuestionCreateSection userId={userId} />

      <div className="flex flex-col gap-2">
        {questions.map((question) => (
          <QuestionCard
            key={question._id}
            question={question}
            userId={userId}
          />
        ))}
      </div>
    </div>
  );
};
