import React, { Component} from 'react';
import TextField from '@material-ui/core/TextField';

export default class AddNewItemForm extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(name) {
    return event => {
      this.props.onChange({
        ...this.props.item,
        [name]: event.target.value,
      });
    };
  }

  render() {
    const {name, sp, quantity} = this.props.item;
    return(
      <div>
          <TextField
            id="name"
            label="Name"
            value={name}
            onChange={this.handleChange('name')}
            autoFocus
            required
          />
          <TextField
            id="sp"
            label="SP"
            value={sp}
            required
            type="number"
            inputProps={{min: "1"}}
            onChange={this.handleChange('sp')}
          />
          <TextField
            id="quantity"
            label="Quantity"
            value={quantity}
            onChange={this.handleChange('quantity')}
            required
            type="number"
            inputProps={{min: "1"}}
          />
      </div>
    );
  }
}
