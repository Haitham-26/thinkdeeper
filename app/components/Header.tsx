import Link from "next/link";
import React from "react";

const getStartedClassName =
  "text-base py-2 px-4 bg-white text-black hover:bg-gray-200 rounded-full transition-colors duration-300 ease-in-out text-sm sm:text-base";

export const Header: React.FC = () => {
  return (
    <div className="px-4 md:px-8 flex items-center h-16 shadow shadow-gray-800 border-b-2 border-b-white bg-black fixed top-0 w-full">
      <div className="flex items-center gap-2">
        <Link href="/auth/login" className={getStartedClassName}>
          تسجيل الدخول
        </Link>

        <Link href="/auth/signup" className={getStartedClassName}>
          عضو جديد
        </Link>
      </div>

      <div className="ms-auto">
        <span className="text-white sm:text-2xl font-bold">فكر بعمق</span>
      </div>
    </div>
  );
};
