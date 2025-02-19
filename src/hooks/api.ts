import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { Request } from "../types/request";
import Cookies from "js-cookie";
import { TOKEN_KEY } from "../constants/token";



export function useAPI() {
  const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
  });

  async function apiPost<P, R>({
    endPoint,
    payload,
    config,
  }: {
    endPoint: string
    payload?: P
    config?: AxiosRequestConfig
  }): Promise<AxiosResponse<R>> {
    return axiosInstance.post(endPoint, payload, {
      headers: {
        ...authorization(),
        ...config?.headers,
      },
      params: config?.params,
    })
  }

  async function apiGet<R>({
    endPoint,
    config,
  }: {
    endPoint: string
    config?: AxiosRequestConfig
  }): Promise<AxiosResponse<R>> {
    return axiosInstance.get(endPoint, {
      headers: {
        ...authorization(),
        ...config?.headers,
      },
      params: config?.params,
    })
  }

  async function apiPut<P, R>({
    endPoint,
    payload,
    config,
  }: Request<P>): Promise<AxiosResponse<R>> {
    return axiosInstance.put(endPoint, payload, {
      headers: {
        ...authorization(),
        ...config?.headers,
      },
    })
  }

  async function apiDelete<R>({
    endPoint,
    config,
  }: Request): Promise<AxiosResponse<R>> {
    return axiosInstance.delete(endPoint, {
      headers: {
        ...authorization(),
        ...config?.headers,
      },
    })
  }

  async function apiPatch<P, R>({
    endPoint,
    payload,
    config,
  }: Request<P>): Promise<AxiosResponse<R>> {
    return axiosInstance.patch(endPoint, payload, {
      headers: {
        ...authorization(),
        ...config?.headers,
      },
    })
  }

  function authorization(): {Authorization: string} | undefined {
    const token = Cookies.get(TOKEN_KEY);

    if (token) {
      return {
        Authorization: `Bearer ${token}`,
      }
    }
  }

  return {
    apiPost,
    apiGet,
    apiPut,
    apiDelete,
    apiPatch,
  }
}
