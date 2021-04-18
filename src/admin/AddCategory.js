import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { isAuthenticated } from "../auth/helper";
import Base from "../core/Base";
import { addCategory, getCategories } from "./helper/adminapicall";

const AddCategory = () => {
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [categories, setCategories] = useState([]);

  const { user, token } = isAuthenticated();

  const adminHome = () => {
    return (
      <div className="mt-5">
        <Link className="btn btn-sm btn-success mb-3" to="/admin/dashboard">
          Admin Home
        </Link>
      </div>
    );
  };

  const handleChange = (event) => {
    event.preventDefault();
    setError(false);
    setName(event.target.value);
  };

  const submitCategory = (event) => {
    event.preventDefault();
    setError("");
    setSuccess(false);
    addCategory(user._id, token, { name })
      .then((data) => {
        if (data.error) {
          data.error.message
            ? setError(data.error.message)
            : setError(data.error);
          setSuccess(false);
        } else {
          setError("");
          setSuccess(true);
          setName("");
        }
      })
      .catch((error) => {
        console.log(error);
        setError(error);
      });
  };

  useEffect(() => {
    setError("");
    setSuccess(false);
    getCategories()
      .then((data) => {
        if (data.error) {
          data.error.message
            ? setError(data.error.message)
            : setError(data.error);
          setSuccess(false);
        } else {
          setError("");
          setCategories(data.categories);
        }
      })
      .catch((error) => {
        console.log(error);
        setError(error);
      });
  }, [success]);

  const successMessage = () => {
    if (success) {
      return (
        <div className="row">
          <div className="col text-left mt-4">
            <div
              className="alert alert-success"
              style={{ display: success ? "" : "none" }}
            >
              Category Successfully Created.
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
              <p style={{ whiteSpace: "pre" }}>{error}</p>
            </div>
          </div>
        </div>
      );
    }
  };

  const addCategoryForm = () => {
    return (
      <form>
        <div className="form-group">
          <p className="lead">Enter The Category / Collection Name</p>
          <input
            onChange={handleChange}
            value={name}
            type="text"
            className="form-control my-3"
            autoFocus
            required
            placeholder="For Eg. Spring Collection"
          />
          <button className="btn btn-outline-success" onClick={submitCategory}>
            Add Category
          </button>
        </div>
      </form>
    );
  };

  const showCategories = () => {
    return (
      <div className="row">
        <div className="col my-3 text-dark">
          <h2>Existing Categories</h2>
          <br />
          {categories.map((cat) => {
            return <h4 className="text-success">{cat.name}</h4>;
          })}
        </div>
      </div>
    );
  };

  return (
    <Base
      title="Add Category"
      description="Add New Categories / Collection"
      className="container bg-success p-4"
    >
      <div className="row bg-white rounded">
        <div className="col-md-8 offset-md-1">
          {successMessage()}
          {errorMessage()}
          {addCategoryForm()}
          {adminHome()}
          <p className="text-dark">{JSON.stringify(name)}</p>
          {showCategories()}
        </div>
      </div>
    </Base>
  );
};

export default AddCategory;
