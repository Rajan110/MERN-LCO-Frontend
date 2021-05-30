import DropIn from "braintree-web-drop-in-react";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth/helper";
import { emptyCart, getTotalAmount } from "./helper/cartHelper";
import { createOrder } from "./helper/orderHelper";

import { getPaypalToken, processPayment } from "./helper/paymentHelper";

const PayViaPaypal = ({
  products,
  forceRefreshCart = (f) => f, //function (f) {return f}
  refreshCart = undefined,
}) => {
  const { user, token } = isAuthenticated();

  const [info, setInfo] = useState({
    loading: false,
    success: false,
    clientToken: null,
    error: "",
    instance: {},
  });

  const getToken = (userId, token) => {
    getPaypalToken(userId, token)
      .then((res) => {
        console.log("Paypal Info : ", res);
        if (res.error) {
          setInfo({ ...info, error: res.error });
        } else {
          const clientToken = res.clientToken;
          setInfo({ ...info, clientToken });
        }
      })
      .catch((err) => {
        console.log("Paypal Error : ", err);
      });
  };

  useEffect(() => {
    getToken(user._id, token);
  }, []);

  const showBtnDropIn = () => {
    return (
      <div>
        {info.clientToken !== null &&
        products !== null &&
        products.length > 0 ? (
          <div>
            <DropIn
              options={{ authorization: info.clientToken }}
              onInstance={(instance) => (info.instance = instance)}
            />
            <button className="btn btn-success" onClick={onPurchase}>
              Pay With PayPal
            </button>
          </div>
        ) : (
          <div>
            {user === null ? (
              <Link to="/signin">
                <button className="btn btn-info">Sign In</button>
              </Link>
            ) : (
              <Link to="/">
                <button className="btn btn-info">Add Products</button>
              </Link>
            )}
          </div>
        )}
      </div>
    );
  };

  const onPurchase = () => {
    setInfo({ ...info, loading: true });
    let nonce;
    let getNonce = info.instance.requestPaymentMethod().then((data) => {
      nonce = data.nonce;
      let paymentData = {
        paymentMethodNonce: nonce,
        amount: getTotalAmount(),
      };
      processPayment(user._id, token, paymentData)
        .then((data) => {
          setInfo({ ...info, loading: false, success: data.success });
          console.log("Paypal Payment Result : ", data);
          const orderData = {
            products: products,
            transaction_id: data.transaction.id,
            amount: data.transaction.amount,
          };
          createOrder(user._id, token, orderData);
          emptyCart(() => {
            forceRefreshCart(!refreshCart);
          });
        })
        .catch((err) => {
          console.log("Paypal Payment Err : ", err);
          setInfo({ ...info, loading: false, success: false });
        });
    });
  };

  return (
    <div>
      <h3>PayPal Checkout</h3>
      {showBtnDropIn()}
    </div>
  );
};

export default PayViaPaypal;
