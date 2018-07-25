import * as utils from '../utils'

export const defaultState = {
  currentPage: 0,
  rowsPerPage: 25,
  orderBy: 'descr',
  orderDirection: 'asc',
  rowCount: 100,
  items: []
}

export const RECIEVE = 'RECIEVE_ITEMS';
export const SORT = 'SORT_ITEMS';

export default function reducer(state = defaultState, action){

  switch (action.type) {
    case RECIEVE:

      return {
        ...state,
        items: utils.objectToArray(action.payload)
      };
    case SORT:

      return {
        ...state,
        items: utils.sortArray(state.items, action.orderBy, action.order)
      };
    default:
      return state;
  }

}

export const recieveItems = (response) => ({
  type: RECIEVE,
  payload: response
})

export const sortItemsList = (orderBy, order) => ({
  type: SORT,
  orderBy,
  order
})

export const fetchItems = () => async (dispatch, getState, getFirebase) => {

  const firebase = getFirebase();
  const ref = firebase.database().ref('items');
  const response = await utils.getFirebaseData(ref);

  dispatch(recieveItems(response));
}