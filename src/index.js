import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import { BrowserRouter, HashRouter, Switch, Route } from 'react-router-dom'

import thunk from 'redux-thunk'

// eslint-disable-next-line 
import { createLogger } from 'redux-logger'

import reducer from './reducers'
import './index.css';

import Header from './components/header';
import Catalog from './components/catalog';

const middleware = [thunk];

if (process.env.NODE_ENV !== 'production') {
    //middleware.push(createLogger())
}

const store = createStore(
    reducer,
    applyMiddleware(...middleware)
)

const Root = ({ store }) => (
    <Provider store={store}>
        <BrowserRouter>
            <div className="container">
                <Header />
                <Switch>
                    <Route exact path='/' component={Catalog} />
                </Switch>
            </div>
        </BrowserRouter>
    </Provider>
)

ReactDOM.render(<Root store={store} />,
    document.getElementById('root'));

registerServiceWorker();

