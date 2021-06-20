import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth/helper";
import Base from "./Base";
import Card from "./Card";
import { getTotalAmount, loadcart } from "./helper/cartHelper";
import StripeCheckout from "./helper/StripeCheckout";
import PayViaPaypal from "./PayViaPaypal";

const Cart = () => {
  const [cartProducts, setCartProducts] = useState(null);
  const [refreshCart, setRefreshCart] = useState(false);

  const { user = null} = isAuthenticated();

  useEffect(() => {
    setCartProducts(loadcart());
  }, [refreshCart]);

  const productsComponent = (cartProducts) => {
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
                    forceRefreshCart={setRefreshCart}
                    refreshCart={refreshCart}
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
          <h4 className="text-white">Grand Total : {getTotalAmount()}</h4>
        </div>
      </div>
    );
  };

  return (
    <Base title="Cart" description="Manage your cart Here!!">
      <div className="row text-center">
        <div className="col-md-8">{productsComponent(cartProducts)}</div>
        <div className="col-md-4">
          <div className="row">
            <div className="col">{checkoutComponent()}</div>
          </div>

          {user !== null ? (
            <div>
              <div className="row">
                <div className="col">
                  <StripeCheckout
                    products={cartProducts}
                    forceRefreshCart={setRefreshCart}
                    refreshCart={refreshCart}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col">
                  <PayViaPaypal
                    products={cartProducts}
                    forceRefreshCart={setRefreshCart}
                    refreshCart={refreshCart}
                  />
                </div>
              </div>
            </div>
          ) : (
            <div>
              <Link to="/signin">
                <button className="btn btn-info mt-4">Sign In</button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </Base>
  );
};

export default Cart;
