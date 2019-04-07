import React from 'react';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';

const Login = (props) => {
  const {onChange, onSubmit} = props;
  return (
    <form onSubmit={onSubmit}>
      <FormControl margin="normal" required>
        <InputLabel htmlFor="email">Name</InputLabel>
        <Input name="name" autoFocus onChange={onChange('name')} autoComplete="name"/>
      </FormControl>
      <FormControl margin="normal" required>
        <InputLabel htmlFor="password">Password</InputLabel>
        <Input name="password" type="password" onChange={onChange('password')} autoComplete="current-password"/>
      </FormControl>
      <Button type="submit" variant="contained" color="primary">
        Ok
      </Button>
    </form>
  );
}

export default Login;
