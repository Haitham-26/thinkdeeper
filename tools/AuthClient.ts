import axios, { AxiosRequestConfig } from "axios";

const client = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

export function AuthClient<T>(
  route: string,
  config: AxiosRequestConfig = {},
  token = ""
) {
  return client<T>(route, {
    ...config,
    headers: {
      ...config.headers,
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });
}
