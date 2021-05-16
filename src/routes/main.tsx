import React from 'react'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import PrivateRoute from './private'

import Homepage from '../pages/homepage'
import Default from '../pages/default'
import ConnectedSystem from '../pages/connectedSystem'
import Cart from '../pages/cart'

const Main=()=>(
    <Router>
        <Switch>
            <Route path='/' exact component={Default} />
            <PrivateRoute path='/homepage' exact component={Homepage} />
            <PrivateRoute path='/:type/:system' exact component={ConnectedSystem} />
            <PrivateRoute path='/:type/cart/:system' exact component={Cart} />
        </Switch>
    </Router>
)
export default Main