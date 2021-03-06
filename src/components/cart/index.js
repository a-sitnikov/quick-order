import React, { Component } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { Link } from 'react-router-dom'
import { Table, TableBody, TableRow, TableCell, TableFooter, withStyles, Checkbox,
  Typography, Toolbar, IconButton, Tooltip } from '@material-ui/core';

import { Delete as DeleteIcon } from '@material-ui/icons'

import Header from '../common/table_header'
import { setSortCart, addSortCart, changeQty } from '../../modules/cart'

import { format, stringWithNumber } from '../../utils'

class Cart extends Component {

  constructor() {
    super();
    this.state = {
      checkedItems: {}
    }
  }

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

  onSelectAllClick = (event) => {

    const { items } = this.props;

    let checkedItems = {};
    if (event.target.checked) {
      items.forEach(val => checkedItems[val.item.guid] = true);
    }

    this.setState({ checkedItems });
  }

  onSelectClick = item => event => {

    let { checkedItems } = this.state;
    if (event.target.checked)
      checkedItems[item.guid] = true;
    else
      delete checkedItems[item.guid];

    this.setState({ checkedItems });
  }

  render() {

    const { order, items, sum, classes } = this.props;

    let columns = [
      { id: 'number', numeric: true, label: '#', sortable: false, width: 10 },
      { id: 'code', numeric: false, label: 'Код', sortable: true, width: 100 },
      { id: 'descr', numeric: false, label: 'Наименование', sortable: true },
      { id: 'price', numeric: true, label: 'Цена', sortable: true, width: 80 },
      { id: 'qty', numeric: true, label: 'Количество', sortable: true, width: 50 },
      { id: 'sum', numeric: true, label: 'Сумма', sortable: true, width: 50 }
    ];

    const numSelected = Object.keys(this.state.checkedItems).length;

    return (
      <div>
        <Typography className={classes.title}>Список всех заказанных позиций</Typography>
        <Table>
          <Header
            columns={columns}
            order={order}
            onSort={this.handleSort}
          >
            <TableCell padding="checkbox" style={{ width: 20 }}>
              <Checkbox
                indeterminate={numSelected > 0 && numSelected < items.length}
                checked={numSelected > 0 && numSelected === items.length}
                onChange={this.onSelectAllClick}
              />
            </TableCell>
          </Header>
          <TableBody>
            {
              items.map((item, i) => (
                <TableRow key={item.guid}>
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={this.state.checkedItems[item.guid] === true}
                      onChange={this.onSelectClick(item)}
                    />
                  </TableCell>
                  <TableCell>{i + 1}</TableCell>
                  <TableCell>{item.code}</TableCell>
                  <TableCell>
                    <Link to={`/items/${item.guid}`} className={classes.link}>
                      {item.descr}
                    </Link>
                  </TableCell>
                  <TableCell numeric>{format(item.price)}</TableCell>
                  <TableCell numeric>
                    <input
                      value={item.qty === 0 ? "" : item.qty}
                      type="number"
                      className={classes.input}
                      onChange={this.handleQtyChange(item)}
                    //ref={this.setInputRef(i)}
                    />
                  </TableCell>
                  <TableCell numeric>{format(item.sum)}</TableCell>
                </TableRow>
              ))
            }
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={5}>
                <b>Итого</b>
              </TableCell>
              <TableCell>
              </TableCell>  
              <TableCell>
                <b>{format(sum)}</b>
              </TableCell>  
            </TableRow>  
          </TableFooter>  
        </Table>
        {numSelected > 0 && (
          <Toolbar>
            <div className={classes.title}>
              <Typography color="inherit" variant="subheading">
                Выделено {numSelected} {stringWithNumber(numSelected, 'позиция', 'позиции', 'позиций')}
              </Typography>
            </div>
            <div className={classes.spacer} />
            <div className={classes.actions}>
              <Tooltip title="Удалить позиции">
                <IconButton aria-label="Delete">
                  <DeleteIcon />
                </IconButton>
              </Tooltip>
            </div>
          </Toolbar>
        )}
      </div>
    )
  }

}

const mapStateToProps = (state) => {

  const {
    order,
    items,
    sum
  } = state.cart;

  return {
    order,
    items,
    sum
  }
}

const styles = theme => ({
  link: {
    color: "rgba(0, 0, 0, 0.87)"
  },
  input: {
    width: 65,
    textAlign: "right"
  },
  spacer: {
    flex: '1 1 100%',
  },
  actions: {
    color: theme.palette.text.secondary,
  },
  title: {
    flex: '0 0 auto',
  },  
});


export default compose(
  connect(mapStateToProps),
  withStyles(styles)
)(Cart);

