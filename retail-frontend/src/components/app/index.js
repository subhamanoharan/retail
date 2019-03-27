import React, { Component} from 'react';
import {hot} from "react-hot-loader";
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Toolbar from '@material-ui/core/Toolbar';
import { SnackbarProvider } from 'notistack';

import './app.css';
import Bill from '../bill';
import Admin from '../admin';
import itemsService from './../../services/itemsService';

class App extends Component{
  constructor(props){
    super(props);
    this.state = {value: 'Bill'};
    this.onTabSwitch = this.onTabSwitch.bind(this);
  }

  onTabSwitch(event, value) {
    this.setState({ value });
    event.preventDefault();
  }

  render(){
    const {value} = this.state;
    return(
      <SnackbarProvider maxSnack={3}>
        <div className="App">
          <AppBar position="static">
            <Toolbar>
              <Tabs value={value} onChange={this.onTabSwitch}>
                { <Tab value="Bill" label="Bill" />}
                { <Tab value="Admin" label="Admin" />}
              </Tabs>
            </Toolbar>
          </AppBar>
          {value === "Bill" && <Bill />}
          {value === "Admin" && <Admin />}
        </div>
      </SnackbarProvider>
    );
  }
}

export default hot(module)(App);
