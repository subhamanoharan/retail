import React from "react";
import Dialog from '@material-ui/core/Dialog';
import InputLabel from '@material-ui/core/InputLabel';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Grid from "@material-ui/core/Grid";
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Select from '@material-ui/core/Select';

import constants from '../../constants';

export default class LoadPastBillDropDown extends React.Component {
  constructor(props) {
      super(props);
      this.state = {};
      this.handleChange = this.handleChange.bind(this);
   }

  handleChange(event){
    this.setState({billIndex: event.target.value});
    this.props.onSubmit(this.props.bills[event.target.value])
  }

  render() {
    const { bills =[] } = this.props
    const menuItems = bills
      .map((b, i) => <MenuItem key={i} value={i}>
          {`${b.count()} item(s) - Rs.${b.getTotal()}`}
        </MenuItem>)
    return (
      bills && bills.length > 0 ?
      <>
        <InputLabel id="simple-select-label">Load old bill</InputLabel>
        <Select
          value={''}
          onChange={this.handleChange}
          labelId="simple-select-label"
          style={{width: '100%'}}
        >
          {menuItems}
        </Select>
      </>
      : <></>
    )
   }
}
