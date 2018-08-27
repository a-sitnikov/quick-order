import React, { Component } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { Table, TableBody, TableRow, TableCell, withStyles, TableFooter } from '@material-ui/core';

import Header from '../common/table_header'
import { setSortCart, addSortCart } from '../../modules/cart'

class Cart extends Component {

  handleSort = (orderBy, event) => {

    const { dispatch } = this.props;
        if (event.ctrlKey) {
          dispatch(addSortCart(orderBy));
        } else {
          dispatch(setSortCart(orderBy));
        }
  }

  render() {

    const { order, items, classes } = this.props;

    let columns = [
      { id: 'number', numeric: true, label: '#', sortable: false, width: 10 },
      { id: 'code', numeric: false, label: 'Код', sortable: true, width: 100 },
      { id: 'descr', numeric: false, label: 'Наименование', sortable: true },
      { id: 'price', numeric: true, label: 'Цена', sortable: true, width: 80 },
      { id: 'qty', numeric: true, label: 'Количество', sortable: true, width: 50 },
      { id: 'sum', numeric: true, label: 'Сумма', sortable: true, width: 50 }
    ];

    return (
      <div class={classes.container}>
        Корзина
        <Table>
          <Header
            columns={columns}
            order={order}
            onSort={this.handleSort}
          />
          <TableBody>
            {
              items.map(item => (
                <TableRow>
                </TableRow>
              ))
            }
          </TableBody>
        </Table>
      </div>
    )
  }

}

const mapStateToProps = (state) => {

  const {
    order,
    items
  } = state.cart;

  return {
    order,
    items
  }
}

const styles = theme => ({
  container: {
    marginTop: 37 + 2 * theme.spacing.unit
  },
});


export default compose(
  connect(mapStateToProps),
  withStyles(styles)
)(Cart);

