import { proxyRequest } from "@/tools/proxyRequest";
import { NextRequest } from "next/server";

type Context = {
  params: Promise<{ id: string }>;
};

export async function GET(req: NextRequest, context: Context) {
  const { id } = await context.params;

  return await proxyRequest(`/questions/${id}`, {
    method: "GET",
  });
}
