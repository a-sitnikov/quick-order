import * as utils from '../utils'

export const defaultState = {
  currentPage: 0,
  rowsPerPage: 25,
  order: [
    { field: "descr", direction: "asc" }
  ],
  rowCount: 100,
  items: []
}

export const RECIEVE  = 'RECIEVE_ITEMS';
export const SORT     = 'SORT_ITEMS';
export const ADD_SORT = 'ADD_SORT_ITEMS';

export default function reducer(state = defaultState, action){

  switch (action.type) {
    case RECIEVE:

      return {
        ...state,
        items: utils.objectToArray(action.payload)
      };
    case ADD_SORT: {
      const index = state.order.findIndex(val => val.field === action.payload);
      let order = state.order.slice();        
      if (index === -1) {
        order.push({field: action.payload, direction: "asc"})
      } else {
        order[index].direction = changeDirection(order[index].direction);
      }
      return {
        ...state,
        order,
        items: utils.sortArray(state.items, order)
      }
    }
    case SORT: {

      const orderBy = state.order.find(val => val.field === action.payload);
      let order = [];        
      if (orderBy === undefined) {
        order.push({
          field: action.payload, 
          direction: "asc"
        })
      } else {
        order = [{
          field: orderBy.field, 
          direction: changeDirection(orderBy.direction)
        }];
      }
      return {
        ...state,
        order,
        items: utils.sortArray(state.items, order)
      };
    }  
    default:
      return state;
  }

}

const changeDirection = orderDirection => orderDirection === "asc" ? "desc" : "asc";

export const recieveItems = (response) => ({
  type: RECIEVE,
  payload: response
})

export const sortItemsList = (orderBy) => ({
  type: SORT,
  payload: orderBy
})

export const addSortItemsList = (orderBy) => ({
  type: ADD_SORT,
  payload: orderBy
})

export const fetchItems = () => async (dispatch, getState, getFirebase) => {

  const firebase = getFirebase();
  const ref = firebase.database().ref('items');
  const response = await utils.getFirebaseData(ref);

  dispatch(recieveItems(response));
}