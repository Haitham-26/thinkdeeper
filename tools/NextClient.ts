import axios, { AxiosRequestConfig } from "axios";

const client = axios.create({
  baseURL: "/api",
  headers: { "Content-Type": "application/json" },
});

export function NextClient<T>(route: string, config: AxiosRequestConfig = {}) {
  if (typeof window === "undefined") {
    throw new Error(
      "NextClient can only be used in client components. For server components, use AuthClient instead."
    );
  }

  return client<T>(route, config);
}
