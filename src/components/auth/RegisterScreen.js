import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { useForm } from "../../hooks/useForm";
import validator from "validator";
import { useDispatch, useSelector } from "react-redux";
import { setError, removeError } from "../../actions/ui";
import { startRegister } from "../../actions/auth";

export const RegisterScreen = () => {
  const [values, handleInputChange] = useForm({
    name: "",
    email: "",
    password: "",
    password2: "",
  });

  const { name, email, password, password2 } = values;
  const dispatch = useDispatch();
  const { msgError } = useSelector((state) => state.ui);

  const handlerRegister = (e) => {
    e.preventDefault();
    if (isFormValid()) {
      dispatch(startRegister(name, email, password));
    }
  };

  const isFormValid = () => {
    if (name.trim().length === 0) {
      dispatch(setError("Name is required"));
      return false;
    } else if (!validator.isEmail(email)) {
      dispatch(setError("Email is not valid"));
      return false;
    } else if (password !== password2 || password.length < 5) {
      dispatch(setError("Password shoult be at least 6 characters and match"));
      return false;
    }
    dispatch(removeError());
    return true;
  };

  return (
    <Fragment>
      <h1 className="auth__title">Register Screen</h1>

      <form autoComplete="off" onSubmit={handlerRegister}>
        {msgError !== null && (
          <div className="auth__alert-error">{msgError}</div>
        )}

        <input
          type="text"
          placeholder="Name"
          name="name"
          className="auth__input"
          autoComplete="off"
          value={name}
          onChange={handleInputChange}
        />

        <input
          type="text"
          placeholder="Email"
          name="email"
          className="auth__input"
          autoComplete="off"
          value={email}
          onChange={handleInputChange}
        />
        <input
          type="password"
          placeholder="Password"
          name="password"
          className="auth__input"
          autoComplete="off"
          value={password}
          onChange={handleInputChange}
        />

        <input
          type="password"
          placeholder="Confirm"
          name="password2"
          className="auth__input"
          autoComplete="off"
          value={password2}
          onChange={handleInputChange}
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
