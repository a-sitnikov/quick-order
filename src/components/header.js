import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

class Header extends Component {

    handleChange = (event, value) => {
        const { history } = this.props;
        history.push(`${value}`)
    }

    render() {

        const { location } = this.props;

        return (
            <Tabs
                onChange={this.handleChange}
                value={location.pathname}
            >
                <Tab
                    label="Каталог"
                    value="/"
                />
                <Tab
                    label="Корзина"
                    value="/cart"
                />
                <Tab
                    label="Заказы"
                    value="/orders"
                />
                <Tab
                    label="Быстрый заказ"
                    value="/quick"
                />
                <Tab
                    label="Профиль"
                    value="/profile"
                />
                <Tab
                    label="Помощь"
                    value="/help"
                />
            </Tabs>
        )
    }

}

export default withRouter(Header);
