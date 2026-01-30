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
      if (height > 70) {
        setIsCollapsible(true);
      }
    }
  }, [message.message]);

  return (
    <div className="relative w-full max-w-2xl mx-auto group">
      <div className="absolute inset-0 bg-accent/5 rounded-2xl md:rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <div className="relative bg-surface border border-border rounded-2xl md:rounded-3xl overflow-hidden transition-all duration-300 hover:border-accent/20 shadow-sm hover:shadow-md">
        <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-surface-muted/30">
          <div className="flex items-center gap-2.5">
            <div
              className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs shadow-sm ${
                isAnonymous
                  ? "bg-white text-text-muted border border-border"
                  : "bg-accent text-white"
              }`}
            >
              <Icon icon={isAnonymous ? faUserSecret : faCircleUser} />
            </div>
            <span className="font-black text-xs md:text-sm text-text-primary">
              {message.name || "مجهول"}
            </span>
          </div>

          <div className="flex items-center gap-1.5 text-[10px] font-bold text-text-muted opacity-80">
            <Icon icon={faCalendar} className="text-[9px]" />
            <span className="dir-ltr whitespace-nowrap">
              {formattedDate(message.createdAt, true)}
            </span>
          </div>
        </div>

        <div className="p-4 md:p-5">
          <div
            className={`relative overflow-hidden transition-all duration-500 ease-in-out ${
              isCollapsible && !isExpanded ? "max-h-16" : "max-h-[1000px]"
            }`}
          >
            <p
              ref={textRef}
              className="text-sm md:text-base text-text-primary leading-relaxed font-medium whitespace-pre-wrap [word-break:break-word]"
            >
              {message.message}
            </p>

            {isCollapsible && !isExpanded ? (
              <div className="absolute bottom-0 left-0 w-full h-8 bg-gradient-to-t from-surface to-transparent" />
            ) : null}
          </div>

          {isCollapsible ? (
            <Button
              onClick={() => setIsExpanded(!isExpanded)}
              className="mt-3 flex items-center gap-1.5 text-[11px] font-black !text-accent hover:opacity-80 transition-all uppercase tracking-tighter !p-2 !bg-transparent shadow-none"
            >
              <span>{isExpanded ? "عرض أقل" : "إظهار الرسالة كاملة"}</span>
              <Icon
                icon={isExpanded ? faChevronUp : faChevronDown}
                className="text-[9px]"
              />
            </Button>
          ) : null}
        </div>
      </div>
    </div>
  );
}
