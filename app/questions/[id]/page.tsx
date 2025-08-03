import { AuthClient } from "@/tools/AuthClient";
import { Question } from "@/model/question/Question";
import { QuestionCardWithContext } from "./_components/QuestionCardWithContext";
import getToken from "@/tools/getToken";
import { User } from "@/model/user/User";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function Page(props: Props) {
  const { id } = await props.params;

  const token = await getToken();

  let user: User | null = null;
  let question: Question | null = null;

  try {
    const { data } = await AuthClient<Question>(`/questions/${id}`, {
      method: "GET",
    });

    question = data;
  } catch (e: any) {
    console.log(e);
  }

  if (token) {
    const { data } = await AuthClient<User>(
      `/user`,
      {
        method: "POST",
      },
      token
    );

    user = data;
  }

  if (!question) {
    return notFound();
  }

  return (
    <main className="px-4 md:px-8 py-6 bg-gray-900 flex-1">
      <div className="md:max-w-2xl mx-auto">
        <QuestionCardWithContext
          question={question}
          userId={user?._id || null}
        />
      </div>
    </main>
  );
}
