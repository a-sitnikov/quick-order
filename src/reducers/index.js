import { combineReducers } from 'redux'

import catalog from './catalog'
import cart from './cart'

const rootReducer = combineReducers({
    catalog,
    cart
});

export default rootReducer;