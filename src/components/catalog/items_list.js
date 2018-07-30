import React, { Component } from 'react'
import { connect } from 'react-redux'

import { Table, TableBody, TableHead, TableRow, TableCell, TableFooter } from '@material-ui/core';
import { TablePagination, TableSortLabel } from '@material-ui/core';

import { fetchItems, sortItemsList, addSortItemsList } from '../../modules/items_list'

const HeaderCell = ({ id, order, sortable, children, onClick }) => {

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
      <TableCell >
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

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchItems());
  }

  handlePageChange = (event) => {

  }

  handleChangeRowsPerPage = (event) => {

  }

  handleQtyChange = (event) => {

  }

  createSortHandler = orderBy => event => {

    const { dispatch } = this.props;
    console.log(event)

    if (event.ctrlKey) {
      dispatch(addSortItemsList(orderBy));
    } else {
      dispatch(sortItemsList(orderBy));
    }
  }

  render() {

    const { currentPage, rowsPerPage, order, items, rowCount } = this.props;

    let columns = [
      { id: 'code', numeric: false, label: 'Код', sortable: true },
      { id: 'descr', numeric: false, label: 'Наименование', sortable: true  },
      { id: 'price', numeric: true, label: 'Цена', sortable: true  },
      { id: 'qty', numeric: true, label: 'Количество', sortable: false  }
    ]

    return (
      <Table id="table">
        <TableHead>
          <TableRow>
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
          {items.map((val, i) => (
            <TableRow key={i}>
              <TableCell>{val.code}</TableCell>
              <TableCell>{val.descr}</TableCell>
              <TableCell numeric>{val.price}</TableCell>
              <TableCell><input value={val.qty} onChange={this.handleQtyChange} /></TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              count={rowCount}
              page={currentPage}
              rowsPerPage={rowsPerPage}
              onChangePage={this.handlePageChange}
              onChangeRowsPerPage={this.handleChangeRowsPerPage}
            />
          </TableRow>
        </TableFooter>
      </Table>
    )
  }
}

const mapStateToProps = (state) => {

  const {
    currentPage,
    rowsPerPage,
    rowCount,
    order,
    items
  } = state.list;

  return {
    currentPage,
    rowsPerPage,
    rowCount,
    order,
    items
  }
}

export default connect(mapStateToProps)(ItemsList);
