import React from 'react'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import PrivateRoute from './private'

import Homepage from '../pages/homepage'
import ConnectedSystem from '../pages/connectedSystem'
import Cart from '../pages/cart'

const Main=()=>(
    <Router>
        <Switch>
            
            <Route path='/' exact component={Homepage} />
            <Route path='/:system' exact component={ConnectedSystem} />
            <Route path='/cart/:system' exact component={Cart} />
            
        </Switch>
    </Router>
)
export default Main