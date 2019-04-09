import lodash from 'lodash';

export default class PriceColumn {
  constructor(cartItem){
    this.price = cartItem.price();
  }

  value(){
    return this.price;
  }

  getLength(){
    return String(this.price).length;
  }

  prettify(limit){
    return lodash.padStart(this.value(), limit);
  }

  canWrap(){
    return false;
  }
}
