import axios, { isCancel, AxiosError, AxiosInstance } from "axios";
export class Api {
  baseUrl: string = "http://localhost:5002";
  api: AxiosInstance = axios.create({ baseURL: this.baseUrl, timeout: 1000 });
  connect(route?: string) {
    this.api = axios.create({
      baseURL: "http://localhost:5002" + route,
    });
  }
}
