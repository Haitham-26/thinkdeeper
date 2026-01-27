"use client";

import { useSession } from "next-auth/react";
import { useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export const GoogleAuth = () => {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!session?.user) {
      return;
    }

    const login = async () => {
      try {
        await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/auth/google-login`,
          {
            email: session.user?.email,
            name: session.user?.name,
            avatar: session.user?.image,
          },
          {
            withCredentials: true,
          },
        );
      } catch (e) {
        console.log(e);
      }
    };

    login();
  }, [session, router]);

  return null;
};
