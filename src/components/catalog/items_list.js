import React, { Component } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'

import { Table, TableBody, TableHead, TableRow, TableCell, withStyles } from '@material-ui/core';
import { TableSortLabel } from '@material-ui/core';

import { Column, Table as TableV } from 'react-virtualized';

import Search from './search'
import { fetchItems, setSortItemsList, addSortItemsList } from '../../modules/items_list'

const HeaderCell = ({ id, order, sortable, className, children, onClick }) => {

  const orderBy = order.find(val => val.field === id);
  const isActive = (orderBy !== undefined);
  const direction = isActive ? orderBy.direction : "asc";

  if (!sortable)
    return (
      <TableCell >
        {children}
      </TableCell>
    )
  else
    return (
      <TableCell className={className}>
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
      currentRow: 0
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

  handleKeyDown = (event) => {

    if (event.key === 'ArrowDown' || event.key === 'Enter') {
      event.preventDefault();
      if (this.state.currentRow < this.props.list.items.length - 1) {
        this.setState({
          currentRow: this.state.currentRow + 1
        })
      }

    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      this.setState({
        currentRow: Math.max(0, this.state.currentRow - 1)
      })
    }
  }

  handleQtyChange = (event) => {

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
      { id: 'code', numeric: false, label: 'Код', sortable: true },
      { id: 'descr', numeric: false, label: 'Наименование', sortable: true },
      { id: 'price', numeric: true, label: 'Цена', sortable: true },
      { id: 'qty', numeric: true, label: 'Количество', sortable: false }
    ]

    let itemsArray = filteredItems === null ? items : filteredItems;


    return (
      <div className={classes.gridArea}>
        <Search />
        <Table id="table" onKeyDown={this.handleKeyDown}>
          <TableHead>
            <TableRow className={classes.header}>
              {columns.map(col => (
                <HeaderCell
                  key={col.id}
                  id={col.id}
                  order={order}
                  sortable={col.sortable}
                  onClick={this.createSortHandler(col.id)}
                >
                  {col.label}
                </HeaderCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {itemsArray.map((val, i) => {
              let className;
              if (i === this.state.currentRow) {
                className = classes.active;
              }
              return (
                <TableRow key={i} className={className} onClick={this.handleRowClik(i)}>
                  <TableCell>{val.code}</TableCell>
                  <TableCell>{val.descr}</TableCell>
                  <TableCell numeric>{val.price}</TableCell>
                  <TableCell>
                    <input
                      value={val.qty}
                      type="number"
                      style={{textAlign: "right"}}
                      onChange={this.handleQtyChange}
                      ref={this.setInputRef(i)}
                    />
                  </TableCell>
                </TableRow>
              )
            }
            )}
          </TableBody>
        </Table >
      </div>
    )
  }
}

const mapStateToProps = (state) => {

  const {
    list,
    cart
  } = state;

  return {
    list,
    cart
  }
}

const styles = {
  active: {
    backgroundColor: "#f3ef97"
  },
  gridArea: {
    gridArea: "table",
    height: "100%"
  },
  header: {
    backgroundColor: "#e0e0e0",
    height: "48px",
    fontWeight: "bold"
  }
}

export default compose(
  connect(mapStateToProps),
  withStyles(styles)
)(ItemsList);
