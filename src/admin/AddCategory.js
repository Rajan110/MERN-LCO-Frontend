import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { isAuthenticated } from "../auth/helper";
import Base from "../core/Base";
import {
  addCategory,
  deleteCategory,
  getCategories,
  getCategory,
} from "./helper/adminapicall";

const AddCategory = () => {
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [is_deleted, setDeleted] = useState(false);
  const [categories, setCategories] = useState([]);
  const [categoryObj, setCategoryObj] = useState("");

  const { user, token } = isAuthenticated();

  const adminHome = () => {
    return (
      <div>
        <Link className="btn btn-sm btn-success my-2" to="/admin/dashboard">
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
          setError(data.error?.message);
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

  const loadCategory = (categoryId) => {
    getCategory(categoryId)
      .then((data) => {
        if (data.error) {
          setError(data.error?.message);
        } else {
          setError(false);
          setCategoryObj(data.category);
        }
      })
      .catch((error) => {
        setError(error);
        console.log(error);
      });
  };

  useEffect(() => {
    setError("");
    setSuccess(false);
    getCategories()
      .then((data) => {
        if (data.error) {
          setError(data.error?.message);
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

  const editCategoryForm = () => {
    return (
      <form>
        <div className="form-group">
          <p className="lead">Edit Category / Collection</p>
          <input
            onChange={handleChange}
            value={categoryObj.name}
            type="text"
            className="form-control my-3"
            autoFocus
            required
            placeholder="For Eg. Spring Collection"
          />
          <button className="btn btn-outline-success" onClick={submitCategory}>
            Edit Category
          </button>
        </div>
      </form>
    );
  };

  const deleteThisCategory = (categoryId) => {
    deleteCategory(categoryId, user._id, token)
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

  const showCategories = () => {
    return (
      <div className="row">
        <div className="col text-dark">
          <h2 className="text-white">Existing Categories</h2>
          {categories.map((cat, index) => {
            return (
              <div key={index} className="row text-center my-2 ">
                <div className="col-4">
                  <h4 className="text-success">{cat.name}</h4>
                </div>
                <div className="col-4">
                  <button
                    onClick={() => {
                      loadCategory(cat._id);
                    }}
                    className="btn btn-success"
                  >
                    Update
                  </button>
                </div>
                <div className="col-4">
                  <button
                    onClick={() => {
                      deleteThisCategory(cat._id);
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
    );
  };

  const renderForm = () => {
    if (categoryObj != null && categoryObj !== "") {
      return editCategoryForm();
    } else {
      return addCategoryForm();
    }
  };

  return (
    <Base
      title="Add Category"
      description="Add New Categories / Collection"
      className="container bg-success p-4"
    >
      <div className="row bg-dark text-white rounded">
        <div className="col-md-8 offset-md-2">
          {successMessage()}
          {errorMessage()}
          {renderForm()}
          {adminHome()}
          <p className="text-white">{JSON.stringify(name)}</p>
          {showCategories()}
        </div>
      </div>
    </Base>
  );
};

export default AddCategory;
