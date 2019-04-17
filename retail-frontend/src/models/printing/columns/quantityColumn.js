import lodash from 'lodash';
import {replaceFrom} from '../../stringUtility';

export default class QuantityColumn {
  constructor(cartItems){
    this.quantities = cartItems.map((ci) => ci.getNoOfUnitsToDisplay().split(' ').join(''));
    this.maxLength = lodash.max(this.quantities.map((q) => q.length));
  }

  setStartIndex(previousColumn){
    this.startIndex = previousColumn ? (previousColumn.startIndex + previousColumn.maxLength + 1) : 0;
  }

  getFormattedLine(index, line){
    const value = lodash.padStart(this.quantities[index], this.maxLength);
    return replaceFrom(line, value, this.startIndex);
  }
}
