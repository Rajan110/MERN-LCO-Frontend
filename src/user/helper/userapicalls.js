import { API } from "../../backend";

export const getUserOrders = (userId,token) => {
  return fetch(`${API}/orders/${userId}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      return response.json();
    })
    .catch((error) => console.log(error));
};
