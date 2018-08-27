import * as utils from '../utils'

export const defaultState = {
  order: [],
  items: [],
  filteredItems: null
}

export const RECIEVE = 'RECIEVE_ITEMS';
export const SET_SORT = 'SORT_ITEMS';
export const ADD_SORT = 'ADD_SORT_ITEMS';
export const FILTER = 'FILTER_ITEMS';

export const getFilteredItems = (items, groups, searchText) => {
  if (groups.length === 0 && searchText === '')
    return null;

  let reg = new RegExp(searchText, 'i')  
  return items.filter(item => {

    if (searchText)
      if (!reg.test(item.descr))
        return false;

    if (groups.length > 0) {
      let inGroups = false;
      for (let group of groups) {
        if (item.groups.some(guid => guid === group.guid)) {
          inGroups = true;
          break;
        }  
      }
      return inGroups;
    }

    return true;
  });
}

export const setSortReducer = (state, field) => {

  const order = utils.setSort(state.order, field);

  return {
    ...state,
    order,
    items: utils.sortArray(state.items, order)
  };

}

export const addSortReducer = (state, field) => {

  const order = utils.addSort(state.order, field);

  return {
    ...state,
    order,
    items: utils.sortArray(state.items, order)
  };

}

export const recieveReducer = (state, items, prices) => {

  let array = [];
  for (let key of Object.keys(items)) {
    array.push({ 'guid': key, ...items[key], price: prices[key] })
  }
  return {
    ...state,
    items: array
  };
}

export const filterReducer = (state, filteredItems) => {
  return {
    ...state,
    filteredItems
  }
}

export default function reducer(state = defaultState, action) {

  switch (action.type) {
    case RECIEVE:
      return recieveReducer(state, action.items, action.prices);
    case ADD_SORT:
      return addSortReducer(state, action.payload);
    case SET_SORT:
      return setSortReducer(state, action.payload);
    case FILTER:
      return filterReducer(state, action.payload);
    default:
      return state;
  }

}

export const recieveItems = (items, prices) => ({
  type: RECIEVE,
  items,
  prices
})

export const setSortItemsList = (orderBy) => ({
  type: SET_SORT,
  payload: orderBy
})

export const addSortItemsList = (orderBy) => ({
  type: ADD_SORT,
  payload: orderBy
})

export const filterItemsList = () => (dispatch, getState, getFirebase) => {
  const state = getState();
  dispatch({
    type: FILTER,
    payload: getFilteredItems(state.list.items, state.groups.selected, state.searchItems.text)
  });
}

export const fetchItems = () => async (dispatch, getState, getFirebase) => {

  const firebase = getFirebase();
  const refItems = firebase.database().ref('items');
  const refPrices = firebase.database().ref('prices/price1');
  const [items, prices] = await Promise.all([
    utils.getFirebaseData(refItems),
    utils.getFirebaseData(refPrices)
  ]);

  dispatch(recieveItems(items, prices));
}