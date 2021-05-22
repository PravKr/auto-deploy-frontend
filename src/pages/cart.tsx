import React, { Fragment, useEffect, useState } from 'react'
import Snackbar from '@material-ui/core/Snackbar';
import Typography from '../components/typography'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Loader from '../components/loader'
import DialogBox from '../components/dialogBox'
import IconButton from '@material-ui/core/IconButton'
import DeleteIcon from '@material-ui/icons/Delete';
import Tooltip from '@material-ui/core/Tooltip';
import Button from '../components/button'
import Select from '../components/select'
import { useSelector, useDispatch } from 'react-redux'
import { entityExportAction, 
   importListCheckedAction, 
   importSystemAction,
  } from '../redux/actions/system'

import { systemCartListAction,
  removeFromCartEntitiesAction,
  removeByEntityFromCartEntitiesAction,
  emptyCartAction
  } from '../redux/actions/cart'

  import {
    getVisitHistory,
    getVisitHistoryByDate,
   } from '../redux/actions/connectedSystem'

import {importDialogBoxAction} from '../redux/actions/component'
import Card from '../components/card'
import { AddToQueue, Label } from '@material-ui/icons';

function MyCart(props){

  const dispatch = useDispatch()

  const { match } = props

  const systemName = match.params.system
  const systemType = match.params.type
  const historyDate = match.params.history

  const [isChecked, setChecked] = useState({})
  const [importSystemMsgOpenSnack, setImportSystemMsgOpenSnack] = useState(true)

  const getVisitHistoryData = useSelector(state=>state.getVisitHistoryCombiner)
  const { loading:historyLoading, histories=[] } = getVisitHistoryData
  const [history, setHistory] = useState('')

  const cartList = useSelector(state=>state.systemCartList)
  const removeFromCart = useSelector(state=> state.removeFromCart)
  const importDialogBox = useSelector(state=> state.importDialogBox)
  const impSystem = useSelector(state=> state.importSystemList)
  const importListCheck = useSelector(state=> state.importListCheck)
  const importSystem = useSelector(state=> state.importSystem)

  const { msg: importSystemMsg, loading: importSSystemLoading} = importSystem
  const { loading: importSystemLoading, importList=[]} = impSystem
  const {loading:cartListLoading, list=[], withGkey={}} = cartList
  const {loading:removeLoading, msg} = removeFromCart
  const {trigger, type} = importDialogBox
  const {active=[]} = importListCheck

  useEffect(()=>{
    if(historyDate === 'homepage') {
      dispatch(getVisitHistory(systemName, systemType))
    } else {
      dispatch(systemCartListAction(systemName, systemType, historyDate))
    } 
},[])

const handleVisitHistory = (event) => {
  setHistory(event.target.value)
  dispatch(systemCartListAction(systemName, systemType, event.target.value))
}

const handleClose = () => {
  setImportSystemMsgOpenSnack(false)
};

const handleRemoveFromCart=(cat,gkey)=> {
  dispatch(removeFromCartEntitiesAction(systemName,systemType,historyDate, cat,[gkey]))
}

const handleRemoveByEntityFromCart=(cat)=> {
  dispatch(removeByEntityFromCartEntitiesAction(systemName, systemType, historyDate, cat))
}

const emptyCart = () => {
  dispatch(emptyCartAction(systemName, systemType, historyDate))
}

const handleImportExport = (type)=>{
  if(type==='export'){
    dispatch(entityExportAction(systemName, systemType, historyDate))
  } 
  if(type === 'import'){
    dispatch(importDialogBoxAction(true,'import'))
  }
  if(type==='export_import'){
    dispatch(importDialogBoxAction(true,'export_import'))
  }
}

const handleCloseImportDialogBox=()=>{
  dispatch(importDialogBoxAction(false,''))
  setChecked({})
  dispatch(importListCheckedAction({}))
}
const handleConfirmImport = (type) => {
  setImportSystemMsgOpenSnack(true)
  dispatch(importSystemAction(systemName,systemType,historyDate, active,type))
}

const handleImportCheckbox=(e)=>{
  setChecked({...isChecked, [e.target.id]:e.target.checked })
  dispatch(importListCheckedAction({...isChecked, [e.target.id]:e.target.checked }))
}

console.log('item count ' + list.length)

return(<section className='cart'>

 <div className='heading'>
  <div className='left'>
    <Tooltip title='History'>
        <IconButton size="medium">
            <AddToQueue />
        </IconButton>
    </Tooltip>
    <Typography variant='h5' label={`Items in Queue for ${systemName}`}/>
  </div>
   <div className='action'>
    <Button variant='outlined' color='primary' onClick={()=>emptyCart()} label='Empty Queue'/>
    <Button variant='outlined' color='primary' onClick={()=>handleImportExport('import')} label='Import'/>
    <Button variant='outlined' color='primary' onClick={()=>handleImportExport('export')} label='Export'/>
    {/*<Button variant='contained' color='primary' onClick={()=>handleImportExport('export_import')} label='Export & Import'/>*/}
   </div>
 </div>
 {
    historyDate === 'homepage' && 
    <div className='sub-heading'>
      <Select label='Select Visit date' value={history} onChange={handleVisitHistory} menu={histories} />
    </div>
    }
 {cartListLoading && <Loader/>}
 {
 list.length === 0 && 
  <Fragment>
    <div className='center'>
      Your Queue is empty ! Please add some item
    </div>
  </Fragment>
  }
 
 {list.map((el, i)=> (
   <div key={i}>
     { (el.values || []).length> 0 && <Fragment>
       
   <TableContainer component={Paper}  key={i}>
    <Table style={{ tableLayout: 'fixed', fontSize: '15px' }} size="small" stickyHeader aria-label="sticky table">
      <TableHead>
        <TableRow>
          <TableCell align="left" colSpan={3}>
            <Typography variant='h6' label={el.category}/>
          </TableCell> 
          <TableCell colSpan={1}>
            <Tooltip title={`Remove all ${el.category} from cart`} placement='left'>
              <Button variant='outlined' size='small' onClick={()=>handleRemoveByEntityFromCart(el.category)} label='Remove'/>
            </Tooltip>
          </TableCell>
        </TableRow>
        <TableRow>
           {(el.header || []).length>0 && <TableCell>Remove</TableCell>} 
          {(el.header || []).map((e,i)=><TableCell key={i}>{e}</TableCell>)}
        </TableRow>
        </TableHead>
        <TableBody>
          {(el.values || []).map((e,i)=> <TableRow key={i}>
            <TableCell component="th" scope="row">
              <Tooltip title='Remove' placement='bottom'>
                <IconButton size='small' onClick={()=>handleRemoveFromCart(el.category, withGkey[el.category][i])}>
                <DeleteIcon fontSize='small'/>
                </IconButton>
              </Tooltip>
            </TableCell> 
              {(e || []).map((ee,ii)=>
              <TableCell key={ii} component="th" scope="row">
                {ee}
               </TableCell>)}
             </TableRow>
          )}
        </TableBody>
</Table>
</TableContainer>
     </Fragment> }
     
</div>)
 )}
 <DialogBox
 maxWidth='xl'
 title={`Total Import Systems ( ${importList.length} )`}
 open={trigger}
 handleClose={handleCloseImportDialogBox}
 content={<Fragment>
   {active.length >0  && <Typography variant='overline' label={`Products Selected : ${active.length}`}/> }
    <div className='import-list'>
    {importList.map((e,i)=> <Card 
          avatar={e.id.charAt(0).toUpperCase()}
          key={i} 
          title={e.id} 
          checkbox
          checkBoxId={e.id}
          checked={isChecked[e.id]}
          onCheckBoxClick={handleImportCheckbox}
          subHeader={`${e.operator}/${e.complex}/${e.facility}/${e.yard}`} 
           />)}
    </div>
 </Fragment>}
 action={
   <Fragment>
     <Button variant='outlined' color='primary' onClick={handleCloseImportDialogBox} label='Cancel'/>
     {type ==='import' ? 
     <Button variant='contained' disabled={!active.length} color='primary' onClick={()=>handleConfirmImport('import')} label='Confirm Import'/> 
     : <Button variant='contained' disabled={!active.length} color='primary' onClick={()=>handleConfirmImport('export_import')} label='Confirm Export & Import'/>
     }

   </Fragment>
 }
 />
 {importSystemMsgOpenSnack && <Snackbar open={importSystemMsg} onClose={handleClose} message={importSystemMsg}/>}
</section>)
}
export default MyCart