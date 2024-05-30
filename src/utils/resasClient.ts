import axios from "axios";

const client = axios.create({
  baseURL: "https://opendata.resas-portal.go.jp"
});

export const HEADERS = { "X-API-KEY": import.meta.env.VITE_RESAS_API_KEY };

export { client };
