"use client";

import { Button } from "@/app/components/Button";
import { WarningModal } from "@/app/components/WarningModal";
import { Question } from "@/model/question/Question";
import { NextClient } from "@/tools/NextClient";
import { faTrash } from "@fortawesome/free-solid-svg-icons/faTrash";
import React, { Fragment, useState } from "react";
import toast from "react-hot-toast";
import { useQuestionsReplies } from "../context/questions-replies-context";

type DeleteQuestionProps = {
  question: Question;
};

export const DeleteQuestion: React.FC<DeleteQuestionProps> = ({ question }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const { setQuestions } = useQuestionsReplies();

  const onDelete = async () => {
    try {
      setLoading(true);

      await NextClient(`/questions/${question._id}/delete`, {
        method: "DELETE",
      });
      const { data: updatedQuestions } = await NextClient<Question[]>(
        "/questions",
        {
          method: "POST",
          data: { userId: question.userId },
        }
      );

      setQuestions(updatedQuestions);

      setModalVisible(false);

      toast.success("تم حذف السؤال بنجاح");
    } catch (e: any) {
      console.log(e);
      toast.error(e.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Fragment>
      <Button
        onClick={() => setModalVisible(true)}
        icon={faTrash}
        className="!bg-danger text-secondary hover:!bg-danger/90"
      >
        حذف
      </Button>

      <WarningModal
        open={modalVisible}
        onClose={() => setModalVisible(false)}
        onConfirm={onDelete}
        loading={loading}
        title={`حذف السؤال "${question.question}"`}
      />
    </Fragment>
  );
};
