import React, { Component } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import classnames from 'classnames'

import Search from './search';
import ItemsList from './items_list';
import CartInfo from './cart_info'
import GropusList from './groups_list';
import TableToolbar from './table_toolbar';

import { fetchCatalog } from '../../modules/catalog'

import { withStyles } from '@material-ui/core';

class Catalog extends Component {

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchCatalog());
  }

  render() {

    const { classes } = this.props;

    return (
      <div className={classnames("container", classes.catalog)}>
        <div className={classnames("flex-column", classes.leftPanel)}>
          <Search />
          <TableToolbar />
          <ItemsList />
        </div>
        <div className={classnames("flex-column", classes.rightPanel)}>
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
    padding: theme.spacing.unit
  },
  leftPanel: {
    flex: "1 1 70%",
  },
  rightPanel: {
    flex: "0 0 300px",
  }
})

export default compose(
  connect(),
  withStyles(styles)
)(Catalog);