export default class CartItemByUnit {
  constructor({name, barcode, quantity = 1, sp, id, tax_percent}){
    this.name = name;
    this.barcode = barcode;
    this.quantity = quantity;
    this.sp = sp;
    this.id = id;
    this.tax_percent = tax_percent;
  }

  getNoOfUnitsToDisplay(){
    return `${this.quantity}`;
  }

  price(){
    return this.quantity * this.sp;
  }

  tax(){
    const priceWithTax = this.price()
    const priceWithoutTax = (priceWithTax * 100) /(this.tax_percent + 100)
    return priceWithTax - priceWithoutTax;
  }

  matches(item){
    return this.barcode === item.barcode;
  }

  hasTax(){
    return Boolean(this.tax_percent)
  }
}
