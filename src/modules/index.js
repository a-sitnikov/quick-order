import { combineReducers } from 'redux'

import list from './items_list'
import groups from './groups_list'
import cart from './cart'

const rootReducer = combineReducers({
  list,
  groups,
  cart
});

export default rootReducer;