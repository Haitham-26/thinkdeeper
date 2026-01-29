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
    token,
  );

  const messagesCount = data.messages?.length || 0;

  return (
    <div className="w-full min-h-screen bg-surface-muted p-4 md:p-8 lg:p-12">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
        <aside className="lg:col-span-4 space-y-6">
          <div className="bg-primary rounded-[2.5rem] p-8 text-secondary shadow-2xl relative overflow-hidden group">
            <div className="absolute top-[-20%] right-[-20%] w-40 h-40 bg-accent rounded-full blur-[60px] opacity-20 group-hover:opacity-40 transition-opacity"></div>

            <div className="relative z-10">
              <div className="inline-flex items-center justify-center p-3 bg-secondary/10 backdrop-blur-md rounded-2xl mb-6">
                <Icon icon={faInbox} className="text-accent text-2xl" />
              </div>
              <h1 className="text-4xl font-black mb-4 leading-tight">
                الرسائل الواردة
              </h1>
              <div className="flex items-baseline gap-2">
                <span className="text-6xl font-black text-accent">
                  {messagesCount}
                </span>
                <span className="text-secondary/40 text-sm font-bold tracking-widest uppercase">
                  رسالة واردة
                </span>
              </div>
            </div>
          </div>
        </aside>

        <main className="lg:col-span-8">
          <div className="bg-surface border border-border rounded-[3rem] shadow-sm min-h-[600px] flex flex-col overflow-hidden">
            <div className="px-8 py-6 border-b border-border flex justify-between items-center bg-white/50 backdrop-blur-sm">
              <h2 className="font-bold text-text-primary flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-accent animate-pulse"></span>
                الرسائل الأخيرة
              </h2>
            </div>

            <div className="flex-1 p-6 md:p-8">
              {messagesCount > 0 ? (
                <div className="space-y-6 group/list">
                  {data.messages.map((message) => (
                    <div
                      key={message._id}
                      className="transition-all duration-500 hover:!blur-none group-hover/list:blur-[2px] group-hover/list:opacity-50 hover:!opacity-100 hover:scale-[1.02]"
                    >
                      <Message message={message} />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="h-full flex flex-col items-center justify-center py-20">
                  <Empty
                    title="لا توجد رسائل حالياً"
                    description="شارك الرابط الخاص بك مع الآخرين لاستقبال أول رسالة لك!"
                  />
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
