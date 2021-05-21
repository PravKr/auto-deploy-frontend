import {combineReducers}  from 'redux'

import { 
         exportSystemListReducer, importSystemListReducer, updateExportSystemReducer, pingSystemReducer, updateImportSystemReducer,
         connectExportSystemReducer, addSystemReducer, entitiesByIdReducer, entitiesAddToCartReducer, 
         entitiesValuesByCategoryReducer, selectedEntitiesValuesByCategoryReducer, systemCartListReducer,
         removeFromCartEntitiesReducer, importListCheckReducer, importSystemReducer, getHistoryByDateReducer, getHistoryReducer,
         entitiesBySearchTextActionReducer } from './system'

import {importDialogBoxReducer, loginDialogBoxReducer} from './component'

import { userLoginReducer} from './user'

export default combineReducers({
    exportSystemList:exportSystemListReducer,
    importSystemList:importSystemListReducer,
    updateExportSystem:updateExportSystemReducer,
    pingSystem: pingSystemReducer,
    updateImportSystem:updateImportSystemReducer,
    connectExportSystem: connectExportSystemReducer,
    addSystem: addSystemReducer,
    entitiesById: entitiesByIdReducer,
    getHistory: getHistoryReducer,
    entitiesAddToCart:entitiesAddToCartReducer,
    entitiesValues:entitiesValuesByCategoryReducer,
    entitiesBySearch:entitiesBySearchTextActionReducer,
    selectedEntitiesValues:selectedEntitiesValuesByCategoryReducer,
    systemCartList:systemCartListReducer,
    removeFromCart:removeFromCartEntitiesReducer,
    importDialogBox:importDialogBoxReducer,
    importListCheck:importListCheckReducer,
    importSystem:importSystemReducer,
    loginDialogBox:loginDialogBoxReducer,
    userLogin: userLoginReducer,
    getHistoryByDate: getHistoryByDateReducer
})