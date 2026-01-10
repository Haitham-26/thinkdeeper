import { GetMessagesResponseDto } from "@/model/message/GetMessagesResponseDto";
import { AuthClient } from "@/tools/AuthClient";
import getToken from "@/tools/getToken";
import Message from "./_components/Message";
import { Icon } from "@/app/components/Icon";
import { faInbox } from "@fortawesome/free-solid-svg-icons/faInbox";
import { Empty } from "../components/Empty";

export default async function Page() {
  const token = await getToken();

  const { data } = await AuthClient<GetMessagesResponseDto>(
    `/message/messages`,
    {
      method: "POST",
    },
    token
  );

  const messagesCount = data.messages?.length || 0;

  return (
    <div className="min-h-screen bg-background pt-16 md:pt-32 pb-20 px-4 w-full">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-accent/10 rounded-xl flex items-center justify-center text-accent">
                <Icon icon={faInbox} className="text-xl" />
              </div>
              <h1 className="text-3xl md:text-4xl font-black text-text-primary tracking-tight">
                صندوق الوارد
              </h1>
            </div>
            <p className="text-text-muted font-medium">
              هنا تجد كل الرسائل السرية التي وصلتك من أصدقائك ومتابعيك.
            </p>
          </div>

          <div className="shrink-0 bg-surface border-2 w-fit flex-col border-border px-6 py-3 rounded-2xl flex items-center gap-4 shadow-sm">
            <span className="text-2xl font-black text-text-primary">
              {messagesCount}
            </span>
            <span className="text-[10px] font-bold text-text-muted">
              إجمالي الرسائل
            </span>
          </div>
        </div>

        {messagesCount > 0 ? (
          <div className="grid gap-6">
            {data.messages.map((message) => (
              <Message key={message._id} message={message} />
            ))}
          </div>
        ) : (
          <Empty
            title="صندوقك الرسائل الواردة فارغ حالياً"
            description="لا توجد رسائل بعد. شارك رابط بروفايلك لتبدأ في استقبال الرسائل!"
          />
        )}
      </div>
    </div>
  );
}
