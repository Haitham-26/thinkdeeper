import { proxyRequest } from "@/tools/proxyRequest";

export async function POST() {
  return await proxyRequest(`/user`, {
    method: "POST",
  });
}
