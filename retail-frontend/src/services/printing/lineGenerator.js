import lodash from 'lodash';

import IdColumn from '../../models/printing/columns/idColumn';
import NameColumn from '../../models/printing/columns/nameColumn';
import PriceColumn from '../../models/printing/columns/priceColumn';
import QuantityColumn from '../../models/printing/columns/quantityColumn';
import ValueColumn from '../../models/printing/columns/valueColumn';
import {splitByLength, prettyPrintPrice} from '../../models/stringUtility';
import constants from '../../constants';

const {STORE_NAME, ADDRESS, PRINTING_MAX_LIMIT, QUOTATION, WELCOME} = constants;

export class LineGenerator {
  constructor(MAX_LIMIT = PRINTING_MAX_LIMIT){
    this.MAX_LIMIT = MAX_LIMIT;
  }

  setMaxLimit(noOfCharacters) {
    console.log('Setting max limit as', noOfCharacters)
    this.MAX_LIMIT = noOfCharacters;
  }

  fill(index, idColumn, nameColumn, quantityColumn, priceColumn){
    const line = this.getBlankLine();
    const lineWithId = idColumn.getFormattedLine(index, line);
    const lineWithPrice = priceColumn.getFormattedLine(index, lineWithId);
    const lineWithQuantity= quantityColumn.getFormattedLine(index, lineWithPrice);
    const linesWithName = nameColumn.getFormattedLines(index, lineWithQuantity);
    return [...linesWithName];
  }

  fillTaxColumns(details) {
    const gstColumn = new ValueColumn(details.gstId)
    const taxPercentColumn = new ValueColumn(details.tax)
    const taxableAmtColumn = new ValueColumn(details.taxableAmt)
    const totalTaxColumn = new ValueColumn(details.totalTax)
    gstColumn.setStartIndex()
    taxPercentColumn.setStartIndex(gstColumn)
    taxableAmtColumn.setStartIndex(taxPercentColumn)
    totalTaxColumn.setStartIndex(taxableAmtColumn)

    return details.tax.map((t, index) =>
      [gstColumn, taxPercentColumn, taxableAmtColumn, totalTaxColumn]
        .reduce((accLine, col) => col.getFormattedLine(index, accLine), this.getBlankLine())
      )
  }
  getBlankLine(){
    return new Array(this.MAX_LIMIT + 1).join(' ');
  }

  getSeparatorLine(){
    return new Array(this.MAX_LIMIT + 1).join('-');
  }

  getDefaultLines(){
    const startLines =  [STORE_NAME, ...ADDRESS]
      .reduce((acc, l) => [...acc, ...splitByLength(l, this.MAX_LIMIT)],[])
      .map(l => lodash.trim(l))
      .map(l => lodash.pad(l, this.MAX_LIMIT));
    const date = new Date();
    const formattedDate = [date.getDate(), date.getMonth()+1, date.getFullYear()].join('/');
    const endLines = [lodash.padEnd(QUOTATION, this.MAX_LIMIT),
      lodash.padEnd(formattedDate, this.MAX_LIMIT), this.getSeparatorLine()]
    return [...startLines, ...endLines];
  }

  getTotalLine(cart){
    return {
      text: lodash.padStart(prettyPrintPrice(cart.getTotal()), this.MAX_LIMIT),
      emphasis: true
    };
  }

  getTaxLines(cart){
    const taxLine = (tax, taxableAmt, totalTax) =>
      `${tax}% on ${prettyPrintPrice(taxableAmt)}:Rs.${prettyPrintPrice(totalTax)}`
    return Object.entries(cart.getTaxDetails())
      .reduce((acc, [tax, totalTax]) => {
        const taxableAmt = (totalTax * 100)/tax
        return [
          ...acc,
          lodash.padEnd(`CGST ${taxLine(tax/2, taxableAmt, totalTax/2)}`, this.MAX_LIMIT),
          lodash.padEnd(`SGST ${taxLine(tax/2, taxableAmt, totalTax/2)}`, this.MAX_LIMIT)
        ]
      }, [])
  }

  getTaxLines1(cart){
    const details = Object.entries(cart.getTaxDetails())
      .reduce((acc, [tax, totalTax]) => {
        const taxableAmt = (totalTax * 100)/tax
        const line = this.getBlankLine()
        return {...acc,
          gstId: [...(acc.gstId || []), 'CGST', 'SGST'],
          tax: [...(acc.tax || []), `${tax/2}%`, `${tax/2}%`],
          totalTax: [...(acc.totalTax || []), totalTax/2, totalTax/2],
          taxableAmt: [...(acc.taxableAmt || []), taxableAmt, taxableAmt]
        }
      }, {})

      if(!details.tax) return []
      return this.fillTaxColumns(details)
  }

  getWelcomeLine(){
    return lodash.pad(WELCOME, this.MAX_LIMIT);
  }

  generate(cart){
    const SPACE_BETWEEN_COLUMNS = 3;
    const cartItems = cart.getCartItems();
    const idColumn = new IdColumn(cartItems);
    const priceColumn = new PriceColumn(cartItems);
    const quantityColumn = new QuantityColumn(cartItems);

    const maxNameColumnLength = this.MAX_LIMIT - (idColumn.maxLength +
      priceColumn.maxLength + quantityColumn.maxLength + SPACE_BETWEEN_COLUMNS);
    const nameColumn = new NameColumn(cartItems, maxNameColumnLength);

    [idColumn, nameColumn, quantityColumn, priceColumn]
      .forEach((c, i, array) => c.setStartIndex(array[i-1]))
    const defaultStartLines = this.getDefaultLines();
    const itemLines = cartItems.reduce((acc, ci, index) =>
      [...acc, ...this.fill(index, idColumn, nameColumn, quantityColumn, priceColumn)], []);
    const endLines = [this.getSeparatorLine(), this.getTotalLine(cart), this.getSeparatorLine()]
    return [
      ...defaultStartLines,
      ...itemLines,
      ...endLines,
      ...this.getTaxLines1(cart),
      this.getWelcomeLine()
    ]
  }
}

export default new LineGenerator();
