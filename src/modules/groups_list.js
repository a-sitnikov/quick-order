import * as utils from '../utils'

export const defaultState = {
  searchText: '',
  selected: [],
  items: [],
  filteredItems: null
}

export const RECIEVE = 'RECIEVE_GROUPS';
export const SELECT = 'SELECT_GROUP';
export const DESELECT = 'DESELECT_GROUP';
export const CLEAR_SELECTION = 'CLEAR_GROUPS_SELECTION';
export const SEARCH_TEXT = 'SEARCH_TEXT';

const getFiltererItems = (items, selected, searchText) => {
  return items.filter(val => {
    let isSelected = !selected.find(selectedVal => val.guid === selectedVal.guid);
    let isSearched = true;
    if (searchText) {
      let reg = new RegExp(searchText, 'i');
      isSearched = reg.test(val.descr);
    }  
    return isSelected & isSearched;
  });

}

export const recieveReducer = (state, itemsObject) => {
  return {
    ...state,
    items: utils.objectToArray(itemsObject)
  };
}

export const selectReducer = (state, guid) => {
  let selected = state.selected.slice();
  let item = state.items.find(val => val.guid === guid);
  selected.push(item);
  return {
    ...state,
    selected,
    filteredItems: getFiltererItems(state.items, selected, state.searchText)
  }
}

export const deselectReducer = (state, guid) => {
  let selected = state.selected.filter(val => val.guid !== guid);
  return {
    ...state,
    selected,
    filteredItems: getFiltererItems(state.items, selected, state.searchText)
  }
}

export const clearSelectionReducer = state => {
  return {
    ...state,
    searchText: '',
    selected: [],
    filteredItems: null
  }
}

export const searchTextReducer = (state, text) => {
  return {
    ...state,
    searchText: text,
    filteredItems: getFiltererItems(state.items, state.selected, text)
  }
}

export default function reducer(state = defaultState, action) {

  switch (action.type) {
    case RECIEVE:
      return recieveReducer(state, action.payload);

    case SELECT:
      return selectReducer(state, action.payload);

    case DESELECT:
      return deselectReducer(state, action.payload);

    case CLEAR_SELECTION:
      return clearSelectionReducer(state);

    case SEARCH_TEXT:
      return searchTextReducer(state, action.payload);

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

export const setSearchText = (text) => ({
  type: SEARCH_TEXT,
  payload: text
})


export const fetchGroups = () => async (dispatch, getState, getFirebase) => {

  const firebase = getFirebase();
  const ref = firebase.database().ref('groups');
  const response = await utils.getFirebaseData(ref);

  dispatch(recieveGroups(response));
}