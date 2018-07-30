import React, { Component } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'

import { reduxForm, Field } from 'redux-form'
import { Paper, Button, withStyles, Typography } from '@material-ui/core';

import CustomTextField from '../components/common/custom_textfield'
import { doLogin, checkLogin } from '../modules/login'

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
  }
});

class Login extends Component {

  componentDidMount() {
    this.props.dispatch(checkLogin());
  }

  render() {

    const { classes, handleSubmit, error } = this.props;
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
          {error && <div>{error}</div>}
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
  dispatch(doLogin(values));
}

const mapStateToProps = (state) => {

  const { 
    error 
  } = state.login;

  return {
    error 
  }
}

export default compose(
  reduxForm({ 
    form: 'LOGIN_FORM',
    onSubmit
  }),
  withStyles(styles),
  connect(mapStateToProps)
)(Login)
