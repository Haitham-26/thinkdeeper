import { User } from "@/model/user/User";
import { AuthClient } from "@/tools/AuthClient";
import getToken from "@/tools/getToken";
import { QuestionsContainer } from "./_components/QuestionsContainer";

export default async function Page() {
  const token = await getToken();

  let user: User | null = null;

  if (token) {
    try {
      const { data } = await AuthClient<User>(
        `/user`,
        { method: "POST" },
        token,
      );

      user = data;
    } catch (e) {
      console.log(e);
    }
  }

  return <QuestionsContainer userId={user?._id || null} />;
}
