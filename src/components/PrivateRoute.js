import React from "react";
import { Redirect, Route } from "react-router-dom";

import { useGlobalContext } from "../context/AuthContext";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { user } = useGlobalContext();
  return (
    <Route
      {...rest}
      exact
      render={(props) => {
        return user ? <Component {...props} /> : <Redirect to="/login" />;
      }}
    />
  );
};

export default PrivateRoute;
