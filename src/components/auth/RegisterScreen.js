import React, { Fragment } from "react";
import { Link } from "react-router-dom";

export const RegisterScreen = () => {
  return (
    <Fragment>
      <h1 className="auth__title">Register Screen</h1>

      <form autoComplete='off'>
        <input
          type="text"
          placeholder="Name"
          name="name"
          className="auth__input"
          autoComplete='off'
        />

        <input
          type="text"
          placeholder="Email"
          name="email"
          className="auth__input"
          autoComplete='off'
        />
        <input
          type="password"
          placeholder="Password"
          name="password"
          className="auth__input"
          autoComplete='off'
        />

        <input
          type="password"
          placeholder="Confirm"
          name="password2"
          className="auth__input"
          autoComplete='off'
        />

        <button type="submit" className="btn btn-primary btn-block mb-5">
          Register
        </button>

        <Link to="/auth/login" className="link">
          Already registered ?
        </Link>
      </form>
    </Fragment>
  );
};
