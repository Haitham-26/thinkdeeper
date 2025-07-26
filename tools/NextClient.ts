import axios, { AxiosRequestConfig } from "axios";

const client = axios.create({
  baseURL: "/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export function NextClient<T>(route: string, config: AxiosRequestConfig = {}) {
  return client<T>(route, config);
}
