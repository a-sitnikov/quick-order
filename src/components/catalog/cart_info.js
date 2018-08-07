import React, { Component } from 'react'
import { compose } from 'redux'

import { withStyles } from '@material-ui/core';
import ShoppingCart from '@material-ui/icons/ShoppingCart';

class CartInfo extends Component {
  render() {

    const { classes } = this.props;

    return (
      <div id="cart" className={classes.cartInfo}>
        <ShoppingCart className={classes.icon} />
      </div>
    )
  }
}

const styles = theme => ({
  cartInfo: {
    padding: theme.spacing.unit,
    border: "1px solid #e0e0e0",
    gridArea: "cart"
  },
  icon: {
    width: 42,
    height: 42
  }
});

export default compose(
  withStyles(styles)
)(CartInfo);