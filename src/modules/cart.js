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

export const changeQtyReducer = (state, item, qty, deleteOnNull) => {

  let itemsByKey = Object.assign(state.itemsByKey);

  if (qty === 0) {
    if (deleteOnNull) 
      delete itemsByKey[item.guid];
    else {
      itemsByKey[item.guid].qty = 0;
      itemsByKey[item.guid].sum = 0;
    }  
  } else {  
    let cartItem = itemsByKey[item.guid] || {};
    cartItem.item = item;
    cartItem.qty = qty;
    cartItem.sum = Math.round(100 * qty * item.price) / 100;
    itemsByKey[item.guid] = cartItem;
  }

  const count = Object.keys(itemsByKey).filter(key => itemsByKey[key].qty !== 0).length;
  const sum = Object.keys(itemsByKey).reduce((acc, key) => acc + itemsByKey[key].sum, 0);
  let items = [];
  Object.keys(itemsByKey).forEach(key => items.push(itemsByKey[key]));

  return {
    ...state,
    itemsByKey,
    items,
    count,
    sum
  }

}

export const changeQty = (item, qty, deleteOnNull = true) => ({
  type: CHANGE_QTY,
  item,
  qty,
  deleteOnNull
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
      return changeQtyReducer(state, action.item, action.qty)
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
