import * as utils from '../utils'

export const defaultState = {
  selected: [],
  items: []
}

export const RECIEVE = 'RECIEVE_GROUPS';

export default function reducer(state = defaultState, action){

  switch (action.type) {
    case RECIEVE:

      return {
        ...state,
        items: utils.objectToArray(action.payload)
      };

    default:
      return state;
  }

}

export const recieveGroups = (response) => ({
  type: RECIEVE,
  payload: response    
})

export const fetchGroups = () => async (dispatch, getState, getFirebase) => {
  
  const firebase = getFirebase();    
  const ref = firebase.database().ref('groups');
  const response = await utils.getFirebaseData(ref);

  dispatch(recieveGroups(response));
}