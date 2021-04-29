import React from "react";
import ImageHelper from "../admin/helper/ImageHelper";

const Card = ({ product, addToCart = true, removeFromCart = false }) => {
  const showAddToCart = (addToCart) => {
    return (
      addToCart && (
        <div className="col-12">
          <button
            onClick={() => {}}
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
            onClick={() => {}}
            className="btn btn-block btn-outline-danger mt-2 mb-2"
          >
            Remove from cart
          </button>
        </div>
      )
    );
  };

  const testCard = () => {
    return (
      <div className="card text-white bg-dark border border-white ">
        <div className="card-header lead">{product?.name}</div>
        <div className="card-body">
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

  return testCard();
};

export default Card;
