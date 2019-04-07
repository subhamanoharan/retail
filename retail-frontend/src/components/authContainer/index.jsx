import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import {SnackbarProvider} from 'notistack'
import BasePage from '../basePage';
import LoginPage from '../loginPage';
import Spinner from '../spinner';
import axiosHelper from '../../helpers/axiosHelper';

export default class AuthContainer extends React.Component {
  constructor(props){
    super(props);
    this.state = {loggedIn: true, networkCallsInProgress: 0};
    this.onUnauthorised = this.onUnauthorised.bind(this);
    this.onAuthorised = this.onAuthorised.bind(this);
    this.onNetworkReq = this.onNetworkReq.bind(this);
    this.onNetworkRes = this.onNetworkRes.bind(this);
    axiosHelper.setUpAuthorizationInterceptors(this.onUnauthorised, this.onAuthorised);
    axiosHelper.setUpNetworkStatusInterceptors(this.onNetworkReq, this.onNetworkRes);
  }

  onAuthorised() {
    if(!this.state.loggedIn)
      this.setState({loggedIn: true})
  }

  onUnauthorised() {
    this.setState({loggedIn: false})
  }

  onNetworkReq(){
    const {networkCallsInProgress} = this.state;
    this.setState({networkCallsInProgress: networkCallsInProgress + 1});
  }

  onNetworkRes(){
    const {networkCallsInProgress} = this.state;
    this.setState({networkCallsInProgress: networkCallsInProgress - 1});
  }

  render() {
    const {loggedIn, networkCallsInProgress} = this.state;
    const isLoading = networkCallsInProgress > 0;
    return (
      <SnackbarProvider maxSnack={3}>
        <div>
          {loggedIn ? <BasePage /> : <LoginPage />}
          {isLoading && <Spinner />}
        </div>
    </SnackbarProvider>
    );
  }
}
