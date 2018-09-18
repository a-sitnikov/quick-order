import * as utils from '../../utils'

export const SORT = 'SORT_ITEMS';
export const SEARCH_TEXT = 'SEARCH_TEXT_ITEMS';
export const FILTER = 'FILTER_ITEMS';

export const defaultState = {
  items: [],
  filteredItems: null,
  order: [],
  searchText: ''
}

export const sortItemsReducer = (state, order) => {
  return {
    ...state,
    order,
    items: utils.sortAndCopyArray(state.items, order)
  }
}

export const filterItemsReducer = (state, filteredItems) => {
  return {
    ...state,
    filteredItems
  }
}

export const searchTextReducer = (state, searchText) => {
  return {
    ...state,
    searchText
  }
}

export default function reducer(state = defaultState, action) {

  switch (action.type) {
    case SORT:
      return sortItemsReducer(state, action.payload);

    case FILTER:
      return filterItemsReducer(state, action.payload);

    case SEARCH_TEXT:
      return searchTextReducer(state, action.text);

    default:
      return state;
  }

}

export const sortItems = (order) => ({
  type: SORT,
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

export const filterItems = () => (dispatch, getState, remoteDB) => {
  const { catalog } = getState();
  dispatch({
    type: FILTER,
    payload: getFilteredItems(catalog.list.items, catalog.groups.selected, catalog.list.searchText)
  });
}

export const searchTextItems = (text) => (dispatch, getState, remoteDB) => {
  dispatch({
    type: SEARCH_TEXT,
    text
  });
}