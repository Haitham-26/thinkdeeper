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
      className="bg-white !text-black border !border-gray-300 hover:!bg-gray-50 shadow-none"
    >
      {title}

      <Image src={"/images/google.svg"} width={25} height={25} alt="" />
    </Button>
  );
};
