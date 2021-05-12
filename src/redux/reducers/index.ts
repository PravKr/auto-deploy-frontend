import {combineReducers}  from 'redux'

import { 
         exportSystemListReducer, importSystemListReducer, updateExportSystemReducer, updateImportSystemReducer,
         connectExportSystemReducer, addSystemReducer, entitiesByIdReducer, entitiesAddToCartReducer, 
         entitiesValuesByCategoryReducer, selectedEntitiesValuesByCategoryReducer, systemCartListReducer,
         removeFromCartEntitiesReducer, importListCheckReducer, importSystemReducer } from './system'

import {importDialogBoxReducer} from './component'


export default combineReducers({
    exportSystemList:exportSystemListReducer,
    importSystemList:importSystemListReducer,
    updateExportSystem:updateExportSystemReducer,
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
    importSystem:importSystemReducer
})