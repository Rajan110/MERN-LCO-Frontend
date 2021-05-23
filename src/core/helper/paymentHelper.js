import { API } from "../../backend";

export const getPaypalToken = (userId, token) => {
  return fetch(`${API}/payPalPayment/getToken/${userId}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      Acccept: "application/json",
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .catch((err) => console.log(err));
};

export const processPayment = (userId, token, paymentInfo) => {
  return fetch(`${API}/payPalPayment/${userId}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      Acccept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(paymentInfo),
  })
    .then((response) => response.json())
    .catch((err) => console.log(err));
};
