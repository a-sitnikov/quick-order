import React, { Component } from 'react'
import { connect } from 'react-redux'

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TableSortLabel from '@material-ui/core/TableSortLabel';

import { fetchItems, sortItemsList } from '../../modules/items_list'

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

  createSortHandler = colId => event => {
    let { orderBy, order, dispatch } = this.props;
    if (colId === orderBy) {
      order = (order === "asc" ? "desc" : "asc");
    } else {
      orderBy = colId;
      order = "asc";
    }

    dispatch(sortItemsList(orderBy, order));
  }

  render() {

    const { currentPage, rowsPerPage, orderBy, order, items, rowCount } = this.props;

    let columns = [
      { id: 'code', numeric: false, label: 'Код' },
      { id: 'descr', numeric: false, label: 'Наименование' },
      { id: 'price', numeric: true, label: 'Цена' },
      { id: 'qty', numeric: true, label: 'Количество' }
    ]

    return (
      <Table id="table">
        <TableHead>
          <TableRow>
            {columns.map(col => (
              <TableCell key={col.id} >
                <TableSortLabel
                  active={col.id === orderBy}
                  direction={order}
                  onClick={this.createSortHandler(col.id)}
                >{col.label}
                </TableSortLabel>
              </TableCell>
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
    orderBy,
    order,
    items 
  } = state.list;

  return {
    currentPage, 
    rowsPerPage, 
    rowCount, 
    orderBy,
    order,
    items 
  }
}

export default connect(mapStateToProps)(ItemsList);
