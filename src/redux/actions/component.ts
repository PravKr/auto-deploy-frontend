import { actions } from '../actionTypes'
import {importSystemListAction} from './system'
export const importDialogBoxAction = (e, dialogType) => async dispatch=> {
try{  
        if(e===true){
                await dispatch(importSystemListAction())
              }
      await dispatch({type: actions.importDialogBox, payload: e, dialogType})
} catch(er){
        dispatch({type: actions.importDialogBoxError, payload: 'Something went wrong'})
}
}