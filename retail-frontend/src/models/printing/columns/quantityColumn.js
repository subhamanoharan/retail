import lodash from 'lodash';
import {replaceFrom, prettyPrintWeight, stripSpaces} from '../../stringUtility';
import CartItemByWeight from '../../cartItemByWeight';

export default class QuantityColumn {
  constructor(cartItems){
    this.quantities = cartItems.map((ci) => {
      if(ci instanceof CartItemByWeight && ci.quantity === 1)
        return stripSpaces(prettyPrintWeight(ci.weight));
      return stripSpaces(ci.getNoOfUnitsToDisplay());
    });
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
