import { proxyRequest } from "@/tools/proxyRequest";

export async function POST() {
  return await proxyRequest(`/message/messages/`, {
    method: "POST",
  });
}
