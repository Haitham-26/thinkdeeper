import { proxyRequest } from "@/tools/proxyRequest";
import { NextRequest } from "next/server";

export async function PATCH(req: NextRequest) {
  return await proxyRequest(`/message/toggle-star`, {
    method: "PATCH",
    data: await req.json(),
  });
}
