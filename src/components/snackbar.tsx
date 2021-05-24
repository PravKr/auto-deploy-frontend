import React from "react";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function SnackbarCmp(props) {
  const { open, handleClose, label, type } = props;

  return (
    <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
      <Alert onClose={handleClose} severity={type}>
        {label}
      </Alert>
    </Snackbar>
  );
}
export default SnackbarCmp;
