import lodash from 'lodash';

import IdColumn from '../../models/printing/columns/idColumn';
import NameColumn from '../../models/printing/columns/nameColumn';
import PriceColumn from '../../models/printing/columns/priceColumn';
import {replaceFrom, splitByLength} from '../../models/stringUtility';
import constants from '../../constants';

const {STORE_NAME, ADDRESS, PRINTING_MAX_LIMIT} = constants;

export class LineGenerator {
  constructor(MAX_LIMIT = PRINTING_MAX_LIMIT){
    this.MAX_LIMIT = MAX_LIMIT;
  }

  setId(index, maxIdColumnLength){
    const line = new Array(this.MAX_LIMIT + 1).join(' ');
    const idColumnValue = new IdColumn(index).prettify(maxIdColumnLength);
    return replaceFrom(line, idColumnValue, 0);
  }

  setPrice(ci, maxPriceColumnLength, line){
    const priceColumnValue = new PriceColumn(ci).prettify(maxPriceColumnLength);
    return replaceFrom(line, priceColumnValue, line.length - maxPriceColumnLength);
  }

  setName(ci, maxNameColumnLength, line, startIndex){
    const nameColumnValues = new NameColumn(ci).prettify(maxNameColumnLength);
    return nameColumnValues.reduce((acc, ncv, i) => {
      if(i===0)
        return [replaceFrom(line, ncv, startIndex)]
      const emptyLine = new Array(this.MAX_LIMIT + 1).join(' ');
      return [...acc, replaceFrom(emptyLine, ncv, startIndex)]
    }, [])
  }

  fill(index, ci, maxIdColumnLength, maxPriceColumnLength, maxNameColumnLength){
    const lineWithId = this.setId(index, maxIdColumnLength);
    const lineWithPrice = this.setPrice(ci, maxPriceColumnLength, lineWithId);
    const linesWithName = this.setName(ci, maxNameColumnLength, lineWithPrice, maxIdColumnLength + 1);
    return [...linesWithName];
  }

  getSeparatorLine(){
    return new Array(this.MAX_LIMIT + 1).join('-');
  }

  getDefaultLines(){
    return [STORE_NAME, ...ADDRESS]
      .reduce((acc, l) => [...acc, ...splitByLength(l, this.MAX_LIMIT)],[])
      .map(l => lodash.trim(l))
      .map(l => lodash.pad(l, this.MAX_LIMIT))
  }

  generate(cart){
    const cartItems = cart.getCartItems();
    const maxIdColumnLength = String(cartItems.length).length;
    const maxPriceColumnLength = lodash.max(cartItems.map((ci) => new PriceColumn(ci).getLength()));
    const SPACES = 2;
    const maxNameColumnLength = this.MAX_LIMIT - (maxIdColumnLength + maxPriceColumnLength + SPACES);
    return cartItems.reduce((acc, ci, index) =>
      [...acc, ...this.fill(index + 1, ci, maxIdColumnLength, maxPriceColumnLength, maxNameColumnLength)], this.getDefaultLines());
  }
}

export default new LineGenerator();
