import React from "react";
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormLabel from '@material-ui/core/FormLabel';
import Switch from '@material-ui/core/Switch';
import Grid from '@material-ui/core/Grid';
import { withSnackbar } from 'notistack';

const withCategories = (categories) => class ItemForm extends React.Component {
  constructor(props) {
      super(props);
      const item = props.item;
      const valuesToDisplay = item ? this.getExistingValues(item) : this.getDefaultValues();
      this.state = {...valuesToDisplay};
      this.handleSubmit = this.handleSubmit.bind(this);
      this.handleChange = this.handleChange.bind(this);
      this.handleByWeightToggle = this.handleByWeightToggle.bind(this);
      this.handleCategoryChange = this.handleCategoryChange.bind(this);
      this.hideModal = this.hideModal.bind(this);
   }

  getDefaultValues(){
    return { name: '', sp: 0, barcode: '', byWeight: false, category: null };
  }

  getExistingValues(item){
    return { name: item.name, sp: item.sp, barcode: item.barcode, byWeight: item.byWeight, category: item.category };
  }

  handleChange(name) {
    return (event) => {
      this.setState({[name]: event.target.value});
      event.stopPropagation();
    };
  }

  handleByWeightToggle(event) {
    const checked = event.target.checked;
    if(checked)
      this.setState({byWeight: checked, category: categories[0]});
    else
      this.setState({byWeight: false, category: null});
    event.stopPropagation();
  }

  handleCategoryChange(event){
    this.setState({category: event.target.value});
    event.stopPropagation();
  }

  handleSubmit(event){
    event.preventDefault();
    const {name, sp, barcode, byWeight, category} = this.state;
    this.props.onSubmit({name, sp: Number(sp), barcode, byWeight, category})
      .then(this.props.onSuccess)
      .catch((errors) => {
        if(errors)
          errors.map(e => this.props.enqueueSnackbar(e, {variant: 'error'}))
        });
  }

  hideModal(event){
    this.props.hideForm();
    event.stopPropagation();
  }

  generateCategorySelect(){
    const menuItems = categories.map((c, i) => <MenuItem key={i} value={c}>{c}</MenuItem>)
    return (
      <FormControl fullWidth>
        <FormLabel required>Category</FormLabel>
        <Select value={this.state.category} onChange={this.handleCategoryChange}>{menuItems}</Select>
      </FormControl>)
  }

  render() {
    return(
      <Dialog
        open
        onClose={this.hideModal}
        aria-labelledby="form-dialog-title"
      >
      <DialogTitle id="form-dialog-title">Item</DialogTitle>
      <form onSubmit={this.handleSubmit}>
        <DialogContent>
          <TextField
            id="name"
            label="Name"
            value={this.state.name}
            fullWidth
            onChange={this.handleChange('name')}
            required
            autoFocus
          />
          <TextField
            id="sp"
            label={this.state.byWeight ? "Price per kg" : "Price per unit"}
            value={this.state.sp}
            fullWidth
            type="number"
            inputProps={{min: 1, step: 0.01, max: 10000}}
            required
            onChange={this.handleChange('sp')}
          />
          <TextField
            id="barcode"
            label="Barcode"
            value={this.state.barcode}
            fullWidth
            required
            onChange={this.handleChange('barcode')}
          />
          <Grid container alignItems="center">
            <Grid item>
              <FormLabel>Item sold by weight</FormLabel>
            </Grid>
            <Grid item>
              <Switch checked={this.state.byWeight} onChange={this.handleByWeightToggle} />
            </Grid>
          </Grid>
          { this.state.byWeight && this.generateCategorySelect() }
        </DialogContent>
        <DialogActions>
          <Button onClick={this.hideModal} color="primary">Cancel</Button>
          <Button type="submit" color="primary">Ok</Button>
        </DialogActions>
      </form>
    </Dialog>);
   }
}

export default (categories) => withSnackbar(withCategories(categories));
