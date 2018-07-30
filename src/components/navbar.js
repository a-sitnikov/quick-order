import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { Link } from 'react-router-dom'

import { AppBar, Tabs, Tab } from '@material-ui/core';

class NavBar extends Component {

  render() {

    const { location } = this.props;

    let menuItems = [
      { path: '/', label: 'Каталог' },
      { path: '/cart', label: 'Корзина' },
      { path: '/orders', label: 'Заказы' },
      { path: '/quick', label: 'Быстрый заказ' },
      { path: '/profile', label: 'Профиль' },
      { path: '/help', label: 'Помощь' },
    ]

    return (
      <AppBar position="static" color="default">
        <Tabs value={location.pathname}>
          {menuItems.map(val => (
            <Tab
              key={val.path}
              label={val.label}
              component={Link}
              to={val.path}
              value={val.path}
            />
          ))}
        </Tabs>
      </AppBar>
    )
  }

}

export default withRouter(NavBar);
