import { AuthClient } from "@/tools/AuthClient";
import { QuestionCard } from "../_components/QuestionCard";
import { Question } from "@/model/question/Question";
import { Reply } from "@/model/reply/Reply";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function Page(props: Props) {
  const { id } = await props.params;

  const { data: question } = await AuthClient<Question>(`/questions/${id}`, {
    method: "GET",
  });

  const { data: replies } = await AuthClient<Reply[]>(`/replies/${id}`, {
    method: "POST",
  });

  if (!question) {
    return <div>Question not found</div>;
  }

  return (
    <main className="px-4 md:px-8 py-6 bg-gray-900 flex-1">
      <QuestionCard question={question} replies={replies} />
    </main>
  );
}
