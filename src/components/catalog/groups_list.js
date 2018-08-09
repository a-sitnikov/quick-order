import React, { Component } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'

import TextField from '@material-ui/core/TextField';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListSubheader from '@material-ui/core/ListSubheader';
import { withStyles, Chip } from '@material-ui/core';

import { fetchGroups, selectGroup, deselectGroup, clearGroupsSelection } from '../../modules/groups_list'

class GropusList extends Component {

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchGroups());
  }

  handleGroupClick = guid => event => {
    const { dispatch } = this.props;
    dispatch(selectGroup(guid));
  }

  handleHeaderClick = event => {
    const { dispatch } = this.props;
    dispatch(clearGroupsSelection());
  }

  handleDelete = guid => vent => {
    const { dispatch } = this.props;
    dispatch(deselectGroup(guid));
  }

  render() {

    const { items, selected, classes } = this.props;

    return (
      <div id="groups" className={classes.groups}>
        <TextField fullWidth={true} label="Фильтр категорий" />
        {selected.length > 0 && (
          <div>
            {selected.map(val => (
              <Chip key={val.guid}
                label={val.descr}
                onDelete={this.handleDelete(val.guid)}
              />
            ))}
          </div>
        )}
        <List>
          <ListSubheader onClick={this.handleHeaderClick} className={classes.item}>Все категории</ListSubheader>
          {items.map(item => (
            <ListItem key={item.guid} onClick={this.handleGroupClick(item.guid)} className={classes.item}>
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
    margin: theme.spacing.unit
  },
  item: {
    cursor: "pointer",
  }
});


export default compose(
  withStyles(styles),
  connect(mapStateToProps)
)(GropusList);
