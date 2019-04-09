import {splitByLength} from '../stringUtility';

export default class NameColumn {
  constructor(cartItem){
    this.name = cartItem.name;
  }

  value(){
    return this.name;
  }

  getLength(){
    return String(this.name).length;
  }

  prettify(limit){
    return splitByLength(this.value() , limit);
  }

  canWrap(){
    return true;
  }
}
