import React, { Fragment } from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from './typography'
function Appbar(){

return (<Fragment>
    <AppBar position="sticky" id='appbar'>
        <Toolbar className='toolbar'>
            <a href='/' className='title'>
            <Typography variant='h6' label='Navis - Auto Deploy' className='appbarTitle'/>
            </a>
        </Toolbar>
      </AppBar>
</Fragment>)
}
export default Appbar