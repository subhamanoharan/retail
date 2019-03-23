export default class BillService {
  constructor(cart){
    this.cart = cart;
  }

  list(){
    return this.cart.getItems();
  }

  add({barcode, sp, name, quantity, id}){
    this.cart =  this.cart.addItem({barcode, sp, name, id}, quantity)
    return Promise.resolve();
  }

  delete({barcode, sp, name, quantity, id}){
    this.cart =  this.cart.deleteItem({barcode, sp, name, quantity, id})
    return Promise.resolve();
  }
}
