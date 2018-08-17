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

    return (
      <AppBar position="fixed" color="default" className={classes.appbar}>
        <div className={classes.flex}>
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
          <Button 
            variant="outlined"
            className={classes.exit}
          >
            Выйти
          </Button>  
        </div>
      </AppBar>
    )
  }

}

const styles = theme => ({
  flex: {
    display: "flex"
  },
  appbar: {
    padding: theme.spacing.unit,
  },
  exit: {
    marginLeft: "auto"
  }
})

export default compose(
  withRouter,
  withStyles(styles)
)(NavBar);

