import cartItemFactory from './cartItemFactory';
import priceCalculator from '../services/priceCalculator';

export default class ImmutableCart {
  constructor(items) {
    this.items = items.map(item => cartItemFactory({...item}));
  }

  clear(){
    return new ImmutableCart([]);
  }

  _incrementItemQuantity(item, quanity){
    const newQuantity = quanity + item.quantity;
    return this.updateItemByCode({...item, quantity: newQuantity});
  }

  updateItemByCode(item) {
    const updatedItems = this.items.map(i => i.barcode === item.barcode ? item : i);
    return new ImmutableCart(updatedItems);
  }

  findItemByCode(barcode){
    const matchingItem = this.items.find(i => i.barcode === barcode);
    return matchingItem ? {...matchingItem} : matchingItem;
  }

  deleteItem(item) {
    const updatedItems = this.items.filter(i => i.barcode !== item.barcode);
    return new ImmutableCart(updatedItems);
  }

  addItem(item, quantity = 1) {
    const existingItem = this.findItemByCode(item.barcode);
    if(existingItem && !existingItem.byWeight)
      return this._incrementItemQuantity(existingItem, quantity);
    else
      return new ImmutableCart([...this.items, {...item, quantity}]);
  }

  getItems() {
    return this.items.map(i => ({...i}))
  }

  getCartItems(){
    return this.getItems().map(i => cartItemFactory(i));
  }

  getTotal() {
    return priceCalculator(this.items);
  }

  getTotalNoOfItems() {
    return this.items.reduce((acc, item) => acc + (item.byWeight ? 1 : item.quantity), 0);
  }
}
