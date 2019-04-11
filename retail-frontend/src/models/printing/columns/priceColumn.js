import lodash from 'lodash';
import {replaceFrom} from '../../stringUtility';

export default class PriceColumn {
  constructor(cart){
    this.prices = cart.getCartItems().map((ci) => ci.price());
    this.maxLength = lodash.max(this.prices.map((p) => String(p).length));
  }

  setStartIndex(previousColumn){
    this.startIndex = previousColumn ? (previousColumn.startIndex + previousColumn.maxLength + 1) : 0;
  }

  getFormattedLine(index, line){
    const value = lodash.padStart(this.prices[index], this.maxLength);
    return replaceFrom(line, value, this.startIndex);
  }
}
