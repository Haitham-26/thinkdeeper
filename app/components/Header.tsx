"use client";

import Link from "next/link";
import React, { Fragment } from "react";
import { LogoutButton } from "./LogoutButton";
import { usePathname } from "next/navigation";

const getStartedClassName =
  "text-base py-2 px-4 bg-white text-black hover:bg-gray-200 rounded-full transition-colors duration-300 ease-in-out text-sm sm:text-base";
const headerLinkClassName =
  "text-white text-base inline-block relative w-fit transition-all duration-300 ease-in-out after:h-[2px] after:bg-white after:block after:w-0 after:transition-all after:duration-300 after:mt-1 after:ease-in-out hover:after:w-full";

type HeaderProps = {
  token?: string;
};

export const Header: React.FC<HeaderProps> = ({ token }) => {
  const pathname = usePathname();

  return (
    <header className="px-4 md:px-8 flex items-center h-16 shadow shadow-gray-800 border-b-2 border-b-white bg-black sticky top-0 w-full z-10">
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
        <div className="flex-grow flex justify-center">
          <Link
            href="/questions"
            className={`${headerLinkClassName} ${
              pathname === "/questions" ? "after:w-full" : ""
            }`}
          >
            أسئلتي
          </Link>
        </div>
      ) : null}

      <div className="ms-auto">
        <span className="text-white sm:text-2xl font-bold">فكر بعمق</span>
      </div>
    </header>
  );
};
