import React, { Component } from 'react';
import { compose } from 'redux'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { reduxForm, Field } from 'redux-form'

import { Button, withStyles, Typography } from '@material-ui/core';

class ServerConfig extends Component {
  render() {
    return (
      <div>
        Данный вариант пока не поддерживается
      </div>  
    )
  }
}

const onSubmit = (values, dispatch) => {
  //dispatch(serverDoConnect(values));
}

const styles = theme => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    margin: '15px'
  },
  buttonBar: {
    marginTop: theme.spacing.unit
  }
})

export default compose(
  reduxForm({
    form: 'SERVERCONFIG_FORM',
    onSubmit
  }),
  withStyles(styles),
  withRouter,
  connect(state => ({ error: state.dbConfig.error }))
)(ServerConfig);