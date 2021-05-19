export const actions = {
    exportSystemListLoading: 'EXPORT_SYSTEM_LIST_LOADING',
    exportSystemList: 'EXPORT_SYSTEM_LIST',
    exportSystemListError: 'EXPORT_SYSTEM_LIST_ERROR',
    
    importSystemListLoading: 'IMPORT_SYSTEM_LIST_LOADING',
    importSystemList: 'IMPORT_SYSTEM_LIST',
    importSystemListError: 'IMPORT_SYSTEM_LIST_ERROR',

    addSystemLoading: 'ADD_SYSTEM_LOADING',
    addSystem: 'ADD_SYSTEM',
    addSystemError: 'ADD_SYSTEM_ERROR',

    pingSystemLoading: 'PING_SYSTEM_LOADING',
    pingSystem: 'PING_SYSTEM',
    pingSystemError: 'PING_SYSTEM_ERROR',

    removeSystemLoading: 'REMOVE_SYSTEM_LOADING',
    removeSystem: 'REMOVE_SYSTEM',
    removeSystemError: 'REMOVE_SYSTEM_ERROR',

    updateExportSystemLoading: 'UPDATE_EXPORT_SYSTEM_LOADING',
    updateExportSystem: 'UPDATE_EXPORT_SYSTEM',
    updateExportSystemError: 'UPDATE_EXPORT_SYSTEM_ERROR',

    updateImportSystemLoading: 'UPDATE_IMPORT_SYSTEM_LOADING',
    updateImportSystem: 'UPDATE_IMPORT_SYSTEM',
    updateImportSystemError: 'UPDATE_IMPORT_SYSTEM_ERROR',

    connectExportSystemLoading: 'CONNECT_EXPORT_SYSTEM_LOADING',
    connectExportSystem: 'CONNECT_EXPORT_SYSTEM',
    connectExportSystemError: 'CONNECT_EXPORT_SYSTEM_ERROR',

    // Entities according to system id
    entitiesByIdLoading: 'ENTITIES_BY_ID_LOADING',
    entitiesById: 'ENTITIES_BY_ID',
    entitiesByIdError: 'ENTITIES_BY_ID_ERROR',

    getHistoryLoading: 'GET_HISTORY_LOADING',
    getHistory: 'GET_HISOTRY',
    getHistoryError: 'GET_HISOTRY_ERROR',
    
    // Entity Values according to selected Category
    entitiesValuesByCategoryLoading: 'ENTITIES_VALUES_BY_CATEGORY_LOADING',
    entitiesValuesByCategory: 'ENTITIES_VALUES_BY_CATEGORY',
    entitiesValuesByCategoryError: 'ENTITIES_VALUES_BY_CATEGORY_ERROR',
    
    // selected values from entities values
    selectedEntitiesValuesByCategory: 'SELECTED_ENTITIES_VALUES_BY_CATEGORY',
    selectedEntitiesValuesByCategoryError: 'SELECTED_ENTITIES_VALUES_BY_CATEGORY_ERROR',

    // add to cart
    entitiesAddToCartLoading: 'ENTITIES_ADD_TO_CART_LOADING',
    entitiesAddToCart: 'ENTITIES_ADD_TO_CART',
    entitiesAddToCartError: 'ENTITIES_ADD_TO_CART_Error',

    // system cart list
    systemCartListLoading: 'SYSTEM_CART_LIST_LOADING',
    systemCartList: 'SYSTEM_CART_LIST',
    systemCartListError: 'SYSTEM_CART_LIST_ERROR',

    getHistoryByDateLoading: 'GET_HISTORY_BY_DATE_LOADING',
    getHistoryByDate: 'GET_HISTORY_BY_DATE',
    getHistoryByDateError: 'GET_HISTORY_BY_DATE_ERROR',

    removeFromCartEntitiesLoading: 'REMOVE_CART_ENTITIES_LOADING',
    removeFromCartEntities: 'REMOVE_CART_ENTITIES',
    removeFromCartEntitiesError: 'REMOVE_CART_ENTITIES_ERROR',

    removeByEntityFromCartEntitiesLoading: 'REMOVE_BY_ENTITY_FROM_CART_ENTITIES_LOADING',
    removeByEntityFromCartEntities: 'REMOVE_BY_ENTITY_FROM_CART_ENTITIES',
    removeByEntityFromCartEntitiesError: 'REMOVE_BY_ENTITY_FROM_CART_ENTITIES_ERROR',

    emptyCartLoading: 'EMPTY_CART_LOADING',
    emptyCart: 'EMPTY_CART',
    emptyCartError: 'EMPTY_CART_ERROR',


    entityExportLoading: 'ENTITY_EXPORT_LOADING',
    entityExportError: 'ENTITY_EXPORT_ERROR',

   // entityImportLoading: 'ENTITY_IMPORT_'

   importDialogBox: 'IMPORT_DIALOG_BOX',
   importDialogBoxError: 'IMPORT_DIALOG_BOX_ERROR',


   importListCheck: 'IMPORT_CHECK_LIST',
   importListCheckError: 'IMPORT_LIST_CHECK_ERROR',


   importSystemLoading: 'IMPORT_SYSTEM_LOADING',
   importSystem: 'IMPORT_SYSTEM',
   importSystemError: 'IMPORT_SYSTEM_ERROR',
   
   openLoginDialogBox: 'OPEN_LOGIN_DIALOG_BOX',
   openLoginDialogBoxError: 'OPEN_LOGIN_DIALOG_BOX_ERROR',


   userLoginLoading: 'USER_LOGIN_LOADING',
   userLogin: 'USER_LOGIN',
   userLoginError: 'USER_LOGIN_ERROR',

   userLogout: 'USER_LOGOUT'
   
}