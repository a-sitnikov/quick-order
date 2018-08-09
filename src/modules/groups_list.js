import * as utils from '../utils'

export const defaultState = {
  selected: [],
  items: []
}

export const RECIEVE = 'RECIEVE_GROUPS';
export const SELECT  = 'SELECT_GROUP'; 
export const DESELECT = 'DESELECT_GROUP'; 
export const CLEAR_SELECTION  = 'CLEAR_GROUPS_SELECTION'; 

export default function reducer(state = defaultState, action){

  switch (action.type) {
    case RECIEVE:

      return {
        ...state,
        items: utils.objectToArray(action.payload)
      };
    case SELECT:
      let selected = state.selected.slice();
      let item = state.items.find(val => val.guid === action.payload);
      selected.push({guid: action.payload, ...item});
      return {
        ...state,
        selected
      }  
      case CLEAR_SELECTION: {
        return {
        ...state,
        selected: []
        }
      }  
    default:
      return state;
  }

}

export const recieveGroups = (response) => ({
  type: RECIEVE,
  payload: response    
})

export const selectGroup = (guid) => ({
  type: SELECT,
  payload: guid    
})

export const deselectGroup = (guid) => ({
  type: DESELECT,
  payload: guid    
})

export const clearGroupsSelection = () => ({
  type: CLEAR_SELECTION
})

export const fetchGroups = () => async (dispatch, getState, getFirebase) => {
  
  const firebase = getFirebase();    
  const ref = firebase.database().ref('groups');
  const response = await utils.getFirebaseData(ref);

  dispatch(recieveGroups(response));
}