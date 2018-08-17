import React, { Component } from 'react'
import classnames from 'classnames'

import Search from './search';
import ItemsList from './items_list';
import CartInfo from './cart_info'
import GropusList from './groups_list';

import { withStyles } from '@material-ui/core';

class Catalog extends Component {

  render() {

    const { classes } = this.props;

    return (
      <div className={classes.catalog}>
        <div className={classnames("flex-column", classes.leftPanel)}>
          <Search />
          <ItemsList />
        </div>
        <div className="flex-column">
          <CartInfo />
          <GropusList />
        </div>
      </div>
    )
  }

}

const styles = theme => ({
  catalog: {
    display: "flex",
    flexDirection: "row",
    padding: theme.spacing.unit,
    marginTop: 37 + 2 * theme.spacing.unit
  },
  leftPanel: {
    flex: "1 1 70%",
  }
})

export default withStyles(styles)(Catalog);