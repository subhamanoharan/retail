import React from 'react';
import { withSnackbar } from 'notistack';

import AuthForm from './authForm';
import usersService from './../../services/usersService';

class LoginPage extends React.Component {
  constructor(props){
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {name: '', password: ''};
  }

  handleChange(name) {
    return (event) => {
      this.setState({[name]: event.target.value});
      event.stopPropagation();
    };
  }

  handleSubmit(event){
    event.preventDefault();
    event.stopPropagation();
    this.setState({error: ''});
    usersService.login(this.state.name, this.state.password)
      .catch((errors) => {
        if(errors)
          errors.map(e => this.props.enqueueSnackbar(e, {variant: 'error'}))
      });
  }

  render(){
    return (
      <AuthForm onChange={this.handleChange} onSubmit={this.handleSubmit} />
    )
  }
}

export default withSnackbar(LoginPage);
