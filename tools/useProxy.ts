import { NextResponse } from "next/server";
import { AuthClient } from "./AuthClient";
import { AxiosRequestConfig } from "axios";
import getToken from "./getToken";

export async function useProxy(
  url: string,
  config?: AxiosRequestConfig
): Promise<Response> {
  const token = await getToken();

  try {
    const { data } = await AuthClient(url, config, token);

    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.response?.data || "Server error" },
      { status: error?.response?.status || 500 }
    );
  }
}
