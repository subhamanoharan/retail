import React from 'react';
import ExitIcon from "@material-ui/icons/ExitToApp";
import IconButton from '@material-ui/core/IconButton';
import {withSnackbar} from 'notistack';

import usersService from './../../services/usersService';

class LogoutIcon extends React.Component {
  constructor(props){
    super(props);
    this.onLogout = this.onLogout.bind(this);
  }

  onLogout(){
    return usersService.logout()
      .catch((errors) => {
        if(errors)
          errors.map(e => this.props.enqueueSnackbar(e, {variant: 'error'}))
        });
  }

  render(){
    return (
      <IconButton color="inherit" aria-label="Menu"  onClick={this.onLogout}>
        <ExitIcon/>
      </IconButton>
    );
  }
}

export default withSnackbar(LogoutIcon);
