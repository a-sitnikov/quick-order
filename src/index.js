import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core'

import { store } from './store'

import App from './App'
import './index.css';

const compactTheme = createMuiTheme({
  overrides: {
    MuiTableRow: {
      root: {
        height: 36,
        '&$selected': {
          backgroundColor: "#f3ef97"          
        }
      },
      head: {
        height: 36,
        fontWeight: "bold",
        backgroundColor: "#e0e0e0"
      },
    },
    MuiAppBar: {
      root: {
        flexDirection: "row"
      }
    }
  }
});


const Root = ({ store }) => (
  <MuiThemeProvider theme={compactTheme}>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </MuiThemeProvider>
)

ReactDOM.render(<Root store={store} />,
  document.getElementById('root'));

registerServiceWorker();

