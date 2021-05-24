import React from "react";
import { Redirect, Route } from "react-router-dom";
import { connect } from "react-redux";
const PrivateRoute = ({ component: Component, user, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      user.isAuthenticated === true ? (
        <Component {...props} />
      ) : (
        <Redirect to="/" />
      )
    }
  />
);

function mapStatetoProps(state) {
  return {
    user: state.userLogin,
  };
}
export default connect(mapStatetoProps)(PrivateRoute);
