import React, { Component} from 'react';

import BarCodeInputField from '../barCodeInputField';
import WeightInputForm from '../weightInputForm';

export default class BarCodeManager extends Component {
  constructor(props) {
    super(props);
    this.state = {getWeight: false, matchingItem: null};
    this.onBarCodeScanned = this.onBarCodeScanned.bind(this);
    this.onWeightEntered = this.onWeightEntered.bind(this);
    this.hideWeightInput = this.hideWeightInput.bind(this);
  }

  onBarCodeScanned(code){
    const matchingItem = this.props.masterList.find((i) => i.barcode.toLowerCase() === code.toLowerCase());
    if(matchingItem && matchingItem.byWeight)
      this.setState({getWeight: true, matchingItem});
    else if(matchingItem)
      this.props.onItemScanned(matchingItem);
    else
      alert(`No matching item for scanned barcode: ${code}`);
  }

  onWeightEntered(value){
    this.props.onItemScanned(this.state.matchingItem, value);
    this.hideWeightInput();
  }

  hideWeightInput(){
    this.setState({getWeight: false, matchingItem: null});
  }

  render() {
    const {getWeight} = this.state;
    return (getWeight ?
      <WeightInputForm onSubmit={this.onWeightEntered} onCancel={this.hideWeightInput}/>
        : <BarCodeInputField onScanComplete={this.onBarCodeScanned}/>
    );
  }
}
