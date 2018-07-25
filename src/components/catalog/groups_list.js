import React, { Component } from 'react'
import { connect } from 'react-redux'

import TextField from '@material-ui/core/TextField';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListSubheader from '@material-ui/core/ListSubheader';

import { fetchGroups } from '../../modules/groups_list'

class GropusList extends Component {

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchGroups());
  }

  render() {

    const { items } = this.props;

    return (
      <div id="groups" style={{ padding: "10px" }}>
        <TextField fullWidth={true} placeholder="фильтр категорий" />
        <List>
          <ListSubheader>Все категории</ListSubheader>
          {items.map(item => (
            <ListItem key={item.guid}>
              {item.descr}
            </ListItem>
          ))}
        </List>
      </div>
    )
  }
}


const mapStateToProps = (state) => {

  const { 
    items,
    selected 
  } = state.groups;

  return {
    items, 
    selected 
  }
}

export default connect(mapStateToProps)(GropusList);
