import React, { Component } from 'react'
import { Tabs, Tab } from '@material-ui/core';

import FirebaseConfig from './firebase'
import ServerConfig from './server'

class DbConfig extends Component {

  constructor() {
    super();
    this.state = {
      tab: 'firebase'
    }
  }

  handleChange = (event, value) => {
    this.setState({
      tab: value
    })
  }

  render() {

    return (
      <div>
        <Tabs 
          value={this.state.tab} 
          onChange={this.handleChange} 
          centered
        >
          <Tab value='firebase' label='Firebase'/>
          <Tab value='server' label='Свой сервер'/>
        </Tabs>
        {this.state.tab === 'firebase' && <FirebaseConfig/>}
        {this.state.tab === 'server' && <ServerConfig />}
      </div>
    )
  }

}

export default DbConfig