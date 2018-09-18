import React, { Component } from 'react'
import { Switch, Route, withRouter } from 'react-router-dom'
import { compose } from 'redux'

import Catalog from './components/catalog';
import Cart from './components/cart';
import Login from './components/login';
import Item from './components/item';
import DBConfig from './components/dbconfig';
import MyRedirect from './components/redirect'

class App extends Component {

  render() {

    return (
      <Switch>
        <Route exact path='/'
          render={(props) => <MyRedirect component={Catalog} showNavbar />}
        />
        <Route path='/cart'
          render={(props) => <MyRedirect component={Cart} showNavbar />}
        />
        <Route path='/items/:guid'
          render={(props) => <MyRedirect component={Item} />}
        />        
        <Route path='/login' 
          render={(props) => <MyRedirect component={Login} />}
        />
        <Route path='/dbconfig' component={DBConfig} />
      </Switch>
    )
  }
}


export default compose(
  withRouter
)(App);