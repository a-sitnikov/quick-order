import { combineReducers } from 'redux'
import { reducer as form  } from 'redux-form';

import catalog from './catalog'
import searchItems from './search_items'
import cart from './cart'
import login from './login'
import dbConfig from './dbconfig'

const rootReducer = combineReducers({
  catalog,
  searchItems,
  cart,
  login,
  form,
  dbConfig
});

export default rootReducer;