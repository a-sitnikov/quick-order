import React from 'react';
import { Redirect, withRouter } from 'react-router-dom'

import NavBar from './navbar'

const MyRedirect = ({ dbtype, params, userId, component: Component, showNavbar, ...props }) => {

  if (dbtype === 'firebase') {
    
    if (params.apiKey){
    } else
      return <Redirect to="/dbconfig" />

  } else if (dbtype === 'server') {
    
    if (params.url) {
    } else
      return <Redirect to="/dbconfig" />
      
  } else 
    return <Redirect to="/dbconfig" />

  if (userId === null)
    return <Redirect to={{
      pathname: "/login",
      state: { from: props.location }
    }}
    />

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