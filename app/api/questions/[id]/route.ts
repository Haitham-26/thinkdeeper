import { useProxy } from "@/tools/useProxy";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest, params: { id: string }) {
  const { id } = params;

  return await useProxy(`/questions/${id}`, {
    method: "GET",
  });
}
