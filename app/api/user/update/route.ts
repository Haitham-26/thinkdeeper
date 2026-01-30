import { proxyRequest } from "@/tools/proxyRequest";
import { NextRequest } from "next/server";

export async function PATCH(req: NextRequest) {
  return await proxyRequest("/user/update", {
    method: "PATCH",
    data: await req.json(),
  });
}
