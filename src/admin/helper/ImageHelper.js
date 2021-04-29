import React from "react";
import { API } from "../../backend";

const ImageHelper = ({ product }) => {
  const image_url = product
    ? `${API}/product/photo/${product._id}`
    : "https://i.pinimg.com/originals/bd/df/d6/bddfd6e4434f42662b009295c9bab86e.gif";
  return (
    <div className="rounded border border-success p-2">
      <img
        src={image_url}
        alt="product"
        style={{ maxHeight: "100%", maxWidth: "100%" }}
        className="mb-3 rounded"
      />
    </div>
  );
};

export default ImageHelper;
