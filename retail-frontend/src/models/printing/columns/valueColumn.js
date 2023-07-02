import lodash from 'lodash';
import {replaceFrom, prettyPrintPrice} from '../../stringUtility';

export default class ValueColumn {
  constructor(values){
    this.values = values.map((v) => lodash.isNumber(v) ? prettyPrintPrice(v) : v);
    this.maxLength = lodash.max(this.values.map((p) => String(p).length));
  }

  setStartIndex(previousColumn){
    this.startIndex = previousColumn ? (previousColumn.startIndex + previousColumn.maxLength + 1) : 0;
  }

  getFormattedLine(index, line){
    const value = lodash.padStart(this.values[index], this.maxLength);
    return replaceFrom(line, value, this.startIndex);
  }
}
