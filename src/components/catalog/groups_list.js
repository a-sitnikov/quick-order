import React, { Component } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListSubheader from '@material-ui/core/ListSubheader';
import { withStyles, FormControl, InputLabel, Input, InputAdornment, IconButton, Chip } from '@material-ui/core';
import { Clear } from '@material-ui/icons';

import { fetchGroups, selectGroup, deselectGroup, clearGroupsSelection, setSearchText } from '../../modules/groups_list'
import { filterItemsList } from '../../modules/items_list'

class GropusList extends Component {

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchGroups());
  }

  handleGroupClick = guid => event => {
    const { dispatch } = this.props;
    dispatch(selectGroup(guid));
    dispatch(filterItemsList());
  }

  handleHeaderClick = event => {
    const { dispatch } = this.props;
    dispatch(clearGroupsSelection());
    dispatch(filterItemsList());
  }

  handleDelete = guid => vent => {
    const { dispatch } = this.props;
    dispatch(deselectGroup(guid));
    dispatch(filterItemsList());
  }

  handleSearchChange = event => {
    const { dispatch } = this.props;
    dispatch(setSearchText(event.target.value));
  }

  handleClearSearch = event => {
    const { dispatch } = this.props;
    dispatch(setSearchText(''));
  }

  render() {

    const { searchText, items, selected, filteredItems, classes } = this.props;

    let itemsArray = filteredItems === null ? items : filteredItems;

    return (
      <div id="groups" className={classes.groups}>
        <FormControl style={{ width: "100%" }}>
          <InputLabel
            htmlFor="search"
          >
            Фильтр категорий
          </InputLabel>
          <Input
            type='text'
            value={searchText}
            onChange={this.handleSearchChange}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="Clear search"
                  onClick={this.handleClearSearch}
                >
                  <Clear />
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>
        {selected.length > 0 && (
          <div className={classes.selected}>
            {selected.map(item => (
              <Chip key={item.guid}
                label={item.descr}
                onDelete={this.handleDelete(item.guid)}
              />
            ))}
          </div>
        )}
        <List>
          <ListSubheader onClick={this.handleHeaderClick} className={classes.header}>Все категории</ListSubheader>
          {itemsArray.map(item => (
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
    searchText,
    items,
    selected,
    filteredItems
  } = state.groups;

  return {
    searchText,
    items,
    selected,
    filteredItems
  }
}

const styles = theme => ({
  header: {
    fontWeight: "bold",
    cursor: "pointer",
  },
  groups: {
    padding: theme.spacing.unit
  },
  item: {
    cursor: "pointer",
  },
  selected: {
    paddingTop: 2
  }
});


export default compose(
  connect(mapStateToProps),
  withStyles(styles)
)(GropusList);
