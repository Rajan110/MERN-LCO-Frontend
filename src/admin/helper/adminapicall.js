//import { isAuthenticated } from "../../auth/helper";
import { API } from "../../backend";

//const { user, token } = isAuthenticated();

export const addCategory = (userId, token, category_name) => {
  return fetch(`${API}/category/create/${userId}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(category_name),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};


export const getCategories = () => {
  return fetch(`${API}/categories`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    }
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
}