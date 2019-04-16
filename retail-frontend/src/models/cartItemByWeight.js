export default class CartItemByWeight {
  constructor({name, barcode, quantity = 1, sp, id, byWeight}){
    this.name = name;
    this.barcode = barcode;
    this.quantity = quantity;
    this.sp = sp;
    this.id = id;
    this.byWeight = byWeight;
  }

  price(){
    return this.quantity * this.sp;
  }
}
