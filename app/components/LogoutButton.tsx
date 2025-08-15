"use client";

import React from "react";
import { Button } from "./Button";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons/faRightFromBracket";
import { useRouter } from "next/navigation";
import { NextClient } from "@/tools/NextClient";

export const LogoutButton: React.FC = () => {
  const router = useRouter();

  const logout = async () => {
    try {
      await NextClient("/logout", {
        method: "POST",
        withCredentials: true,
      });

      router.refresh();
    } catch (e) {
      console.log(e);
      alert(e);
    }
  };

  return (
    <Button
      onClick={logout}
      icon={faRightFromBracket}
      className="!bg-danger text-secondary hover:!bg-danger/90"
    >
      تسجيل الخروج
    </Button>
  );
};
