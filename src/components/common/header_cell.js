import React from 'react'
import { TableSortLabel, TableCell } from '@material-ui/core';

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

  export default HeaderCell;