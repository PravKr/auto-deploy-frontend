import React, { Fragment } from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from './typography'
import DialogBox from './dialogBox'
import {useInputString} from './input'
import Textfield from './textfield'
import Button from './button'
import LoginButton from '@material-ui/core/Button';
import { useSelector, useDispatch } from 'react-redux'
import {openLoginDialogBoxAction} from '../redux/actions/component'
import { userLoginAction, userLogoutAction } from '../redux/actions/user'

function Appbar(){

 const dispatch = useDispatch()

const {value: userName, bind: bindUserName, reset: resetUserName} = useInputString('')
const {value: password, bind: bindPassword, reset: resetPassword } = useInputString('')

const loginDialogBox = useSelector(state=>state.loginDialogBox)
const userLogin = useSelector(state=> state.userLogin)
const { user, loading, isAuthenticated=false } = userLogin
const { trigger} = loginDialogBox

const handleLogin =(e) => {
    e.preventDefault()
    dispatch(userLoginAction({userName, password}))
}
const handleLogout = () => {
    dispatch(userLogoutAction())
}
const handleDialogBox = (e)=> {
    dispatch(openLoginDialogBoxAction(e))
    if(e===false){
        resetUserName()
        resetPassword()
    }
}
console.log(isAuthenticated, user)
return (<Fragment>
    <AppBar position="sticky" id='appbar'>
        <Toolbar className='toolbar'>
            <a href='/' className='title'>
            <Typography variant='h6' label='Navis - Auto Deploy' className='appbarTitle'/>
            </a>
            <Fragment>
            { isAuthenticated ? 
                <LoginButton color="inherit" onClick={handleLogout}>Logout</LoginButton>
                : <LoginButton color="inherit" onClick={()=>handleDialogBox(true)}>Login</LoginButton>  }
            </Fragment>
           
        </Toolbar>
         <DialogBox
      title='Login'
      maxWidth='sm'
      open={trigger}
      handleClose={()=>handleDialogBox(false)}
      content={
      <form onSubmit={handleLogin}>
      <Textfield type='text' required label='Username' {...bindUserName}/>
      <Textfield type='text' required label='password' {...bindPassword}/>
       <Button variant='contained' disabled={!userName || !password} type='submit' color='primary' label='Login'/>
      </form>}
      
      />
      </AppBar>
     
</Fragment>)
}
export default Appbar