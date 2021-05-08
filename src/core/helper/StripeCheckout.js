import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../../auth/helper";
import { emptyCart, loadcart } from "./cartHelper";

const StripeCheckout = ({ products }) => {
  const [data, setData] = useState({
    loading: false,
    success: false,
    error: "",
    address: "",
  });

  const { user, token } = isAuthenticated();

  const showStripeButton = () => {
    return isAuthenticated() ? (
      <button className="btn btn-success">Pay With Stripe</button>
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
