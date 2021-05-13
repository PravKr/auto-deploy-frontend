import React, { Fragment, useState,useEffect, useLayoutEffect, } from 'react'
import Select from '../components/select'
import Snackbar from '../components/snackbar'
import {useInputString, useToggle} from '../components/input'
import { useSelector, useDispatch } from 'react-redux'
import { 
   exportSystemListAction,
    importSystemListAction,
    updateExportSystemAction,
    updateImportSystemAction,
    connectExportSystemAction,
    addSystemAction,
  } from '../redux/actions/system'
import Tab from '@material-ui/core/Tab'
import TabContext from '@material-ui/lab/TabContext'
import TabList from '@material-ui/lab/TabList'
import TabPanel from '@material-ui/lab/TabPanel'
import Card from '../components/card'
import ImportExportIcon from '@material-ui/icons/ImportExport'
import Divider from '../components/divider'
import Typography from '../components/typography'
import DialogBox from '../components/dialogBox'
import Button from '../components/button'
import Textfield from '../components/textfield'
import Loader from '../components/loader'

const addSystemList = [{
  name:'Export',
  value:'export'
},
{
  name:'Import',
  value: 'import'
}]

function Homepage(){
  const dispatch = useDispatch()

  const expSystem = useSelector(state=>state.exportSystemList)
  const impSystem = useSelector(state=> state.importSystemList)
  const updateExp = useSelector(state=> state.updateExportSystem)
  const updateImp = useSelector(state=>state.updateImportSystem)
  const connectExp = useSelector(state=>state.connectExportSystem)
  const addSystem = useSelector(state=> state.addSystem)

  useEffect(()=>{
    dispatch(exportSystemListAction())
    dispatch(importSystemListAction())
},[])

    const [value, setValue] = useState('all');
    const [t, st] = useState(false)
    const [addSystemDialogBox, setAddSystem] = useState(false)
    const [openSnack, setSnack] = useState(true)

    const {value: updateId, setValue: setId, reset: resetId} = useInputString('')
    const {value: updateType, setValue: setType, reset: resetType} = useInputString('')

    const {value: updateComplex, setValue: setComplex, bind: bindUpdateComplex, reset: resetComplex} = useInputString('')
    const {value: updateFacility, setValue: setFacility, bind: bindUpdateFacility, reset: resetFacility} = useInputString('')
    const {value: updateOperator, setValue: setOperator, bind: bindUpdateOperator, reset: resetOperator} = useInputString('')
    const {value: updateYard, setValue: setYard, bind: bindUpdateYard, reset: resetYard} = useInputString('')
    const {value: updateEndPoint, setValue: setEndPoint, bind: bindUpdateEndPoint, reset: resetEndPoint} = useInputString('')
    const {value: updateUsername, setValue: setUsername, bind: bindUpdateUsername, reset: resetUsername} = useInputString('')
    const {value: updatePassword, setValue: setPassword, bind: bindUpdatePassword, reset: resetPassword} = useInputString('')

    const {value: addId, bind: bindAddId, reset: resetAddId} = useInputString('')
    const {value: addComplex, bind: bindAddComplex, reset: resetAddComplex} = useInputString('')
    const {value: addFacility, bind: bindAddFacility, reset: resetAddFacility} = useInputString('')
    const {value: addOperator, bind: bindAddOperator, reset: resetAddOperator} = useInputString('')
    const {value: addYard, bind: bindAddYard, reset: resetAddYard} = useInputString('')
    const {value: addEndPoint, bind: bindAddEndPoint, reset: resetAddEndPoint} = useInputString('')
    const {value: addUsername, bind: bindAddUsername, reset: resetAddUsername} = useInputString('')
    const {value: addPassword, bind: bindAddPassword, reset: resetAddPassword} = useInputString('')

    const {value: systemList, bind: bindSystemList, reset: resetSystemList} = useInputString('')
    
    const handleCloseDialogBox = () => { 
      st(false)
      resetComplex()
      resetFacility()
      resetOperator()
      resetYard()
      resetId()
      resetType()
      resetEndPoint()
      resetUsername()
      resetPassword()
      setSnack(false)
    }

    const handleChange = (event, newValue) => {
      setValue(newValue);
      if(newValue === 'export') dispatch(exportSystemListAction())
      if(newValue === 'import') dispatch(importSystemListAction())
      if(newValue === 'all') {
        dispatch(exportSystemListAction())
        dispatch(importSystemListAction())
      }
    };
    const handleActionClick = ()=>{
      console.log('click')
    }
    const handleShow = (e,type) => {
      st(true)
      setType(type)
      setId(updateId || e.id)
      setComplex( updateComplex || e.complex)
      setFacility( updateFacility || e.facility)
      setOperator(updateOperator ||  e.operator)
      setYard( updateYard || e.yard)
      setEndPoint(updateEndPoint || e.endPoint)
      setUsername(updateUsername || e.username)
      setPassword(updatePassword || e.password)
    }
    const handleSystemAdd = (e) =>{
      e.preventDefault()
      dispatch(addSystemAction(systemList,{id:addId, complex:addComplex,
        endPoint: addEndPoint, facility:addFacility, 
        operator:addOperator, password:addPassword,
         username: addUsername, yard: addYard } ))
    }
    const handleResetAddSystem = (e)=>{
      e.preventDefault()
      resetAddId()
      resetAddComplex()
      resetAddFacility()
      resetAddOperator()
      resetAddYard()
      resetSystemList()
      resetAddEndPoint()
      resetAddUsername()
      resetAddPassword()
      setSnack(false)
    }
    const handleCloseSystemAddDialogBox = (e) =>{
      setAddSystem(false)
      resetAddId()
      resetAddComplex()
      resetAddFacility()
      resetAddOperator()
      resetAddYard()
      resetSystemList()
      resetAddEndPoint()
      resetAddUsername()
      resetAddPassword()
      setSnack(false)
    }
    const handleOpenSystemUpdateDialogBox = (e) =>{
      setAddSystem(true)
    }
    const handleSystemUpdate = (e) =>{
      e.preventDefault()
      resetSystemList()
      if(updateType === 'exp'){
dispatch(updateExportSystemAction({id:updateId, complex:updateComplex,
  endPoint: updateEndPoint, facility:updateFacility, 
  operator:updateOperator, password:updatePassword,
   username: updateUsername, yard: updateYard}))
      }
      if(updateType === 'imp'){
        dispatch(updateImportSystemAction({id:updateId, complex:updateComplex,
          endPoint: updateEndPoint, facility:updateFacility, 
          operator:updateOperator, password:updatePassword,
           username: updateUsername, yard: updateYard}))
      }
    }

    const { exportList, loading: expLoading } = expSystem
    const { importList, loading: impLoading } = impSystem
    const { msg: addSystemMsg, loading: addSystemLoading } = addSystem
    const { msg: expUpdate, loading: expUpdateLoading} = updateExp
    const { msg: impUpdate, loading: impUpdateLoading} = updateImp

    return( <Fragment>
        <section className='homepage'>
          <div className='system-panel'>
            <TabContext value={value}>
              <TabList className='tab-list' onChange={handleChange} aria-label="icon label tabs example">
                <Tab icon={<ImportExportIcon />} label="All" value="all" />
                <Tab icon={<ImportExportIcon />} label="Export" value="export" />
                <Tab icon={<ImportExportIcon />} label="Import" value="import" />
              </TabList>
              <div className='add-system'>
                <Button onClick={handleOpenSystemUpdateDialogBox} variant='contained' type='submit' color='primary' label='Add System'/>
              </div>
              <TabPanel value="all">
                <div className='label-with-add'>
                  <Typography variant='h6' label='Export System'/>
                  {expLoading && <Loader/>}
                </div>
                <div className='flex-list'>
                    {( exportList || []).map((e,i)=> <Card 
                    avatar={e.id.charAt(0).toUpperCase()}
                    linkLabel='Visit'
                    linkLabelLink={`/${e.id}`}
                    key={i} 
                    onShowIconClick={()=>handleShow(e,'exp')} 
                    actionClick={handleActionClick} 
                    title={e.id} 
                    subHeader={`${e.complex}/${e.operator}/${e.facility}/${e.yard}`} 
                    action 
                    actionsLabel='Ping'
                  />)}
                </div>
                <Divider orientation='horizontal'/>
                {impLoading && <Loader/>}
                <Typography variant='h6' label='Import System'/>
                <div className='flex-list'>
                  {(importList || []).map((e,i)=> <Card 
                  avatar={e.id.charAt(0).toUpperCase()}
                  linkLabel='Visit'
                  linkLabelLink={`/${e.id}`}
                  key={i} 
                  onShowIconClick={()=>handleShow(e, 'imp')} 
                  actionClick={handleActionClick} 
                  title={e.id} 
                  subHeader={`${e.complex}/${e.operator}/${e.facility}/${e.yard}`}
                  action 
                  actionsLabel='Ping'
                  />)}
                </div>
              </TabPanel>
              <TabPanel value="export">
                {expLoading && <Loader/>}
                <div className='flex-list'>
                  {(exportList || []).map((e,i)=> <Card 
                  avatar={e.id.charAt(0).toUpperCase()}
                  key={i} 
                  linkLabel='Visit'
                  linkLabelLink={`/${e.id}`}
                  onShowIconClick={()=>handleShow(e,'exp')} 
                  actionClick={handleActionClick} 
                  title={e.id} 
                  subHeader={`${e.complex} / ${e.operator} / ${e.facility} / ${e.yard}`} 
                  action 
                  actionsLabel='Ping'
                  />)}
                </div>
              </TabPanel>
              <TabPanel value="import">
                {impLoading && <Loader/>}
                  <div className='flex-list'>
                  {(importList || []).map((e,i)=> <Card 
                  avatar={e.id.charAt(0).toUpperCase()}
                  key={i} 
                  onShowIconClick={()=>handleShow(e,'imp')} 
                  actionClick={handleActionClick} 
                  title={e.id} 
                  action 
                  subHeader={`${e.complex} / ${e.operator} / ${e.facility} / ${e.yard}`} 
                  />)}
                </div>
              </TabPanel>
            </TabContext>
            <DialogBox 
              handleClose={handleCloseDialogBox}
              open={t}
              title='Update System'
              maxWidth='sm'
              content={<Fragment>
                    <form onSubmit={handleSystemUpdate}>
                      <Textfield type='text' required label='Operator' {...bindUpdateOperator}/>
                      <Textfield type='text' required label='Complex' {...bindUpdateComplex}/>
                      <Textfield type='text' required label='Facility' {...bindUpdateFacility}/>
                      <Textfield type='text' required label='Yard' {...bindUpdateYard}/>
                      <Textfield type='text' required label='End Point' {...bindUpdateEndPoint}/>
                      <Textfield type='text' required label='Username' {...bindUpdateUsername}/>
                      <Textfield type='password' required label='Password' {...bindUpdatePassword}/>
                      {(expUpdateLoading || impUpdateLoading) && <Loader/>}
                      <Button variant='contained' type='submit' color='primary' label='Update'/>
                    </form>
                </Fragment>}
                />
            <DialogBox 
             handleClose={handleCloseSystemAddDialogBox}
              open={addSystemDialogBox}
              title='Add System'
              maxWidth='sm'
              content={<Fragment>
                    <form onSubmit={handleSystemAdd}>
                      <Select 
                      required
                      label='Select System'
                      {...bindSystemList}
                      menu={addSystemList}
                      />
                  <Textfield type='text' required label='ID' {...bindAddId}/>
                  <Textfield type='text' required label='Operator' {...bindAddOperator}/>
                  <Textfield type='text' required label='Complex' {...bindAddComplex}/>
                  <Textfield type='text' required label='Facility' {...bindAddFacility}/>
                  <Textfield type='text' required label='Yard' {...bindAddYard}/>
                  <Textfield type='text' required label='End Point' {...bindAddEndPoint}/>
                  <Textfield type='text' required label='Username' {...bindAddUsername}/>
                  <Textfield type='password' required label='Password' {...bindAddPassword}/>
                  {addSystemLoading && <Loader/>}
                  <Button variant='contained' disabled={ addSystemLoading || !bindAddId || !addComplex || !addFacility || !addOperator || !addYard || !systemList || !addEndPoint || !addUsername || !addPassword} type='submit' color='primary' label='Add'/>
                  <Button variant='outlined' disabled={addSystemLoading} onClick={handleResetAddSystem} color='primary' label='Reset'/>
                  </form>
              </Fragment>}
              />
            </div>
          
              {openSnack && <Snackbar open={expUpdate || impUpdate} label={expUpdate || impUpdate}/>}
        </section>
      
    </Fragment>)
}
export default Homepage