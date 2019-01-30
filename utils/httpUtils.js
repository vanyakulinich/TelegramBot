import axios from "axios";
import { baseURL } from "../config/axios";
export const http = axios.create({
  baseURL
});
