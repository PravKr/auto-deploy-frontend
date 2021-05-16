import {combineReducers}  from 'redux'

import { 
         exportSystemListReducer, importSystemListReducer, updateExportSystemReducer, pingSystemReducer, updateImportSystemReducer,
         connectExportSystemReducer, addSystemReducer, entitiesByIdReducer, entitiesAddToCartReducer, 
         entitiesValuesByCategoryReducer, selectedEntitiesValuesByCategoryReducer, systemCartListReducer,
         removeFromCartEntitiesReducer, importListCheckReducer, importSystemReducer } from './system'

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
    entitiesAddToCart:entitiesAddToCartReducer,
    entitiesValues:entitiesValuesByCategoryReducer,
    selectedEntitiesValues:selectedEntitiesValuesByCategoryReducer,
    systemCartList:systemCartListReducer,
    removeFromCart:removeFromCartEntitiesReducer,
    importDialogBox:importDialogBoxReducer,
    importListCheck:importListCheckReducer,
    importSystem:importSystemReducer,
    loginDialogBox:loginDialogBoxReducer,
    userLogin: userLoginReducer
})