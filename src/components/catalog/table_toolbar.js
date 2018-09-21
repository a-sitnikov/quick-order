import React, { Component } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'

import { Toolbar, Button, Typography } from '@material-ui/core'
import { withStyles } from '@material-ui/core'
import UpdateIcon from '@material-ui/icons/Update'

import dateFormat from 'dateformat'
import { fetchCatalogRemote } from '../../modules/catalog';

class TableToolbar extends Component {

  update = event => {
    const { dispatch } = this.props;
    dispatch(fetchCatalogRemote());
    console.log(1)
  }

  render() {

    const { classes, lastUpdated } = this.props;

    return (
      <Toolbar className={classes.toolbar}>
        <Typography>
          Дата обновления: {dateFormat(lastUpdated, 'dd.mm.yyyy HH:MM:ss')}
        </Typography>  
        <Button
          size="small"
          variant="outlined"
          onClick={this.update}
          className={classes.button}
        >
          <UpdateIcon className={classes.iconSmall}/>
          Обновить
        </Button>
      </Toolbar>
    )
  }

}

const styles = theme => ({
  toolbar: {
    minHeight: 32,
    marginBottom: 6,
    padding: 0
  },
  iconSmall: {
    fontSize: 20,
  },
  button: {
    marginLeft: "auto"
  }
})

const mapStateToProps = (state) => {

  return {
    lastUpdated: state.catalog.lastUpdated
  }
}

export default compose(
  connect(mapStateToProps),
  withStyles(styles)
)(TableToolbar);