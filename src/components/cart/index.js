import React, { Component } from 'react'
import { connect } from 'react-redux'

class Cart extends Component {

    render() {
        return (
            <div>Корзина</div>
        )
    }

}    

export default connect()(Cart)

