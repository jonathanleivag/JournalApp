import { types } from "../types/types";
import { firebase, googleAuthProvider } from "../firebase/firebaseConfig";
import { finishLoading, startLoading } from "./ui";
import Swal from "sweetalert2";

export const startRegister = (name, email, password) => {
  return (dispatch) => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(async ({ user }) => {
        await user.updateProfile({ displayName: name });
        dispatch(login(user.uid, user.displayName));
      })
      .catch((error) => {
        Swal.fire("Error", error.message, "error");
      });
  };
};

export const startLogin = (email, password) => {
  return async (dispatch) => {
    dispatch(startLoading());
    try {
      const {
        user: { uid, displayName },
      } = await firebase.auth().signInWithEmailAndPassword(email, password);
      dispatch(login(uid, displayName));
      dispatch(finishLoading());
    } catch (error) {
      dispatch(finishLoading());
      Swal.fire("Error", error.message, "error");
    }
  };
};

export const startGoogleLogin = () => {
  return (dispatch) => {
    firebase
      .auth()
      .signInWithPopup(googleAuthProvider)
      .then(({ user: { uid, displayName } }) => {
        dispatch(login(uid, displayName));
      })
      .catch((error) => Swal.fire("Error", error.message, "error"));
  };
};

export const login = (uid, displayName) => ({
  type: types.login,
  payload: { uid, displayName },
});

export const startLogout = () => {
  return async (dispatch) => {
    try {
      await firebase.auth().signOut();
      dispatch(logout());
    } catch (error) {
      Swal.fire("Error", error.message, "error");
    }
  };
};

export const logout = () => ({ type: types.logout });
