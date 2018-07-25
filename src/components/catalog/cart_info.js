import React, { Component } from 'react'
import Paper from '@material-ui/core/Paper';
import ShoppingCart from '@material-ui/icons/ShoppingCart';

class CartInfo extends Component {
    render() {

        return (
            <Paper id="cart">
                <ShoppingCart style={{width: 42, height: 42}} />
            </Paper>
        )
    }
}

export default CartInfo;