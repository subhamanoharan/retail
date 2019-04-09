import lodash from 'lodash';

export default class IdColumn {
  constructor(id){
    this.id = id;
  }

  value(){
    return this.id;
  }

  getLength(){
    return String(this.id).length;
  }

  prettify(limit){
    return lodash.padStart(this.id, limit);
  }

  canWrap(){
    return false;
  }
}
