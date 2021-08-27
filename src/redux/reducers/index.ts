import { combineReducers } from "redux";

import {
  systemListReducer,
  updateSystemReducer,
  pingSystemReducer,
  updateImportSystemReducer,
  connectExportSystemReducer,
  addSystemReducer,
  entitiesByIdReducer,
  selectedEntitiesValuesByCategoryReducer,
  importListCheckReducer,
  importSystemReducer,
  getHistoryByDateReducer,
  getHistoryReducer,
  entitiesBySearchTextActionReducer,
  entityImportByHistoryDateReducer,
  getImportSystemListByDateReducer,
} from "./system";

import {
  getVisitHistoryReducer,
  getVisitHistoryByDateReducer,
  entitiesValuesByCategoryReducer,
  entitiesAddToCartReducer,
} from "./connectedSystem";

import { systemCartListReducer, removeFromCartEntitiesReducer } from "./cart";

import { importDialogBoxReducer, loginDialogBoxReducer } from "./component";

import { userLoginReducer } from "./user";

export default combineReducers({
  getVisitHistoryCombiner: getVisitHistoryReducer,
  getVisitHistoryByDateCombiner: getVisitHistoryByDateReducer,
  entitiesValues: entitiesValuesByCategoryReducer,
  entitiesAddToCart: entitiesAddToCartReducer,

  systemCartList: systemCartListReducer,
  removeFromCart: removeFromCartEntitiesReducer,

  systemList: systemListReducer,
  updateSystem: updateSystemReducer,
  pingSystem: pingSystemReducer,
  updateImportSystem: updateImportSystemReducer,
  connectExportSystem: connectExportSystemReducer,
  addSystem: addSystemReducer,
  entitiesById: entitiesByIdReducer,
  getHistory: getHistoryReducer,
  entitiesBySearch: entitiesBySearchTextActionReducer,
  selectedEntitiesValues: selectedEntitiesValuesByCategoryReducer,

  importDialogBox: importDialogBoxReducer,
  importListCheck: importListCheckReducer,
  importSystem: importSystemReducer,
  entityImportByHistoryDate: entityImportByHistoryDateReducer,
  loginDialogBox: loginDialogBoxReducer,
  userLogin: userLoginReducer,
  getHistoryByDate: getHistoryByDateReducer,
  getImportSystemList:getImportSystemListByDateReducer,
});
