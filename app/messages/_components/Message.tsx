"use client";

import { Message as MessageModel } from "@/model/message/types/Message";
import { formattedDate } from "@/tools/Date";
import { Icon } from "@/app/components/Icon";
import { faUserSecret } from "@fortawesome/free-solid-svg-icons/faUserSecret";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons/faCircleUser";
import { faCalendar } from "@fortawesome/free-solid-svg-icons/faCalendar";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons/faChevronDown";
import { faChevronUp } from "@fortawesome/free-solid-svg-icons/faChevronUp";
import { useState, useRef, useEffect } from "react";
import { Button } from "@/app/components/Button";

type Props = {
  message: MessageModel;
};

export default function Message({ message }: Props) {
  const isAnonymous = !message.name;
  const [isExpanded, setIsExpanded] = useState(false);
  const [isCollapsible, setIsCollapsible] = useState(false);
  const textRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (textRef.current) {
      const height = textRef.current.scrollHeight;
      if (height > 160) {
        setIsCollapsible(true);
      }
    }
  }, [message.message]);

  return (
    <div className="relative group">
      <div className="absolute top-0 right-0 -mr-2 mt-2 w-full h-full bg-accent/5 rounded-[2rem] transition-transform group-hover:translate-x-1 group-hover:translate-y-1"></div>

      <div className="relative bg-surface border border-border rounded-[2rem] overflow-hidden transition-all duration-300 hover:shadow-lg">
        <div className="flex flex-col md:flex-row">
          <div
            className={`md:w-48 p-6 flex flex-col items-center justify-center border-b md:border-b-0 md:border-l border-border transition-colors ${isAnonymous ? "bg-surface-muted/30" : "bg-accent/[0.02]"}`}
          >
            <div
              className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-4 shadow-sm transition-transform group-hover:scale-110 ${
                isAnonymous
                  ? "bg-white text-text-muted"
                  : "bg-accent text-secondary"
              }`}
            >
              <Icon
                icon={isAnonymous ? faUserSecret : faCircleUser}
                className="text-2xl"
              />
            </div>

            <h4 className="text-sm font-black text-text-primary text-center mb-1 line-clamp-1">
              {message.name || "مجهول الهوية"}
            </h4>

            <div className="flex items-center gap-1.5 text-[10px] text-text-muted font-bold tracking-tight">
              <Icon icon={faCalendar} className="text-[9px] opacity-70" />
              <span className="dir-ltr">
                {formattedDate(message.createdAt)}
              </span>
            </div>
          </div>

          <div className="flex-1 p-6 md:p-8 relative">
            <div
              className={`relative overflow-hidden transition-all duration-500 ease-in-out ${
                isCollapsible && !isExpanded ? "max-h-32" : "max-h-[2000px]"
              }`}
            >
              <p
                ref={textRef}
                className="text-base md:text-lg text-text-primary leading-relaxed font-medium whitespace-pre-wrap [word-break:break-word]"
              >
                {message.message}
              </p>

              {isCollapsible && !isExpanded && (
                <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-surface to-transparent" />
              )}
            </div>

            {isCollapsible && (
              <div className="mt-6 flex justify-end">
                <Button
                  onClick={() => setIsExpanded(!isExpanded)}
                  className={`group/btn !bg-surface-muted !text-text-primary border border-border px-4 py-2 rounded-xl text-xs font-black transition-all hover:!bg-accent hover:!text-secondary hover:!border-accent flex items-center gap-2`}
                >
                  <span>{isExpanded ? "طي الرسالة" : "قراءة المزيد"}</span>
                  <Icon
                    icon={isExpanded ? faChevronUp : faChevronDown}
                    className={`transition-transform duration-300 ${!isExpanded && "group-hover/btn:translate-y-0.5"}`}
                  />
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
