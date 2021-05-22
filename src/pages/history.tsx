import React, { useState, Fragment, useEffect, useCallback } from 'react'
import Typography from '../components/typography'
import Select from '../components/select'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import Loader from '../components/loader'
import Button from '../components/button'
import DialogBox from '../components/dialogBox'
import {importDialogBoxAction} from '../redux/actions/component'
import Card from '../components/card'
import HistoryIcon from '@material-ui/icons/History';
import IconButton from '@material-ui/core/IconButton'
import { Tooltip } from '@material-ui/core'
import {useInputString} from '../components/input'

import { useSelector, useDispatch } from 'react-redux'
import { 
  getHistory,
  getHistoryByDate,
  importListCheckedAction,
  importSystemAction,
  entityExportByHistoryDateAction,
  entityImportByHistoryDateAction,
 } from '../redux/actions/system'

function HistoryPage(props) {

    const dispatch = useDispatch()

    const { match } = props

    const connectedSystemName = match.params.system
    const connectedSystemType = match.params.type

    const [isChecked, setChecked] = useState({})

    const getHistoryList = useSelector(state=>state.getHistoryByDate)
    const getHistoryy = useSelector(state=>state.getHistory)
    const impSystem = useSelector(state=> state.importSystemList)
    const importDialogBox = useSelector(state=> state.importDialogBox)
    const importListCheck = useSelector(state=> state.importListCheck)

    const { loading: importSystemLoading, importList=[]} = impSystem
    const { loading:getHistoryLoading, histories=[] } = getHistoryy
    const [category, setCategory] = useState('')
    const {loading:getHistoryListLoading, list=[], withGkey={}} = getHistoryList
    const {trigger, type} = importDialogBox
    const {active=[]} = importListCheck

    useEffect(()=>{
      dispatch(getHistory(connectedSystemName, connectedSystemType))
  },[category])

  const selectHistoryByDate = useCallback((e) => {
    setCategory(e.target.value)
    dispatch(getHistoryByDate(connectedSystemName, connectedSystemType, e.target.value))
  },[])

  const handleImportExport = (type)=>{
    if(type==='export'){
      dispatch(entityExportByHistoryDateAction(connectedSystemName, connectedSystemType, category))
    } 
    if(type === 'import'){
      dispatch(importDialogBoxAction(true,'import'))
    }
  }

  const handleCloseImportDialogBox=()=>{
    dispatch(importDialogBoxAction(false,''))
    dispatch(importListCheckedAction({}))
  }

  const handleImportCheckbox=(e)=>{
    setChecked({...isChecked, [e.target.id]:e.target.checked })
    dispatch(importListCheckedAction({...isChecked, [e.target.id]:e.target.checked }))
  }

  const handleConfirmImport = (type) => {
    //dispatch(entityImportByHistoryDateAction(connectedSystemName, connectedSystemType, active, type, category))
}

return  (
          <section className='connected-system'>
            <div className='heading'>
              <div className='left'>
                <Tooltip title='History'>
                  <IconButton size="medium">
                      <HistoryIcon />
                  </IconButton>
                </Tooltip>
              <Typography variant='h5' label={`[ System Name: ${connectedSystemName}, System Type: ${connectedSystemType} ]`}/>
              </div>
              <div className='action'>
                <Button variant='outlined' color='primary' onClick={()=>handleImportExport('import')} label='Import'/>
                <Button variant='outlined' color='primary' onClick={()=>handleImportExport('export')} label='Export'/>
                {/*<Button variant='contained' color='primary' onClick={()=>handleImportExport('export_import')} label='Export & Import'/>*/}
              </div>
            </div>
            {getHistoryLoading && <Loader/>}
            <div className='heading'>
              <Select label='Select Date' value={category} onChange={selectHistoryByDate} menu={histories} />
            </div>
            {getHistoryListLoading && <Loader/>}
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
                    </TableRow>
                    <TableRow>
                      {(el.header || []).map((e,i)=><TableCell key={i}>{e}</TableCell>)}
                    </TableRow>
                    </TableHead>
                    <TableBody>
                      {(el.values || []).map((e,i)=> <TableRow key={i}>
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
            <DialogBox maxWidth='xl' title={`Total Import Systems ( ${importList.length} )`}
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
          </section>
        )
}
export default HistoryPage