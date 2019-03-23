import React, { Component} from 'react';

import BarCodeInputField from '../barCodeInputField';

export default class BarCodeManager extends Component {
  constructor(props) {
    super(props);
    this.onBarCodeScanned = this.onBarCodeScanned.bind(this);
  }

  onBarCodeScanned(code){
    const matchingItem = this.props.masterList.find((i) => i.barcode === code);
    if(matchingItem)
      this.props.onItemScanned(matchingItem);
    else
      alert(`No matching item for scanned barcode: ${code}`);
  }

  render() {
    return (
      <BarCodeInputField onScanComplete={this.onBarCodeScanned}/>
    );
  }
}
