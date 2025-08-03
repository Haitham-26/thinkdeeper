"use client";

import React, { useState } from "react";
import { QuestionsRepliesProvider } from "../../context/questions-replies-context";
import { QuestionCard } from "../../_components/QuestionCard";
import { Question } from "@/model/question/Question";
import { Modal } from "@/app/components/Modal";
import Link from "next/link";

type QuestionCardWithContextProps = {
  question: Question;
  userId: string | null;
};

export const QuestionCardWithContext: React.FC<
  QuestionCardWithContextProps
> = ({ question, userId }) => {
  const [registerModalVisible, setRegisterModalVisible] = useState(false);

  return (
    <QuestionsRepliesProvider>
      <QuestionCard
        question={question}
        userId={userId}
        openRegisterModal={() => setRegisterModalVisible(true)}
      />

      <Modal
        title="سجل الآن"
        open={registerModalVisible}
        onClose={() => setRegisterModalVisible(false)}
      >
        <div className="flex flex-col gap-4">
          <p className="text-gray-100">قم بتسجيل الدخول لتتمكن من التفاعل</p>

          <Link
            href="/auth/login"
            className={`bg-white text-black py-2 px-5 rounded-md w-fit ms-auto block text-cente0r hover:bg-gray-200 transition-colors duration-300 ease-in-out`}
          >
            تسجيل الدخول
          </Link>
        </div>
      </Modal>
    </QuestionsRepliesProvider>
  );
};
