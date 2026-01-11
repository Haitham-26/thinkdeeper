import { proxyRequest } from "@/tools/proxyRequest";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const expressRes = await proxyRequest("/auth/login", {
    method: "POST",
    data: await req.json(),
  });

  const { token } = await expressRes.json();

  const response = NextResponse.json({ success: true });

  response.cookies.set("token", token, {
    httpOnly: true,
    secure: process.env.NEXT_PUBLIC_NODE_ENV === "production",
    sameSite: "none",
    path: "/",
    maxAge: 60 * 60 * 24,
  });

  return response;
}
