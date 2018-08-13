export const defaultState = {
  text: ''
}

export const SEARCH_TEXT = 'SEARCH_TEXT_ITEMS';
export const CLEAR_SEARCH_TEXT = 'CLEAR_SEARCH_TEXT_ITEMS';

export default function reducer(state = defaultState, action) {

  switch (action.type) {
    case SEARCH_TEXT:
      return {
        text: action.payload
      };
    case CLEAR_SEARCH_TEXT:
      return {
        text: ''
      };
    default:
      return state;
  }
}

export const searchTextItemsList = (text) => ({
  type: SEARCH_TEXT,
  payload: text
})

export const clearSearchTextItemsList = () => ({
  type: CLEAR_SEARCH_TEXT
})

