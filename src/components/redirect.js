import React from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'

import { Redirect, withRouter } from 'react-router-dom'

import NavBar from './navbar'
import Login from './login'

const MyRedirect = ({ dbtype, params, userId, component: Component, showNavbar, ...props }) => {

  if (dbtype === 'firebase') {

    if (params.apiKey) {
    } else
      return <Redirect to="/dbconfig" />

  } else if (dbtype === 'server') {

    if (params.url) {
    } else
      return <Redirect to="/dbconfig" />

  } else
    return <Redirect to="/dbconfig" />

  if (userId === null)
    return <Login />

  if (showNavbar)
    return (
      <div style={{ height: "100%", paddingTop: 53 }}>
        <NavBar />
        <Component {...props} />
      </div>
    )
  else
    return <Component {...props} />
}

const mapStateToProps = (state) => ({
  dbtype: state.dbConfig.dbtype,
  params: state.dbConfig.params,
  userId: state.login.uid
})

export default compose(
  withRouter,
  connect(mapStateToProps)
)(MyRedirect)