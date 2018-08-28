import React from 'react';
import { Redirect, withRouter } from 'react-router-dom'

import NavBar from './navbar'

const MyRedirect = ({ apiKey, userId, component: Component, showNavbar, ...props }) => {

  if (apiKey === null)
    return <Redirect to="/fbconfig" />

  if (userId === null)
    return <Redirect to={{
      pathname: "/login",
      state: { from: props.location }
    }} />

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

export default withRouter(MyRedirect)