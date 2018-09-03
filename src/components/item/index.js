import React, { Component } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'

import { withStyles } from '@material-ui/core'

class Item extends Component {

  render() {

    const { classes } = this.props;

    return (
      <div>
        Item
      </div>
    )
  }

}

const mapStateToProps = (state) => {
}

const styles = theme => ({

});


export default compose(
  connect(),
  withStyles(styles)
)(Item);

