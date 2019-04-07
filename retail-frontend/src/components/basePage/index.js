import React, { Component} from 'react';
import {hot} from "react-hot-loader";
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import {withSnackbar} from 'notistack';

import './basePage.css';
import Bill from '../bill';
import Admin from '../admin';
import itemsService from './../../services/itemsService';
import usersService from './../../services/usersService';
import constants from '../../constants';
import LogoutIcon from '../logoutIcon';

const {ROLES: {USER, ADMIN}} = constants;

class BasePage extends Component{
  constructor(props){
    super(props);
    this.state = {role: USER};
  }

  componentDidMount(){
    this.getLoggedInUserDetails();
  }

  getLoggedInUserDetails(){
    return usersService.getLoggedInUserDetails()
      .then(({role}) => this.setState({role}))
      .catch((errors) => {
        if(errors)
          errors.map(e => this.props.enqueueSnackbar(e, {variant: 'error'}))
        });
  }

  render(){
    const {role} = this.state;
    return(
      <div className="App">
        <AppBar position="static">
          <Toolbar>
            <Grid container direction="row-reverse" spacing={8}>
              <Grid item>
                <LogoutIcon />
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>
        {role === USER && <Bill />}
        {role === ADMIN && <Admin />}
      </div>
    );
  }
}

export default withSnackbar(BasePage);
