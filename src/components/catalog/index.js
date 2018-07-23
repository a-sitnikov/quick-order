import React, { Component } from 'react'
import { connect } from 'react-redux'

import Typography from '@material-ui/core/Typography';

import GropusList from './groups_list';
import Cart from './cart'
import Table from './table';

import './catalog.css'

class Catalog extends Component {

    componentDidMount() {

    }

    render() {

        const { list, groups } = this.props;

        return (
            <div className="catalog">  
                <Table items={list}/>
                <Cart />
                <GropusList items={groups}/>
            </div>
        )
    }

}

const mapStateToProps = (state) => {

    const { list, groups } = state;

    return {
        list,
        groups
    }
}

export default connect(mapStateToProps)(Catalog);