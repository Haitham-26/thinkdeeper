"use client";

import { useEffect, useState } from "react";
import { Question } from "@/model/question/Question";
import { QuestionCreateModal } from "./QuestionCreateModal";
import { QuestionCard } from "./QuestionCard";
import { NextClient } from "@/tools/NextClient";
import { useQuestionsReplies } from "../context/questions-replies-context";
import { Button } from "@/app/components/Button";

type QuestionsContainerProps = {
  userId: string | null;
};

export const QuestionsContainer: React.FC<QuestionsContainerProps> = ({
  userId,
}) => {
  const [createQuestionModalVisible, setCreateQuestionModalVisible] =
    useState(false);
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
    <section className="min-h-screen bg-background px-4 md:px-0">
      {/* Header */}
      <header className="max-w-3xl mx-auto mb-8 text-center">
        <h1 className="text-3xl md:text-4xl font-extrabold text-primary tracking-wide mb-4">
          أسئلتي 💬
        </h1>
        <p className="text-textMuted text-lg">
          هنا تلاقي كل الأسئلة اللي طرحتها وتتابع تفاعل الناس معها
        </p>
      </header>

      {/* Action bar */}
      <div className="max-w-3xl mx-auto flex justify-end mb-6">
        <Button
          onClick={() => setCreateQuestionModalVisible(true)}
          className="px-6 py-2 !bg-accent text-white font-semibold rounded-lg shadow hover:shadow-lg !hover:bg-accent/90 transition-all duration-200"
        >
          + سؤال جديد
        </Button>
      </div>

      {/* Questions List */}
      <div className="max-w-3xl mx-auto grid gap-4">
        {questions.length > 0 ? (
          questions.map((question) => (
            <div
              key={question._id}
              className="bg-surface border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <QuestionCard question={question} userId={userId} />
            </div>
          ))
        ) : (
          <p className="text-center text-textMuted py-12">
            لا توجد أسئلة بعد. جرب تضيف أول سؤال لك ✨
          </p>
        )}
      </div>

      {/* Modal */}
      <QuestionCreateModal
        userId={userId}
        open={createQuestionModalVisible}
        onClose={() => setCreateQuestionModalVisible(false)}
      />
    </section>
  );
};
