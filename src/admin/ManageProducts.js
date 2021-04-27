import { React, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth/helper";
import { API } from "../backend";
import Base from "../core/Base";
import { deleteProduct, getProducts } from "./helper/adminapicall";

const ManageProducts = () => {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [is_deleted, setDeleted] = useState(false);
  const [products, setProducts] = useState([]);

  const { user, token } = isAuthenticated();

  useEffect(() => {
    setError("");
    setSuccess(false);
    getProducts()
      .then((data) => {
        if (data.error) {
          data.error.message
            ? setError(data.error.message)
            : setError(data.error);
        } else {
          setError("");
          setDeleted(false);
          setProducts(data.products);
        }
      })
      .catch((error) => {
        console.log(error);
        setError(error);
      });
  }, [is_deleted]);

  const deleteThisProduct = (productId) => {
    deleteProduct(productId, user._id, token)
      .then((data) => {
        if (data.error) {
          setError(data.error);
          setSuccess(false);
        } else {
          setError("");
          setSuccess(true);
          setDeleted(true);
        }
      })
      .catch((error) => {
        console.log(error);
        setError(error);
      });
  };

  return (
    <Base title="Manage Products" description="Manage Your Products Here">
      <h2 className="mb-4">All products:</h2>
      <Link className="btn btn-success" to={`/admin/dashboard`}>
        <span className="">Admin Home</span>
      </Link>
      <div className="row">
        <div className="col-12">
          <h2 className="text-center text-white my-3">
            Total {`${products.length}`} Products
          </h2>

          {products.map((product, index) => {
            return (
              <div key={index} className="row text-center mb-2 ">
                <div className="col-3">
                  <h3 className="text-white text-left">{product.name}</h3>
                </div>
                <div className="col-3">
                  <h3 className="text-white text-left">
                    {product.category.name}
                  </h3>
                </div>
                <div className="col-3">
                  <Link
                    className="btn btn-success"
                    to={`/admin/product/update/${product._id}`}
                  >
                    <span className="">Update</span>
                  </Link>
                </div>
                <div className="col-3">
                  <button
                    onClick={() => {
                      deleteThisProduct(product._id);
                    }}
                    className="btn btn-danger"
                  >
                    Delete
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Base>
  );
};

export default ManageProducts;
