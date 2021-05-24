import React, { Fragment } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "./typography";
function Footer() {
  return (
    <Fragment>
      <AppBar position="sticky" id="appbar">
        <Toolbar className="toolbar">
          <Typography label="@Navis 2021 All Rights Reserved" />
        </Toolbar>
      </AppBar>
    </Fragment>
  );
}
export default Footer;
