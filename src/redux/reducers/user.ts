import { actions } from '../actionTypes'
import { isEmpty } from '../../config/function'

export function userLoginReducer (state=null,action){
    switch(action.type){
        case actions.userLoginLoading:
            return{...state,loading:true}
            case actions.userLogin:
                return {...state,isAuthenticated: !isEmpty(action.payload), user: action.payload, loading: false }
                     case actions.userLogout:
      return { ...state, isAuthenticated: false, user: null, loading: false }
            default:
                return {...state}
    }
}