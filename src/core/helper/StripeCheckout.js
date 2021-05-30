import React from "react";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../../auth/helper";
import { emptyCart, getTotalAmount } from "./cartHelper";
import StripeCheckoutBtn from "react-stripe-checkout";
import { API } from "../../backend";

const StripeCheckout = ({
  products,
  forceRefreshCart = (f) => f, //function (f) {return f}
  refreshCart = undefined,
}) => {
  /*const [data, setData] = useState({
    loading: false,
    success: false,
    error: "",
    address: "",
  });*/

  const { user = null, token } = isAuthenticated();
  const authToken = token;

  const makePayment = (token) => {
    const body = {
      token,
      products,
    };
    const headers = {
      Authorization: `Bearer ${authToken}`,
      "Content-Type": "application/json",
    };

    return fetch(`${API}/stripePayment/${user._id}`, {
      method: "POST",
      headers,
      body: JSON.stringify(body),
    })
      .then((data) => {
        console.log(data);
        const { status } = data;
        console.log("Status : ", status);
        emptyCart(() => {
          forceRefreshCart(!refreshCart);
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const showStripeButton = () => {
    return user !== null ? (
      <StripeCheckoutBtn
        stripeKey="pk_test_51IpAQYSFW61jmqV3m9F6IsHsigSGVJcuzBrkXDIjqLzMbTBk6fI22fm4luA2WlXN184WwyKEvYeQef0P0R94Z41D00hvf5jo2q"
        token={makePayment}
        currency="INR"
        amount={getTotalAmount() * 100}
        name="Make Payment"
        //shippingAddress
        //billingAddress
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
