import React, { Component} from 'react';
import Button from '@material-ui/core/Button';
import { withSnackbar } from 'notistack';

import PrinterService from '../../services/printerService';

class PrintButton extends Component {
  constructor(props){
    super(props);
    this.state = {isPaired: false};
    this.pair = this.pair.bind(this);
  }

  async pair(){
    await PrinterService.pair();
    const isPaired = PrinterService.isPaired();
    this.setState({isPaired});
    if(isPaired)
      this.props.enqueueSnackbar('Paired with printer!', {variant: 'success'})
    else
      this.props.enqueueSnackbar('Unable to pair with printer!', {variant: 'error'})
  }

  render(){
    const {generatePrintLines} = this.props;
    const lines = generatePrintLines();
    return (
        this.state.isPaired ?
          <Button onClick={() => PrinterService.print(lines)} color="primary" variant="contained">Print</Button>
          : <Button onClick={this.pair} color="primary" variant="contained">Pair with Printer</Button>
    );
  }
}

export default withSnackbar(PrintButton);
