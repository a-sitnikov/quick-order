export const FB_CONNECT = 'FIREBASE_CONNECT';
export const ERROR = 'FIREBASE_CONNECT_ERROR';

export const defaultState = {
  dbtype: 'firebase',
  params: {},
  error: null
}

export const getSavedState = () => {
  const dbtype = localStorage.getItem('dbConfig/type');
  let params = {};
  if (dbtype === 'firebase') {
    params.apiKey = localStorage.getItem('firebase/apiKey')
    params.databaseURL = localStorage.getItem('firebase/databaseURL')
    params.isDemo = localStorage.getItem('firebase/isDemo');
  }

  return {
    ...defaultState,
    dbtype,
    params
  }

}

export default function reducer(state = defaultState, action) {

  switch (action.type) {
    case FB_CONNECT:
      return {
        dbtype: 'firebase',
        params: action.params,
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

export const fbConnect = (params) => ({
  type: FB_CONNECT,
  params
})

export const fbConnectError = (message) => ({
  type: ERROR,
  payload: message
})

export const fbDoConnect = (apiKey, databaseURL, isDemo) => async (dispatch, getState, getFirebase) => {

  localStorage.setItem('dbConfig/type', 'firebase');
  localStorage.setItem('firebase/apiKey', apiKey);
  localStorage.setItem('firebase/databaseURL', databaseURL);
  localStorage.setItem('firebase/isDemo', isDemo);

  dispatch(fbConnect({
    apiKey,
    databaseURL,
    isDemo
  }));

}
