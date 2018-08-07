import React, { Component } from 'react'
import { compose } from 'redux'
import { withRouter } from 'react-router-dom'
import { Link } from 'react-router-dom'

import { AppBar, Button, withStyles } from '@material-ui/core';

class NavBar extends Component {

  componentWillReceiveProps(props) {
    console.log(props);
  }

  render() {

    const { classes, location } = this.props;

    let menuItems = [
      { path: '/', label: 'Каталог' },
      { path: '/cart', label: 'Корзина' },
      { path: '/orders', label: 'Заказы' },
      { path: '/quick', label: 'Быстрый заказ' },
      { path: '/profile', label: 'Профиль' },
      { path: '/help', label: 'Помощь' },
    ];
    console.log(1, location)

    return (
      <AppBar position="static" color="default" className={classes.appbar}>
        <div>
          {menuItems.map(val => (
            <Button
              key={val.path}
              component={Link}
              to={val.path}
              variant={val.path === location.pathname ? "raised" : "flat"}
            >
              {val.label}
            </Button>
          ))}
        </div>
      </AppBar>
    )
  }

}

const styles = theme => ({
  active: {

  },
  appbar: {
    padding: theme.spacing.unit
  }
})

export default compose(
  withRouter,
  withStyles(styles)
)(NavBar);

