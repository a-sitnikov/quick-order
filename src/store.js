import { createStore, compose, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import firebase from 'firebase/app';
import 'firebase/database'
import 'firebase/auth'

// eslint-disable-next-line 
import { createLogger } from 'redux-logger'

import rootReducer from './modules'

// Firebase config
/*
const firebaseConfig = {
  apiKey: "AIzaSyCEtQzT05g5wz-gftuna8GSzXuLxkMI7f4",
  databaseURL: "https://quick-order-e285f.firebaseio.com",
}
firebase.initializeApp(firebaseConfig);
*/

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
export const store = createStoreWithFirebase(rootReducer)