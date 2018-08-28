import React, { Component } from 'react';
import { compose } from 'redux'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import { Button, withStyles, Typography } from '@material-ui/core';
import { reduxForm, Field } from 'redux-form'
import CustomTextField from './components/common/custom_textfield'

import { fbDoConnect } from './modules/fbconfig'

class FirebaseConfig extends Component {

  connectToDemo = () => {
    const { dispatch } = this.props;
    dispatch(fbDoConnect({
      apiKey: 'AIzaSyCEtQzT05g5wz-gftuna8GSzXuLxkMI7f4',
      databaseURL: 'https://quick-order-e285f.firebaseio.com',
      isDemo: true
    }));
    this.props.history.push('/');
  }

  render() {

    const { classes, handleSubmit, error } = this.props;

    return (
      <form className={classes.container} onSubmit={handleSubmit}>
        <div>
          <Typography>
            Введите <b>apiKey</b> и  <b>databaseURL</b> своего приложения firebase и нажмите на кнопку Подключиться
          </Typography>
        </div>

        <Field
          name="apiKey"
          component={CustomTextField}
          label="apiKey"
          fullWidth
        />
        <Field
          name="databaseURL"
          component={CustomTextField}
          label="databaseURL"
          fullWidth
        />

        <div className={classes.buttonBar}>
          <Button
            variant="raised"
            type="submit"
          >
            Подключиться
          </Button>
        </div>
        {error && <div>{error}</div>}
        <p style={{ marginTop: '50px' }}>Где найти <b>apiKey</b> и <b>databaseURL</b> своего приложения?</p>
        <div style={{ marginTop: '30px' }}>
          <img alt='Поясняющая картинка' src='https://firebasestorage.googleapis.com/v0/b/quick-order-de84c.appspot.com/o/settings-fb.png?alt=media&token=858e1c69-97e7-4241-88a4-8b8e6422c1b1' />
        </div>
        <div className={classes.buttonBar}>
          <Button
            variant="raised"
            onClick={this.connectToDemo}
          >
            Подключиться к демо
        </Button>
        </div>

      </form>
    );
  }
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

const onSubmit = (values, dispatch) => {
  dispatch(fbDoConnect(values));
}

export default compose(
  reduxForm({
    form: 'FBCONFIG_FORM',
    onSubmit
  }),
  withStyles(styles),
  withRouter,
  connect(state => ({error: state.fbConfig.error}))
)(FirebaseConfig);