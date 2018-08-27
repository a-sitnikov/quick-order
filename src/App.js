import React, { Component } from 'react'
import { Switch, Route, withRouter } from 'react-router-dom'
import { compose } from 'redux'
import { connect } from 'react-redux'

import Catalog from './components/catalog';
import Cart from './components/cart';
import Login from './components/login';
import FirebaseConfig from './firebase_config';
import MyRedirect from './components/redirect'

class App extends Component {

  render() {

    const { apiKey, userId } = this.props;
    
    return (
      <Switch>
        <Route exact path='/'
          render={(props) => <MyRedirect apiKey={apiKey} userId={userId} component={Catalog} showNavbar />}
        />
        <Route path='/cart'
          render={(props) => <MyRedirect apiKey={apiKey} userId={userId} component={Cart} showNavbar />}
        />
        <Route path='/login'
          render={(props) => <MyRedirect apiKey={apiKey} component={Login} />}
        />
        <Route path='/fbconfig' component={FirebaseConfig} />
      </Switch>
    )
  }
}

const mapStateToProps = (state) => {

  return {
    userId: state.login.uid,
    apiKey: state.fbConfig.apiKey
  }

}

export default compose(
  withRouter,
  connect(mapStateToProps)
)(App);