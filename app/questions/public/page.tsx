"use client";

import { Fragment, useEffect, useState } from "react";
import { NextClient } from "@/tools/NextClient";
import { Spinner } from "@/app/components/Spinner";
import { QuestionCard } from "../_components/QuestionCard";
import { GetPublicQuestionsResponseDto } from "@/model/question/dto/GetPublicQuestionsResponseDto";
import { Question } from "@/model/question/Question";
import { User } from "@/model/user/User";
import { Icon } from "@/app/components/Icon";
import { faAngleRight, faAngleLeft } from "@fortawesome/free-solid-svg-icons";

export default function Page() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [hasNext, setHasNext] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);

  const fetchQuestions = async (pageNumber: number) => {
    try {
      setLoading(true);
      const { data } = await NextClient<GetPublicQuestionsResponseDto>(
        `/questions/public`,
        {
          params: {
            page: pageNumber,
            limit: 3,
          },
        },
      );

      setQuestions(data.data);
      setHasNext(data.meta?.hasNext);

      if (data.meta?.total) {
        setTotalPages(Math.ceil(data.meta.total / 3));
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const getUser = async () => {
      try {
        const { data } = await NextClient<User>("/user", { method: "POST" });
        setUserId(data._id);
      } catch (e) {
        console.log(e);
      }
    };
    getUser();
  }, []);

  useEffect(() => {
    fetchQuestions(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [page]);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  const renderPageNumbers = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`cursor-pointer w-10 h-10 rounded-xl font-black transition-all ${
            page === i
              ? "bg-accent text-white shadow-lg shadow-accent/20"
              : "bg-surface border border-border text-text-muted hover:border-accent hover:text-accent"
          }`}
        >
          {i}
        </button>,
      );
    }
    return pages;
  };

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-8 pt-6">
      <div>
        <h1 className="text-3xl font-black text-text-primary mb-2">
          الأسئلة العامة
        </h1>
        <p className="text-slate-500 mb-8">
          استكشف آخر الأسئلة التي تمت مشاركتها من قبل المجتمع
        </p>
      </div>

      {loading ? (
        <Spinner className="!w-10 !h-10 !text-accent" />
      ) : (
        <Fragment>
          <div className="flex flex-col gap-6 mb-12 min-h-[400px]">
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

          {totalPages > 1 ? (
            <div className="flex items-center justify-center gap-2 mt-8 pb-12">
              <button
                disabled={page === 1}
                onClick={() => handlePageChange(page - 1)}
                className="cursor-pointer w-10 h-10 flex items-center justify-center rounded-xl bg-surface border border-border text-text-muted disabled:!opacity-30 disabled:!cursor-not-allowed hover:border-accent hover:text-accent transition-all"
              >
                <Icon icon={faAngleRight} />
              </button>

              <div className="flex items-center gap-2">
                {renderPageNumbers()}
              </div>

              <button
                disabled={!hasNext}
                onClick={() => handlePageChange(page + 1)}
                className="cursor-pointer w-10 h-10 flex items-center justify-center rounded-xl bg-surface border border-border text-text-muted disabled:!opacity-30 disabled:!cursor-not-allowed hover:border-accent hover:text-accent transition-all"
              >
                <Icon icon={faAngleLeft} />
              </button>
            </div>
          ) : null}
        </Fragment>
      )}
    </div>
  );
}
