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
      if (height > 100) {
        setIsCollapsible(true);
      }
    }
  }, [message.message]);

  return (
    <div className="relative group">
      <div className="absolute top-0 right-0 -mr-1 mt-1 w-full h-full bg-accent/5 rounded-2xl md:rounded-[2rem] transition-transform group-hover:translate-x-0.5 group-hover:translate-y-0.5"></div>

      <div className="relative bg-surface border border-border rounded-2xl md:rounded-[2rem] overflow-hidden transition-all duration-300 hover:shadow-lg">
        <div className="flex flex-col md:flex-row">
          <div
            className={`flex items-center justify-between md:flex-col md:justify-center md:w-48 p-3 md:p-6 border-b md:border-b-0 md:border-l border-border transition-colors ${
              isAnonymous ? "bg-surface-muted/30" : "bg-accent/[0.02]"
            }`}
          >
            <div className="flex items-center gap-3 md:flex-col md:gap-0">
              <div
                className={`flex-shrink-0 w-9 h-9 md:w-14 md:h-14 rounded-lg md:rounded-2xl flex items-center justify-center md:mb-3 shadow-sm ${
                  isAnonymous
                    ? "bg-white text-text-muted"
                    : "bg-accent text-secondary"
                }`}
              >
                <Icon
                  icon={isAnonymous ? faUserSecret : faCircleUser}
                  className="text-lg md:text-2xl"
                />
              </div>
              <h4 className="text-[13px] md:text-sm font-black text-text-primary truncate max-w-[120px] md:max-w-full md:text-center">
                {message.name || "مجهول الهوية"}
              </h4>
            </div>

            <div className="flex items-center gap-1 text-[9px] md:text-[10px] text-text-muted font-bold md:mt-1 opacity-80">
              <Icon icon={faCalendar} className="text-[8px] md:text-[9px]" />
              <span className="dir-ltr whitespace-nowrap">
                {formattedDate(message.createdAt, true)}
              </span>
            </div>
          </div>

          <div className="flex-1 p-4 md:p-8 relative">
            <div
              className={`relative overflow-hidden transition-all duration-500 ease-in-out ${
                isCollapsible && !isExpanded
                  ? "max-h-20 md:max-h-32"
                  : "max-h-[2000px]"
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
              <div className="mt-2 md:mt-6 flex justify-end">
                <Button
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="!bg-transparent !text-text-primary border border-border px-3 py-1 rounded-lg text-[10px] md:text-xs font-black flex items-center gap-2 shadow-none"
                >
                  <span>{isExpanded ? "طي" : "المزيد"}</span>
                  <Icon
                    icon={isExpanded ? faChevronUp : faChevronDown}
                    className="text-[8px]"
                  />
                </Button>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
