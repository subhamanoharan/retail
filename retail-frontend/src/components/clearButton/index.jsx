import React, { Component} from 'react';
import Button from '@material-ui/core/Button';

export default class ClearButton extends Component {
  render() {
    const {clearItems} = this.props;
    return (
      <Button onClick={clearItems} color="primary" variant="contained">New Bill</Button>
    );
  }
}
