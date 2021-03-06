import { React, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth/helper";
import Base from "../core/Base";
import {
  getCategories,
  getProduct,
  updateProduct,
} from "./helper/adminapicall";

const UpdateProduct = ({ match }) => {
  const { user, token } = isAuthenticated();

  const [values, setValues] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    photo: "",
    categories: [],
    category: "",
    loading: false,
    error: "",
    createdProduct: "",
    getRedirect: "",
    formData: "",
  });

  const {
    name,
    description,
    price,
    stock,
    photo,
    categories,
    category,
    loading,
    error,
    createdProduct,
    getRedirect,
    formData,
  } = values;

  const preload = (productId, categorys) => {
    getProduct(productId)
      .then((data) => {
        if (data.error) {
          data.error.message
            ? setValues({ ...values, error: data.error.message })
            : setValues({ ...values, error: data.error });
          setValues({ ...values, success: false });
        } else {
          setValues({
            ...values,
            error: "",
            name: data.product.name,
            description: data.product.description,
            price: data.product.price,
            stock: data.product.stock,
            category: data.product.category._id,
            categories: categorys,
            formData: new FormData(),
          });
          //preloadCategories();
        }
      })
      .catch((error) => {
        console.log(error);
        setValues({ ...values, error: error });
      });
  };

  const preloadCategories = () => {
    getCategories()
      .then((data) => {
        if (data.error) {
          setValues({ ...values, error: data.error?.message, success: false });
        } else {
          preload(match.params.productId, data.categories);
        }
      })
      .catch((error) => {
        console.log(error);
        setValues({ ...values, error: error });
      });
  };

  useEffect(() => {
    //preload(match.params.productId);
    preloadCategories();
  }, []);

  const onSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: "", success: false });
    updateProduct(match.params.productId, user._id, token, formData)
      .then((data) => {
        if (data.error) {
          data.error.message
            ? setValues({
                ...values,
                error: data.error.message,
                success: false,
              })
            : setValues({ ...values, error: data.error, success: false });
        } else {
          setValues({
            ...values,
            name: "",
            description: "",
            price: "",
            stock: "",
            photo: "",
            loading: false,
            createdProduct: data.product.name,
          });
        }
      })
      .catch((error) => {
        console.log(error);
        setValues({ ...values, error: error });
      });
  };

  const handleChange = (name) => (event) => {
    const value = name === "photo" ? event.target.files[0] : event.target.value;
    formData.set(name, value);
    setValues({ ...values, error: false, [name]: value });
  };

  const createProductForm = () => (
    <form className="my-2">
      <span>Post photo</span>
      <div className="form-group">
        <label className="btn btn-block btn-success">
          <input
            onChange={handleChange("photo")}
            type="file"
            name="photo"
            accept="image"
            placeholder="choose a file"
          />
        </label>
      </div>
      <div className="form-group">
        <input
          onChange={handleChange("name")}
          name="photo"
          className="form-control"
          placeholder="Name"
          value={name}
        />
      </div>
      <div className="form-group">
        <textarea
          onChange={handleChange("description")}
          name="photo"
          className="form-control"
          placeholder="Description"
          value={description}
        />
      </div>
      <div className="form-group">
        <input
          onChange={handleChange("price")}
          type="number"
          className="form-control"
          placeholder="Price"
          value={price}
        />
      </div>
      <div className="form-group">
        <select
          onChange={handleChange("category")}
          className="form-control"
          placeholder="Category"
        >
          <option>Select Category</option>
          {categories &&
            categories.map((cat, index) => (
              <option
                id={index}
                key={index}
                value={cat._id}
                selected={cat._id === category}
              >
                {cat.name}
              </option>
            ))}
        </select>
      </div>
      <div className="form-group">
        <input
          onChange={handleChange("stock")}
          type="number"
          className="form-control"
          placeholder="Stock / Quantity"
          value={stock}
        />
      </div>

      <button
        type="submit"
        onClick={onSubmit}
        className="btn btn-outline-success mb-2"
      >
        Update Product
      </button>
    </form>
  );

  const successMessage = () => {
    if (createdProduct) {
      return (
        <div className="row">
          <div className="col text-left mt-4">
            <div
              className="alert alert-success"
              style={{ display: createdProduct ? "" : "none" }}
            >
              {createdProduct} Updated Successfully.
            </div>
          </div>
        </div>
      );
    }
  };

  const errorMessage = () => {
    if (error !== "") {
      return (
        <div className="row">
          <div className="col text-left mt-4">
            <div
              className="alert alert-danger"
              style={{ display: error ? "" : "none" }}
            >
              {/* <p style={{ whiteSpace: "pre" }}>{error}</p> */}
              {error}
            </div>
          </div>
        </div>
      );
    }
  };

  return (
    <Base
      title="Add a product here!"
      description="Welcome to product creation section"
      className="container bg-success p-4"
    >
      <Link className="btn btn-sm btn-dark mb-4" to="/admin/dashboard">
        Admin Home
      </Link>
      <div className="row bg-dark text-white rounded">
        <div className="col-md-8 offset-md-2">
          {successMessage()}
          {errorMessage()}
          {createProductForm()}
        </div>
      </div>
    </Base>
  );
};

export default UpdateProduct;
