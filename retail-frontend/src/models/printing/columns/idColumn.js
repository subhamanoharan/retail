import lodash from 'lodash';
import {replaceFrom} from '../../stringUtility';

export default class IdColumn {
  constructor(cartItems){
    this.maxLength = String(cartItems.length).length;
  }

  setStartIndex(previousColumn){
    this.startIndex = previousColumn ? (previousColumn.startIndex + previousColumn.maxLength + 1) : 0;
  }

  getFormattedLine(index, line){
    const value = lodash.padStart(index + 1, this.maxLength);
    return replaceFrom(line, value, this.startIndex);
  }
}
