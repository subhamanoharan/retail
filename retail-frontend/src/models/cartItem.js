export default class CartItem {
  constructor({name, barcode, quantity = 1, sp, id}){
    this.name = name;
    this.barcode = barcode;
    this.quantity = quantity;
    this.sp = sp;
    this.id = id;
  }
}
