"use client";

import Link from "next/link";
import React, { Fragment } from "react";
import { LogoutButton } from "./LogoutButton";
import { usePathname } from "next/navigation";

const getStartedClassName =
  "text-base py-2 px-4 bg-secondary hover:bg-gray-200 rounded-full transition-colors duration-300 ease-in-out text-sm sm:text-base";
const headerLinkClassName =
  "text-secondary inline-block w-fit hover:text-accent transition-all duration-300 ease-in-out";

type HeaderProps = {
  token?: string;
};

export const Header: React.FC<HeaderProps> = ({ token }) => {
  const pathname = usePathname();

  return (
    <header className="px-4 md:px-8 flex items-center h-16 fixed top-0 w-full z-10 bg-primary">
      <div className="flex items-center gap-2">
        {!token ? (
          <Fragment>
            <Link href="/auth/login" className={getStartedClassName}>
              تسجيل الدخول
            </Link>

            <Link href="/auth/signup" className={getStartedClassName}>
              عضو جديد
            </Link>
          </Fragment>
        ) : (
          <LogoutButton />
        )}
      </div>

      {token ? (
        <div className="flex-grow flex justify-center gap-6">
          <Link
            href="/questions"
            className={`${headerLinkClassName} ${
              pathname === "/questions" ? "!text-accent font-bold" : ""
            }`}
          >
            أسئلتي
          </Link>

          <Link
            href="/profile"
            className={`${headerLinkClassName} ${
              pathname === "/profile" ? "!text-accent font-bold" : ""
            }`}
          >
            الملف الشخصي
          </Link>
        </div>
      ) : null}

      <div className="ms-auto">
        <span className="text-white sm:text-2xl font-bold">لوجو</span>
      </div>
    </header>
  );
};
