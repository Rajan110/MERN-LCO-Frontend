import React, { useEffect, useState } from "react";
import Base from "./Base";
import Card from "./Card";
import { loadcart } from "./helper/cartHelper";
import StripeCheckout from "./helper/StripeCheckout";

const Cart = () => {
  const [cartProducts, setCartProducts] = useState(null);

  useEffect(() => {
    setCartProducts(loadcart());
  }, [cartProducts]);

  const productsComponent = () => {
    return (
      <div>
        <h3 className="text-success">
          {cartProducts?.length || 0} Products In Cart
        </h3>
        <div className="row text-center">
          {cartProducts &&
            cartProducts.map((prod, index) => {
              return (
                <div className="col-4 mb-4" key={index}>
                  <Card
                    product={prod}
                    addToCart={false}
                    removeFromCart={true}
                  />
                </div>
              );
            })}
        </div>
      </div>
    );
  };

  const checkoutComponent = () => {
    return (
      <div>
        <h3 className="text-white">Checkout</h3>
        <div className="border border-success rounded">
          <h2 className="text-secondary">Checkout Stuffs Here</h2>
          <h4 className="text-white">Grand Total : {total()}</h4>
        </div>
      </div>
    );
  };

  const total = () => {
    let total = 0;
    cartProducts &&
      cartProducts.forEach((product) => {
        total = product.price * product.count + total;
      });
    return total || 0;
  };

  return (
    <Base title="Cart" description="Manage your cart Here!!">
      <div className="row text-center">
        <div className="col-md-8">{productsComponent()}</div>
        <div className="col-md-4">
          <div className="row">
            <div className="col">{checkoutComponent()}</div>
          </div>
          <div className="row">
            <div className="col">
              <StripeCheckout products={cartProducts} />
            </div>
          </div>
        </div>
      </div>
    </Base>
  );
};

export default Cart;
