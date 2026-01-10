"use client";

import Link from "next/link";
import React, { Fragment } from "react";
import { LogoutButton } from "./LogoutButton";
import { usePathname } from "next/navigation";
import { faComments } from "@fortawesome/free-solid-svg-icons/faComments";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons/faUserCircle";
import { faBolt } from "@fortawesome/free-solid-svg-icons/faBolt";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons/faPaperPlane";

import { Icon } from "./Icon";
import { faMessage } from "@fortawesome/free-solid-svg-icons/faMessage";

type HeaderProps = {
  token?: string;
};

export const Header: React.FC<HeaderProps> = ({ token }) => {
  const pathname = usePathname();

  const navLinkClass = (path: string) => `
    relative px-5 py-2 rounded-xl font-bold transition-all duration-300 flex items-center gap-2
    ${
      pathname === path
        ? "bg-accent/10 text-accent"
        : "text-text-muted hover:text-text-primary hover:bg-surface-muted"
    }
  `;

  return (
    <header className="fixed top-0 w-full z-50 px-4 md:px-10 h-20 flex items-center justify-between bg-surface/80 backdrop-blur-md border-b border-border/50">
      <div className="flex items-center">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 bg-accent rounded-xl flex items-center justify-center shadow-lg shadow-accent/30 group-hover:rotate-12 transition-transform duration-300">
            <Icon icon={faPaperPlane} className="text-white text-lg -mr-1" />
          </div>
          <span className="text-text-primary text-2xl font-black tracking-tighter">
            صراحة
          </span>
        </Link>
      </div>

      {token ? (
        <nav className="hidden md:flex items-center gap-2 bg-surface-muted/50 p-1.5 rounded-2xl border border-border/50">
          <Link href="/messages" className={navLinkClass("/messages")}>
            <Icon icon={faMessage} className="text-sm" />
            <span>الرسائل الواردة</span>
          </Link>
          <Link href="/questions" className={navLinkClass("/questions")}>
            <Icon icon={faComments} className="text-sm" />
            <span>أسئلتي</span>
          </Link>
          <Link href="/profile" className={navLinkClass("/profile")}>
            <Icon icon={faUserCircle} className="text-sm" />
            <span>الملف الشخصي</span>
          </Link>
        </nav>
      ) : null}

      <div className="flex items-center gap-3">
        {!token ? (
          <Fragment>
            <Link
              href="/auth/login"
              className="hidden sm:block text-text-primary font-bold px-6 py-2.5 hover:text-accent transition-colors"
            >
              تسجيل الدخول
            </Link>
            <Link
              href="/auth/signup"
              className="bg-accent text-white font-bold px-6 py-2.5 rounded-xl shadow-lg shadow-primary/20 hover:bg-accent/90 hover:-translate-y-0.5 transition-all flex items-center gap-2"
            >
              <Icon icon={faBolt} className="text-xs" />
              <span>ابدأ الآن</span>
            </Link>
          </Fragment>
        ) : (
          <div className="flex items-center gap-4">
            <div className="h-8 w-[1px] bg-border mx-2 hidden sm:block"></div>
            <LogoutButton />
          </div>
        )}
      </div>
    </header>
  );
};
