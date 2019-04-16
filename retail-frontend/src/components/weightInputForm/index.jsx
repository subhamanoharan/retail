import React from "react";
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

export default class WeightInputForm extends React.Component {
  constructor(props) {
      super(props);
      this.state = {g: 0, kg: 0};
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
    const value = Number(this.state.kg) + (Number(this.state.g) / 1000);
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
    const {error} = this.state;
    return(
      <Dialog
        open
        aria-labelledby="form-dialog-title"
      >
      <DialogTitle id="form-dialog-title">Weight</DialogTitle>
      {error && <Typography color="error" align="center">Please enter a value</Typography>}
      <form onSubmit={this.handleSubmit}>
        <DialogContent>
          <TextField
            id="weightInKg"
            label="kg"
            value={this.state.kg}
            type="number"
            inputProps={{min: 0, step: 1, max: 10000}}
            required
            autoFocus
            onChange={this.handleChange('kg')}
          />
          <TextField
            id="weightIng"
            label="g"
            value={this.state.g}
            type="number"
            inputProps={{min: 0, step: 1, max: 999}}
            required
            onChange={this.handleChange('g')}
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
