"use client";

import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { NextClient } from "@/tools/NextClient";
import { useRouter } from "next/navigation";

export const GoogleAuth = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!session?.user || status !== "authenticated") {
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

        const redirect = localStorage.getItem("redirect");

        if (redirect) {
          localStorage.removeItem("redirect");
          router.push(redirect);
        }

        router.refresh();
      } catch (e) {
        console.log(e);
      }
    };

    login();
  }, [status, session?.user, router]);

  return null;
};
