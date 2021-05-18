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
import Loader from '../components/loader'
import IconButton from '@material-ui/core/IconButton'
import Tooltip from '@material-ui/core/Tooltip';
import Badge from '@material-ui/core/Badge';
import Toolbar from '@material-ui/core/Toolbar'
import AddToQueueIcon from '@material-ui/icons/AddToQueue';

import { useSelector, useDispatch } from 'react-redux'
import { 
  getHistory,
  getHistoryByDate,
  entitiesByIDAction, 
 } from '../redux/actions/system'

function HistoryPage(props) {

    const dispatch = useDispatch()

    const { match } = props

    const connectedSystemName = match.params.system
    const connectedSystemType = match.params.type

    const getHistoryList = useSelector(state=>state.getHistoryByDate)
    const entitiesById = useSelector(state=>state.entitiesById)
    const selectedEntitiesValues = useSelector(state=> state.selectedEntitiesValues)
    //const searchTextt = props.searchText;

    const { loading:entitiesLoading, entities=[] } = entitiesById
    const { active=[]} = selectedEntitiesValues
    const [category, setCategory] = useState('')
    const {loading:getHistoryListLoading, data} = getHistoryList

    useEffect(()=>{
      dispatch(getHistory(connectedSystemName, connectedSystemType))
  },[category])

  const selectHistoryByDate = useCallback((e) => {
    dispatch(getHistoryByDate(connectedSystemName, connectedSystemType, e.target.value))
  },[])

  console.log(data)
return  (
          <section className='connected-system'>
            <div className='heading'>
              <Typography variant='h5' label={connectedSystemName}/>
            </div>
            {entitiesLoading && <Loader/>}
            <div className='sub-heading'>
              <Select label='Select Date' value={category} onChange={selectHistoryByDate} menu={entities} />
            </div>
            {/*{getHistoryListLoading && <Loader/>}
            {list.map((el, i)=> (
              <div key={i}>
                { (el.values || []).length> 0 && <Fragment>
                  
              <TableContainer component={Paper}  key={i}>
                <Table style={{ tableLayout: 'fixed', fontSize: '15px' }} size="small" stickyHeader aria-label="sticky table">
                  <TableHead>
                    <TableRow>
                      <TableCell align="left" colSpan={4}>
                        <Typography variant='h6' label={el.category}/>
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
                          Remove
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
            )}*/}
          </section>
        )
}
export default HistoryPage