import axios from "axios";

export const API_PREFIX = "/api/v1";

const proxyRoute = "/api/proxy";

interface ApiOptions {
  prefix?: string;
  method?: string;
  body?: any;
  token?: string;
  withCredentials?: boolean;
}

export const api = async <T>(
  endpoint: string,
  {
    prefix = API_PREFIX,
    method = "GET",
    body,
    token,
    withCredentials = false,
  }: ApiOptions = {}
): Promise<T> => {
  try {
    const isFormData = body instanceof FormData;

    const response = await axios({
      method,
      url: `${proxyRoute}${prefix}${endpoint}`,
      headers: {
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...(isFormData ? {} : { "Content-Type": "application/json" }),
      },
      data: body || undefined,
      withCredentials,
    });

    return response.data;
  } catch (error: any) {
    if (error.message.includes("Network Error")) {
      throw "networkError";
    }
    throw error.response?.data || error;
  }
};
