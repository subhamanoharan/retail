import {prettyPrintWeight} from './stringUtility';

export default class CartItemByWeight {
  constructor({name, barcode, quantity = 1, sp, id, weight}){
    this.name = name;
    this.barcode = barcode;
    this.quantity = quantity;
    this.sp = sp;
    this.id = id;
    this.byWeight = true;
    this.weight = weight;
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
}
