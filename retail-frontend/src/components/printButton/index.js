import React, { Component} from 'react';
import Button from '@material-ui/core/Button';
import { withSnackbar } from 'notistack';
import Grid from '@material-ui/core/Grid';

import PrinterService from '../../services/printerService';
import SelectPrinterInputForm from '../selectPrinterInputForm';
import lineGeneratorService from '../../services/printing/lineGenerator';

class PrintButton extends Component {
  constructor(props){
    super(props);
    this.state = {isPaired: false, showSelectPrinterForm: false};
    this.pair = this.pair.bind(this);
    this.unpair = this.unpair.bind(this);
    this.showSelectPrinterForm = this.showSelectPrinterForm.bind(this);
    this.onHidePrinterSelectionForm = this.onHidePrinterSelectionForm.bind(this);
    this.onPrinterSelection = this.onPrinterSelection.bind(this);
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

  async unpair(){
    await PrinterService.unpair();
    const isPaired = PrinterService.isPaired();
    this.setState({isPaired});
    if(isPaired)
      this.props.enqueueSnackbar('Unpaired from printer!', {variant: 'success'})
    else
      this.props.enqueueSnackbar('Unable to unpair from printer!', {variant: 'error'})
  }

  showSelectPrinterForm() {
    this.setState({ showSelectPrinterForm: true })
  }

  onHidePrinterSelectionForm() {
    this.setState({ showSelectPrinterForm: false })
  }

  onPrinterSelection(noOfCharacters){
    console.log('noOfCharacters:', noOfCharacters)
    this.onHidePrinterSelectionForm()
    lineGeneratorService.setMaxLimit(noOfCharacters);
    this.pair();
  }

  render(){
    const {generatePrintLines} = this.props;
    const {isPaired, showSelectPrinterForm} = this.state;
    const lines = generatePrintLines();
    return (
      <div>
        {
          isPaired ?
          (<Grid container spacing={1}>
            <Grid item>
              <Button onClick={() => PrinterService.print(lines)} color="primary" variant="contained">Print</Button>
            </Grid>
            <Grid item>
              <Button onClick={this.unpair} color="primary" variant="contained">Unpair from printer</Button>
            </Grid>
          </Grid>)
          : <Button onClick={this.showSelectPrinterForm} color="primary" variant="contained">Pair with Printer</Button>
        }
        {showSelectPrinterForm && <SelectPrinterInputForm onSubmit={this.onPrinterSelection} onCancel={this.onHidePrinterSelectionForm}/>}
      </div>
    );
  }
}

export default withSnackbar(PrintButton);
