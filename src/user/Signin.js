import React, { useState } from "react";
import Base from "../core/Base";
import { Link } from "react-router-dom";

const Signin = () => {
  const signInForm = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <form action="">
            <div className="form-group">
              <label className="text-light">Email</label>
              <input className="form-control" type="email"></input>
            </div>
            <div className="form-group">
              <label className="text-light">Password</label>
              <input className="form-control" type="password"></input>
            </div>
            <button className="btn btn-success btn-block">
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
      {signInForm()}
    </Base>
  );
};

export default Signin;
