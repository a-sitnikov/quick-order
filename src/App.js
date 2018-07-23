import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import Header from './components/header'
import Container from './components/container'

class App extends Component {
  render() {
    return (
      <div id="app">
        <Header />
        <Container/>
      </div>  
    );
  }
}

export default App;
