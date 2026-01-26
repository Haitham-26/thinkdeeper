import React, { useState } from "react";
import { signIn } from "next-auth/react";
import { Button } from "./Button";

export const GoogleLoginButton: React.FC = () => {
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
      Login with Google
    </Button>
  );
};
