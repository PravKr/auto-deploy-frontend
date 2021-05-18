import React, { Fragment, useEffect, useState } from 'react'
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
import { useSelector, useDispatch } from 'react-redux'
import { systemCartListAction,
   removeFromCartEntitiesAction,
   entityExportAction, 
   importListCheckedAction, 
   importSystemAction,
   removeByEntityFromCartEntitiesAction,
   emptyCartAction
  } from '../redux/actions/system'
import {importDialogBoxAction} from '../redux/actions/component'
import Card from '../components/card'
import Alert from '@material-ui/lab/Alert';

function MyCart(props){

  const dispatch = useDispatch()

  const { match } = props

  const systemCart = match.params.system
  const systemType = match.params.type

  const [isChecked, setChecked] = useState({})

  const cartList = useSelector(state=>state.systemCartList)
  const removeFromCart = useSelector(state=> state.removeFromCart)
  const importDialogBox = useSelector(state=> state.importDialogBox)
  const impSystem = useSelector(state=> state.importSystemList)
  const importListCheck = useSelector(state=> state.importListCheck)
  const importSystem = useSelector(state=> state.importSystem)


  const { loading: importSystemLoading, importList=[]} = impSystem
  const {loading:cartListLoading, list=[], withGkey={}} = cartList
  const {loading:removeLoading, msg} = removeFromCart
  const {trigger, type} = importDialogBox
  const {active=[]} = importListCheck

  useEffect(()=>{
    dispatch(systemCartListAction(systemCart, systemType))
},[])

const handleRemoveFromCart=(cat,gkey)=> {
  dispatch(removeFromCartEntitiesAction(systemCart,systemType,cat,[gkey]))
}

const handleRemoveByEntityFromCart=(cat)=> {
  dispatch(removeByEntityFromCartEntitiesAction(systemCart, systemType, cat))
}

const emptyCart = () => {
  dispatch(emptyCartAction(systemCart, systemType))
}

const handleImportExport = (type)=>{
  if(type==='export'){
    dispatch(entityExportAction(systemCart, systemType))
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
    dispatch(importSystemAction(systemCart,systemType,active,type))
}

const handleImportCheckbox=(e)=>{
  setChecked({...isChecked, [e.target.id]:e.target.checked })
  dispatch(importListCheckedAction({...isChecked, [e.target.id]:e.target.checked }))
}
console.log('type', type)
return(<section className='cart'>

 <div className='heading'>
 <Typography variant='h5' label='My Cart'/>
   <div className='action'>
   <Button variant='outlined' color='primary' onClick={()=>emptyCart()} label='Empty Cart'/>
   <Button variant='outlined' color='primary' onClick={()=>handleImportExport('import')} label='Import'/>
   <Button variant='outlined' color='primary' onClick={()=>handleImportExport('export')} label='Export'/>
   {/*<Button variant='contained' color='primary' onClick={()=>handleImportExport('export_import')} label='Export & Import'/>*/}
   </div>
 </div>
 
 {cartListLoading && <Loader/>}
 {list.map((el, i)=> (
   <div key={i}>
     { (el.values || []).length> 0 && <Fragment>
       
   <TableContainer component={Paper}  key={i}>
    <Table style={{ tableLayout: 'fixed' }} size="small" stickyHeader aria-label="sticky table">
      <TableHead>
        <TableRow>
          {/*style={{backgroundColor: 'black', color: 'white'}}*/}
          <TableCell align="left" colSpan={3}>
            <Typography variant='h6' label={el.category}/>
          </TableCell> 
          <TableCell colSpan={1}>
            <Tooltip title={`Remove all ${el.category} from cart`} placement='left'>
              <IconButton size='small' onClick={()=>handleRemoveByEntityFromCart(el.category)}>
                <DeleteIcon fontSize='small'/>
              </IconButton>
            </Tooltip>
          </TableCell>
          {/*<TableCell align="left">
            <Tooltip title={el.category} placement='bottom'>
              <IconButton size='small' onClick={()=>handleRemoveFromCart(el.category, withGkey[el.category][i])}>
                <DeleteIcon fontSize='large'/>
              </IconButton>
            </Tooltip>
          </TableCell>*/} 
        </TableRow>
        <TableRow>
           {(el.header || []).length>0 && <TableCell>Remove</TableCell>} 
          {(el.header || []).map((e,i)=><TableCell key={i}>{e}</TableCell>)}
        </TableRow>
        </TableHead>
        <TableBody>
          {(el.values || []).map((e,i)=> <TableRow key={i}>
            <TableCell  style={{ fontSize: '10' }} component="th" scope="row">
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
          subHeader={`${e.complex} / ${e.operator} / ${e.facility} / ${e.yard}`} 
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
</section>)
}
export default MyCart