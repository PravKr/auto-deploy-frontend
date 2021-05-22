import React from 'react'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import PrivateRoute from './private'

import Homepage from '../pages/homepage'
import Default from '../pages/default'
import ConnectedSystem from '../pages/connectedSystem'
import Cart from '../pages/cart'
import HistoryPage from '../pages/history'

const Main=()=>(
    <Router>
        <Switch>
            <Route path='/default' exact component={Default} />
            <Route path='/' exact component={Homepage} />
            <Route path='/:type/:system' exact component={ConnectedSystem} />
            <Route path='/:type/:system/:history/cart' exact component={Cart} />
            <Route path='/history/:type/:system' exact component={HistoryPage} />
        </Switch>
    </Router>
)
export default Main