import React, { useState } from "react";
import { signIn } from "next-auth/react";
import { Button } from "./Button";
import Image from "next/image";

type Props = {
  title: string;
};

export const GoogleLoginButton: React.FC<Props> = ({ title }) => {
  const [loading, setLoading] = useState(false);

  const onLoginWithGoogle = async () => {
    setLoading(true);
    try {
      await signIn("google", {
        callbackUrl: "/profile",
        redirect: true,
      });
    } catch (error) {
      console.error("Login error:", error);
      setLoading(false);
    }
  };

  return (
    <Button
      onClick={onLoginWithGoogle}
      loading={loading}
      className="w-full !h-14 !bg-white !text-primary !font-black !text-sm hover:!bg-slate-100 flex items-center justify-center gap-3 active:scale-95 shadow-none"
    >
      <span>{title}</span>

      <Image src={"/images/google.svg"} width={20} height={20} alt="Google" />
    </Button>
  );
};
