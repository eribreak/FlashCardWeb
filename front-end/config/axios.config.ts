import axios, { isCancel, AxiosError } from "axios";
const api = axios.create({
  baseURL: "http://localhost:5002",
  timeout: 1000,
});

const api_collections = axios.create({
  baseURL: "http://localhost:5002/collection",
  timeout: 1000,
});

const api_class = axios.create({
  baseURL: "http://localhost:5002/class",
  timeout: 1000,
});

export default api;

export { api_collections, api_class };
