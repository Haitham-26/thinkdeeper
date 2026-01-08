import { User } from "@/model/user/User";
import { AuthClient } from "@/tools/AuthClient";
import getToken from "@/tools/getToken";
import { QuestionContainerWithContext } from "./_components/QuestionContainerWithContext";

export default async function Page() {
  const token = await getToken();

  let user: User | null = null;

  if (token) {
    try {
      const { data } = await AuthClient<User>(
        `/user`,
        { method: "POST" },
        token
      );

      user = data;
    } catch (e) {
      console.log(e);
    }
  }

  return <QuestionContainerWithContext userId={user?._id || null} />;
}
