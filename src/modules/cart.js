export const CHANGE_QTY = 'CHANGE_QTY';

export const defaultState = {
  count: 0,
  sum: 0,
  items: {}
}

export const changeQtyReducer = (state, guid, qty, price) => {

  let items = Object.assign(state.items);

  if (qty === 0)
    delete items[guid];
  else {  
    let item = items[guid] || {};
    item.qty = qty;
    item.price = price;
    item.sum = Math.round(100 * qty * item.price) / 100;
    items[guid] = item;
  }

  const count = Object.keys(items).length;
  const sum = Object.keys(items).reduce((acc, val) => acc + items[val].sum, 0);

  return {
    ...state,
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