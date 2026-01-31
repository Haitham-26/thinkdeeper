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
      className="w-full !h-14 !rounded-2xl !bg-white !text-primary !font-black !text-sm border-none shadow-xl hover:!bg-slate-100 transition-all flex items-center justify-center gap-3 active:scale-95"
    >
      <span>{title}</span>

      <Image src={"/images/google.svg"} width={20} height={20} alt="Google" />
    </Button>
  );
};
