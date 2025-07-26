import { useProxy } from "@/tools/useProxy";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  return await useProxy("/questions/create", {
    method: "POST",
    data: await req.json(),
  });
}
