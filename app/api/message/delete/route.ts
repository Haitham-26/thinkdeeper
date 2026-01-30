import { proxyRequest } from "@/tools/proxyRequest";
import { NextRequest } from "next/server";

export async function DELETE(req: NextRequest) {
  return proxyRequest(`/message/delete`, {
    method: "DELETE",
    data: await req.json(),
  });
}
