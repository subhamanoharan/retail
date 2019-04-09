import React, { Component} from 'react';
import Button from '@material-ui/core/Button';

import PrinterService from '../../services/PrinterService';

export default class PrintButton extends Component {
  constructor(props){
    super(props);
    this.state = {isPaired: false};
    this.pair = this.pair.bind(this);
  }

  async pair(){
    await PrinterService.pair();
    this.setState({isPaired: PrinterService.isPaired()});
  }

  render(){
    const {billService} = this.props;
    const lines = billService.getLinesToPrint();
    return (
        this.state.isPaired ?
          <Button onClick={() => PrinterService.print(lines)} color="primary" variant="contained">Print</Button>
          : <Button onClick={this.pair} color="primary" variant="contained">Pair</Button>
    );
  }
}
