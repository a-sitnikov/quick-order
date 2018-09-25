import * as utils from '../utils'

export const defaultState = {
  count: 0,
  sum: 0,
  itemsByKey: {},
  items: [],
  order: []
}

export const SORT = 'SORT_CART';
export const CHANGE_QTY = 'CHANGE_QTY';
export const RECIEVE = 'RECIEVE_CART';

export const changeQtyReducer = (state, cartItem, deleteOnNull) => {

  let itemsByKey = Object.assign({}, state.itemsByKey);

  if (cartItem.qty === 0) {
    if (deleteOnNull)
      delete itemsByKey[cartItem.guid];
    else {
      itemsByKey[cartItem.guid].qty = 0;
      itemsByKey[cartItem.guid].sum = 0;
    }
  } else {
    itemsByKey[cartItem.guid] = cartItem;
  }

  const items = Object.keys(itemsByKey).map(key => itemsByKey[key]);
  const count = items.filter(item => item.qty !== 0).length;
  const sum = items.reduce((acc, item) => acc + item.sum, 0);  
  
  return {
    ...state,
    items,
    itemsByKey,
    count, 
    sum
  }

}

export const sortReducer = (state, order) => {
  return {
    ...state,
    order,
    items: utils.sortAndCopyArray(state.items, order)
  }
}

export const recieveReducer = (state, items) => {

  let itemsByKey = {};
  items.forEach(item => itemsByKey[item.guid] = item);

  const count = items.filter(item => item.qty !== 0).length;
  const sum = items.reduce((acc, item) => acc + item.sum, 0);  

  return {
    ...state,
    items,
    itemsByKey,
    count,
    sum
  }
}

export default function reducer(state = defaultState, action) {

  switch (action.type) {
    case SORT:
      return sortReducer(state, action.order);
    case CHANGE_QTY:
      return changeQtyReducer(state, action.cartItem)
    case RECIEVE:
      return recieveReducer(state, action.items);  
    default:
      return state;
  }

}

export const sortItems = (order) => ({
  type: SORT,
  order
})

export const addSortCart = (field) => (dispatch, getState, db) => {
  const { cart } = getState();
  const order = utils.addSort(cart.order, field);
  dispatch(sortItems(order));
}

export const setSortCart = (field) => (dispatch, getState, db) => {
  const { cart } = getState();
  const order = utils.setSort(cart.order, field);
  dispatch(sortItems(order));
}

export const changeQty = (item, qty, deleteOnNull = true) => async (dispatch, getState, db) => {

  const cartItem = {
    ...item,
    qty,
    sum: Math.round(100 * qty * item.price) / 100
  }  
  
  if (qty === 0 && deleteOnNull)
    await db.local.deleteFromCart(cartItem);
  else
    await db.local.addToCart(cartItem);

  dispatch({
    type: CHANGE_QTY,
    cartItem,
    deleteOnNull
  })
}

export const fetchCart = () => async (dispatch, getState, db) => {
  const items = await db.local.getCart(); 
  dispatch({
    type: RECIEVE,
    items
  })
}