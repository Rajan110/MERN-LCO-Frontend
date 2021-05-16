import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../../auth/helper";
import { emptyCart, getTotalAmount, loadcart } from "./cartHelper";
import StripeCheckoutBtn from "react-stripe-checkout";
import { API } from "../../backend";

const StripeCheckout = ({ products }) => {
  const [data, setData] = useState({
    loading: false,
    success: false,
    error: "",
    address: "",
  });

  //   const { user, token } = isAuthenticated();
  //   const authToken = token;

  const makePayment = (token) => {
    const body = {
      token,
      products,
    };
    const headers = {
      "Content-Type": "application/json",
    };

    return fetch(`${API}/stripePayment`, {
      method: "POST",
      headers,
      body: JSON.stringify(body),
    })
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const showStripeButton = () => {
    return isAuthenticated() ? (
      <StripeCheckoutBtn
        stripeKey="pk_test_51IpAQYSFW61jmqV3m9F6IsHsigSGVJcuzBrkXDIjqLzMbTBk6fI22fm4luA2WlXN184WwyKEvYeQef0P0R94Z41D00hvf5jo2q"
        token={makePayment}
        amount={getTotalAmount() * 100}
        name="Pay Via Stripe"
        shippingAddress
        billingAddress
      >
        <button className="btn btn-success">Pay With Stripe</button>
      </StripeCheckoutBtn>
    ) : (
      <Link to="/signin">
        <button className="btn btn-info">Sign In</button>
      </Link>
    );
  };

  return (
    <div className="col text-center">
      <h3>Stripe Checkout</h3>
      {showStripeButton()}
    </div>
  );
};

export default StripeCheckout;
