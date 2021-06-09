import React, { Fragment } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "./typography";
import DialogBox from "./dialogBox";
import { useInputString } from "./input";
import Textfield from "./textfield";
import Button from "./button";
import LoginButton from "@material-ui/core/Button";
import { useSelector, useDispatch } from "react-redux";
import { openLoginDialogBoxAction } from "../redux/actions/component";
import { userLoginAction, userLogoutAction } from "../redux/actions/user";

import {
  downloadHelp,
  downoladN4Plugins,
} from "../redux/actions/system";

function Appbar() {
  const dispatch = useDispatch();

  const {
    value: userName,
    bind: bindUserName,
    reset: resetUserName,
  } = useInputString("");
  const {
    value: password,
    bind: bindPassword,
    reset: resetPassword,
  } = useInputString("");

  const loginDialogBox = useSelector((state) => state.loginDialogBox);
  const userLogin = useSelector((state) => state.userLogin);
  const { user, loading, isAuthenticated = false } = userLogin;
  const { trigger } = loginDialogBox;

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(userLoginAction({ userName, password }));
  };
  const handleLogout = () => {
    dispatch(userLogoutAction());
  };
  const handleDialogBox = (e) => {
    dispatch(openLoginDialogBoxAction(e));
    if (e === false) {
      resetUserName();
      resetPassword();
    }
  };

  const handleHelp = () => {
    dispatch(downloadHelp());
  };

  const handledownoladN4Plugins = () => {
    dispatch(downoladN4Plugins());
  }

  return (
    <Fragment>
      <AppBar position="sticky" id="appbar">
        <Toolbar className="toolbar">
          <a href="/" className="title">
            <Typography
              variant="h6"
              label="Navis - Auto Deploy"
              className="appbarTitle"
            />
          </a>
          <Button
            onClick={handledownoladN4Plugins}
            variant="contained"
            color="primary"
            label="Download N4 Plugins"
          />
          <Button
            onClick={handleHelp}
            variant="contained"
            color="primary"
            label="Help"
          />
          <Fragment>
            {/*{ isAuthenticated ? 
                    <LoginButton color="inherit" onClick={handleLogout}>Logout</LoginButton>
                    : <LoginButton color="inherit" onClick={()=>handleDialogBox(true)}>Login</LoginButton>  }*/}
          </Fragment>
        </Toolbar>
        <DialogBox
          title="Login"
          maxWidth="sm"
          open={trigger}
          handleClose={() => handleDialogBox(false)}
          content={
            <form onSubmit={handleLogin}>
              <Textfield
                type="text"
                required
                label="Username"
                {...bindUserName}
              />
              <Textfield
                type="text"
                required
                label="password"
                {...bindPassword}
              />
              <Button
                variant="contained"
                disabled={!userName || !password}
                type="submit"
                color="primary"
                label="Login"
              />
            </form>
          }
        />
      </AppBar>
    </Fragment>
  );
}
export default Appbar;
