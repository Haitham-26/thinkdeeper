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
    <div className="flex flex-col order-3 lg:order-2 md:max-w-3xl px-4 md:px-8 mx-auto">
      <div
        className="bg-fixed bg-center bg-cover rounded-xl rounded-b-none overflow-hidden shadow-lg"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1470&q=80')",
        }}
      >
        <p className="text-secondary text-center text-2xl md:text-3xl font-extrabold bg-primary/60 py-6 drop-shadow-lg">
          أسئلتي
        </p>
      </div>
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
