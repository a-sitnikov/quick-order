import React, { Component } from 'react'

import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';


class GropusList extends Component {
    
    render() {

        let items = [];
        items.push(                <ListItem key={0}>
            Item 0
        </ListItem>);
       items.push(                <ListItem key={1}>Ntcn
    </ListItem>)        

        return (
            <div id="groups">
            Группы
                <List>
                    <ListSubheader>Все категории</ListSubheader>
                    {items}
                </List>    
            </div>
        )
    }
}

export default GropusList;
