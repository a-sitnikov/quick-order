import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import { getRemoteDB, getLocalDB } from './api'

import { getSavedState as dbConfig_getSavedState } from './modules/dbconfig'
//import { getSavedState as list_getSavedState } from './modules/items_list'

// eslint-disable-next-line 
import { createLogger } from 'redux-logger'

import rootReducer from './modules'

// Create store with reducers and initial state
const dbConfig = dbConfig_getSavedState();
let initialState = {
  dbConfig,
};

const middleware = [thunk.withExtraArgument({
  remote: getRemoteDB(dbConfig.dbtype, dbConfig.params),
  local: getLocalDB()
})];

if (process.env.NODE_ENV !== 'production') {
    //middleware.push(createLogger())
}

export const store = createStore(rootReducer, initialState, applyMiddleware(...middleware));