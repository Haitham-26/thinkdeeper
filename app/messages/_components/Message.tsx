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
    <div className="group bg-surface rounded-[2.5rem] border-2 border-border p-6 md:p-8 hover:border-accent/30 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300">
      <div className="flex items-center gap-4 mb-4">
        <div
          className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-colors ${
            isAnonymous
              ? "bg-surface-muted text-text-muted"
              : "bg-accent/10 text-accent"
          }`}
        >
          <Icon
            icon={isAnonymous ? faUserSecret : faCircleUser}
            className="text-xl"
          />
        </div>
        <div>
          <h4 className="text-base font-black text-text-primary">
            {message.name || "مجهول الهوية"}
          </h4>
          <div className="flex items-center gap-2 text-[11px] text-text-muted font-bold">
            <Icon icon={faCalendar} className="text-[10px]" />
            <span className="dir-ltr">{formattedDate(message.createdAt)}</span>
          </div>
        </div>
      </div>

      <div className="relative">
        <p
          ref={textRef}
          className={`ps-0 md:ps-16 text-lg md:text-xl text-text-primary leading-relaxed font-medium whitespace-pre-wrap [word-break:break-word] transition-all duration-500 overflow-hidden ${
            isCollapsible && !isExpanded ? "max-h-40" : "max-h-[2000px]"
          }`}
        >
          {message.message}
        </p>

        {isCollapsible && !isExpanded ? (
          <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-surface to-transparent pointer-events-none" />
        ) : null}
      </div>

      {isCollapsible ? (
        <Button
          onClick={() => setIsExpanded(!isExpanded)}
          icon={isExpanded ? faChevronUp : faChevronDown}
          className={`!bg-transparent !text-accent shadow-none mt-4 ms-0 md:ms-16 flex items-center gap-2 font-black text-sm hover:underline underline-offset-4 [&_svg]:transition-transform [&_svg]:duration-300 ${
            isExpanded ? "" : "[&_svg]:animate-bounce"
          }`}
        >
          {isExpanded ? "عرض أقل" : "قراءة المزيد"}
        </Button>
      ) : null}
    </div>
  );
}
