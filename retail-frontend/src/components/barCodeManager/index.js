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
    const matchingItemByBarcode = this.props.masterList.find((i) => i.barcode.toLowerCase() === code.toLowerCase());
    const matchingItemByName = this.props.masterList.find((i) => i.name.toLowerCase() === code.toLowerCase());
    const matchingItem = matchingItemByBarcode || matchingItemByName;
    if(matchingItem && matchingItem.byWeight)
      this.setState({getWeight: true, matchingItem});
    else if(matchingItem)
      this.props.onItemScanned(matchingItem);
    else
      alert(`No matching item for scanned barcode: ${code}`);
  }

  onWeightEntered(weight, units){
    this.props.onItemByWeightScanned(this.state.matchingItem, weight, units);
    this.hideWeightInput();
  }

  hideWeightInput(){
    this.setState({getWeight: false, matchingItem: null});
  }

  render() {
    const {getWeight, matchingItem} = this.state;
    const searchableMasterList = this.props.masterList.filter(({byWeight, barcode}) => byWeight || barcode.length < 5);
    return (
      getWeight ?
        <WeightInputForm item={matchingItem} onSubmit={this.onWeightEntered} onCancel={this.hideWeightInput}/>
        : <BarCodeInputField onScanComplete={this.onBarCodeScanned} searchableMasterList={searchableMasterList}/>
    )
  }
}
