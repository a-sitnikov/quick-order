import React, { Component } from 'react'

import CartInfo from './cart_info'
import ItemsList from './items_list';
import GropusList from './groups_list';

import './catalog.css'

class Catalog extends Component {

  componentDidMount() {
  }

  render() {

    return (
      <div className="catalog">
        <ItemsList />
        <CartInfo />
        <GropusList />
      </div>
    )
  }

}

export default (Catalog);