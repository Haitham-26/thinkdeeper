import { User } from "@/model/user/User";
import { AuthClient } from "@/tools/AuthClient";
import getToken from "@/tools/getToken";
import { Profile } from "./_components/Profile";
import { QuestionContainerWithContext } from "./_components/QuestionContainerWithContext";

export default async function Page() {
  const token = await getToken();

  const { data: user } = await AuthClient<User>(
    `/user`,
    { method: "POST" },
    token
  );

  return (
    <main className="px-4 md:px-8 py-6 bg-gray-900 flex-1">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 relative">
        <QuestionContainerWithContext userId={user._id} />
        <Profile user={user} />
      </div>
    </main>
  );
}
