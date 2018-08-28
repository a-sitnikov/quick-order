import React, { Component } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Link } from 'react-router-dom'

import { AppBar, Button, withStyles } from '@material-ui/core';

import { doLogout } from '../modules/login'

class NavBar extends Component {

  logout = () => {
    const { dispatch } = this.props;
    dispatch(doLogout());
  }

  render() {

    const { classes, location, login } = this.props;

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
        <div className={classes.exit}>
          <div className={classes.user}>
          {login.email}
          </div>
          <Button
            variant="outlined"
            onClick={this.logout}
          >
            Выйти
          </Button>
        </div>
      </AppBar>
    )
  }

}

const styles = theme => ({
  appbar: {
    padding: theme.spacing.unit,
  },
  exit: {
    marginLeft: "auto",
    display: "flex",
    alignItems: "center"
  },
  user: {
    padding: theme.spacing.unit
  }
})

const mapStateToProps = (state) => {

  const { login } = state;

  return {
    login
  }
}

export default compose(
  connect(mapStateToProps),
  withRouter,
  withStyles(styles)
)(NavBar);

