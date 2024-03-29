import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { useForm } from "../../hooks/useForm";
import { useDispatch, useSelector } from "react-redux";
import { startGoogleLogin, startLogin } from "../../actions/auth";

export const LoginScreen = () => {
  const [values, handleInputChange] = useForm({ email: "", password: "" });
  const { email, password } = values;
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.ui);

  const handlerLogin = (e) => {
    e.preventDefault();
    dispatch(startLogin(email, password));
  };

  const handlerGoogleLogin = () => {
    dispatch(startGoogleLogin());
  };

  return (
    <Fragment>
      <h3 className="auth__title">Login</h3>
      <form
        autoComplete="off"
        onSubmit={handlerLogin}
        className="animate__animated animate__fadeIn animate_faster"
      >
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
        <button
          type="submit"
          className="btn btn-primary btn-block"
          disabled={loading}
        >
          Login
        </button>

        <div className="auth__social-networks">
          <p>Login with social networks</p>
          <div className="google-btn" onClick={handlerGoogleLogin}>
            <div className="google-icon-wrapper">
              <img
                className="google-icon"
                src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
                alt="google button"
              />
            </div>
            <p className="btn-text">
              <b>Sign in with google</b>
            </p>
          </div>
        </div>
        <Link to="/auth/register" className="link">
          Create new account
        </Link>
      </form>
    </Fragment>
  );
};
