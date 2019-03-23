import React from "react";
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormLabel from '@material-ui/core/FormLabel';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';

export default class ItemForm extends React.Component {
  constructor(props) {
      super(props);
      const item = props.item;
      const valuesToDisplay = item ? this.getExistingValues(item) : this.getDefaultValues();
      this.state = {...valuesToDisplay};
      this.handleSubmit = this.handleSubmit.bind(this);
      this.handleChange = this.handleChange.bind(this);
      this.hideModal = this.hideModal.bind(this);
   }

  getDefaultValues(){
    return { name: '', sp: 0, barcode: '' };
  }

  getExistingValues(item){
    return { name: item.name, sp: item.sp, barcode: item.barcode };
  }

  handleChange(name) {
    return (event) => {
      this.setState({[name]: event.target.value});
      event.stopPropagation();
    };
  }

  handleSubmit(event){
    event.preventDefault();
    this.setState({error: ''});
    const {name, sp, barcode} = this.state;
    this.props.onSubmit({name, sp: Number(sp), barcode})
      .then(this.props.onSuccess)
      .catch((error) => error && this.setState({error}))
  }

  hideModal(event){
    this.props.hideForm();
    event.stopPropagation();
  }

  render() {
    const {error} = this.state;
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
          />
          <TextField
            id="sp"
            label="SP"
            value={this.state.sp}
            fullWidth
            type="number"
            inputProps={{min: "1"}}
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
        </DialogContent>
        <DialogActions>
          <Button onClick={this.hideModal} color="primary">Cancel</Button>
          <Button type="submit" color="primary">Ok</Button>
        </DialogActions>
      </form>
    </Dialog>);
   }
}
