export const LOGIN = 'LOGIN_COMPLETE';
export const LOGOUT = 'LOGOUT_COMPLETE';
export const ERROR = 'LOGIN_ERROR';

export const defaultState = {
  uid: null,
  errorText: null
}

export default function reducer(state = defaultState, action) {

  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        uid: action.uid,
        email: action.email,
        errorText: null
      }
    case LOGOUT:
      return defaultState;

    case ERROR:
      return {
        ...state,
        errorText: action.payload
      }
    default:
      return state;
  }

}

export const loginComplete = (email, uid) => ({
  type: LOGIN,
  email,
  uid
})

export const logoutComplete = () => ({
  type: LOGOUT,
})

export const loginError = (message) => ({
  type: ERROR,
  payload: message
})

export const doLogout = () => async (dispatch, getState, remoteDB) => {

  remoteDB.logout();
  dispatch(logoutComplete());

}

export const doLogin = ({ email, password }) => async (dispatch, getState, remoteDB) => {

  try {

    const credential = await remoteDB.login(email, password);
    dispatch(loginComplete(email, credential.user.uid));

  } catch (error) {
    dispatch(loginError(error.message));
  }

}
