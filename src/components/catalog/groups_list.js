import React, { Component } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'

import TextField from '@material-ui/core/TextField';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListSubheader from '@material-ui/core/ListSubheader';
import { withStyles } from '@material-ui/core';

import { fetchGroups } from '../../modules/groups_list'

class GropusList extends Component {

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchGroups());
  }

  render() {

    const { items, classes } = this.props;

    return (
      <div id="groups" className={classes.groups}>
        <TextField fullWidth={true} label="Фильтр категорий" />
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

const styles = theme => ({
  groups: {
    gridArea: "groups",
    padding: theme.spacing.unit
  },
});


export default compose(
  withStyles(styles),
  connect(mapStateToProps)
)(GropusList);
