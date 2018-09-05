import React, { Component } from 'react'
import { TableHead, TableRow } from '@material-ui/core';

import HeaderCell from './header_cell'

class Header extends Component {
  
  createSortHandler = orderBy => event => {
    const { onSort } = this.props;
    onSort(orderBy, event);
  }

  render() {
    const { columns, order, children } = this.props;
    return (
      <TableHead>
        <TableRow>
          {children}
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
    )
  }
}

export default Header;