import { useProxy } from "@/tools/useProxy";
import { NextRequest } from "next/server";

export async function DELETE(
  req: NextRequest,
  context: { params: { id: string } }
) {
  const { id } = context.params;

  return await useProxy(`/questions/${id}/delete`, {
    method: "DELETE",
  });
}
