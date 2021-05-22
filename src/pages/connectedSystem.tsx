import React, { useState, Fragment, useEffect, useCallback } from 'react'
import Typography from '../components/typography'
import Select from '../components/select'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Checkbox from '../components/checkbox'
import Button from '../components/button'
import Loader from '../components/loader'
import IconButton from '@material-ui/core/IconButton'
import Tooltip from '@material-ui/core/Tooltip';
import Badge from '@material-ui/core/Badge';
import Toolbar from '@material-ui/core/Toolbar'
import Textfield from '../components/textfield'
import AddToQueueIcon from '@material-ui/icons/AddToQueue';
import {useInputString} from '../components/input'

import { useSelector, useDispatch } from 'react-redux'
import { 
  entitiesByIDAction, 
  entitiesAddToCartAction, 
  entitiesValuesByCategoryAction,
  selectedEntitiesValuesByCategoryAction,
  entitiesBySearchTextAction,
 } from '../redux/actions/system'

function ConnectedSystem(props){

    const dispatch = useDispatch()

    const { match } = props

    const connectedSystemName = match.params.system
    const connectedSystemType = match.params.type

    const entitiesById = useSelector(state=>state.entitiesById)
    const entitiesValues = useSelector(state=> state.entitiesValues)
    const addToCart = useSelector(state=>state.entitiesAddToCart)
    const selectedEntitiesValues = useSelector(state=> state.selectedEntitiesValues)

    const { loading:entitiesLoading, entities=[] } = entitiesById
    const {loading: entitiesValuesLoading, tableHeaders=[], tableValues=[], withGkey=[]} = entitiesValues
    const { active=[]} = selectedEntitiesValues
    const [category, setCategory] = useState('')
    const [isChecked, setChecked] = useState({})
    const [isAllChecked, setAllChecked] = useState(false)
    const {value: searchText, bind: bindSearchText} = useInputString('')

    useEffect(()=>{
      dispatch(entitiesByIDAction(connectedSystemName, connectedSystemType))
  },[category])
   
  const handleReloadSystemData = () => {
    dispatch(entitiesByIDAction(connectedSystemName, connectedSystemType))
  }

  const searchTextFieldOnChange = () => {
    console.log(category + searchText)
    dispatch(entitiesBySearchTextAction(connectedSystemName, connectedSystemType,category, {text:searchText}))
    //setChecked({})
    //dispatch(selectedEntitiesValuesByCategoryAction({}))
  }

  const handleCategory = useCallback((e) => {
    setCategory(e.target.value)
    dispatch(entitiesValuesByCategoryAction(connectedSystemName, connectedSystemType,e.target.value))
    setChecked({})
    dispatch(selectedEntitiesValuesByCategoryAction({}))
  },[])

  const handleAddToCart = ()=>{
    //const list = 
    //console.log(isAllChecked + list)
    dispatch(entitiesAddToCartAction(connectedSystemName,
       connectedSystemType, 
       category,isAllChecked ? withGkey : active.map(e=> e.split(`${category}-`)[1])))
  }

  const handleSingleChecked=(e,i)=>{ 
    setChecked({...isChecked, [e.target.id]:e.target.checked })
    dispatch(selectedEntitiesValuesByCategoryAction({...isChecked, [e.target.id]:e.target.checked }))
  }

  const handleMultiChecked=(event)=>{
    setAllChecked(isAllChecked ? false : true)
  }

return  (
          <section className='connected-system'>
            <div className='heading'>
              <Toolbar>
              <Typography variant='h5' label={`[ System Name: ${connectedSystemName}, System Type: ${connectedSystemType} ]`}/>
              {/*<a href={`/${connectedSystemType}/${connectedSystemName}`} onClick={handleReloadSystemData} className='title'>
                  
</a>*/}
              </Toolbar>
              <Tooltip title='Add to Queue' placement='left'>
                <IconButton href={`/${connectedSystemType}/cart/${connectedSystemName}`}>
                  <Badge badgeContent={active.length} color="primary">
                    <AddToQueueIcon />
                  </Badge>
                </IconButton>
              </Tooltip>
            </div>
            {entitiesLoading && <Loader/>}
            <div className='sub-heading'>
              <div className='select' >
                <Select label='Select Category' value={category} onChange={handleCategory} menu={entities} />
              </div>
                {/*<form onSubmit={searchTextFieldOnChange}>*/}
                  <Textfield type='text' {...bindSearchText} label='Search Text'/>
                  <Button variant='contained' color='primary' type='submit' label='Search' onClick={searchTextFieldOnChange}/>
                {/*</form>*/}
              </div>
              <div className='top'>
                {
                  (active.length > 0 || isAllChecked) && (
                    <Fragment>
                      <Typography label={`${category} Selected: ${isAllChecked ? tableValues.length : active.length}`}/>
                      <Button variant='contained' color='primary' onClick={handleAddToCart} label='Add to Queue'/>
                    </Fragment>)
                }
              </div>
              {entitiesValuesLoading && <Loader/>}
              {
                (tableValues.length === 0) && 
                  <Fragment>
                    <div className='center'>
                      {category.length === 0 ? 'Select Category' : `No ${category} found`!} 
                    </div>
                  </Fragment>
              }
              <TableContainer component={Paper}>
                <Table size="small" stickyHeader aria-label="sticky table">
                  <TableHead>
                    <TableRow>
                      {
                        (tableHeaders || []).length>0 && 
                        <TableCell>
                          <Checkbox onChange={handleMultiChecked}/>
                        </TableCell>} 
                      {(tableHeaders || []).map((e,i)=><TableCell key={i}>{e}</TableCell>)}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {(tableValues).map((e,i)=> 
                      <TableRow key={i}> 
                        <TableCell padding="checkbox" component="th" scope="row">
                          <Checkbox
                            id={`${category}-${withGkey[i]}`}
                            checked={isChecked[`${category}-${withGkey[i]}`] || isAllChecked }
                            onChange={(e)=>handleSingleChecked(e,withGkey[i])}
                          />
                        </TableCell> 
                        {(e).map((ee,ii)=>
                        <TableCell key={ii} component="th" scope="row">
                          {ee}
                        </TableCell>)} 
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
          </section>
        )
}
export default ConnectedSystem