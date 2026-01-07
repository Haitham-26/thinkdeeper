import { User } from "@/model/user/User";
import { AuthClient } from "@/tools/AuthClient";
import { formattedDate } from "@/tools/Date";
import getToken from "@/tools/getToken";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons/faUserCircle";
import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons/faCalendarAlt";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons/faEnvelope";
import { faLink } from "@fortawesome/free-solid-svg-icons/faLink";
import { faShareNodes } from "@fortawesome/free-solid-svg-icons/faShareNodes";
import { faFingerprint } from "@fortawesome/free-solid-svg-icons/faFingerprint";
import { Button } from "@/app/components/Button";
import { Icon } from "../components/Icon";

export default async function Page() {
  const token = await getToken();

  const { data: user } = await AuthClient<User>(
    `/user`,
    { method: "POST" },
    token
  );

  const profileUrl = `sarhne.com/u/${user._id}`;

  const infoRows = [
    {
      label: "الاسم المستعار",
      icon: faUserCircle,
      value: user.name,
    },
    {
      label: "البريد الإلكتروني",
      icon: faEnvelope,
      value: user.email,
    },
    {
      label: "تاريخ الانضمام",
      icon: faCalendarAlt,
      value: formattedDate(user.createdAt),
    },
  ];

  return (
    <div className="min-h-screen bg-background pt-28 pb-12 px-4 w-full">
      <div className="max-w-4xl mx-auto">
        <div className="relative group">
          <div
            className="h-48 md:h-64 rounded-[3rem] overflow-hidden shadow-2xl shadow-primary/10 relative"
            style={{
              backgroundImage:
                "linear-gradient(to bottom, rgba(15, 23, 42, 0.2), rgba(15, 23, 42, 0.8)), url('https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1470&q=80')",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />

          <div className="absolute -bottom-12 right-12 flex items-end gap-6">
            <div className="p-2 bg-background rounded-[2rem]">
              <div className="w-24 h-24 md:w-32 md:h-32 bg-surface rounded-[1.8rem] flex items-center justify-center border-4 border-surface shadow-xl">
                <Icon
                  icon={faUserCircle}
                  className="text-accent text-7xl md:text-8xl"
                />
              </div>
            </div>
            <div className="pb-14 hidden md:block">
              <h1 className="text-3xl font-black text-white drop-shadow-md">
                {user.name}
              </h1>
              <p className="text-white/80 font-medium">عضو في صراحة</p>
            </div>
          </div>
        </div>

        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-6">
            <div className="bg-surface rounded-[2.5rem] border-2 border-border p-8 shadow-sm">
              <h2 className="text-xl font-black mb-6 flex items-center gap-3">
                <Icon icon={faFingerprint} className="text-accent" />
                المعلومات الأساسية
              </h2>

              <div className="space-y-6">
                {infoRows.map(({ icon, label, value }) => (
                  <div
                    key={label}
                    className="flex items-center justify-between py-1"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-surface-muted rounded-xl flex items-center justify-center text-text-muted">
                        <Icon icon={icon} />
                      </div>
                      <span className="text-text-muted font-bold">{label}</span>
                    </div>
                    <span className="text-text-primary font-black">
                      {value}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-primary rounded-[2.5rem] p-8 text-white relative overflow-hidden group">
              <div className="relative z-10">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-3">
                  <Icon icon={faShareNodes} className="text-accent" />
                  رابطك الخاص
                </h3>
                <p className="text-white/70 mb-6 leading-relaxed">
                  شارك هذا الرابط مع أصدقائك لاستقبال رسائل مجهولة وصريحة منهم.
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="flex-grow bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl px-5 py-3.5 font-mono text-sm flex items-center justify-between dir-ltr">
                    <span className="truncate">{profileUrl}</span>
                    <Icon icon={faLink} className="text-white/40" />
                  </div>
                  <Button
                    variant="primary"
                    className="whitespace-nowrap h-auto"
                  >
                    نسخ الرابط
                  </Button>
                </div>
              </div>
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-accent/20 to-transparent pointer-events-none" />
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-surface rounded-[2.5rem] border-2 border-border p-8 text-center">
              <div className="text-4xl font-black text-accent mb-2">0</div>
              <p className="text-text-muted font-bold text-sm uppercase tracking-widest">
                إجمالي الرسائل
              </p>
            </div>

            <div className="bg-accent/5 rounded-[2.5rem] border-2 border-accent/10 p-8">
              <h4 className="font-black text-text-primary mb-4">
                نصيحة الأمان
              </h4>
              <p className="text-sm text-text-muted leading-relaxed">
                لا تشارك معلوماتك الشخصية الحساسة في ردودك العامة للحفاظ على
                خصوصيتك.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
