"use client";

import { useEffect, useState } from "react";
import { NextClient } from "@/tools/NextClient";
import { Button } from "@/app/components/Button";
import { Spinner } from "@/app/components/Spinner";
import { QuestionCard } from "../_components/QuestionCard";
import { GetPublicQuestionsResponseDto } from "@/model/question/dto/GetPublicQuestionsResponseDto";
import { Question } from "@/model/question/Question";
import { User } from "@/model/user/User";

export default function Page() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasNext, setHasNext] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);

  const fetchQuestions = async (pageNumber: number) => {
    try {
      const isInitial = pageNumber === 1;
      if (isInitial) setLoading(true);
      else setLoadingMore(true);

      const { data } = await NextClient<GetPublicQuestionsResponseDto>(
        `/questions/public?page=${pageNumber}&limit=10`,
      );

      if (isInitial) {
        setQuestions(data.data);
      } else {
        setQuestions((prev) => [...prev, ...data.data]);
      }

      setHasNext(data.meta?.hasNext);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  useEffect(() => {
    const getUser = async () => {
      try {
        const { data } = await NextClient<User>("/user", {
          method: "POST",
        });

        setUserId(data._id);
      } catch (e) {
        console.log(e);
      }
    };

    fetchQuestions(1);
    getUser();
  }, []);

  const loadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchQuestions(nextPage);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <Spinner className="!w-10 !h-10 text-accent" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8">
      <header className="mb-8 text-center">
        <h1 className="text-3xl font-black text-text-primary mb-2">
          الأسئلة العامة
        </h1>
        <p className="text-slate-500">
          استكشف آخر الأسئلة التي تمت مشاركتها من قبل المجتمع
        </p>
      </header>

      <div className="space-y-6">
        {questions.length ? (
          questions.map((q) => (
            <QuestionCard key={q._id} userId={userId} question={q} />
          ))
        ) : (
          <div className="text-center py-20 bg-surface border border-dashed border-border rounded-3xl">
            <p className="text-slate-400">لا توجد أسئلة عامة حالياً</p>
          </div>
        )}
      </div>

      {hasNext ? (
        <div className="mt-12 flex justify-center">
          <Button
            onClick={loadMore}
            loading={loadingMore}
            className="!px-12 !rounded-full"
            variant="secondary"
          >
            عرض المزيد
          </Button>
        </div>
      ) : null}
    </div>
  );
}
