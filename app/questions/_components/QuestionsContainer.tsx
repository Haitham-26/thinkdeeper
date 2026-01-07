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
import { faInbox } from "@fortawesome/free-solid-svg-icons/faInbox";
import { Icon } from "@/app/components/Icon";

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
            <h1 className="my-3 text-4xl md:text-5xl font-black text-text-primary tracking-tight">
              نقاشاتي
            </h1>
            <p className="text-text-muted text-lg font-medium max-w-md">
              تابع النقاشات التي طرحتها وشاهد إجابات أصدقائك وتفاعلهم معك في
              مكان واحد.
            </p>
          </div>

          <Button
            onClick={() => setCreateQuestionModalVisible(true)}
            variant="primary"
            className="h-14 px-8 shadow-xl shadow-accent/20"
            icon={faPlus}
          >
            نقاش جديد
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
            <div className="flex flex-col items-center justify-center py-24 px-6 bg-surface border-2 border-dashed border-border rounded-[3rem] text-center">
              <div className="w-20 h-20 bg-surface-muted rounded-3xl flex items-center justify-center text-text-muted mb-6">
                <Icon icon={faInbox} className="text-3xl" />
              </div>
              <h3 className="text-2xl font-black text-text-primary mb-2">
                لا توجد نقاشات حالياً
              </h3>
              <p className="text-text-muted max-w-xs mx-auto mb-8">
                لم تقم بفتح أي نقاش بعد، ابدأ الآن وافتح أول نقاش لك مع متابعيك.
              </p>
              <Button
                variant="outline"
                onClick={() => setCreateQuestionModalVisible(true)}
                className="border-accent text-accent hover:bg-accent hover:text-white"
              >
                فتح نقاشك الأول
              </Button>
            </div>
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
