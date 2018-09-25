import React, { Component } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'

import classnames from 'classnames'
import { withStyles } from '@material-ui/core'

class Loader extends Component {

  render() {

    const { classes } = this.props;

    return (
      <div id="pageLoader" className={classes.loaderOverlay}>
        <div className={classnames("spin", classes.loaderIcon)}>
          <img src="/images/loader.svg" alt="Загрузка" />
        </div>
      </div>
    )
  }

}

const styles = theme => ({
  loaderOverlay: {
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    zIndex: 1020,
    background: "rgba(246,245,243,.9)"
  },
  loaderIcon: {
    position: "relative",
    width: 150,
    height: 150,
    top: "40%",
    margin: "auto"
  }
});


export default compose(
  connect(),
  withStyles(styles)
)(Loader);

