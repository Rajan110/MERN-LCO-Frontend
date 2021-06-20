import { API } from "../../backend";

export const getAllOrders = (userId,token) => {
  return fetch(`${API}/order/all/${userId}`, {
    method: "POST",
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
