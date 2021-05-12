import { actions } from '../actionTypes'
import { _basePath } from '../../config/basePath'
import axios from '../../config/axios'

export const exportSystemListAction = () => async dispatch => {
    try {
        dispatch({type: actions.exportSystemListLoading})
         const res = await axios.post('argo/export')
        const {data} = res
        dispatch({type:actions.exportSystemList, payload: data})
    } catch (er){
        dispatch({type: actions.exportSystemListError, payload: 'Something went wrong'})
    }
    }

    export const importSystemListAction = () => async dispatch => {
        try {
            dispatch({type: actions.importSystemListLoading})
             const res = await axios.post('argo/import')
            const {data} = res
            dispatch({type:actions.importSystemList, payload: data})
        } catch (er){
            dispatch({type: actions.importSystemListError, payload: 'Something went wrong'})
        }
        } 

        // Add System ( export or import)
        export const addSystemAction = (type,values) => async dispatch => {
            try {
                dispatch({type: actions.addSystemLoading})
                  const res = await axios.post(`add/argo/${type}`,values)
                  console.log(res)
                 const {data} = res
                 if( Object.keys(data).length > 0){
                    dispatch({type:actions.addSystem, payload: 'System Added Successfully'})
                    if(type === 'export'){
                       await dispatch (exportSystemListAction())
                    } 
                    if( type === 'import'){
                       await dispatch(importSystemListAction()) 
                    }
                 }
            } catch (er){
                dispatch({type: actions.addSystemError, payload: 'Something went wrong'})
            }
            }

            export const updateExportSystemAction = (values) => async dispatch => {
                try {
                    dispatch({type: actions.updateExportSystemLoading})
                     const res = await axios.post(`add/argo/export`,values)
                    const {data} = res
                    if( Object.keys(data).length > 0){
                        dispatch({type:actions.updateExportSystem, payload: 'Export System updated Successfully'})
                        await dispatch(exportSystemListAction())
                    }
                    
                } catch (er){
                    dispatch({type: actions.updateExportSystemError, payload: 'Something went wrong'})
                }
                }
          
                export const updateImportSystemAction = (values) => async dispatch => {
                    try {
                        dispatch({type: actions.updateImportSystemLoading})
                         const res = await axios.post(`add/argo/import`,values)
                        const {data} = res
                        if( Object.keys(data).length > 0){
                            dispatch({type:actions.updateImportSystem, payload: 'Import System updated Successfully'})
                            await dispatch(importSystemListAction())
                        }
                    } catch (er){
                        dispatch({type: actions.updateImportSystemError, payload: 'Something went wrong'})
                    }
                    }

                    export const connectExportSystemAction = (e) => async dispatch => {
                        try {
                            dispatch({type: actions.connectExportSystemLoading})
                            //  const res = await axios.get('/v1/ad/argo/import')
                            // const {data} = res
                            dispatch({type:actions.connectExportSystem, payload: ''})
                        } catch (er){
                            dispatch({type: actions.connectExportSystemError, payload: 'Something went wrong'})
                        }
                        } 
                        

                        export const entitiesByIDAction = (id) => async dispatch => {
                            try {
                                dispatch({type: actions.entitiesByIdLoading})
                                 const res = await axios.post(`entities/${id}`)
                                const {data} = res
                                dispatch({ type:actions.entitiesById, payload: data })
                            } catch (er){
                                dispatch({type: actions.entitiesByIdError, payload: 'Something went wrong'})
                            }
                            }

                            export const entitiesValuesByCategoryAction = (id,cat) => async dispatch => {
                                try {
                                    dispatch({type: actions.entitiesValuesByCategoryLoading})
                                     const res = await axios.post(`entities/${id}/${cat}`)
                                    const {data} = res
                                    dispatch({ type:actions.entitiesValuesByCategory, payload: data })
                                } catch (er){
                                    dispatch({type: actions.entitiesValuesByCategoryError, payload: 'Something went wrong'})
                                }
                                }
    

                            export const selectedEntitiesValuesByCategoryAction = (val) => async dispatch => {
                                try {
                                    dispatch({ type:actions.selectedEntitiesValuesByCategory, payload: val })
                                } catch (er){
                                    dispatch({type: actions.selectedEntitiesValuesByCategoryError, payload: 'Something went wrong'})
                                }
                                }
    
                            export const entitiesAddToCartAction = (sys,id, list) => async dispatch => {
                                try {
                                    dispatch({type: actions.entitiesAddToCartLoading})
                                     const res = await axios.post(`/entities/${sys}/addToCart/${id}`,list)
                                    const {data} = res
                                    dispatch({ type:actions.entitiesAddToCart,  payload: data, })
                                } catch (er){
                                    dispatch({type: actions.entitiesAddToCartError, payload: 'Something went wrong'})
                                }
                                }

                            export const systemCartListAction = (sys) => async dispatch => {
                                try {
                                    dispatch({type: actions.systemCartListLoading})
                                     const res = await axios.post(`/entities/${sys}/cart`)
                                    const {data} = res
                                    dispatch({ type:actions.systemCartList,  payload: data, })
                                } catch (er){
                                    dispatch({type: actions.systemCartListError, payload: 'Something went wrong'})
                                }
                                }


                            export const removeFromCartEntitiesAction = (sys,cat,ls) => async dispatch => {
                                try {
                                    dispatch({type: actions.removeFromCartEntitiesLoading})
                                     const res = await axios.post(`/entities/${sys}/removeFromCart/${cat}`,ls)
                                    const {data} = res
                                    dispatch({ type:actions.removeFromCartEntities,  payload: data, })
                                    await dispatch(systemCartListAction(sys))
                                } catch (er){
                                    dispatch({type: actions.removeFromCartEntitiesError, payload: 'Something went wrong'})
                                }
                                }
    
                                export const entityExportAction = (sys) => async dispatch => {
                                    try {
                                        dispatch({type: actions.entityExportLoading})
                                         const res = await axios.post(`/entities/${sys}/export`)
                                        const {data} = res
                                        const url = await window.URL.createObjectURL(new Blob([data]));
                                        const link = await document.createElement('a');
                                        link.href = url;
                                        await link.setAttribute('download', `${sys}.xml`);
                                        await document.body.appendChild(link);
                                           await link.click();
                                    } catch (er){
                                        dispatch({type: actions.entityExportError, payload: 'Something went wrong'})
                                    }
                                    }
        
                                    export const importListCheckedAction = (val) => async dispatch => {
                                        try {
                                            dispatch({ type:actions.importListCheck, payload: val })
                                        } catch (er){
                                            dispatch({type: actions.importListCheckError, payload: 'Something went wrong'})
                                        }
                                        }
                                        export const importSystemAction = (sys,ls, type) => async dispatch => {
                                            try {
                                                dispatch({type: actions.importSystemLoading})
                                                if(type === 'import'){
                                                    const res = await axios.post(`/entities/${sys}/import`,ls)
                                                    const {data} = res
                                                    dispatch({ type:actions.importSystem,  payload: data })
                                                }
                                                if(type === 'export_import' ){
                                                    const res = await axios.post(`/entities/${sys}/import`,ls)
                                                    const {data} = res
                                                    dispatch({ type:actions.importSystem,  payload: data })
                                                    dispatch(entityExportAction(sys))
                                                }
                                            } catch (er){
                                                dispatch({type: actions.importSystemError, payload: 'Something went wrong'})
                                            }
                                            }