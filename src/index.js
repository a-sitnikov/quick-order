import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux'
import { BrowserRouter, HashRouter } from 'react-router-dom'
import { MuiThemeProvider } from '@material-ui/core'

import { store } from './store'

import App from './App'
import compactTheme from './compact_theme'
import './index.css';

const Root = ({ store }) => (
  <MuiThemeProvider theme={compactTheme}>
    <Provider store={store}>
      <BrowserRouter>
        <HashRouter>
          <App />
        </HashRouter>
      </BrowserRouter>
    </Provider>
  </MuiThemeProvider>
)

ReactDOM.render(<Root store={store} />,
  document.getElementById('root'));

registerServiceWorker();

