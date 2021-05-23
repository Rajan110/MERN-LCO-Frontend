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

export const removeItemFromCart = (productId) => {
  let cart = [];
  if (typeof window !== undefined) {
    if (localStorage.getItem("cart")) {
      cart = JSON.parse(localStorage.getItem("cart"));
    }
    cart.map((product, index) => {
      if (productId === product._id) {
        cart.splice(index, 1);
      }
    });
    localStorage.setItem("cart", JSON.stringify(cart));
  }
  return cart;
};

export const loadcart = () => {
  if (typeof window !== undefined) {
    if (localStorage.getItem("cart")) {
      return JSON.parse(localStorage.getItem("cart"));
    } else {
      return null;
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
