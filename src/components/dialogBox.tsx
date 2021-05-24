import React from "react";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import Divider from "../components/divider";
function DialogBox(props) {
  const {
    open = false,
    handleClose,
    title,
    content,
    action,
    divider,
    classNameDialogContent,
    maxWidth,
  } = props;
  return (
    <Dialog
      fullWidth
      maxWidth={maxWidth}
      onClose={handleClose}
      open={open}
      className="dialog-box"
    >
      <MuiDialogTitle>{title}</MuiDialogTitle>
      <MuiDialogContent dividers={divider} className={classNameDialogContent}>
        {content}
      </MuiDialogContent>
      <MuiDialogActions>{action}</MuiDialogActions>
    </Dialog>
  );
}
export default DialogBox;
