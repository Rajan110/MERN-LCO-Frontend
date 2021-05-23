import React, { useEffect, useState } from "react";
import { Redirect } from "react-router";
import ImageHelper from "./helper/ImageHelper";
import { addItemToCart, removeItemFromCart } from "./helper/cartHelper";

const Card = ({
  product,
  addToCart = true,
  removeFromCart = false,
  forceRefreshCart = (f) => f, //function (f) {return f}
  refreshCart = undefined,
}) => {
  const [redirect, setRedirect] = useState(false);
  const [count, setCount] = useState(product.count);

  const getRedirect = () => {
    if (redirect) {
      return <Redirect to="/cart" />;
    }
  };

  const addProductToCart = () => {
    addItemToCart(product, () => {
      setRedirect(true);
    });
  };

  const removeProductFromCart = (productId) => {
    removeItemFromCart(productId);
  };

  const showAddToCart = (addToCart) => {
    return (
      addToCart && (
        <div className="col-12">
          <button
            onClick={addProductToCart}
            className="btn btn-block btn-outline-success my-2"
          >
            Add to Cart
          </button>
        </div>
      )
    );
  };

  const showRemoveFromCart = (removeFromCart) => {
    return (
      removeFromCart && (
        <div className="col-12">
          <button
            onClick={() => {
              removeProductFromCart(product._id);
              forceRefreshCart(!refreshCart);
            }}
            className="btn btn-block btn-outline-danger mt-2 mb-2"
          >
            Remove from cart
          </button>
        </div>
      )
    );
  };

  return (
    <div className="card text-white bg-dark border border-white">
      <div className="card-header lead">{product?.name}</div>
      <div className="card-body">
        {getRedirect(redirect)}
        <ImageHelper product={product} />
        <p className="lead font-weight-normal text-wrap my-2">
          {product?.description}
        </p>
        <p className="btn btn-success rounded  btn-sm my-2">
          Rs. {product?.price}
        </p>
        <div className="row">
          {showAddToCart(addToCart)}
          {showRemoveFromCart(removeFromCart)}
        </div>
      </div>
    </div>
  );
};

export default Card;
