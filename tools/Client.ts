import axios, { AxiosRequestConfig } from "axios";

const client = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export function Client<T>(route: string, config: AxiosRequestConfig = {}) {
  return client<T>(route, config);
}
