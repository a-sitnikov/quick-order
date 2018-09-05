export const CONNECT = 'FIREBASE_CONNECT';
export const ERROR = 'FIREBASE_CONNECT_ERROR';

export const defaultState = {
  apiKey: null,
  databaseURL: null,
  isDemo: false,
  error: null
}

export const getSavedState = () => {
  const fbConfigText = localStorage.getItem('fbConfig');
  let fbconfig;
  try {
    fbconfig = JSON.parse(fbConfigText);
  } catch(e) {
  }    

  if (!fbconfig)
    fbconfig = {};

  return {
    ...defaultState,
    apiKey: fbconfig.apiKey,
    databaseURL: fbconfig.databaseURL,
    isDemo: fbconfig.isDemo
  }

}

export default function reducer(state = defaultState, action) {

  switch (action.type) {
    case CONNECT:
      return {
        ...state,
        ...action.payload,
        error: null
      }
    case ERROR:
      return {
        ...state,
        error: action.payload
      }
    default:
      return state;
  }

}

export const fbConnect = (fbConfig) => ({
  type: CONNECT,
  payload: fbConfig
})

export const fbConnectError = (message) => ({
  type: ERROR,
  payload: message
})

export const fbDoConnect = (fbConfig) => async (dispatch, getState, getFirebase) => {

  try {
    localStorage.setItem('fbConfig', JSON.stringify(fbConfig));
    dispatch(fbConnect(fbConfig));
  } catch (error) {
    console.error(error.message);
  }

}

export const fbCheckConnected = () => async (dispatch, getState, getFirebase) => {

  const fbConfigText = localStorage.getItem('fbConfig');
  if (fbConfigText) {
    try {

      const fbConfig = JSON.parse(fbConfigText)
      dispatch(fbConnect(fbConfig));

      //const firebase = getFirebase();
      //await firebase.initializeApp(fbConfig);

    } catch (error) {
      console.log(error.message);
      dispatch(fbConnectError(error.message));
    }
  }
}