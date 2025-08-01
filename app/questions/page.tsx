import { Question } from "@/model/question/Question";
import { User } from "@/model/user/User";
import { AuthClient } from "@/tools/AuthClient";
import getToken from "@/tools/getToken";
import { QuestionCreateSection } from "./_components/QuestionCreateSection";
import { QuestionCard } from "./_components/QuestionCard";
import { Profile } from "./_components/Profile";

export default async function Page() {
  const token = await getToken();

  const { data: user } = await AuthClient<User>(
    `/user`,
    {
      method: "POST",
    },
    token
  );

  const { data: questions } = await AuthClient<Array<Question>>(
    "/questions",
    {
      method: "POST",
      data: {
        userId: user._id,
      },
    },
    token
  );

  return (
    <main className="px-4 md:px-8 py-6 bg-gray-900 flex-1">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 relative">
        <QuestionCreateSection userId={user._id} />

        <div className="flex flex-col gap-6 order-3 lg:order-2">
          <p className="text-white text-2xl text-center font-bold">أسئلتي</p>

          <div className="flex flex-col gap-2">
            {questions.map((question) => (
              <QuestionCard key={question._id} question={question} />
            ))}
          </div>
        </div>

        <Profile user={user} questionsLength={questions.length} />
      </div>
    </main>
  );
}
