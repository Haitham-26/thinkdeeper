"use client";

import React, { useState, useRef, useEffect } from "react";
import { Icon } from "./Icon";
import { IconDefinition } from "@fortawesome/free-solid-svg-icons";

export type DropdownItem = {
  title: string;
  icon?: IconDefinition;
  className?: string;
  onClick: () => void;
};

type DropdownProps = {
  children: React.ReactNode;
  items: DropdownItem[];
  className?: string;
};

export const Dropdown: React.FC<DropdownProps> = ({
  children,
  items,
  className,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block text-right" ref={containerRef}>
      <div className="cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
        {children}
      </div>

      {isOpen ? (
        <div
          className={`
            absolute left-0 mt-2 min-w-[180px] z-50 py-2
            bg-surface border border-border rounded-2xl shadow-xl 
            animate-in fade-in zoom-in-95 duration-200
            ${className || ""}
          `}
        >
          {items.map((item, index) => (
            <div
              key={index}
              onClick={() => {
                item.onClick();
                setIsOpen(false);
              }}
              className={`
                w-full cursor-pointer flex items-center gap-3 px-4 py-2.5 text-xs font-black 
                transition-colors text-right border-b border-border/50 last:border-0
                hover:bg-surface-muted
                ${item.className || "text-text-primary"}
              `}
            >
              {item.icon ? (
                <Icon
                  icon={item.icon}
                  className={
                    !item.className?.includes("text-") ? "text-accent" : ""
                  }
                />
              ) : null}
              <span>{item.title}</span>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
};
