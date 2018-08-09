import * as utils from '../utils'

export const defaultState = {
  order: [],
  items: [],
  filteredItems: null
}

export const RECIEVE  = 'RECIEVE_ITEMS';
export const SET_SORT = 'SORT_ITEMS';
export const ADD_SORT = 'ADD_SORT_ITEMS';
export const SEARCH   = 'SEARCH_ITEMS';
export const CLEAR_SEARCH = 'CLEAR_SEARCH_ITEMS';

export const setSort = (state, field) => {

  const orderBy = state.order.find(val => val.field === field);
  let order = [];        
  if (orderBy === undefined) {
    order.push({
      field, 
      direction: "asc"
    })
  } else {
    order = [{
      field: orderBy.field, 
      direction: changeDirection(orderBy.direction)
    }];
  }
  
  return {
    ...state,
    order,
    items: utils.sortArray(state.items, order)
  };

}

export const addSort = (state, field) => {
  const index = state.order.findIndex(val => val.field === field);
  let order = state.order.slice();        
  if (index === -1) {
    order.push({field, direction: "asc"});
  } else {
    order[index].direction = changeDirection(order[index].direction);
  }
  return {
    ...state,
    order,
    items: utils.sortArray(state.items, order)
  }
}

export const recieve = (state, items, prices) => {

  let array = [];
  for (let key of Object.keys(items)) {
    array.push({'guid': key, ...items[key], price: prices[key]})
  }
  return {
    ...state,
    items: array
  };
}

export const search = (state, text) => {
  let reg = new RegExp(text, 'i');
  return {
    ...state,
    filteredItems: state.items.filter(val => reg.test(val.descr))
  }
}

export const clearSearch = state => {
  return {
    ...state,
    filteredItems: null
  }
}

export default function reducer(state = defaultState, action){

  switch (action.type) {
    case RECIEVE: 
      return recieve(state, action.items, action.prices);
    case ADD_SORT: 
      return addSort(state, action.payload);
    case SET_SORT: 
      return setSort(state, action.payload);
    case SEARCH:
      return search(state, action.payload);
    case CLEAR_SEARCH:
      return clearSearch(state);
    default:
      return state;
  }

}

const changeDirection = orderDirection => orderDirection === "asc" ? "desc" : "asc";

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

export const searchItemsList = (text) => ({
  type: SEARCH,
  payload: text
})

export const clearSearchItemsList = () => ({
  type: CLEAR_SEARCH
})


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