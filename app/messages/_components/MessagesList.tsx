"use client";

import Message from "./Message";
import { Empty } from "../../components/Empty";
import { useGlobalContext } from "@/app/questions/context/global-context";
import { Spinner } from "@/app/components/Spinner";

export default function MessagesList() {
  const { messages, messagesLoading } = useGlobalContext();

  if (messagesLoading) {
    return <Spinner className="text-accent static" />;
  }

  if (!messages.data.length) {
    return (
      <Empty
        title="لا توجد رسائل حالياً"
        description="شارك الرابط الخاص بك مع الآخرين لاستقبال أول رسالة لك!"
      />
    );
  }

  return (
    <div className="space-y-6 group/list">
      {messages.data.map((message) => (
        <div
          key={message._id}
          className="transition-all duration-500 hover:!blur-none group-hover/list:blur-[2px] group-hover/list:opacity-50 hover:!opacity-100 hover:scale-[1.02]"
        >
          <Message message={message} />
        </div>
      ))}
    </div>
  );
}
