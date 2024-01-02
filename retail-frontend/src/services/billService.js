import lineGeneratorService from './printing/lineGenerator';
import ImmutableCart from '../models/immutableCart';

export default class BillService {

  constructor(cart) {
    this.cart = cart;
  }

  list(){
    return this.cart.getItems();
  }

  resetCartItems(newCart){
    this.cart = new ImmutableCart(newCart.getItems())
  }

  add({barcode, sp, name, quantity, id, byWeight, weight, tax_percent}){
    this.cart =  this.cart.addItem({barcode, sp, name, id, byWeight, weight, tax_percent}, quantity)
    return Promise.resolve();
  }

  incrementQuantity(index){
    this.cart =  this.cart.incrementQuantity(index)
    return Promise.resolve();
  }

  decrementQuantity(index){
    this.cart =  this.cart.decrementQuantity(index)
    return Promise.resolve();
  }

  getQuantity(index){
    return this.cart.getQuantity(index);
  }

  delete({barcode, sp, name, quantity, id}){
    this.cart =  this.cart.deleteItem({barcode, sp, name, quantity, id})
    return Promise.resolve();
  }

  clear(){
    this.cart = this.cart.clear();
  }

  getTotal(){
    return this.cart.getTotal();
  }

  getTotalNoOfItems(){
    return this.cart.getTotalNoOfItems();
  }

  getLinesToPrint(){
    return lineGeneratorService.generate(this.cart);
  }
}
