import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter as Router, Switch, Redirect } from "react-router-dom";
import { login } from "../../actions/auth";
import { startLoadingNotes } from "../../actions/notes";
import { firebase } from "../../firebase/firebaseConfig";
import { JournalScreen } from "../journal/JournalScreen";
import { AuthRouter } from "./AuthRouter";
import { PrivateRouter } from "./PrivateRouter";
import { PublicRouter } from "./PublicRouter";

export const AppRouter = () => {
  const dispatch = useDispatch();

  const [checking, setChecking] = useState(true);
  const [isLoggendIn, setIsLoggendIn] = useState(false);

  useEffect(() => {
    firebase.auth().onAuthStateChanged(async (user) => {
      if (user?.uid) {
        const { uid, displayName } = user;
        dispatch(login(uid, displayName));
        dispatch(startLoadingNotes(uid));
        setIsLoggendIn(true);
      } else {
        setIsLoggendIn(false);
      }

      setChecking(false);
    });
  }, [dispatch]);

  if (checking) return <h1>Weit...</h1>;

  return (
    <Router>
      <div>
        <Switch>
          <PublicRouter
            path="/auth"
            isAuthenticated={isLoggendIn}
            component={AuthRouter}
          />
          <PrivateRouter
            isAuthenticated={isLoggendIn}
            component={JournalScreen}
            exact
            path="/"
          />
          <Redirect to="/auth/login" />
        </Switch>
      </div>
    </Router>
  );
};
