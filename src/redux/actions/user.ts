import { actions } from '../actionTypes'
import { _basePath } from '../../config/basePath'
import axios from '../../config/axios'
import setAuthtoken from '../../config/authToken'
import {openLoginDialogBoxAction} from './component'

export const USER_NAME_SESSION_ATTRIBUTE_NAME = 'authenticatedUser'

export const executeBasicAuthenticationService = (username, password) => {
    return axios.post(`/basicauth`,
        { headers: { authorization: createBasicAuthToken(username, password) } })
}

export const registerSuccessfulLogin = (userName, password) => {
    try {
            sessionStorage.setItem(USER_NAME_SESSION_ATTRIBUTE_NAME, userName)
            setupAxiosInterceptors(createBasicAuthToken(userName, password))
            openLoginDialogBoxAction(false);
        } catch (er){
        }
}

export const userLoginAction = (userName, password) => async dispatch => {
    executeBasicAuthenticationService(userName, password)
    .then(() => {
        registerSuccessfulLogin(userName, password)
    //     this.props.history.push(`/welcome/${this.state.username}`)
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
