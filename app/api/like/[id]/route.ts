import { useProxy } from "@/tools/useProxy";
import { NextRequest } from "next/server";

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  return await useProxy(`/like/${id}`, {
    method: "POST",
  });
}
