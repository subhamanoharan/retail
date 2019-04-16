export default class CartItemByUnit {
  constructor({name, barcode, quantity = 1, sp, id}){
    this.name = name;
    this.barcode = barcode;
    this.quantity = quantity;
    this.sp = sp;
    this.id = id;
  }

  getNoOfUnits(){
    return `${this.quantity}`;
  }

  price(){
    return this.quantity * this.sp;
  }

  matches(item){
    return this.barcode === item.barcode;
  }
}
