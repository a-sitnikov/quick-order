import React, { Component } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { Link } from 'react-router-dom'
import { Table, TableBody, TableRow, TableCell, withStyles, TableFooter } from '@material-ui/core';

import Header from '../common/table_header'
import { setSortCart, addSortCart, changeQty } from '../../modules/cart'

import { format } from '../../utils'

class Cart extends Component {

  handleQtyChange = item => event => {
    const { dispatch } = this.props;
    dispatch(changeQty(item, +event.target.value, false));
  }

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
      <div>
        <Table>
          <Header
            columns={columns}
            order={order}
            onSort={this.handleSort}
          />
          <TableBody>
            {
              items.map((val, i) => (
                <TableRow key={val.item.guid}>
                  <TableCell>{i + 1}</TableCell>
                  <TableCell>{val.item.code}</TableCell>
                  <TableCell><Link to={`/items/${val.item.guid}`} className={classes.link}>{val.item.descr}</Link></TableCell>
                  <TableCell numeric>{format(val.item.price)}</TableCell>
                  <TableCell numeric>
                    <input
                      value={val.qty === 0 ? "" : val.qty}
                      type="number"
                      className={classes.input}
                      onChange={this.handleQtyChange(val.item)}
                    //ref={this.setInputRef(i)}
                    />
                  </TableCell>
                  <TableCell numeric>{format(val.sum)}</TableCell>
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
  link: {
    color: "rgba(0, 0, 0, 0.87)"
  }
});


export default compose(
  connect(mapStateToProps),
  withStyles(styles)
)(Cart);

