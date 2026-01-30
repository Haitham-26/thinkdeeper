import { proxyRequest } from "@/tools/proxyRequest";

export async function DELETE() {
  return proxyRequest(`/message/delete-all`, {
    method: "DELETE",
  });
}
