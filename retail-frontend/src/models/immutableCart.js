import cartItemFactory from './cartItemFactory';

export default class ImmutableCart {
  constructor(items) {
    this.items = items.map(item => cartItemFactory({...item}));
  }

  clear(){
    return new ImmutableCart([]);
  }

  addItem(item, quantity = 1) {
    const itemToAdd = cartItemFactory({...item, quantity});
    const existingItem = this.findMatch(itemToAdd);
    if(existingItem){
      const updatedItems = this.items.map(i => i.matches(itemToAdd) ?
        {...i, quantity: i.quantity + itemToAdd.quantity} : i);
      return new ImmutableCart(updatedItems);
    }
    return new ImmutableCart([itemToAdd, ...this.items]);
  }

  incrementQuantity(index) {
    const itemToIncrement = this.items[index];
    const updatedItems = this.items.map(i => i.matches(itemToIncrement) ?
      {...i, quantity: i.quantity + 1} : i);
    return new ImmutableCart(updatedItems);
  }

  decrementQuantity(index) {
    const itemToIncrement = this.items[index];
    const updatedItems = this.items.map(i => i.matches(itemToIncrement) ?
      {...i, quantity: i.quantity - 1} : i);
    return new ImmutableCart(updatedItems);
  }

  getQuantity(index){
    const item = this.items[index];
    return item.quantity;
  }

  deleteItem(item) {
    const updatedItems = this.items.filter(i => i.barcode !== item.barcode);
    return new ImmutableCart(updatedItems);
  }

  findMatch(itemToAdd){
    return this.items.find(i => i.matches(itemToAdd));
  }

  getItems() {
    return this.items.map(i => ({...i}))
  }

  getCartItems(){
    return this.getItems().map(i => cartItemFactory(i));
  }

  getTotal() {
    return this.items.reduce((acc, item) => acc + item.price(), 0);
  }

  getTotalNoOfItems() {
    return this.items.reduce((acc, item) => acc + item.quantity, 0);
  }
}
