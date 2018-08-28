import React, { Component } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { Redirect, withRouter } from 'react-router-dom'

import { reduxForm, Field } from 'redux-form'
import { Paper, Button, withStyles, Typography } from '@material-ui/core';

import CustomTextField from '../components/common/custom_textfield'
import { doLogin } from '../modules/login'

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  panel: {
    padding: "1.25rem",
    width: "350px",
    margin: "auto",
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -75%)"
  },
  buttonBar: {
    marginTop: theme.spacing.unit,
  },
  error: {
    margin: theme.spacing.unit,
    color: "red"
  }  
});

class Login extends Component {

  render() {

    const { classes, handleSubmit, errorText, uid, location } = this.props;

    if (uid) {
      const { from } = location.state || { from: { pathname: "/" } };
      if (from.pathname === 'login' || from.pathname === 'fbconfig')
        return <Redirect to='/' />
      else  
        return <Redirect to={from} />
    }  

    return (
      <form onSubmit={handleSubmit}>
        <Paper className={classes.panel} elevation={10}>
          <Typography>QUICK ORDER</Typography>
          <Field
            name="email"
            component={CustomTextField}
            label="Email"
            fullWidth
          />
          <Field
            name="password"
            component={CustomTextField}
            label="Пароль"
            type="password"
            fullWidth
          />
          {errorText && <div className={classes.error}>{errorText}</div>}
          <div className={classes.buttonBar}>
            <Button
              color="primary"
              type="submit"
              variant="outlined"
            >
              Войти
            </Button>
          </div>
        </Paper>
      </form>
    )
  }

}

const onSubmit = (values, dispatch, props) => {
  dispatch(doLogin(values))
}

const mapStateToProps = (state) => {

  const { fbConfig: { isDemo }, login: { errorText, uid } } = state;
  return {
    uid,
    errorText,
    initialValues: {
      email: isDemo ? "alfa1@alfa.com" : "",
      password: isDemo ? "123456" : ""
    }
  }
}

export default compose(
  connect(mapStateToProps),
  withRouter,
  reduxForm({ 
    form: 'LOGIN_FORM',
    onSubmit
  }),
  withStyles(styles)
)(Login)
