import { AuthClient } from "@/tools/AuthClient";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { cookies } from "next/headers";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!,
      clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async jwt({ token, user, account }) {
      if (account && user) {
        const res = await AuthClient("/auth/google-login", {
          method: "POST",
          data: {
            email: user.email,
            name: user.name,
          },
        });

        const apiToken = (res.data as { token: string }).token;

        (await cookies()).set("token", apiToken, {
          httpOnly: true,
          sameSite: "lax",
          path: "/",
          secure: process.env.NODE_ENV === "production",
        });
      }
      return token;
    },
  },
  secret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET,
});

export { handler as GET, handler as POST };
