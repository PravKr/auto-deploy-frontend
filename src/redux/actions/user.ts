import { actions } from '../actionTypes'
import { _basePath } from '../../config/basePath'
import axios from '../../config/axios'
import setAuthtoken from '../../config/authToken'
import {openLoginDialogBoxAction} from './component'

export const userLoginAction = (val) => async dispatch => {
    try {
   
   await dispatch({type: actions.userLoginLoading})
        const token = JSON.stringify(val)
        document.cookie = `token=${token};`
         setAuthtoken(val)
         dispatch(setCurrentUserAction(val))
         dispatch(openLoginDialogBoxAction(false))
    } catch (er){
        dispatch({type: actions.userLoginError, payload: 'Something went wrong'})
    }
}

export const setCurrentUserAction =(e)=>{
    return {
        type: actions.userLogin,
        payload: e
}
}
export const userLogoutAction = () => {
    document.cookie = `token=;`
    setAuthtoken(false);
    return { type: actions.userLogout }
}