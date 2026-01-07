import { proxyRequest } from "@/tools/proxyRequest";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest, context: any) {
  const { id } = context.params;

  return await proxyRequest(`/replies/${id}`, {
    method: "POST",
  });
}
