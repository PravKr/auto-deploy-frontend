import { actions } from "../actionTypes";
import { getSystemListAction } from "./system";

export const importDialogBoxAction = (e, dialogType) => async (dispatch) => {
  try {
    if (e === true) {
      await dispatch(getSystemListAction());
    }
    await dispatch({ type: actions.importDialogBox, payload: e, dialogType });
  } catch (er) {
    dispatch({
      type: actions.importDialogBoxError,
      payload: "Something went wrong",
    });
  }
};

export const openLoginDialogBoxAction = (e) => async (dispatch) => {
  try {
    await dispatch({ type: actions.openLoginDialogBox, payload: e });
  } catch (er) {
    dispatch({
      type: actions.openLoginDialogBoxError,
      payload: "Something went wrong",
    });
  }
};
