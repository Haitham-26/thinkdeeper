"use client";

import { useEffect, useState } from "react";
import { NextClient } from "@/tools/NextClient";
import { QuestionCard } from "../_components/QuestionCard";
import { User } from "@/model/user/User";
import { Icon } from "@/app/components/Icon";
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";
import { Pagination } from "@/app/components/Pagination";
import { useGlobalContext } from "../context/global-context";

export default function Page() {
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState<string | null>(null);

  const { setQuestions, questions } = useGlobalContext();

  useEffect(() => {
    (async () => {
      try {
        const { data } = await NextClient<User>("/user", { method: "POST" });
        setUserId(data._id);
      } catch (e) {
        console.log(e);
      }
    })();
  }, []);

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-8 pt-6">
      <header className="mb-8">
        <h1 className="text-3xl font-black text-text-primary mb-2">
          أسئلة المنتدى
        </h1>
        <p className="text-slate-500 text-sm">
          استكشف آخر الأسئلة من مجتمع{" "}
          <span className="text-accent">بصراحة</span>
        </p>
      </header>

      {loading ? (
        <div className="flex items-center justify-center min-h-[400px] text-accent">
          <Icon icon={faCircleNotch} className="animate-spin text-xl" />
        </div>
      ) : (
        <div className="flex flex-col gap-6 mb-12 min-h-[400px]">
          {questions.length ? (
            questions.map((q) => (
              <QuestionCard key={q._id} userId={userId} question={q} />
            ))
          ) : (
            <div className="text-center py-20 bg-surface border border-dashed border-border rounded-3xl text-slate-400">
              لا توجد أسئلة عامة حالياً
            </div>
          )}
        </div>
      )}

      <Pagination
        endpoint="/questions/public"
        setData={setQuestions}
        setLoading={setLoading}
        limit={1}
      />
    </div>
  );
}
