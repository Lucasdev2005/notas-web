import { AxiosRequestConfig } from "axios";

export interface Request<P = unknown> {
  endPoint: string;
  payload?: P;
  config?: AxiosRequestConfig;
}
