import React from "react";

export const addItemToCart = (item, next) => {
  let cart = [];
  if (typeof window !== undefined) {
    if (localStorage.getItem("cart")) {
      cart = JSON.parse(localStorage.getItem("cart"));
    }
    cart.push({ ...item, count: 1 });
    localStorage.setItem("cart", JSON.stringify(cart));
    next();
  }
};

export const removeItemFromCart = (item, next) => {
  let cart = [];
  if (typeof window !== undefined) {
    if (localStorage.getItem("cart")) {
      cart = JSON.parse(localStorage.getItem("cart"));
    }
    cart.map((product, index) => {
      if (item._id === product._id) {
        cart.splice(index, 1);
      }
    });
    localStorage.setItem("cart", JSON.stringify(cart));
    next();
  }
};

export const loadcart = () => {
  if (typeof window !== undefined) {
    if (localStorage.getItem("cart")) {
      return JSON.parse(localStorage.getItem("cart"));
    }
  }
};

export const emptyCart = (next) => {
  if (typeof window !== undefined) {
    if (localStorage.getItem("cart")) {
      localStorage.removeItem("cart");
      next();
    }
  }
};

export const getTotalAmount = () => {
  let total = 0;
  if (typeof window !== undefined) {
    if (localStorage.getItem("cart")) {
      let cartProducts = JSON.parse(localStorage.getItem("cart"));
      cartProducts &&
        cartProducts.forEach((product) => {
          total = product.price * product.count + total;
        });
      return total || 0;
    }
  }
};
