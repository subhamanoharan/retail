import React from "react";
import Dialog from '@material-ui/core/Dialog';
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

const { PRINTING_OPTIONS } = constants;

export default class SelectPrinterInputForm extends React.Component {
  constructor(props) {
      super(props);
      this.state = {noOfCharacters: PRINTING_OPTIONS[0].noOfCharacters};
      this.handleSubmit = this.handleSubmit.bind(this);
      this.handleSizeChange = this.handleSizeChange.bind(this);
      this.hideModal = this.hideModal.bind(this);
   }

  handleSubmit(event){
    const {noOfCharacters} = this.state;
    const value = Number(noOfCharacters);
    event.preventDefault();
    if(value>0)
      this.props.onSubmit(value)
    else
      this.setState({error: true});
  }

  hideModal(event){
    event.stopPropagation();
    this.props.onCancel()
  }

  handleSizeChange(event){
    this.setState({noOfCharacters: event.target.value});
    event.stopPropagation();
  }

  generatePrinterOptions(){
    const menuItems = PRINTING_OPTIONS
      .map((c, i) => <MenuItem key={i} value={c.noOfCharacters}>{c.text}</MenuItem>)
    return (
      <FormControl fullWidth>
        <FormLabel required>Size</FormLabel>
        <Select value={this.state.noOfCharacters} onChange={this.handleSizeChange}>{menuItems}</Select>
      </FormControl>)
  }


  render() {
    const {error, noOfCharacters} = this.state;
    return(
      <Dialog
        open
        aria-labelledby="form-dialog-title"
        onClose={this.hideModal}
      >
      <DialogTitle id="form-dialog-title">Select Printer Size</DialogTitle>
      {error && <Typography color="error" align="center">Please enter a weight</Typography>}
      <form onSubmit={this.handleSubmit}>
        <DialogContent>
          { this.generatePrinterOptions() }
        </DialogContent>
        <DialogActions>
          <Button type="submit" color="primary">Ok</Button>
          <Button onClick={this.hideModal} color="primary">Cancel</Button>
        </DialogActions>
      </form>
    </Dialog>);
   }
}
