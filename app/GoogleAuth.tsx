"use client";

import { useSession } from "next-auth/react";
import { useEffect, useRef } from "react";
import { NextClient } from "@/tools/NextClient";
import { useRouter } from "next/navigation";

export const GoogleAuth = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const hasLoggedRef = useRef(false);

  useEffect(() => {
    if (!session?.user || status !== "authenticated" || hasLoggedRef.current) {
      return;
    }

    const login = async () => {
      try {
        await NextClient("/auth/google-login", {
          method: "POST",
          data: {
            email: session.user?.email,
            name: session.user?.name,
            avatar: session.user?.image,
          },
          withCredentials: true,
        });

        hasLoggedRef.current = true;

        router.refresh();
      } catch (e) {
        console.log(e);
        hasLoggedRef.current = false;
      }
    };

    login();
  }, [status, session?.user, router]);

  return null;
};
