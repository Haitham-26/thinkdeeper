import { useProxy } from "@/tools/useProxy";
import { NextRequest } from "next/server";

export async function POST(
  req: NextRequest,
  context: { params: { id: string } }
) {
  const { id } = context.params;

  return await useProxy(`/replies/${id}/toggle-like`, {
    method: "POST",
  });
}
