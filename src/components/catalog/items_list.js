import React, { Component } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { Link, withRouter } from 'react-router-dom'

import { throttle } from 'lodash'
import queryString from 'query-string'

import { Table, TableBody, TableRow, TableCell, withStyles, TableFooter } from '@material-ui/core';

import Header from '../common/table_header'
import { setSortItems, addSortItems, filterItems } from '../../modules/catalog/items_list'
import { changeQty } from '../../modules/cart'

import { format } from '../../utils'

class ItemsList extends Component {

  constructor() {
    super();
    this.state = {
      currentRow: 0,
      startIndex: 0,
      endIndex: 14,
      count: 15
    }
  }

  componentDidMount() {

    const { dispatch, location } = this.props;

    const query = queryString.parse(location.search);
    this.searchText = query.search;
    if (this.searchTex)
      dispatch(filterItems(this.searchText));

  }

  componentWillReceiveProps(props) {

    const { dispatch } = this.props;
    const query = queryString.parse(props.location.search);

    if (this.searchText !== query.search) {
      this.searchText = query.search;
      dispatch(filterItems(this.searchText));
    }

    if (props.items !== this.props.items) {
      dispatch(filterItems(this.searchText));
    }

  }

  componentDidUpdate() {
    if (this.currentInput) {
      this.currentInput.focus();
      this.currentInput.select();
    }
  }

  setCurrentRow = currentRow => {

    const { filteredItems, items } = this.props;

    const length = (filteredItems || items).length - 1;
    if (currentRow < 0 || currentRow > length)
      return;

    let { startIndex, endIndex, count } = this.state;

    if (currentRow < startIndex && currentRow >= 0) {
      startIndex = currentRow;
      endIndex = startIndex + count - 1;
    } else if (currentRow > endIndex && currentRow < length) {
      endIndex = currentRow;
      startIndex = endIndex - count + 1;
    }

    this.setState({
      currentRow,
      startIndex,
      endIndex
    })
  }

  setCurrentRowThrottled = throttle(this.setCurrentRow, 100);

  handleKeyDown = event => {

    if (event.key === 'ArrowDown' || event.key === 'Enter') {
      event.preventDefault();
      let newCurrentRow = this.state.currentRow + 1;
      this.setCurrentRowThrottled(newCurrentRow);

    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      let newCurrentRow = this.state.currentRow - 1;
      this.setCurrentRowThrottled(newCurrentRow);
    }
  }

  handleWheel = event => {
    let newCurrentRow;
    if (event.nativeEvent.deltaY > 0)
      newCurrentRow = this.state.currentRow + 1;
    else
      newCurrentRow = this.state.currentRow - 1;

    this.setCurrentRowThrottled(newCurrentRow);
  }

  handleQtyChange = item => event => {
    const { dispatch } = this.props;
    dispatch(changeQty(item, +event.target.value));
  }

  handleRowClik = currentRow => event => {
    this.setState({
      currentRow
    })
  }

  setInputRef = i => element => {
    if (this.state.currentRow === i)
      this.currentInput = element;
  }

  handleSort = (orderBy, event) => {

    const { dispatch } = this.props;

    if (event.ctrlKey) {
      dispatch(addSortItems(orderBy));
    } else {
      dispatch(setSortItems(orderBy));
    }
  }

  render() {

    const { order, items, filteredItems, cart, classes } = this.props;

    let columns = [
      { id: 'code', numeric: false, label: 'Код', sortable: true, width: 100 },
      { id: 'descr', numeric: false, label: 'Наименование', sortable: true },
      { id: 'price', numeric: true, label: 'Цена', sortable: true, width: 80 },
      { id: 'qty', numeric: true, label: 'Количество', sortable: false, width: 50 }
    ]

    let itemsArray = filteredItems === null ? items : filteredItems;

    let rows = [];
    const endIndex = Math.min(this.state.endIndex, itemsArray.length - 1);
    for (let i = this.state.startIndex; i <= endIndex; i++) {
      const item = itemsArray[i];
      const cartItem = cart.itemsByKey[item.guid] || {};
      rows.push(
        <TableRow
          key={item.guid}
          selected={i === this.state.currentRow}
          onClick={this.handleRowClik(i)}
        >
          <TableCell>{item.code}</TableCell>
          <TableCell>
            <Link
              to={{
                pathname: `/items/${item.guid}`,
                state: { item }
              }}
              className={classes.link}
            >
              {item.descr}
            </Link>
          </TableCell>
          <TableCell numeric>{format(item.price)}</TableCell>
          <TableCell>
            <input
              value={cartItem.qty || ""}
              type="number"
              className={classes.input}
              onChange={this.handleQtyChange(item)}
              ref={this.setInputRef(i)}
            />
          </TableCell>
        </TableRow>
      )
    }

    return (
      <Table
        id="table"
        onKeyDown={this.handleKeyDown}
        onWheel={this.handleWheel}
      >
        <Header
          columns={columns}
          order={order}
          onSort={this.handleSort}
        />
        <TableBody>
          {rows}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={4}>
              Всего записей: {itemsArray.length}
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table >
    )
  }
}

const mapStateToProps = (state) => {

  const { items, filteredItems, order } = state.catalog.list;

  return {
    items,
    filteredItems,
    order,
    cart: state.cart
  }
}

const styles = theme => ({
  input: {
    width: 65,
    textAlign: "right"
  },
  link: {
    color: "rgba(0, 0, 0, 0.87)"
  }
})

export default compose(
  withRouter,
  connect(mapStateToProps),
  withStyles(styles)
)(ItemsList);
