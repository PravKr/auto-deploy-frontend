import { cartActionTypes } from '../cartActionTypes'

export function systemCartListReducer(state=null,action){
    switch(action.type){
        case cartActionTypes.systemCartListLoading:
            return{...state,loading:true}
            case cartActionTypes.systemCartList:
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
        case cartActionTypes.removeFromCartEntitiesLoading:
            return{...state,loading:true}
            case cartActionTypes.removeFromCartEntities:
                return {...state, msg: action.payload, loading: false }
            default:
                return {...state}
    }
}