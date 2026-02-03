"use client";

import { Icon } from "@/app/components/Icon";
import { useGlobalContext } from "@/app/questions/context/global-context";
import { faInbox } from "@fortawesome/free-solid-svg-icons/faInbox";

export default function MessagesCounter() {
  const { messages } = useGlobalContext();

  return (
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
            {messages.meta.total}
          </span>
          <span className="text-secondary/40 text-sm font-bold tracking-widest uppercase">
            رسالة واردة
          </span>
        </div>
      </div>
    </div>
  );
}
