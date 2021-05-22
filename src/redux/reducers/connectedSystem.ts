import { connectedSystemActions } from '../connectedSystemActionTypes'

export function getVisitHistoryReducer(state=null,action){
    switch(action.type){
        case connectedSystemActions.getVisitHistoryLoading:
            return{...state,loading:true}
            case connectedSystemActions.getVisitHistory:
                return {...state,
                     histories: (action.payload || []).map(e=>({name:e, value:e})),
                      loading: false 
                    }

            default:
                return {...state}
    }
}

export function getVisitHistoryByDateReducer(state=null,action){
    switch(action.type){
        case connectedSystemActions.getVisitHistoryByDateLoading:
            return{...state,loading:true}
            case connectedSystemActions.getVisitHistoryByDate:
                return {...state,
                      historyByDate: (action.payload || []).map(e=>({name:e, value:e})),
                      loading: false 
                    }

            default:
                return {...state}
    }
}

export function entitiesValuesByCategoryReducer(state=null,action){
    switch(action.type){
        case connectedSystemActions.entitiesValuesByCategoryLoading:
            return{...state,loading:true}
            case connectedSystemActions.entitiesValuesByCategory:
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

export function entitiesAddToCartReducer(state=null,action){
    switch(action.type){
        case connectedSystemActions.entitiesAddToCartLoading:
            return{...state,loading:true}
            case connectedSystemActions.entitiesAddToCart:
                return {...state, msg: action.payload, loading: false }
            default:
                return {...state}
    }
}