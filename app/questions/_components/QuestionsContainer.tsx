"use client";

import { useEffect, useState } from "react";
import { Question } from "@/model/question/Question";
import { QuestionCreateModal } from "./QuestionCreateModal";
import { QuestionCard } from "./QuestionCard";
import { NextClient } from "@/tools/NextClient";
import { useQuestionsReplies } from "../context/questions-replies-context";
import { Button } from "@/app/components/Button";
import { faPlus } from "@fortawesome/free-solid-svg-icons/faPlus";
import { faComments } from "@fortawesome/free-solid-svg-icons/faComments";
import { Icon } from "@/app/components/Icon";
import { Empty } from "@/app/components/Empty";

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
    <section className="min-h-screen bg-background pt-32 pb-20 px-4 w-full">
      <div className="max-w-4xl mx-auto">
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-accent/10 text-accent text-sm font-bold">
              <Icon icon={faComments} />
              <span>إدارة المحتوى</span>
            </div>
            <h1 className="my-6 text-4xl md:text-5xl font-black text-text-primary tracking-tight">
              أسئلتي
            </h1>
            <p className="text-text-muted text-lg font-medium max-w-md">
              تابع الأسئلة التي طرحتها وشاهد إجابات أصدقائك وتفاعلهم معك.
            </p>
          </div>

          <Button
            onClick={() => setCreateQuestionModalVisible(true)}
            variant="primary"
            className="h-14 px-8 shadow-xl shadow-accent/20"
            icon={faPlus}
          >
            سؤال جديد
          </Button>
        </header>

        <div className="grid gap-6">
          {questions.length > 0 ? (
            questions.map((question) => (
              <div
                key={question._id}
                className="transform transition-all duration-300 hover:-translate-y-1"
              >
                <QuestionCard question={question} userId={userId} />
              </div>
            ))
          ) : (
            <Empty
              title="لا توجد أسئلة حالياً"
              description="لم تقم بإضافة أي سؤال بعد، قم بمشاركة أول سؤال لك الآن."
              action={{
                title: "أضف سؤالًا جديدًا",
                onClick: () => setCreateQuestionModalVisible(true),
              }}
            />
          )}
        </div>
      </div>

      <QuestionCreateModal
        userId={userId}
        open={createQuestionModalVisible}
        onClose={() => setCreateQuestionModalVisible(false)}
      />
    </section>
  );
};
