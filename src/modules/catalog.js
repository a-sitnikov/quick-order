import * as utils from '../utils'

export const defaultState = {
  list: {
    items: [],
    filteredItems: null,
    order: [],
  },
  groups: {
    items: [],
    selected: [],
    filteredItems: null,
    searchText: ''
  },
  isLoaded: false,
  isLoading: false
}

export const REQUEST = 'REQUEST_CATALOG';
export const RECIEVE = 'RECIEVE_CATALOG';
export const SORT_ITEMS = 'SORT_ITEMS';

const sortItemsReducer = (state, order) => {
  return {
    ...state,
    order,
    items: utils.sortAndCopyArray(state.items, order)
  }
}

export const recieveReducer = (state, items, groups, prices) => {

  const itemsArray = Object.keys(items).map(key => {
    return {
      'guid': key,
      ...items[key],
      price: prices[key]
    }
  })

  if (state.order)
    itemsArray.sort(utils.funcOrderBy(state.order))

  const groupsArray = utils.objectToArray(groups);
  groupsArray.sort(utils.funcOrderBy([{field: "descr", direction: "asc"}]));

  return {
    ...state,
    list: {
      ...state.list,
      items: itemsArray,
      filteredItems: null,
    },
    groups: {
      ...state.groups,
      items: groupsArray,
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

    case SORT_ITEMS:
      return sortItemsReducer(state, action.order);
    default:
      return state;
  }
}

export const requestCatalog = () => ({
  type: REQUEST
})

export const recieveCatalog = (items, groups, prices) => ({
  type: RECIEVE,
  items,
  groups,
  prices
})

export const sortItems = (order) => ({
  type: SORT_ITEMS,
  order
})

export const addSortItems = (field) => (dispatch, getState, remoteDB) => {
  const { catalog } = getState();
  const order = utils.addSort(catalog.order, field);
  dispatch(sortItems(order));
}

export const setSortItems = (field) => (dispatch, getState, remoteDB) => {
  const { catalog } = getState();
  const order = utils.setSort(catalog.order, field);
  dispatch(sortItems(order));
}


export const fetchCatalog = () => async (dispatch, getState, remoteDB) => {

  const { catalog } = getState();
  if (catalog.isLoaded || catalog.isLoading)
    return;

  dispatch(requestCatalog());

  const { items, groups, prices } = await remoteDB.getCatalog('price1');

  dispatch(recieveCatalog(items, groups, prices));

}