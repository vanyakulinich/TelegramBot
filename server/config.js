import { url } from "../config/baseUrl";
export const baseURL = `${url}/api`;
export const apiMethods = ["post", "put", "delete"];
export const apiEndpoints = {
  reminder: "reminder",
  personal: "personal"
};
export const closeConnectionEndpoint = "/closewebconnection";
export const closeConnectionFullEndpoint = `${baseURL}${closeConnectionEndpoint}`;
