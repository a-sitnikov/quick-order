import * as utils from '../../utils'

import itemsListReducer, { defaultState as listDefaultState } from './items_list'
import groupsReducer, { defaultState as groupsDefaultState } from './groups_list'

export const defaultState = {
  list: listDefaultState,
  groups: groupsDefaultState,
  isLoaded: false,
  isLoading: false
}

export const REQUEST = 'REQUEST_CATALOG';
export const RECIEVE = 'RECIEVE_CATALOG';

export const recieveReducer = (state, items, groups) => {

  if (state.order)
    items.sort(utils.funcOrderBy(state.order))

  groups.sort(utils.funcOrderBy([{ field: "descr", direction: "asc" }]));

  return {
    ...state,
    list: {
      ...state.list,
      items: items,
      filteredItems: null,
    },
    groups: {
      ...state.groups,
      items: groups,
      filteredItems: null,
      selected: [],
    },
    isLoaded: true,
    isLoading: false
  };
}

export default function reducer(state = defaultState, action) {
  switch (action.type) {

    case REQUEST:
      return {
        ...state,
        isLoading: true
      }
    case RECIEVE:
      return recieveReducer(state, action.items, action.groups, action.prices)

    default:
      return {
        ...state,
        list: itemsListReducer(state.list, action),
        groups: groupsReducer(state.groups, action)
      };
  }
}

export const requestCatalogAction = () => ({
  type: REQUEST
})

export const recieveCatalogAction = (items, groups, prices) => ({
  type: RECIEVE,
  items,
  groups,
  prices
})

export const fetchCatalog = () => async (dispatch, getState, db) => {

  const { catalog } = getState();
  if (catalog.isLoaded || catalog.isLoading)
    return;

  dispatch(requestCatalogAction());

  try {

    let { items, groups } = await db.local.getCatalog();
    if (items.length === 0 || groups.length === 0) {

      let { items: _items, groups: _groups, prices } = await db.remote.getCatalog('price1');

      items = Object.keys(_items).map(key => {
        return {
          'guid': key,
          ..._items[key],
          price: prices[key]
        }
      })

      groups = utils.objectToArray(_groups);
      await db.local.saveCatalog(items, groups);
    }

    dispatch(recieveCatalogAction(items, groups));

  } catch (error) {
    console.error(error.message);
  }
}

export const fetchCatalogRemote = () => async (dispatch, getState, db) => {

  const { catalog } = getState();
  if (catalog.isLoaded || catalog.isLoading)
    return;

  dispatch(requestCatalogAction());

  try {

    let { items: _items, groups: _groups, prices } = await db.remote.getCatalog('price1');

    const items = Object.keys(_items).map(key => {
      return {
        'guid': key,
        ..._items[key],
        price: prices[key]
      }
    })

    const groups = utils.objectToArray(_groups);
    await db.local.saveCatalog(items, groups);

    dispatch(recieveCatalogAction(items, groups));

  } catch (error) {
    console.error(error.message);
  }
}