import { AuthClient } from "@/tools/AuthClient";
import { Question } from "@/model/question/Question";
import { QuestionCardWithContext } from "./_components/QuestionCardWithContext";
import getToken from "@/tools/getToken";
import { User } from "@/model/user/User";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function Page(props: Props) {
  const { id } = await props.params;

  const token = await getToken();

  let user: User | null = null;

  const { data: question } = await AuthClient<Question>(`/questions/${id}`, {
    method: "GET",
  });

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
    return <div>Question not found</div>;
  }

  return (
    <main className="px-4 md:px-8 py-6 bg-gray-900 flex-1">
      <QuestionCardWithContext
        question={question}
        isLoggedIn={Boolean(token?.length)}
        userId={user?._id || null}
      />
    </main>
  );
}
