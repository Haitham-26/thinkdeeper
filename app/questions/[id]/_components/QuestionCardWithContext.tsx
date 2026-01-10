"use client";

import React, { useState } from "react";
import { QuestionsRepliesProvider } from "../../context/questions-replies-context";
import { QuestionCard } from "../../_components/QuestionCard";
import { Question } from "@/model/question/Question";
import { Modal } from "@/app/components/Modal";
import { Button } from "@/app/components/Button";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons/faUserPlus";
import { faHeart } from "@fortawesome/free-solid-svg-icons/faHeart";
import { faComments } from "@fortawesome/free-solid-svg-icons/faComments";

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
        title="انضم إلينا"
        open={registerModalVisible}
        onClose={() => setRegisterModalVisible(false)}
      >
        <div className="flex flex-col items-center text-center">
          <div className="flex gap-4 mb-6">
            <div className="w-14 h-14 bg-accent/10 text-accent rounded-2xl flex items-center justify-center -rotate-12">
              <FontAwesomeIcon icon={faHeart} className="text-2xl" />
            </div>
            <div className="w-14 h-14 bg-primary/10 text-primary rounded-2xl flex items-center justify-center rotate-12">
              <FontAwesomeIcon icon={faComments} className="text-2xl" />
            </div>
          </div>

          <h3 className="text-2xl font-black text-text-primary mb-3">
            تحتاج لتسجيل الدخول أولاً
          </h3>

          <p className="text-text-muted leading-relaxed mb-8">
            قم بإنشاء حساب أو تسجيل الدخول لتتمكن من الإعجاب بالردود على
            الأسئلة.
          </p>

          <div className="flex flex-col gap-3 w-full">
            <Link href="/auth/signup" className="w-full">
              <Button
                variant="primary"
                className="w-full h-14 rounded-2xl text-lg shadow-xl shadow-accent/20"
                icon={faUserPlus}
              >
                إنشاء حساب جديد
              </Button>
            </Link>

            <Link
              href="/auth/login"
              className="w-full h-14 rounded-2xl font-bold text-text-muted hover:text-text-primary hover:bg-surface-muted transition-colors duration-300 flex items-center justify-center gap-2"
            >
              لديك حساب بالفعل؟ تسجيل الدخول
            </Link>
          </div>

          <p className="mt-6 text-xs text-text-muted/60 font-medium">
            انضم لآلاف المستخدمين الذين يشاركون بصدق وأمان.
          </p>
        </div>
      </Modal>
    </QuestionsRepliesProvider>
  );
};
