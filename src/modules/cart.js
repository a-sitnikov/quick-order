export const CHANGE_QTY = 'CHANGE_QTY';

export const defaultState = {
  count: 0,
  sum: 0,
  itemsByKey: {},
  items: [],
  order: []
}

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

export default function reducer(state = defaultState, action) {

  switch (action.type) {
    case CHANGE_QTY:
      return changeQtyReducer(state, action.guid, action.qty, action.price)
    default:
      return state;
  }

}

export const changeQty = (guid, qty, price) => ({
  type: CHANGE_QTY,
  guid,
  qty,
  price
})