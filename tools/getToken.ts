import { cookies } from "next/headers";

export default async function getToken() {
  return (await cookies()).get("token")?.value;
}
