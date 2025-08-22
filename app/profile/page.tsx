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
    <div className="min-h-screen bg-background px-4 md:px-8 py-10 flex-grow">
      <div className="md:max-w-4xl mx-auto flex flex-col gap-6">
        {/* Cover */}
        <div
          className="relative h-40 md:h-56 rounded-xl overflow-hidden shadow-md"
          style={{
            backgroundImage:
              "linear-gradient(rgba(26,26,26,0.5), rgba(26,26,26,0.5)), url('https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1470&q=80')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <h1 className="absolute inset-0 flex items-center justify-center text-secondary text-2xl md:text-3xl font-extrabold tracking-wide">
            الملف الشخصي
          </h1>
        </div>

        {/* User Info Card */}
        <div className="bg-surface rounded-xl shadow-lg p-6 flex flex-col md:flex-row items-center gap-6">
          <FontAwesomeIcon
            icon={faUserCircle}
            size="6x"
            className="text-accent"
          />
          <div className="flex flex-col gap-4 text-lg font-medium text-primary w-full">
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
