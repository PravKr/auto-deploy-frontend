import { connectedSystemActions } from '../connectedSystemActionTypes'
import { _basePath } from '../../config/basePath'
import axios from '../../config/axios'

export const getVisitHistory = (connectedSystemId, connectedSystemType) => async dispatch => {
    try {
        dispatch({type: connectedSystemActions.getVisitHistoryLoading})
        const res = await axios.post(`/entities/${connectedSystemType}/${connectedSystemId}`)
        const {data} = res
        dispatch({ type:connectedSystemActions.getVisitHistory, payload: data })
    } catch (er){
        dispatch({type: connectedSystemActions.getVisitHistoryError, payload: 'Something went wrong'})
    }
}

export const getVisitHistoryByDate = (connectedSystemId, connectedSystemType, historyDate) => async dispatch => {
    try {
        dispatch({type: connectedSystemActions.getVisitHistoryByDateLoading})
        const res = await axios.post(`/entities/${connectedSystemType}/${connectedSystemId}/${historyDate}`)
        const {data} = res
        dispatch({ type:connectedSystemActions.getVisitHistoryByDate, payload: data })
    } catch (er){
        dispatch({type: connectedSystemActions.getVisitHistoryByDateError, payload: 'Something went wrong'})
    }
}

export const entitiesValuesByCategoryAction = (id,connectedSystemType, visitedDate, category) => async dispatch => {
    try {
        dispatch({type: connectedSystemActions.entitiesValuesByCategoryLoading})
            const res = await axios.post(`/entities/${connectedSystemType}/${id}/${visitedDate}/${category}`)
        const {data} = res
        dispatch({ type:connectedSystemActions.entitiesValuesByCategory, payload: data })
    } catch (er){
        dispatch({type: connectedSystemActions.entitiesValuesByCategoryError, payload: 'Something went wrong'})
    }
}  

export const entitiesBySearchTextAction = (id, connectedSystemType, historyDate, category, searchText) => async dispatch => {
    try {
        dispatch({type: connectedSystemActions.entitiesValuesByCategoryLoading})
        const res = await axios.post(`/entities/${connectedSystemType}/${id}/${historyDate}/${category}/wildcard`, searchText)
        const {data} = res
        dispatch({ type:connectedSystemActions.entitiesValuesByCategory, payload: data })
    } catch (er){
        dispatch({type: connectedSystemActions.entitiesValuesByCategoryError, payload: 'Something went wrong'})
    }
}

export const entitiesAddToCartAction = (connectedSystemName, connectedSystemType, historyDate, category, list) => async dispatch => {
    try {
        dispatch({type: connectedSystemActions.entitiesAddToCartLoading})
            const res = await axios.post(`/entities/${connectedSystemType}/${connectedSystemName}/${historyDate}/addToCart/${category}`,list)
        const {data} = res
        dispatch({ type:connectedSystemActions.entitiesAddToCart,  payload: data, })
    } catch (er){
        dispatch({type: connectedSystemActions.entitiesAddToCartError, payload: 'Something went wrong'})
    }
}