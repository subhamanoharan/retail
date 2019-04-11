import lodash from 'lodash';

import IdColumn from '../../models/printing/columns/idColumn';
import NameColumn from '../../models/printing/columns/nameColumn';
import PriceColumn from '../../models/printing/columns/priceColumn';
import {splitByLength} from '../../models/stringUtility';
import constants from '../../constants';

const {STORE_NAME, ADDRESS, PRINTING_MAX_LIMIT} = constants;

export class LineGenerator {
  constructor(MAX_LIMIT = PRINTING_MAX_LIMIT){
    this.MAX_LIMIT = MAX_LIMIT;
  }

  fill(index, idColumn, priceColumn, nameColumn){
    const line = this.getBlankLine();
    const lineWithId = idColumn.getFormattedLine(index, line);
    const lineWithPrice = priceColumn.getFormattedLine(index, lineWithId);
    const linesWithName = nameColumn.getFormattedLines(index, lineWithPrice);
    return [...linesWithName];
  }

  getSeparatorLine(){
    return new Array(this.MAX_LIMIT + 1).join('-');
  }

  getBlankLine(){
    return new Array(this.MAX_LIMIT + 1).join(' ');
  }

  getDefaultLines(){
    return [STORE_NAME, ...ADDRESS]
      .reduce((acc, l) => [...acc, ...splitByLength(l, this.MAX_LIMIT)],[])
      .map(l => lodash.trim(l))
      .map(l => lodash.pad(l, this.MAX_LIMIT))
  }

  generate(cart){
    const SPACES = 2;
    const cartItems = cart.getCartItems();
    const idColumn = new IdColumn(cart);
    const priceColumn = new PriceColumn(cart);

    const maxNameColumnLength = this.MAX_LIMIT - (idColumn.maxLength + priceColumn.maxLength + SPACES);
    const nameColumn = new NameColumn(cart, maxNameColumnLength);

    [idColumn, nameColumn, priceColumn]
      .forEach((c, i, array) => c.setStartIndex(array[i-1]))

    return cartItems.reduce((acc, ci, index) =>
      [...acc, ...this.fill(index, idColumn, priceColumn, nameColumn)], this.getDefaultLines());
  }
}

export default new LineGenerator();
