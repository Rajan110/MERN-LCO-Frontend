import React, { useState } from "react";
import Base from "../core/Base";
import { authenticate, isAuthenticated, signin } from "../auth/helper";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";

const Signin = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
    success: false,
    error: "",
    loading: "",
    didRedirect: "",
  });

  const { email, password, success, error, loading, didRedirect } = values;

  const { user } = isAuthenticated();

  const handleChange = (param) => (event) => {
    setValues({ ...values, error: false, [param]: event.target.value });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: false, loading: true });
    signin({ email, password })
      .then((data) => {
        if (data.error) {
          let errMsg = "";
          Array.from(data.error.error).forEach((err) => {
            errMsg += "\n" + err.msg;
          });

          setValues({ ...values, error: errMsg, loading: false });
        } else {
          authenticate(data, () => {
            setValues({ ...values, didRedirect: true, success: true });
          });
        }
      })
      .catch((error) => console.log(error.message));
  };

  const performRedirect = () => {
    if (didRedirect) {
      if (user && user.role === 1) {
        return <Redirect to="/admin/dashboard" />;
      } else {
        return <Redirect to="/user/dashboard" />;
      }
    }

    if (isAuthenticated()) {
      return <Redirect to="/" />;
    }
  };

  const loadingMessage = () => {
    return (
      loading && (
        <div className="row">
          <div className="col-md-6 offset-sm-3 text-left">
            <div className="alert alert-info">
              <h2>Loading...</h2>
            </div>
          </div>
        </div>
      )
    );
  };

  const successMessage = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <div
            className="alert alert-success"
            style={{ display: success ? "" : "none" }}
          >
            Successfully Logged In.
          </div>
        </div>
      </div>
    );
  };

  const errorMessage = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <div
            className="alert alert-danger"
            style={{ display: error ? "" : "none" }}
          >
            <p style={{ whiteSpace: "pre" }}>{error}</p>
          </div>
        </div>
      </div>
    );
  };

  const signInForm = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <form action="">
            <div className="form-group">
              <label className="text-light">Email</label>
              <input
                onChange={handleChange("email")}
                className="form-control"
                type="email"
                value={email}
              ></input>
            </div>
            <div className="form-group">
              <label className="text-light">Password</label>
              <input
                onChange={handleChange("password")}
                className="form-control"
                type="password"
                value={password}
              ></input>
            </div>
            <button onClick={onSubmit} className="btn btn-success btn-block">
              Sign In / Login
            </button>
          </form>
        </div>
      </div>
    );
  };

  return (
    <Base
      title="Sign In"
      description="Please Fill Below Form To SignIn / Login."
    >
      {loadingMessage()}
      {successMessage()}
      {errorMessage()}
      {signInForm()}
      {performRedirect()}
      <p className="text-white text-center">{JSON.stringify(values)}</p>
    </Base>
  );
};

export default Signin;
