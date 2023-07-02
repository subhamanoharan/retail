import {prettyPrintWeight} from './stringUtility';

export default class CartItemByWeight {
  constructor({name, barcode, quantity = 1, sp, id, weight, tax_percent}){
    this.name = name;
    this.barcode = barcode;
    this.quantity = quantity;
    this.sp = sp;
    this.id = id;
    this.byWeight = true;
    this.weight = weight;
    this.tax_percent = tax_percent;
  }

  getNoOfUnitsToDisplay(){
    return `${prettyPrintWeight(this.weight)} * ${this.quantity}`
  }

  price(){
    return this.quantity * this.sp * this.weight;
  }

  matches(item){
    return item.byWeight && this.barcode === item.barcode && this.weight === item.weight;
  }

  tax(){
    const priceWithTax = this.price()
    const priceWithoutTax = (priceWithTax * 100) /(this.tax_percent + 100)
    return priceWithTax - priceWithoutTax;
  }

  hasTax(){
    return Boolean(this.tax_percent)
  }
}
