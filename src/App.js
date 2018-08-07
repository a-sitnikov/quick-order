import React, { Component } from 'react'
import { Switch, Route, withRouter } from 'react-router-dom'
import { compose } from 'redux'
import { connect } from 'react-redux'

import NavBar from './components/navbar';
import Catalog from './components/catalog';
import Cart from './components/cart';
import Login from './components/login';
import FirebaseConfig from './firebase_config';
import { fbCheckConnected } from './modules/fbconfig';

class App extends Component {

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fbCheckConnected());
  }

  render() {

    const { login, fbConfig } = this.props;

    if (fbConfig.apiKey) {
      if (login.uid)
        return (
          <div style={{height: "100%"}}>
            <NavBar />
            <Switch>
              <Route exact path='/' component={Catalog} />
              <Route path='/cart' component={Cart} />
            </Switch>
          </div>        
        )  
      else 
        return <Login />
    } else {
      return <FirebaseConfig />
    }

  }  
}  

const mapStateToProps = (state) => {

  return {
    login: state.login,
    fbConfig: state.fbConfig
  }

}

export default compose(
  withRouter,
  connect(mapStateToProps)
)(App);