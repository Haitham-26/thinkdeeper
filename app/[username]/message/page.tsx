import { GetMessageRecipientProfileResponseDto } from "@/model/message/GetMessageRecipientProfileResponseDto";
import { AuthClient } from "@/tools/AuthClient";
import getToken from "@/tools/getToken";
import { redirect } from "next/navigation";
import { SendMessageForm } from "../_components/SendMessageForm";
import { Icon } from "@/app/components/Icon";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons/faUserCircle";
import { faShieldHeart } from "@fortawesome/free-solid-svg-icons/faShieldHeart";
import { faBolt } from "@fortawesome/free-solid-svg-icons/faBolt";

type Props = {
  params: Promise<{ username: string }>;
};

export default async function Page({ params }: Props) {
  const [{ username }, token] = await Promise.all([params, getToken()]);

  if (!username) {
    redirect("/");
  }

  const { data: profile } =
    await AuthClient<GetMessageRecipientProfileResponseDto>(
      `/message/${username}/profile`,
      { method: "GET" },
      token
    );

  return (
    <div className="min-h-screen bg-background pt-32 pb-20 px-4 w-full">
      <div className="max-w-3xl mx-auto">
        <div className="flex flex-col items-center text-center mb-12">
          <div className="relative mb-8">
            <div className="w-32 h-32 md:w-40 md:h-40 bg-surface rounded-[3rem] flex items-center justify-center border-8 border-surface shadow-2xl shadow-primary/10">
              <Icon
                icon={faUserCircle}
                className="text-accent text-8xl md:text-9xl"
              />
            </div>
            <div className="absolute -bottom-2 -right-2 bg-accent w-12 h-12 rounded-2xl flex items-center justify-center text-white border-4 border-background rotate-12">
              <Icon icon={faBolt} />
            </div>
          </div>

          <h1 className="text-4xl md:text-5xl font-black text-text-primary mb-4 tracking-tight">
            صارح <span className="text-accent">{profile?.name}</span>
          </h1>
          <p className="text-lg md:text-xl text-text-muted font-medium max-w-md leading-relaxed">
            اكتب رسالتك بكل حرية. هويتك ستبقى سرية تماماً ولن يعرف أحد من أنت.
          </p>
        </div>

        <div className="bg-surface rounded-[3rem] border-2 border-border p-8 md:p-12 shadow-xl shadow-primary/5 relative overflow-hidden">
          <div className="relative z-10">
            <SendMessageForm recipientId={profile?._id} />
          </div>

          <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 rounded-full blur-3xl -mr-16 -mt-16" />
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex items-start gap-4 p-6 bg-accent/5 rounded-[2rem] border border-accent/10">
            <div className="w-10 h-10 bg-accent rounded-xl flex items-center justify-center text-white shrink-0">
              <Icon icon={faShieldHeart} />
            </div>
            <div>
              <h4 className="font-bold text-text-primary mb-1">خصوصية كاملة</h4>
              <p className="text-sm text-text-muted leading-relaxed font-medium">
                نستخدم تقنيات تشفير متطورة لضمان عدم الكشف عن هويتك تحت أي ظرف.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4 p-6 bg-surface-muted rounded-[2rem] border border-border">
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white shrink-0">
              <Icon icon={faBolt} />
            </div>
            <div>
              <h4 className="font-bold text-text-primary mb-1">تواصل مباشر</h4>
              <p className="text-sm text-text-muted leading-relaxed font-medium">
                ستصل رسالتك فوراً إلى صندوق الوارد الخاص بصاحب الحساب، كما سيصله
                بريد إلكتروني ينبهه لوصول رسالتك.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
