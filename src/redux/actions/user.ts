import { actions } from '../actionTypes'
import { _basePath } from '../../config/basePath'
import axios from '../../config/axios'
import setAuthtoken from '../../config/authToken'
import {openLoginDialogBoxAction} from './component'

export const USER_NAME_SESSION_ATTRIBUTE_NAME = 'authenticatedUser'

export const executeBasicAuthenticationService = (username, password) => {
    return axios.get(`/basicauth/login`,
        { headers: { Authorization: createBasicAuthToken(username, password) } })
}

export const registerSuccessfulLogin = (username, password) => {
    try {
            sessionStorage.setItem(USER_NAME_SESSION_ATTRIBUTE_NAME, username + ":" + password)
            setupAxiosInterceptors(createBasicAuthToken(username, password))
            openLoginDialogBoxAction(false);
        } catch (er){
        }
}

export const userLoginAction = (userName, password) => async dispatch => {
    executeBasicAuthenticationService(userName, password)
    .then(() => {
        registerSuccessfulLogin(userName, password)
        //history.push(`/homepage`)
    }).catch( () =>{
    //     this.setState({showSuccessMessage:false})
    //     this.setState({hasLoginFailed:true})
    })
}

export const createBasicAuthToken = (username, password) => {
    return 'Basic ' + window.btoa(username + ":" + password)
}

export const setCurrentUserAction =(e)=>{
    return {
        type: actions.userLogin,
        payload: e
}
}
export const userLogoutAction = () => {
    sessionStorage.removeItem(USER_NAME_SESSION_ATTRIBUTE_NAME);
}

export const setupAxiosInterceptors = (token) => {

    axios.interceptors.request.use(
        (config) => {
            if (isUserLoggedIn()) {
                config.headers.authorization = token
            }
            return config
        }
    )
}

export const isUserLoggedIn = () => {
    let user = sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME)
    if (user === null) 
        return false
    return true
}

{/*export const USER_NAME_SESSION_ATTRIBUTE_NAME = 'authenticatedUser'

export const userLoginAction = (username, passsword) => async dispatch => {
    try {
   
   await dispatch({type: actions.userLoginLoading})
        sessionStorage.setItem(USER_NAME_SESSION_ATTRIBUTE_NAME, username)
         dispatch(setCurrentUserAction(username))
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
    sessionStorage.removeItem(USER_NAME_SESSION_ATTRIBUTE_NAME);
    return { type: actions.userLogout }
}*/}
