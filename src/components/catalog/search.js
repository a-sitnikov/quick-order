import React, { Component } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { withRouter } from 'react-router-dom'
import { FormControl, InputLabel, Input, InputAdornment, IconButton, withStyles } from '@material-ui/core';
import { Search as SearchIcon, Clear } from '@material-ui/icons'

import queryString from 'query-string'

class Search extends Component {

  constructor() {
    super();
    this.state = { text: ''};
  }

  componentDidMount() {
    window.addEventListener("keydown", this.focusInput);

    const { location } = this.props;
    this.setStateFromLocation(location);
  }

  componentWillUnmount() {
    window.removeEventListener("keydown", this.focusInput);
  }

  componentWillReceiveProps(props) {
    const { location } = props;
    this.setStateFromLocation(location);
  }

  setStateFromLocation = location => {
    const query = queryString.parse(location.search);
    const text = query.search || '';
    if (text !== this.state.text) 
      this.setState({ text });
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
      this.handleSearch();
    }
  }

  handleChange = event => {
    this.setState({
      text: event.target.value
    });
  }

  handleSearch = event => {
    this.gotoSearch(this.state.text);
  }

  handleClearSearch = event => {
    this.gotoSearch('');
  }

  gotoSearch = text => {
    const { history } = this.props;
    if (text)
      history.push('/?search=' + text);
    else  
      history.push('/');
  }

  render() {
    const { classes } = this.props;
    const { text } = this.state;
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
  withRouter,
  connect(),
  withStyles(styles)
)(Search);
