import { closeConnectionFullEndpoint } from "../config/api";
export const closeConnectionHttp = tokens => {
  // sync api request on closing page
  const xhr = new XMLHttpRequest();
  xhr.open("DELETE", closeConnectionFullEndpoint, false);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.send(JSON.stringify(tokens));
};
