import React, { Component } from 'react'
import { Switch, Route, withRouter } from 'react-router-dom'
import { compose } from 'redux'
import { connect } from 'react-redux'

import Catalog from './components/catalog';
import Cart from './components/cart';
import Login from './components/login';
import Item from './components/item';
import DBConfig from './components/dbconfig';
import MyRedirect from './components/redirect'

class App extends Component {

  render() {

    const { dbtype, params, userId } = this.props;
    
    return (
      <Switch>
        <Route exact path='/'
          render={(props) => <MyRedirect dbtype={dbtype} params={params} userId={userId} component={Catalog} showNavbar />}
        />
        <Route path='/cart'
          render={(props) => <MyRedirect dbtype={dbtype} params={params} userId={userId} component={Cart} showNavbar />}
        />
        <Route path='/items/:guid'
          render={(props) => <MyRedirect dbtype={dbtype} params={params} userId={userId} component={Item} />}
        />        
        <Route path='/login' component={Login}
          /*render={(props) => <MyRedirect dbtype={dbtype} params={params} userId={userId} component={Login} />}*/
        />
        <Route path='/dbconfig' component={DBConfig} />
      </Switch>
    )
  }
}

const mapStateToProps = (state) => {

  return {
    userId: state.login.uid,
    dbtype: state.dbConfig.dbtype,
    params: state.dbConfig.params
  }

}

export default compose(
  withRouter,
  connect(mapStateToProps)
)(App);