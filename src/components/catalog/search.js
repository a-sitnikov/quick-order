import React, { Component } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { FormControl, InputLabel, Input, InputAdornment, IconButton, withStyles } from '@material-ui/core';
import { Search as SearchIcon, Clear } from '@material-ui/icons'

import { searchItemsList } from '../../modules/items_list'

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
      event.preventDefault();
      if (this.inputRef)
        this.inputRef.focus();
    }

  }

  handleKeyDown = event => {
    if (event.key === 'Enter') {
      const { dispatch } = this.props;
      dispatch(searchItemsList(this.inputRef.value));
    }
  }

  handleChange = event => {
    this.setState({ text: event.target.value })
  }

  handleSearch = event => {
    const { dispatch } = this.props;
    dispatch(searchItemsList(this.inputRef.value));
  }

  handleClearSearch = event => {
    this.setState({ text: '' })
  }

  render() {
    const { classes } = this.props;
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
            value={this.state.text}
            onChange={this.handleChange}
            onKeyPress={this.handleKeyDown}
            inputRef={node => this.inputRef = node}
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

export default compose(
  connect(),
  withStyles(styles)
)(Search);
