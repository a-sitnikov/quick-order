import React from 'react';
import { Redirect } from 'react-router-dom'

import NavBar from './navbar'

export default ({ apiKey, userId, component, showNavbar, ...props }) => {

  if (apiKey === null)
    return <Redirect to="/fbconfig" />

  if (userId === null)
    return <Redirect to="/login" />

  const Component = component;

  if (showNavbar)
    return (
      <div style={{ height: "100%" }}>
        <NavBar />
        <Component {...props} />
      </div>
    )
  else
    return <Component {...props} />
}