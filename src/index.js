import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux'
import { BrowserRouter, HashRouter, Switch, Route } from 'react-router-dom'

import { store } from './store'

import './index.css';

import NavBar from './components/navbar';
import Catalog from './components/catalog';
import Cart from './components/cart';

const Root = ({ store }) => (
  <Provider store={store}>
    <BrowserRouter>
      <div className="container">
        <NavBar />
        <Switch>
          <Route exact path='/' component={Catalog} />
          <Route path='/cart' component={Cart} />
        </Switch>
      </div>
    </BrowserRouter>
  </Provider>
)

ReactDOM.render(<Root store={store} />,
  document.getElementById('root'));

registerServiceWorker();

