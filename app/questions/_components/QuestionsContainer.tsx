"use client";

import { useEffect, useState } from "react";
import { Question } from "@/model/question/Question";
import { QuestionCreateSection } from "./QuestionCreateSection";
import { QuestionCard } from "./QuestionCard";
import { NextClient } from "@/tools/NextClient";

export default function QuestionsContainer({ userId }: { userId: string }) {
  const [questions, setQuestions] = useState<Question[]>([]);

  useEffect(() => {
    const fetchQuestions = async () => {
      const { data } = await NextClient<Array<Question>>("/questions", {
        method: "POST",
        data: { userId },
      });

      setQuestions(data);
    };

    fetchQuestions();
  }, [userId]);

  const handleQuestionCreated = (updatedQuestions: Question[]) => {
    setQuestions(updatedQuestions);
  };

  return (
    <div className="flex flex-col gap-6 order-3 lg:order-2">
      <p className="text-white text-2xl text-center font-bold">أسئلتي</p>

      <QuestionCreateSection userId={userId} onCreate={handleQuestionCreated} />

      <div className="flex flex-col gap-2">
        {questions.map((question) => (
          <QuestionCard key={question._id} question={question} />
        ))}
      </div>
    </div>
  );
}
