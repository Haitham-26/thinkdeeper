"use client";

import Link from "next/link";
import React, { Fragment } from "react";
import { LogoutButton } from "./LogoutButton";
import { usePathname } from "next/navigation";

type HeaderProps = {
  token?: string;
};

export const Header: React.FC<HeaderProps> = ({ token }) => {
  const pathname = usePathname();

  const navLinkClass = (path: string) =>
    `relative px-2 py-1 font-medium transition-colors duration-300 ${
      pathname === path ? "text-accent" : "text-primary"
    } hover:text-accent
     after:content-[''] after:absolute after:w-0 after:h-[2px] after:bg-accent after:left-0 after:-bottom-1 after:transition-all after:duration-300 hover:after:w-full`;

  const buttonClass =
    "text-sm sm:text-base py-2 px-4 rounded-full bg-accent text-white font-medium shadow hover:bg-accent/90 transition-colors duration-300";

  return (
    <header className="px-4 md:px-8 flex items-center h-20 fixed top-0 w-full z-20 bg-surface border-b border-gray-200 shadow-sm">
      {/* Logo */}
      <div className="flex items-center gap-2 me-auto">
        <span className="text-primary text-xl sm:text-2xl font-extrabold tracking-wide cursor-pointer">
          لوجو
        </span>
      </div>

      {/* Nav Links */}
      {token && (
        <nav className="hidden sm:flex flex-grow justify-center gap-8">
          <Link href="/questions" className={navLinkClass("/questions")}>
            أسئلتي
          </Link>
          <Link href="/profile" className={navLinkClass("/profile")}>
            الملف الشخصي
          </Link>
        </nav>
      )}

      {/* Auth Buttons / Logout */}
      <div className="flex items-center gap-3 ms-auto">
        {!token ? (
          <Fragment>
            <Link href="/auth/login" className={buttonClass}>
              تسجيل الدخول
            </Link>
            <Link href="/auth/signup" className={buttonClass}>
              عضو جديد
            </Link>
          </Fragment>
        ) : (
          <LogoutButton />
        )}
      </div>
    </header>
  );
};
