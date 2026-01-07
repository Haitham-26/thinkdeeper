import { proxyRequest } from "@/tools/proxyRequest";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest, context: any) {
  const { id } = context.params;

  return await proxyRequest(`/questions/${id}`, {
    method: "GET",
  });
}
