import { User } from "@/model/user/User";
import { AuthClient } from "@/tools/AuthClient";
import getToken from "@/tools/getToken";
import { QuestionContainerWithContext } from "./_components/QuestionContainerWithContext";

export default async function Page() {
  const token = await getToken();

  const { data: user } = await AuthClient<User>(
    `/user`,
    { method: "POST" },
    token
  );

  return (
    <main className="flex-grow py-10">
      <QuestionContainerWithContext userId={user?._id || null} />
    </main>
  );
}
