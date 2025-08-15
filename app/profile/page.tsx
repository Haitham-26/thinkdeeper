import { User } from "@/model/user/User";
import { AuthClient } from "@/tools/AuthClient";
import { formattedDate } from "@/tools/Date";
import getToken from "@/tools/getToken";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons/faUserCircle";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default async function Page() {
  const token = await getToken();

  const { data: user } = await AuthClient<User>(
    `/user`,
    { method: "POST" },
    token
  );

  return (
    <div className="px-4 md:px-8 py-10 bg-primary flex-grow">
      <div className="flex flex-col flex-grow md:max-w-3xl mx-auto">
        <div
          className="bg-fixed bg-center bg-cover rounded-xl rounded-b-none overflow-hidden"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1470&q=80')",
          }}
        >
          <p className="text-secondary text-center text-2xl md:text-3xl font-extrabold bg-primary/60 py-6 drop-shadow-lg">
            الملف الشخصي
          </p>
        </div>

        <div className="flex flex-col md:items-center md:flex-row gap-6 p-6 shadow-lg bg-surface rounded-xl rounded-t-none text-primary">
          <FontAwesomeIcon
            icon={faUserCircle}
            size="5x"
            className="mx-auto md:mx-0"
          />

          <div className="flex flex-col gap-3 text-lg font-semibold">
            <p>
              <span className="font-bold text-text-muted">الاسم:</span>{" "}
              <span className="text-text-primary">{user.name}</span>
            </p>

            <p>
              <span className="font-bold text-text-muted">تاريخ الانضمام:</span>{" "}
              <span className="text-text-primary">
                {formattedDate(user.createdAt)}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
