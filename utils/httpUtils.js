import { closeConnectionFullEndpoint } from "../config/api";
export const closeConnectionHttp = tokens => {
  // api request on closing page
  fetch(closeConnectionFullEndpoint, {
    headers: {
      "Content-type": "application/json"
    },
    mode: "cors",
    method: "PUT",
    body: JSON.stringify(tokens)
  });
};
