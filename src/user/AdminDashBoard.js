import React from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { isAuthenticated } from "../auth/helper";
import Base from "../core/Base";

const AdminDashBoard = () => {
  const {
    user: { name, email },
  } = isAuthenticated();

  const adminLeftSide = () => {
    return (
      <div className="card">
        <h5 className="card-header bg-dark text-white">Admin Navigation</h5>
        <ul className="list-group">
          <li className="list-group-item  text-center">
            <Link to="/admin/categories" className="nav-link text-success">
              Create Categories
            </Link>
          </li>
          <li className="list-group-item  text-center">
            <Link to="/admin/categories" className="nav-link text-success">
              Manage Categories
            </Link>
          </li>
          <li className="list-group-item text-center">
            <Link to="/admin/create/products" className="nav-link text-success">
              Create Products
            </Link>
          </li>
          <li className="list-group-item  text-center">
            <Link to="/admin/products" className="nav-link text-success">
              Manage Products
            </Link>
          </li>
          <li className="list-group-item  text-center">
            <Link to="/admin/orders" className="nav-link text-success">
              Manage Orders
            </Link>
          </li>
        </ul>
      </div>
    );
  };

  const adminRightSide = () => {
    return (
      <div className="card mb-4">
        <h4 className="card-header">
          <ul className="list-group">
            <li className="list-group-item">
              <span className="badge badge-danger">Admin Area</span>
            </li>
            <li className="list-group-item">
              <span className="badge badge-success mr-2">Name :</span>
              {name}
            </li>
            <li className="list-group-item">
              <span className="badge badge-success mr-2">Email :</span>
              {email}
            </li>
          </ul>
        </h4>
      </div>
    );
  };

  return (
    <Base
      title="Admin Dashboard"
      description="Manage Your Store"
      className="container bg-success p-3"
    >
      <div className="row">
        <div className="col-3">{adminLeftSide()}</div>
        <div className="col-9">{adminRightSide()}</div>
      </div>
    </Base>
  );
};

export default AdminDashBoard;
