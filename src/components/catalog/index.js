import React, { Component } from 'react'

import CartInfo from './cart_info'
import ItemsList from './items_list';
import GropusList from './groups_list';

import './catalog.css'
import { withStyles } from '@material-ui/core';

class Catalog extends Component {

  render() {

    const { classes } = this.props;

    return (
      <div className={classes.catalog}>
        <ItemsList/>
        <CartInfo />
        <GropusList />
      </div>
    )
  }

}

const styles = theme => ({
  catalog: {
    display: "grid",
    gridTemplateColumns: "3fr 1fr",
    gridTemplateRows: "48px  1fr",
    gridTemplateAreas:
      '"table cart" ' +
      '"table groups"',
    padding: theme.spacing.unit,
  }

})

export default withStyles(styles)(Catalog);