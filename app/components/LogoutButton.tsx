"use client";

import React from "react";
import { Button } from "./Button";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons/faRightFromBracket";
import { useRouter } from "next/navigation";
import { NextClient } from "@/tools/NextClient";
import { Toast } from "@/tools/Toast";

export const LogoutButton: React.FC = () => {
  const router = useRouter();

  const logout = async () => {
    try {
      await NextClient("/auth/logout", {
        method: "POST",
      });

      router.push("/");
    } catch (e) {
      console.log(e);
      Toast.apiError(e);
    }
  };

  return (
    <Button
      onClick={logout}
      icon={faRightFromBracket}
      className="!bg-danger !p-5 w-10 h-10 md:w-auto md:h-12 text-secondary hover:!bg-danger/90 shadow-none"
    >
      <span className="hidden md:inline">تسجيل الخروج</span>
    </Button>
  );
};
