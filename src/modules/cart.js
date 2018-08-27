import * as utils from '../utils'

export const defaultState = {
  count: 0,
  sum: 0,
  itemsByKey: {},
  items: [],
  order: []
}

export const SET_SORT = 'SORT_CART';
export const ADD_SORT = 'ADD_SORT_CART';
export const CHANGE_QTY = 'CHANGE_QTY';

export const changeQtyReducer = (state, guid, qty, price) => {

  let itemsByKey = Object.assign(state.itemsByKey);

  if (qty === 0)
    delete itemsByKey[guid];
  else {  
    let item = itemsByKey[guid] || {};
    item.guid = guid;
    item.qty = qty;
    item.price = price;
    item.sum = Math.round(100 * qty * item.price) / 100;
    itemsByKey[guid] = item;
  }

  const count = Object.keys(itemsByKey).length;
  const sum = Object.keys(itemsByKey).reduce((acc, val) => acc + itemsByKey[val].sum, 0);
  let items = [];
  Object.keys(itemsByKey).forEach(val => items.push(itemsByKey[val]));

  return {
    ...state,
    itemsByKey,
    items,
    count,
    sum
  }

}

export const changeQty = (guid, qty, price) => ({
  type: CHANGE_QTY,
  guid,
  qty,
  price
})

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


export default function reducer(state = defaultState, action) {

  switch (action.type) {
    case SET_SORT:
      return setSortReducer(state, action.payload);
    case ADD_SORT:
      return addSortReducer(state, action.payload);
    case CHANGE_QTY:
      return changeQtyReducer(state, action.guid, action.qty, action.price)
    default:
      return state;
  }

}

export const setSortCart = (orderBy) => ({
  type: SET_SORT,
  payload: orderBy
})

export const addSortCart = (orderBy) => ({
  type: ADD_SORT,
  payload: orderBy
})
