import { createStore, compose, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import firebase from 'firebase/app';
import 'firebase/database'
import 'firebase/auth'

import { getSavedState as fbConfig_getSavedState } from './modules/fbconfig'
import { getSavedState as list_getSavedState } from './modules/items_list'

// eslint-disable-next-line 
import { createLogger } from 'redux-logger'

import rootReducer from './modules'

const getFirebase = () => firebase;
const middleware = [thunk.withExtraArgument(getFirebase)];

if (process.env.NODE_ENV !== 'production') {
    //middleware.push(createLogger())
}

// Add redux Firebase to compose
const createStoreWithFirebase = compose(
  applyMiddleware(...middleware)
)(createStore)

// Create store with reducers and initial state
let initialState = {
  fbConfig: fbConfig_getSavedState(),
  list: list_getSavedState()
};

export const store = createStoreWithFirebase(rootReducer, initialState)