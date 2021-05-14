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
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import Tooltip from '@material-ui/core/Tooltip';
import Badge from '@material-ui/core/Badge';
import { useSelector, useDispatch } from 'react-redux'
import { 
  entitiesByIDAction, 
  entitiesAddToCartAction, 
  entitiesValuesByCategoryAction, selectedEntitiesValuesByCategoryAction
 } from '../redux/actions/system'

function ConnectedSystem(props){

    const dispatch = useDispatch()

    const { match } = props

    const connectedSystemName = match.params.system
    {/*const connectedSystemType = match.params.type
    console.log(connectedSystemType)*/}

    const entitiesById = useSelector(state=>state.entitiesById)
    const entitiesValues = useSelector(state=> state.entitiesValues)
    const addToCart = useSelector(state=>state.entitiesAddToCart)
    const selectedEntitiesValues = useSelector(state=> state.selectedEntitiesValues)

    const { loading:entitiesLoading, entities=[] } = entitiesById
    const {loading: entitiesValuesLoading, tableHeaders=[], tableValues=[], withGkey=[]} = entitiesValues
    const { active=[] } = selectedEntitiesValues
    const [category, setCategory] = useState('')
    const [isChecked, setChecked] = useState({})

    useEffect(()=>{
      dispatch(entitiesByIDAction(connectedSystemName))
  },[category])
   

  const handleCategory = useCallback((e) => {
    setCategory(e.target.value)
    dispatch(entitiesValuesByCategoryAction(connectedSystemName,e.target.value))
    setChecked({})
    dispatch(selectedEntitiesValuesByCategoryAction({}))
  },[])

  const handleAddToCart = ()=>{
    const list = active.map(e=> e.split(`${category}-`)[1])
    dispatch(entitiesAddToCartAction(connectedSystemName,category,list))
  }

    const handleSingleChecked=(e,i)=>{  
     setChecked({...isChecked, [e.target.id]:e.target.checked })
     dispatch(selectedEntitiesValuesByCategoryAction({...isChecked, [e.target.id]:e.target.checked }))
    }

return  (
          <section className='connected-system'>
            <div className='heading'>
              <Typography variant='h5' label={connectedSystemName}/>
              <Tooltip title='My Cart' placement='left'>
                <IconButton href={`/cart/${connectedSystemName}`}>
                  <Badge badgeContent={active.length} color="primary">
                    <ShoppingCartIcon />
                  </Badge>
                </IconButton>
              </Tooltip>
            </div>
            {entitiesLoading && <Loader/>}
            <Select label='Select Category' value={category} onChange={handleCategory} menu={entities} />
            <div className='top'>
              {
                active.length > 0 && (
                  <Fragment>
                    <Typography label={`${category} Selected: ${active.length}`}/>
                    <Button variant='contained' color='primary' onClick={handleAddToCart} label='Add to cart'/>
                  </Fragment>)
              }
            </div>
            {entitiesValuesLoading && <Loader/>}
            <TableContainer component={Paper}>
              <Table size="small" stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    {(tableHeaders || []).length>0 && <TableCell>Select</TableCell>} 
                    {(tableHeaders || []).map((e,i)=><TableCell key={i}>{e}</TableCell>)}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {(tableValues).map((e,i)=> 
                    <TableRow key={i}> 
                      <TableCell padding="checkbox" component="th" scope="row">
                        <Checkbox
                          id={`${category}-${withGkey[i]}`}
                          checked={isChecked[`${category}-${withGkey[i]}`] || false}
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