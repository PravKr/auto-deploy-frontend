import { actions } from "../actionTypes";
export function importDialogBoxReducer(state = null, action) {
  switch (action.type) {
    case actions.importDialogBox:
      return { ...state, trigger: action.payload, type: action.dialogType };
    default:
      return { ...state };
  }
}

export function loginDialogBoxReducer(state = null, action) {
  switch (action.type) {
    case actions.openLoginDialogBox:
      return { ...state, trigger: action.payload };
    default:
      return { ...state };
  }
}
