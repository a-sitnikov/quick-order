import React, { Component } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { FormControl, InputLabel, Input, InputAdornment, IconButton, withStyles } from '@material-ui/core';
import { Search as SearchIcon, Clear } from '@material-ui/icons'

import { filterItemsList } from '../../modules/items_list'
import { searchTextItemsList, clearSearchTextItemsList } from '../../modules/search_items'

class Search extends Component {

  constructor() {
    super();
    this.state = { text: '' }
  }

  componentDidMount() {
    window.addEventListener("keydown", this.focusInput);
  }

  componentWillUnmount() {
    window.removeEventListener("keydown", this.focusInput);
  }

  focusInput = event => {
    if (event.key === 'F3' || (event.key === 'f' && event.ctrlKey)) {
      console.log()
      event.preventDefault();
      if (this.inputRef)
        this.inputRef.focus();
    }

  }

  handleKeyDown = event => {
    if (event.key === 'Enter') {
      const { dispatch } = this.props;
      dispatch(filterItemsList());
    }
  }

  handleChange = event => {
    const { dispatch } = this.props;
    dispatch(searchTextItemsList(event.target.value));
}

  handleSearch = event => {
    const { dispatch } = this.props;
    dispatch(filterItemsList());
}

  handleClearSearch = event => {
    const { dispatch } = this.props;
    dispatch(clearSearchTextItemsList());
    dispatch(filterItemsList());
  }

  render() {
    const { text, classes } = this.props;
    return (
      <div className={classes.search}>
        <FormControl style={{ width: "100%" }}>
          <InputLabel
            htmlFor="search"
            shrink
          >
            Поиск
          </InputLabel>
          <Input
            id="search"
            type='text'
            placeholder="Для поиска нажмите F3 или Ctrl+F"
            value={text}
            onChange={this.handleChange}
            onKeyPress={this.handleKeyDown}
            inputRef = {node => this.inputRef = node}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="Search"
                  onClick={this.handleSearch}
                >
                  <SearchIcon />
                </IconButton>
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
      </div>
    )
  }
}

const styles = theme => ({
  search: {
    display: "flex",
    flexDirection: "row",
    marginBottom: theme.spacing.unit
  }
})

const mapStateToProps = (state) => {

  const {
    searchItems: {text}
  } = state;

  return {
    text
  }
}

export default compose(
  connect(mapStateToProps),
  withStyles(styles)
)(Search);
