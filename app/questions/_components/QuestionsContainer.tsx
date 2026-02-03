"use client";

import { useMemo, useState } from "react";
import { QuestionCreateModal } from "./QuestionCreateModal";
import { QuestionCard } from "./QuestionCard";
import { useGlobalContext } from "../context/global-context";
import { Button } from "@/app/components/Button";
import { faPlus } from "@fortawesome/free-solid-svg-icons/faPlus";
import { faComments } from "@fortawesome/free-solid-svg-icons/faComments";
import { Icon } from "@/app/components/Icon";
import { Empty } from "@/app/components/Empty";
import { Spinner } from "@/app/components/Spinner";
import { Pagination } from "@/app/components/Pagination";

type QuestionsContainerProps = {
  userId: string | null;
};

export const QuestionsContainer: React.FC<QuestionsContainerProps> = ({
  userId,
}) => {
  const [createQuestionModalVisible, setCreateQuestionModalVisible] =
    useState(false);
  const [questionsLoading, setQuestionsLoading] = useState(false);
  const { questions, setQuestions } = useGlobalContext();

  const paginationAction = useMemo(
    () => ({
      endpoint: "/questions",
      method: "POST" as const,
      data: { userId },
    }),
    [userId],
  );

  return (
    <div className="w-full min-h-screen bg-surface-muted p-4 pt-6 md:p-8 lg:p-12">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
        <aside className="lg:col-span-4 space-y-6">
          <div className="bg-primary rounded-[2.5rem] p-8 text-secondary shadow-2xl relative overflow-hidden group">
            <div className="absolute top-[-20%] right-[-20%] w-40 h-40 bg-accent rounded-full blur-[60px] opacity-20 group-hover:opacity-40 transition-opacity"></div>

            <div className="relative z-10">
              <div className="inline-flex items-center justify-center p-3 bg-secondary/10 backdrop-blur-md rounded-2xl mb-6">
                <Icon icon={faComments} className="text-accent text-2xl" />
              </div>
              <h1 className="text-4xl font-black mb-4 leading-tight">
                مركز الأسئلة
              </h1>
              <p className="text-secondary/60 font-medium text-sm leading-relaxed mb-8">
                قم بإدارة تساؤلاتك، وتابع تفاعل أصدقائك مع المواضيع التي تطرحها.
              </p>

              <div className="flex items-baseline gap-2 mb-8">
                <span className="text-6xl font-black text-accent">
                  {questions.meta.total}
                </span>
                <span className="text-secondary/40 text-sm font-bold tracking-widest uppercase">
                  سؤال نشط
                </span>
              </div>

              <Button
                onClick={() => setCreateQuestionModalVisible(true)}
                className="w-full !h-14 !rounded-2xl !bg-accent !text-secondary font-black shadow-lg shadow-accent/20 transition-transform"
                icon={faPlus}
              >
                طرح سؤال جديد
              </Button>
            </div>
          </div>
        </aside>

        <main className="lg:col-span-8">
          <div className="bg-surface border border-border rounded-[3rem] shadow-sm min-h-[600px] flex flex-col overflow-hidden">
            <div className="px-8 py-6 border-b border-border flex justify-between items-center bg-white/50 backdrop-blur-sm">
              <h2 className="font-bold text-text-primary flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-accent animate-pulse"></span>
                قائمة الأسئلة
              </h2>
            </div>

            <div className="flex-1 p-6 md:p-8">
              {!questionsLoading ? (
                questions.data.length ? (
                  <div className="space-y-6 group/list">
                    {questions.data.map((question) => (
                      <div
                        key={question._id}
                        className="transition-all duration-500 hover:!blur-none group-hover/list:blur-[2px] group-hover/list:opacity-50 hover:!opacity-100"
                      >
                        <QuestionCard question={question} userId={userId} />
                      </div>
                    ))}
                  </div>
                ) : (
                  <Empty
                    title="لا توجد أسئلة حالياً"
                    description="لم تقم بإضافة أي سؤال بعد. ابدأ الآن وشارك أول تساؤل لك مع العالم!"
                    action={{
                      title: "أضف سؤالك الأول",
                      onClick: () => setCreateQuestionModalVisible(true),
                    }}
                  />
                )
              ) : (
                <Spinner className="text-accent static" />
              )}

              <Pagination
                action={paginationAction}
                setData={setQuestions}
                setLoading={setQuestionsLoading}
              />
            </div>
          </div>
        </main>
      </div>

      <QuestionCreateModal
        userId={userId}
        open={createQuestionModalVisible}
        onClose={() => setCreateQuestionModalVisible(false)}
      />
    </div>
  );
};
