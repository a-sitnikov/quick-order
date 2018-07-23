import React, { Component } from 'react'

import ShoppingCart from '@material-ui/icons/ShoppingCart';

class Cart extends Component {
    render() {

        return (
            <div id="cart">
                <ShoppingCart style={{width: 42, height: 42}} />
            </div>
        )
    }
}

export default Cart;