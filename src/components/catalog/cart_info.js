import React, { Component } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'

import { Link } from 'react-router-dom'
import { Badge, withStyles } from '@material-ui/core';
import ShoppingCart from '@material-ui/icons/ShoppingCart';

class CartInfo extends Component {
  render() {

    const { cart, classes } = this.props;

    let icon;
    if (cart.count === 0)
      icon = <ShoppingCart className={classes.icon} />
    else
      icon = (
        <Badge badgeContent={cart.count} color="primary" classes={{ badge: classes.badge }}>
          <ShoppingCart className={classes.icon} />
        </Badge>
      )

    let countNoun = 'позиций';
    if (cart.count % 100 >= 11 && cart.count % 100 <= 20)
      countNoun = 'позиций';
    else if (cart.count % 10 === 1)
        countNoun = 'позиция'
    else if (cart.count % 10 >= 2 && cart.count % 10 <= 4)
        countNoun = 'позиции'

    return (
      <div id="cart" className={classes.cartInfo}>
        <Link to="/cart" className={classes.link}>
          {icon}
          <div className={classes.text}>
            <div className={classes.sum}>
              Cумма {cart.sum.toFixed(2)} руб.
            </div>
            <div className={classes.count}>
              {cart.count} {countNoun}
            </div>
          </div>
        </Link>
      </div>
    )
  }
}

const mapStateToProps = (state) => {

  const {
    cart
  } = state;

  return {
    cart
  }
}

const styles = theme => ({
  cartInfo: {
    padding: theme.spacing.unit,
  },
  link: {
    display: "flex",
    color: "black"
  },
  icon: {
    fontSize: 42,
  },
  text: {
    marginLeft: 20,
    marginTop: 5
  },
  sum: {
    fontWeight: "bold"
  },
  count: {
    fontSize: "80%"
  },
  badge: {
    top: -10,
    right: -10,
    // The border color match the background color.
    border: `2px solid ${
      theme.palette.type === 'light' ? theme.palette.grey[200] : theme.palette.grey[900]
    }`,
  }  
});

export default compose(
  connect(mapStateToProps),
  withStyles(styles)
)(CartInfo);