import { actions } from '../actionTypes'

export function exportSystemListReducer(state=null,action){
    switch(action.type){
        case actions.exportSystemListLoading:
            return{...state,loading:true}
            case actions.exportSystemList:
                return {...state, exportList: action.payload, loading: false }
            default:
                return {...state}
    }
}
export function importSystemListReducer(state=null,action){
    switch(action.type){
        case actions.importSystemListLoading:
            return{...state,loading:true}
            case actions.importSystemList:
                return {...state, importList: action.payload, loading: false }
            default:
                return {...state}
    }
}

export function addSystemReducer(state=null,action){
    switch(action.type){
        case actions.addSystemLoading:
            return{...state,loading:true}
            case actions.addSystem:
                return {...state, msg: action.payload, loading: false }
            default:
                return {...state}
    }
}

export function updateExportSystemReducer(state=null,action){
    switch(action.type){
        case actions.updateExportSystemLoading:
            return{...state,loading:true}
            case actions.updateExportSystem:
                return {...state, msg: action.payload, loading: false }
            default:
                return {...state}
    }
}

export function updateImportSystemReducer(state=null,action){
    switch(action.type){
        case actions.updateImportSystemLoading:
            return{...state,loading:true}
            case actions.updateImportSystem:
                return {...state, msg: action.payload, loading: false }
            default:
                return {...state}
    }
}

export function connectExportSystemReducer(state=null,action){
    switch(action.type){
        case actions.connectExportSystemLoading:
            return{...state,loading:true}
            case actions.connectExportSystem:
                return {...state, connect: action.payload, loading: false }
            default:
                return {...state}
    }
}

export function entitiesByIdReducer(state=null,action){
    switch(action.type){
        case actions.entitiesByIdLoading:
            return{...state,loading:true}
            case actions.entitiesById:
                return {...state,
                     entities: (action.payload || []).map(e=>({name:e, value:e})),
                      loading: false 
                    }

            default:
                return {...state}
    }
}

export function entitiesValuesByCategoryReducer(state=null,action){
    switch(action.type){
        case actions.entitiesValuesByCategoryLoading:
            return{...state,loading:true}
            case actions.entitiesValuesByCategory:
                const { payload=[] } = action
                let gVal = []

                for( let i = 0, len = payload.length; i< len; i++){
                    gVal[i] = {}
                    for(var prop in payload[i]){
                        gVal[i][prop] = payload[i][prop]
                    }
                }

                const nonGkey =  payload.filter(e=> delete e.gkey)
                const tableHeaders = nonGkey.map(e=> Object.keys(e))[0] 
                const tableValues = nonGkey.map(e=> Object.values(e))
                const withGkey = gVal.map(e=>e.gkey)

                return {...state, tableHeaders, tableValues, withGkey, loading: false }
            default:
                return {...state}
    }
}

export function selectedEntitiesValuesByCategoryReducer(state=null,action){
    switch(action.type){
        case actions.selectedEntitiesValuesByCategory:
            const { payload={ } } = action
            const identifiers = Object.keys(payload)  
           const active = identifiers.filter((id)=> payload[id] )
            return{...state, active}
            default:
                return {...state}
    }
}

export function entitiesAddToCartReducer(state=null,action){
    switch(action.type){
        case actions.entitiesAddToCartLoading:
            return{...state,loading:true}
            case actions.entitiesAddToCart:
                return {...state, msg: action.payload, loading: false }
            default:
                return {...state}
    }
}

export function systemCartListReducer(state=null,action){
    switch(action.type){
        case actions.systemCartListLoading:
            return{...state,loading:true}
            case actions.systemCartList:
                const {payload={}} = action
                const objToArr = Object.keys(payload).map(e=>({cat:e, val: payload[e]}) )

                 let withGkey = JSON.stringify(objToArr)

                  const nonGkey = objToArr.map(e=>({cat: e.cat, val: e.val.filter(ee=> delete ee.gkey)}))
                    const catTable = nonGkey.map(e=>({
                         values: e.val.map(ee=>Object.values(ee)),
                         category: e.cat,
                         header: e.val.map(ee=>Object.keys(ee))[0]
                        })
                        )
                            const a = JSON.parse(withGkey)
                            let ab = {}
                            for(let i in a){
                                  ab[a[i].cat] = a[i].val.map(e=>e.gkey)
                            }
                return {...state, list: catTable, withGkey:ab, loading: false }
            default:
                return {...state}
    }
}

export function removeFromCartEntitiesReducer(state=null,action){
    switch(action.type){
        case actions.removeFromCartEntitiesLoading:
            return{...state,loading:true}
            case actions.removeFromCartEntities:
                return {...state, msg: action.payload, loading: false }
            default:
                return {...state}
    }
}

export function importListCheckReducer(state=null,action){
    switch(action.type){
        case actions.importListCheck:
            const { payload={ } } = action
            const identifiers = Object.keys(payload)  
            const active = identifiers.filter((id)=> payload[id] )
            return{...state, active}
            default:
                return {...state}
    }
}


export function importSystemReducer(state=null,action){
    switch(action.type){
        case actions.importSystemLoading:
            return{...state,loading:true}
            case actions.importSystem:
                return {...state, msg: action.payload, loading: false }
            default:
                return {...state}
    }
}