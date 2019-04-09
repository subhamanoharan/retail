import lodash from 'lodash';

import CartItem from '../cartItem';
import IdColumn from './columns/idColumn';
import NameColumn from './columns/nameColumn';
import PriceColumn from './columns/priceColumn';
import {replaceFrom} from './stringUtility';

export default class LineGenerator {
  constructor(cart, MAX_LIMIT = 32){
    this.cart = cart;
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

  generate(){
    const items = this.cart.getItems();
    const cartItems = items.map(i => new CartItem(i));
    const maxIdColumnLength = String(cartItems.length).length;
    const maxPriceColumnLength = lodash.max(cartItems.map((ci) => new PriceColumn(ci).getLength()));
    const SPACES = 2;
    const maxNameColumnLength = this.MAX_LIMIT - (maxIdColumnLength + maxPriceColumnLength + SPACES);
    return cartItems.reduce((acc, ci, index) =>
      [...acc, ...this.fill(index + 1, ci, maxIdColumnLength, maxPriceColumnLength, maxNameColumnLength)], []);
  }
}
