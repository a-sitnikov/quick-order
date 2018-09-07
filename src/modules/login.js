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

export const doLogout = () => async (dispatch, getState, getRemoteDB) => {

  const state = getState();
  const dbtype = state.dbConfig.dbtype;
  if (dbtype === 'firebase') {
    const firebase = getRemoteDB();
    await firebase.auth().signOut();
    dispatch(logoutComplete());
  }

}

export const doLogin = ({ email, password }) => async (dispatch, getState, getRemoteDB) => {

  const state = getState();
  const dbtype = state.dbConfig.dbtype;
  if (dbtype === 'firebase') {

    const firebase = getRemoteDB();
    await initializeFirebase(firebase, state.dbConfig.params)

    try {

      let credential = await doLoginFirebase(firebase, email, password)
      dispatch(loginComplete(email, credential.user.uid));

    } catch (error) {
      dispatch(loginError(error.message));
    }

  } else if (dbtype === 'server') {

  }

}

const initializeFirebase = async (firebase, params) => {
  if (firebase.apps.length === 0)
    await firebase.initializeApp(params);  
}

export const doLoginFirebase = async (firebase, email, password) => {

  await firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);
  return await firebase.auth().signInWithEmailAndPassword(email, password);

}