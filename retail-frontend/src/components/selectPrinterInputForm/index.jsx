import React from "react";
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Grid from "@material-ui/core/Grid";
import {prettyPrintWeight} from '../../models/stringUtility';

export default class SelectPrinterInputForm extends React.Component {
  constructor(props) {
      super(props);
      this.state = {weight: '', units: 1};
      this.handleSubmit = this.handleSubmit.bind(this);
      this.handleChange = this.handleChange.bind(this);
      this.hideModal = this.hideModal.bind(this);
   }

   handleChange(name) {
     return (event) => {
       this.setState({[name]: event.target.value});
       event.stopPropagation();
     };
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
          <TextField
            id="noOfCharacters"
            label="noOfCharacters"
            value={noOfCharacters}
            type="number"
            required
            autoFocus
            fullWidth
            onChange={this.handleChange('noOfCharacters')}
          />
        </DialogContent>
        <DialogActions>
          <Button type="submit" color="primary">Ok</Button>
          <Button onClick={this.hideModal} color="primary">Cancel</Button>
        </DialogActions>
      </form>
    </Dialog>);
   }
}
