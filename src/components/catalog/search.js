import React, { Component } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { FormControl, InputLabel, Input, InputAdornment, IconButton, withStyles } from '@material-ui/core';
import { Search as SearchIcon, Clear } from '@material-ui/icons'

class Search extends Component {

  constructor(){
    super();
    this.state = {text: ''}
  }

  handleChange = event => {
    this.setState({text: event.target.value})
  }

  handleSearch = event => {

  }

  handleClearSearch = event => {
    this.setState({text: ''})
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.search}>
        <FormControl>
          <InputLabel htmlFor="search">Поиск</InputLabel>
          <Input
            id="search"
            type='text'
            value={this.state.text}
            onChange={this.handleChange}
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
