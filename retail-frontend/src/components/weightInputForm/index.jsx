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

export default class WeightInputForm extends React.Component {
  constructor(props) {
      super(props);
      this.state = {weight: '', units: 1};
      this.handleSubmit = this.handleSubmit.bind(this);
      this.handleChange = this.handleChange.bind(this);
      this.handleWeightSelection = this.handleWeightSelection.bind(this);
      this.hideModal = this.hideModal.bind(this);
   }

   handleChange(name) {
     return (event) => {
       this.setState({[name]: event.target.value});
       event.stopPropagation();
     };
   }

   handleWeightSelection(wt){
     return (event) => {
       this.setState({weight: wt});
       event.stopPropagation();
     };
   }

  handleSubmit(event){
    const {weight, units} = this.state;
    const value = Number(weight);
    event.preventDefault();
    if(value>0)
      this.props.onSubmit(value, Number(units))
    else
      this.setState({error: true});
  }

  hideModal(event){
    event.stopPropagation();
    this.props.onCancel()
  }

  render() {
    const {error, weight, units} = this.state;
    const {item: {name, sp}} = this.props;
    const selectedButtonProps = {variant: 'contained', color: 'primary'};
    const unSelectedButtonProps = {variant: 'outlined'};
    return(
      <Dialog
        open
        aria-labelledby="form-dialog-title"
        onClose={this.hideModal}
      >
      <DialogTitle id="form-dialog-title">Weight</DialogTitle>
      {error && <Typography color="error" align="center">Please enter a weight</Typography>}
      <form onSubmit={this.handleSubmit}>
        <DialogContent>
          <Typography gutterBottom variant="h6">{name} - Rs.{sp}/kg</Typography>
          {/* <Grid container spacing={8}>
            { [0.050, 0.1, 0.25, 0.5, 1, 2].map((wt) =>
              <Grid item key={wt}>
                <Button
                  {...(wt==weight ? selectedButtonProps : unSelectedButtonProps)}
                  onClick={this.handleWeightSelection(wt)}
                >
                  {prettyPrintWeight(wt)}
                </Button>
              </Grid>)
            }
          </Grid>
          */}
          <TextField
            id="weight"
            label="Weight(in kg)"
            value={weight}
            type="number"
            inputProps={{min: 0, step: 0.001, max: 10000}}
            required
            autoFocus
            fullWidth
            onChange={this.handleChange('weight')}
          />
          <TextField
            id="units"
            label="Units"
            value={units}
            fullWidth
            type="number"
            inputProps={{min: 1, step: 1, max: 500}}
            required
            onChange={this.handleChange('units')}
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
