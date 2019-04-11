import lodash from 'lodash';

import IdColumn from '../../models/printing/columns/idColumn';
import NameColumn from '../../models/printing/columns/nameColumn';
import PriceColumn from '../../models/printing/columns/priceColumn';
import PriceCalculationColumn from '../../models/printing/columns/priceCalculationColumn';
import {splitByLength} from '../../models/stringUtility';
import constants from '../../constants';

const {STORE_NAME, ADDRESS, PRINTING_MAX_LIMIT} = constants;

export class LineGenerator {
  constructor(MAX_LIMIT = PRINTING_MAX_LIMIT){
    this.MAX_LIMIT = MAX_LIMIT;
  }

  fill(index, idColumn, nameColumn, priceCalculationColumn, priceColumn){
    const line = this.getBlankLine();
    const lineWithId = idColumn.getFormattedLine(index, line);
    const lineWithPrice = priceColumn.getFormattedLine(index, lineWithId);
    const lineWithPriceCalc = priceCalculationColumn.getFormattedLine(index, lineWithPrice);
    const linesWithName = nameColumn.getFormattedLines(index, lineWithPriceCalc);
    return [...linesWithName];
  }

  getBlankLine(){
    return new Array(this.MAX_LIMIT + 1).join(' ');
  }

  getSeparatorLine(){
    return new Array(this.MAX_LIMIT + 1).join('-');
  }

  getDefaultLines(){
    return [STORE_NAME, ...ADDRESS, this.getSeparatorLine()]
      .reduce((acc, l) => [...acc, ...splitByLength(l, this.MAX_LIMIT)],[])
      .map(l => lodash.trim(l))
      .map(l => lodash.pad(l, this.MAX_LIMIT))
  }

  generate(cart){
    const SPACE_BETWEEN_COLUMNS = 3;
    const cartItems = cart.getCartItems();
    const idColumn = new IdColumn(cartItems);
    const priceColumn = new PriceColumn(cartItems);
    const priceCalculationColumn = new PriceCalculationColumn(cartItems);

    const maxNameColumnLength = this.MAX_LIMIT - (idColumn.maxLength +
      priceColumn.maxLength + priceCalculationColumn.maxLength + SPACE_BETWEEN_COLUMNS);
    const nameColumn = new NameColumn(cartItems, maxNameColumnLength);

    [idColumn, nameColumn, priceCalculationColumn, priceColumn]
      .forEach((c, i, array) => c.setStartIndex(array[i-1]))

    return cartItems.reduce((acc, ci, index) =>
      [...acc, ...this.fill(index, idColumn, nameColumn, priceCalculationColumn, priceColumn)],
      this.getDefaultLines());
  }
}

export default new LineGenerator();
