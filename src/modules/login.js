export const LOGIN = 'LOGIN_COMPLETE';
export const LOGOUT = 'LOGOUT_COMPLETE';
export const ERROR = 'LOGIN_ERROR';

export const defaultState = {
  uid: null,
  error: null
}

export default function reducer(state = defaultState, action) {

  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        uid: action.uid,
        email: action.email,
        error: null
      }
    case LOGOUT:
      return defaultState;

    case ERROR:
      return {
        ...state,
        error: action.payload
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

export const doLogout = () => async (dispatch, getState, getFirebase) => {
  const firebase = getFirebase();
  await firebase.auth().signOut();
  dispatch(logoutComplete());

}

export const doLogin = ({ email, password }) => async (dispatch, getState, getFirebase) => {

  const firebase = getFirebase();

  try {

    await firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);
    const credential = await firebase.auth().signInWithEmailAndPassword(email, password);

    dispatch(loginComplete(email, credential.user.uid));

  } catch (error) {
    dispatch(loginError(error.message));
  }
}

export const checkLogin = () => async (dispatch, getState, getFirebase) => {

  const firebase = getFirebase();
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      dispatch(loginComplete(user.email, user.uid));
    }  
  })

}