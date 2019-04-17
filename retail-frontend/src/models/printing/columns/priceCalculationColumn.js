import lodash from 'lodash';
import {replaceFrom, prettyPrintPrice} from '../../stringUtility';

export default class PriceCalculationColumn {
  constructor(cartItems){
    this.priceCalculations = cartItems.map((ci) => `${prettyPrintPrice(ci.sp)}*${ci.quantity}`);
    this.maxLength = lodash.max(this.priceCalculations.map((p) => String(p).length));
  }

  setStartIndex(previousColumn){
    this.startIndex = previousColumn ? (previousColumn.startIndex + previousColumn.maxLength + 1) : 0;
  }

  getFormattedLine(index, line){
    const value = lodash.padStart(this.priceCalculations[index], this.maxLength);
    return replaceFrom(line, value, this.startIndex);
  }
}
