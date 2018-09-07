import { combineReducers } from 'redux'
import { reducer as form  } from 'redux-form';

import list from './items_list'
import searchItems from './search_items'
import groups from './groups_list'
import cart from './cart'
import login from './login'
import dbConfig from './dbconfig'

const rootReducer = combineReducers({
  list,
  searchItems,
  groups,
  cart,
  login,
  form,
  dbConfig
});

export default rootReducer;