import React, { Component} from "react";
import uuid from 'uuid/v4';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Button from '@material-ui/core/Button';

import AddNewItemForm from './addNewItemForm';
import './styles.css';

export default class AddNewItem extends Component {
  constructor(props) {
    super(props);
    this.handleClickOpen = this.handleClickOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onAdd = this.onAdd.bind(this);
    this.state = { open: false, item: { name: '', sp: 0, quantity: 0 } };
  }

  handleClickOpen() {
    this.setState({open: true });
  }

  handleClose() {
    this.setState({open: false, item: { name: '', sp: 0, quantity: 0 } });
  }

  onChange(item) {
    this.setState({item: {...this.state.item, ...item}});
  }

  onAdd(event){
    this.props.onAdd({...this.state.item, code: uuid()}, this.state.item.quantity);
    this.handleClose();
    event.preventDefault();
  }

  render() {
    return(
      <div>
        <Button
          variant="contained"
          color="primary"
          onClick={this.handleClickOpen}
          className="addNewItemBtn"
        >
         Add item
       </Button>
       <Dialog
         onClose={this.handleClose}
         aria-labelledby="customized-dialog-title"
         open={this.state.open}
       >
         <DialogTitle id="customized-dialog-title" onClose={this.handleClose}>
            Add Item
         </DialogTitle>
         <form onSubmit={this.onAdd}>
           <DialogContent>
              <AddNewItemForm item={this.state.item} onChange={this.onChange} />
           </DialogContent>
           <DialogActions>
             <Button type="submit" color="primary">Ok</Button>
             <Button onClick={this.handleClose} color="primary">Cancel</Button>
           </DialogActions>
         </form>
       </Dialog>
      </div>
    );
  }
}
