import React, { Component } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'

import { throttle } from 'lodash'

import { Table, TableBody, TableHead, TableRow, TableCell, withStyles, TableFooter } from '@material-ui/core';
import { TableSortLabel } from '@material-ui/core';

import { fetchItems, setSortItemsList, addSortItemsList } from '../../modules/items_list'

const HeaderCell = ({ id, order, sortable, className, children, onClick, ...props }) => {

  const orderBy = order.find(val => val.field === id);
  const isActive = (orderBy !== undefined);
  const direction = isActive ? orderBy.direction : "asc";

  if (!sortable)
    return (
      <TableCell {...props}>
        {children}
      </TableCell>
    )
  else
    return (
      <TableCell className={className} {...props}>
        <TableSortLabel
          active={isActive}
          direction={direction}
          onClick={onClick}
        >{children}
        </TableSortLabel>
      </TableCell>
    )
}

class ItemsList extends Component {

  constructor() {
    super();
    this.state = {
      currentRow: 0,
      startIndex: 0,
      endIndex: 14,
      count: 15
    }
    this.inputs = [];
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchItems());

  }

  componentDidUpdate() {
    if (this.currentInput) {
      this.currentInput.focus();
      this.currentInput.select();
    }
  }

  setCurrentRow = currentRow => {

    const { filteredItems, items } = this.props.list;

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

  handleQtyChange = event => {

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

  createSortHandler = orderBy => event => {

    const { dispatch } = this.props;

    if (event.ctrlKey) {
      dispatch(addSortItemsList(orderBy));
    } else {
      dispatch(setSortItemsList(orderBy));
    }
  }

  render() {

    const { list: { order, items, filteredItems }, classes } = this.props;

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
      rows.push(
        <TableRow
          key={item.guid}
          selected={i === this.state.currentRow}
          onClick={this.handleRowClik(i)}
        >
          <TableCell>{item.code}</TableCell>
          <TableCell>{item.descr}</TableCell>
          <TableCell numeric>{item.price}</TableCell>
          <TableCell>
            <input
              value={item.qty}
              type="number"
              className={classes.input}
              onChange={this.handleQtyChange}
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
          <TableHead>
            <TableRow>
              {columns.map(col => (
                <HeaderCell
                  key={col.id}
                  id={col.id}
                  order={order}
                  sortable={col.sortable}
                  onClick={this.createSortHandler(col.id)}
                  style={{ width: col.width }}
                >
                  {col.label}
                </HeaderCell>
              ))}
            </TableRow>
          </TableHead>
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

  const {
    list
  } = state;

  return {
    list
  }
}

const styles = theme => ({
  input: {
    width: 65,
    textAlign: "right"
  }
})

export default compose(
  connect(mapStateToProps),
  withStyles(styles)
)(ItemsList);
