import React from 'react';
import Paper from '@material-ui/core/Paper';

import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';

import LoginContainer from './loginContainer';

const styles = theme => ({
  root: {
    position: 'absolute',
    top: '40%',
    left: '50%',
    "-webkit-transform": "translate(-50%,-50%)",
  },
  paper: {
    padding: '50px'
  }
});

class AuthPage extends React.Component {
  render(){
    const {classes} = this.props;
    return (
      <div className={classes.root} >
        <Paper className={classes.paper}>
          <Typography variant="h5" gutterBottom>
            Login
          </Typography>
          <LoginContainer />
        </Paper>
        </div>
    );
  }
}

export default withStyles(styles)(AuthPage);
