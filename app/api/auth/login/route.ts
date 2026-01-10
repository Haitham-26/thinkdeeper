import { proxyRequest } from "@/tools/proxyRequest";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  return await proxyRequest("/auth/login", {
    method: "POST",
    data: await req.json(),
  });
}
